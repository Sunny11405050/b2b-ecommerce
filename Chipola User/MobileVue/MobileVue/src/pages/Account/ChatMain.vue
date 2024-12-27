<template>
  <q-pull-to-refresh @refresh="refresh">
    <q-header
      reveal
      reveal-offset="20"
      :class="{
        'bg-mydark text-white': $q.dark.mode,
        'bg-white text-dark': !$q.dark.mode,
      }"
    >
      <q-toolbar>
        <q-btn
          @click="$router.back()"
          flat
          round
          dense
          icon="las la-angle-left"
          class="q-mr-sm"
          :color="$q.dark.mode ? 'white' : 'dark'"
        />
        <q-toolbar-title class="text-weight-bold">{{
          $t("Live Chat")
        }}</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page>
      <div class="q-pl-md q-pr-md">
        <div class="border-grey bg-grey-1 radius8">
          <q-btn
            :label="$t('Search restaurants')"
            no-caps
            :color="$q.dark.mode ? 'grey600' : 'grey-1'"
            :text-color="$q.dark.mode ? 'grey300' : 'grey'"
            icon="search"
            unelevated
            align="left"
            class="fit radius8"
            @click="showSearch"
          />
        </div>
      </div>
      <q-space class="q-pa-sm"></q-space>

      <template v-if="!hasData && !loading">
        <div
          class="text-body2 text-weight-medium flex flex-center text-grey"
          style="height: calc(80vh)"
        >
          {{ $t("Search to chat with restaurants") }}
        </div>
      </template>

      <template v-if="loading">
        <ChatUserLoader :rows="10"></ChatUserLoader>
      </template>

      <template v-if="hasData && !loading && hasUserData">
        <q-list>
          <template v-for="items in getData" :key="items">
            <template v-if="users_data[items.user_uuid]">
              <q-item clickable @click="loadConversation(items.doc_id)">
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="users_data[items.user_uuid].photo_url" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-weight-bold">
                    {{ users_data[items.user_uuid].first_name }}
                    {{ users_data[items.user_uuid].last_name }}
                  </q-item-label>

                  <q-item-label caption>
                    <template v-if="items.orderID">
                      {{ $t("Order#") }} {{ items.orderID }}
                    </template>
                    <template v-else>
                      {{ users_data[items.user_uuid].user_type }}
                    </template>
                  </q-item-label>

                  <q-item-label
                    caption
                    lines="2"
                    v-if="getLastMessageData[items.doc_id]"
                  >
                    <template v-if="isTyping(items.user_uuid)">
                      <span class="text-primary"
                        >{{ users_data[items.user_uuid].first_name }} is typing
                        ...</span
                      >
                    </template>
                    <template v-else>
                      {{ getLastMessageData[items.doc_id].message }}
                    </template>
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption lines="2" class="text-center">
                    <div class="time" v-if="getLastMessageData[items.doc_id]">
                      {{ getLastMessageData[items.doc_id].time }}
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </template>
        </q-list>
      </template>

      <q-page-scroller
        v-if="hasData && !loading && hasUserData"
        position="bottom-right"
        :scroll-offset="150"
        :offset="[18, 18]"
      >
        <q-btn fab icon="keyboard_arrow_up" color="primary" padding="sm" />
      </q-page-scroller>
    </q-page>
    <ChatSearch ref="chat_search"></ChatSearch>
  </q-pull-to-refresh>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { firebaseDb, firebaseCollectionEnum } from "src/boot/FirebaseChat";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import auth from "src/api/auth";
import APIinterface from "src/api/APIinterface";
import { date } from "quasar";

