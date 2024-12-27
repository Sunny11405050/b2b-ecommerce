<template>
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="true"
    transition-show="fade"
    transition-hide="fade"
    @before-show="search = ''"
    @before-hide="data = []"
  >
    <q-card>
      <q-toolbar class="q-pl-md q-pr-md q-pt-sm">
        <q-input
          outlined
          v-model="search"
          :label="$t('Search restaurants')"
          dense
          :color="$q.dark.mode ? 'grey600' : 'blue'"
          :bg-color="$q.dark.mode ? 'grey300' : 'grey-1'"
          class="radius10"
          clearable
          clear-icon="close"
          @clear="whenClear"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-space></q-space>
        <q-btn
          flat
          dense
          :label="$t('Cancel')"
          v-close-popup
          no-caps
          :color="$q.dark.mode ? 'grey300' : 'blue'"
        />
      </q-toolbar>

      <q-card-section>
        <div v-if="hasSearch" class="text-body2 text-weight-regular q-mb-md">
          <q-icon name="search" size="2em"></q-icon>{{ $t("Search for") }}
          <span class="text-weight-bold">{{ search }}</span>
        </div>

        <div v-if="awaitingSearch" class="text-center q-pa-xl">
          <q-spinner color="primary" size="2em"> </q-spinner>
        </div>
      </q-card-section>

      <template v-if="hasData && !awaitingSearch">
        <ChatUserList :data="data" @on-chatuser="onChatuser"></ChatUserList>
      </template>
      <template v-else>
        <template v-if="hasSearch && !awaitingSearch">
          <div class="text-body2 text-center q-pa-xl">
            {{ $t("No matching records found") }}
          </div>
        </template>
      </template>

      <template v-if="!hasSearch">
        <ChatUserList
          :data="suggested_data"
          :headerTitle="$t('Suggested Restaurants')"
          @on-chatuser="onChatuser"
        ></ChatUserList>
      </template>
    </q-card>
  </q-dialog>
</template>

<script>
import APIinterface from "src/api/APIinterface";
import { defineAsyncComponent } from "vue";
import { firebaseDb, firebaseCollectionEnum } from "src/boot/FirebaseChat";
import auth from "src/api/auth";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";

export default {
  name: "ChatSearch",
  components: {
    ChatUserList: defineAsyncComponent(() =>
      import("components/ChatUserList.vue")
    ),
  },
  data() {
    return {
      dialog: false,
      search: "",
      is_search: false,
      awaitingSearch: false,
      search_type: ["merchant", "admin"],
      data: [],
      loading: true,
      suggested_data: [],
      main_user_uuid: "",
    };
  },
  mounted() {
    let user = auth.getUser();
    this.main_user_uuid = user.client_uuid;
    this.getSuggestedUser();
  },
  computed: {
    hasSearch() {
      if (!APIinterface.empty(this.search)) {
        return true;
      }
      return false;
    },
    hasData() {
      if (Object.keys(this.data).length > 0) {
        return true;
      }
      return false;
    },
    getData() {
      return this.data;
    },
  },
  watch: {
    search(newsearch, oldsearch) {
      if (!this.awaitingSearch) {
        if (APIinterface.empty(newsearch)) {
          return false;
        }
        setTimeout(() => {
          APIinterface.fetchDataChats("searchChats", {
            search: this.search,
            search_type: this.search_type,
          })
            .then((data) => {
              this.data = data.details;
            })
            .catch((error) => {
              this.data = [];
            })
            .then((data) => {
              this.awaitingSearch = false;
            });
        }, 1000); // 1 sec delay
        this.awaitingSearch = true;
      }
    },
  },
  methods: {
    whenClear() {
      this.data = [];
    },
    getSuggestedUser() {
      this.loading = true;
      APIinterface.fetchDataChats("suggestedUser", {
        search_type: this.search_type,
      })
        .then((data) => {
          this.suggested_data = data.details;
        })
        .catch((error) => {
          this.suggested_data = [];
        })
        .then((data) => {
          this.loading = false;
        });
    },
    async onChatuser(user_uuid) {
      try {
        const collectionRef = collection(
          firebaseDb,
          firebaseCollectionEnum.chats
        );
        const q = query(
          collectionRef,
          where("participants", "array-contains", user_uuid),
          orderBy("lastUpdated", "desc"),
          limit(1)
        );

        let current_doc_id = "";
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          let participants = data.participants || null;
          if (participants.includes(this.main_user_uuid) === true) {
            current_doc_id = doc.id;
          }
        });

        if (!APIinterface.empty(current_doc_id)) {
          this.loadConversation(current_doc_id);
        } else {
          this.createConversation(user_uuid);
        }
      } catch (error) {
        APIinterface.notify("dark", error, "error", this.$q);
      }
    },
    async createConversation(user_uuid) {
      try {
        const newConversationRef = await addDoc(
          collection(firebaseDb, firebaseCollectionEnum.chats),
          {
            lastUpdated: serverTimestamp(),
          }
        );
        const chatId = newConversationRef.id;
        const chatDocRef = doc(
          firebaseDb,
          firebaseCollectionEnum.chats,
          chatId
        );

        let main_user_uuid = this.main_user_uuid;

        let data = {
          lastUpdated: serverTimestamp(),
          dateCreated: serverTimestamp(),
          participants: [user_uuid, main_user_uuid],
          isTyping: {
            [`${user_uuid}`]: false,
            [`${main_user_uuid}`]: false,
          },
        };
        setDoc(chatDocRef, data)
          .then(() => {
            this.loadConversation(chatId);
          })
          .catch((error) => {
            APIinterface.notify("dark", error, "error", this.$q);
          });
      } catch (error) {
        APIinterface.notify("dark", error, "error", this.$q);
      }
    },
    loadConversation(docId) {
      this.$router.push({
        path: "/account/chat/conversation",
        query: { doc_id: docId },
      });
    },
  },
};
</script>