export default {
  name: "ChatMain",
  components: {
    ChatSearch: defineAsyncComponent(() => import("components/ChatSearch.vue")),
    ChatUserLoader: defineAsyncComponent(() =>
      import("components/ChatUserLoader.vue")
    ),
  },
  data() {
    return {
      user_uuid: "",
      data: [],
      users: [],
      all_users: [],
      users_data: [],
      loading: false,
      loading_user: false,
      last_message_data: {},
      whoistyping_data: {},
      document_id: "",
      main_user_type: "",
      refresh_page: undefined,
    };
  },
  mounted() {
    let user = auth.getUser();
    this.user_uuid = user.client_uuid;
    this.getParticipants();
  },
  computed: {
    getData() {
      return this.data;
    },
    getLastMessageData() {
      return this.last_message_data;
    },
    hasData() {
      if (Object.keys(this.data).length > 0) {
        return true;
      }
      return false;
    },
    hasUserData() {
      if (Object.keys(this.users_data).length > 0) {
        return true;
      }
      return false;
    },
    getShowistyping() {
      return this.whoistyping_data;
    },
  },
  methods: {
    refresh(done) {
      this.refresh_page = done;
      this.getParticipants();
    },
    getParticipants() {
      try {
        this.loading = true;
        const collectionRef = collection(
          firebaseDb,
          firebaseCollectionEnum.chats
        );
        const q = query(
          collectionRef,
          where("participants", "array-contains", this.user_uuid),
          orderBy("lastUpdated", "desc"),
          limit(firebaseCollectionEnum.limit)
        );
        const SnapParticipants = onSnapshot(
          q,
          (snapshot) => {
            this.data = [];
            this.users = [];
            this.all_users = [];
            this.loading = false;
            if (!APIinterface.empty(this.refresh_page)) {
              this.refresh_page();
            }
            snapshot.forEach((doc) => {
              let data = doc.data();
              let isTyping = data.isTyping || null;
              let participants = data.participants || null;
              if (participants) {
                if (Object.keys(participants).length > 0) {
                  Object.entries(participants).forEach(([key, items]) => {
                    this.all_users.push(items);
                  });
                }

                let resp_participants = participants.filter(
                  (i) => !i.includes(this.user_uuid)
                );
                let user_uuid = resp_participants[0]
                  ? resp_participants[0]
                  : null;
                this.users.push(user_uuid);
                this.data.push({
                  doc_id: doc.id,
                  user_uuid: user_uuid,
                  is_typing: isTyping[resp_participants[0]]
                    ? isTyping[resp_participants[0]]
                    : false,
                  orderID: data.orderID || null,
                  orderUuid: data.orderUuid || null,
                });
              }
            });

            if (Object.keys(this.users).length > 0) {
              this.getUser();
              this.getLastMessage();
              this.getWhoIsTyping();
            }
          },
          (error) => {
            this.loading = false;
            if (!APIinterface.empty(this.refresh_page)) {
              this.refresh_page();
            }
            console.log("Error fetching chat documents:", error);
          }
        );
      } catch (error) {
        APIinterface.notify("dark", error, "error", this.$q);
      }
    },
    showSearch() {
      this.$refs.chat_search.dialog = true;
    },
    loadConversation(docId) {
      this.$router.push({
        path: "/account/chat/conversation",
        query: { doc_id: docId },
      });
    },
    getUser() {
      this.loading_user = true;
      APIinterface.fetchDataChats("getUsers", {
        main_user_type: this.main_user_type,
        users: this.users,
      })
        .then((data) => {
          this.users_data = data.details;
        })
        .catch((error) => {
          this.users_data = [];
        })
        .then((data) => {
          this.loading_user = false;
        });
    },
    async getLastMessage() {
      try {
        const batch = this.all_users.splice(0, 10);
        const conversationsRef = collection(
          firebaseDb,
          firebaseCollectionEnum.chats
        );
        const querySnapshot = await getDocs(
          query(
            conversationsRef,
            where("participants", "array-contains-any", this.users)
          )
        );
        querySnapshot.forEach(async (doc) => {
          const conversationID = doc.id;
          const messagesRef = collection(
            firebaseDb,
            firebaseCollectionEnum.chats,
            conversationID,
            "messages"
          );
          const messagesSnapshot = await getDocs(
            query(
              messagesRef,
              where("senderID", "in", batch),
              orderBy("timestamp", "desc"),
              limit(1)
            )
          );
          messagesSnapshot.forEach((messageDoc) => {
            let results = messageDoc.data();
            let timestamp = results.timestamp.toDate().toISOString();
            this.last_message_data[conversationID] = {
              message: results.message,
              timestamp: timestamp,
              time: date.formatDate(timestamp, "hh:mm a"),
            };
          });
        });
      } catch (error) {
        console.error("Error fetching last message:", error);
      }
    },
    async getWhoIsTyping() {
      const q = query(
        collection(firebaseDb, firebaseCollectionEnum.chats),
        where("participants", "array-contains-any", this.users),
        orderBy("lastUpdated", "desc"),
        limit(firebaseCollectionEnum.limit)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let results = doc.data();
          let data = results.isTyping || [];
          if (Object.keys(data).length > 0) {
            Object.entries(data).forEach(([key, items]) => {
              this.whoistyping_data[key] = items;
            });
          }
        });
      });
    },
    isTyping(user_uuid) {
      if (Object.keys(this.whoistyping_data).length > 0) {
        let istyping = this.whoistyping_data[user_uuid] || false;
        return istyping;
      }
      return false;
    },
    //
  },
};
</script>
