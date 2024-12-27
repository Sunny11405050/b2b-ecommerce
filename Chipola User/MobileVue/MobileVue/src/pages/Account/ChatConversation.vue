<template>
  <q-header
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
      <template v-if="loading_user">
        <q-circular-progress
          indeterminate
          rounded
          size="25px"
          color="primary"
        />
      </template>
      <template v-else>
        <q-avatar size="30px">
          <template v-if="getUserData[participant_user_uuid]">
            <img :src="getUserData[participant_user_uuid].photo_url" />
          </template>
        </q-avatar>
        <q-toolbar-title>
          <template v-if="getUserData[participant_user_uuid]">
            <div class="text-weight-bold">
              {{ getUserData[participant_user_uuid].first_name }}
              {{ getUserData[participant_user_uuid].last_name }}
            </div>
          </template>
          <div v-if="order_id" class="font11">
            {{ $t("Order#") }} {{ order_id }}
          </div>
        </q-toolbar-title>
      </template>
    </q-toolbar>
  </q-header>
  <q-page class="flex items-stretch content-end q-pa-md">
    <!-- {{ participant_user_uuid }} -->
    <!-- <pre>{{ getUserData }}</pre> -->
    <div style="width: 100%; max-width: 400px">
      <q-inner-loading
        :showing="loading"
        color="primary"
        :label="$t('Please wait')"
        label-class="text-dark"
        label-style="font-size: 1em"
      >
      </q-inner-loading>

      <template v-for="items in getChatmessage" :key="items">
        <q-chat-message
          :name="
            getUserData[items.senderID]
              ? items.senderID == user_uuid
                ? $t('You')
                : getUserData[items.senderID].first_name
              : ''
          "
          :avatar="
            getUserData[items.senderID]
              ? getUserData[items.senderID].photo_url
              : ''
          "
          :stamp="items.time"
          :text-color="items.senderID == user_uuid ? 'white' : 'dark'"
          :bg-color="items.senderID == user_uuid ? 'blue' : 'grey-2'"
          :sent="items.senderID == user_uuid ? true : false"
        >
          <template #avatar>
            <q-avatar class="q-ml-sm">
              <q-img
                :src="
                  getUserData[items.senderID]
                    ? getUserData[items.senderID].photo_url
                    : ''
                "
                spinner-size="sm"
                spinner-color="primary"
                style="height: 48px; max-width: 48px; min-width: 48px"
                fit="cover"
                loading="lazy"
              ></q-img>
            </q-avatar>
          </template>
          <div v-if="items.message">{{ items.message }}</div>
          <template v-if="items.fileUrl">
            <q-img
              :src="items.fileUrl"
              spinner-size="sm"
              spinner-color="primary"
              style="min-height: 150px; min-width: 150px; max-width: 150px"
            >
            </q-img>
          </template>
        </q-chat-message>
      </template>

      <template v-for="(items, userUUID) in getUserTyping" :key="items">
        <template v-if="items">
          <template v-if="userUUID != user_uuid">
            <q-chat-message
              :name="
                getUserData[userUUID]
                  ? userUUID == user_uuid
                    ? $t('You')
                    : getUserData[userUUID].first_name
                  : ''
              "
              :avatar="
                getUserData[userUUID] ? getUserData[userUUID].photo_url : ''
              "
              :stamp="items.time"
              :text-color="userUUID == user_uuid ? 'white' : 'dark'"
              bg-color="amber"
              :sent="userUUID == user_uuid ? true : false"
            >
              <q-spinner-dots size="2rem" />
            </q-chat-message>
          </template>
        </template>
      </template>
    </div>
    <div ref="scroll_ref" class="text-white q-pa-sm"></div>
  </q-page>
  <q-footer
    v-if="hasConversation"
    class="bg-white text-dark q-pl-sm q-pr-sm border-grey"
  >
    <q-uploader
      :url="chat_api_url"
      multiple
      ref="uploader"
      flat
      accept=".jpg, image/*"
      max-total-size="10485760"
      field-name="file"
      @added="afterAddedFiles"
      @removed="afterRemoveFiles"
      @rejected="onRejectedFiles"
      @uploading="onUploadingFiles"
      @uploaded="afterUploaded"
      @finish="afterFinishUpload"
    >
      <template v-slot:header>
        <q-uploader-add-trigger></q-uploader-add-trigger>
      </template>
      <template v-slot:list="scope">
        <div class="flex justify-start q-col-gutter-x-md">
          <template v-for="file in scope.files" :key="file.__key">
            <div class="relative-position">
              <img
                :src="file.__img.src"
                style="max-width: 60px; height: 60px"
                class="radius10"
              />
              <div
                class="absolute-right"
                style="margin-right: -10px; margin-top: -5px"
              >
                <q-btn
                  unelevated
                  round
                  color="blue"
                  icon="close"
                  size="xs"
                  @click="scope.removeFile(file)"
                ></q-btn>
              </div>
            </div>
          </template>
        </div>
      </template>
    </q-uploader>

    <q-input
      color="blue"
      v-model="message"
      :label="$t('Your message')"
      ref="message"
      autogrow
      borderless
    >
      <template v-slot:append>
        <div class="q-gutter-sm">
          <q-btn
            unelevated
            round
            :color="$q.dark.mode ? 'grey600' : 'mygrey'"
            :text-color="$q.dark.mode ? 'grey300' : 'grey'"
            @click="pickFiles"
            dense
          >
            <q-icon name="attach_file" class="rotate-45"></q-icon>
          </q-btn>

          <q-btn
            unelevated
            round
            :color="$q.dark.mode ? 'grey600' : 'mygrey'"
            :text-color="$q.dark.mode ? 'grey300' : 'grey'"
            dense
          >
            <q-icon name="emoji_emotions"></q-icon>
            <q-popup-proxy ref="proxy">
              <q-card>
                <EmojiPicker
                  :native="true"
                  @select="onSelectEmoji"
                  :disable-skin-tones="true"
                />
              </q-card>
            </q-popup-proxy>
          </q-btn>

          <q-btn
            @click="onSubmit"
            :disabled="!hasMessage"
            flat
            :color="$q.dark.mode ? 'grey600' : 'primary'"
            :text-color="$q.dark.mode ? 'grey300' : 'grey'"
            :label="$t('Send')"
            no-caps
            size="md"
          >
          </q-btn>
        </div>
      </template>
    </q-input>
  </q-footer>
</template>

<script>
import { scroll } from "quasar";
const { getScrollTarget, setVerticalScrollPosition } = scroll;
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";
import insertTextAtCursor from "insert-text-at-cursor";
import { firebaseDb, firebaseCollectionEnum } from "src/boot/FirebaseChat";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import auth from "src/api/auth";
import APIinterface from "src/api/APIinterface";
import { date } from "quasar";
import config from "src/api/config";

export default {
  name: "ChatConversation",
  components: {
    EmojiPicker,
  },
  data() {
    return {
      message: "",
      loading: false,
      conversation_id: "",
      data: [],
      user_typing_data: [],
      chating_with_user_uuid: "",
      user_uuid: "",
      user_data: [],
      participants: [],
      main_user_type: "",
      loading_user: true,
      is_typing: false,
      files: {},
      file_url: "",
      file_type: "",
      upload_loading: false,
      chat_api_url: config.api_base_url + "/chatapi/uploadimage",
      participant_user_uuid: "",
      order_id: "",
    };
  },
  mounted() {
    this.conversation_id = this.$route.query.doc_id;
    let user = auth.getUser();
    this.user_uuid = user.client_uuid;
    this.getMessages();
    this.getParticipant();
    this.getWhoIsTyping();
    this.getDocumentDetails();
  },
  computed: {
    getChatmessage() {
      return this.data;
    },
    hasMessageOld() {
      if (Object.keys(this.data).length > 0) {
        return true;
      }
      return false;
    },
    hasMessage() {
      if (!APIinterface.empty(this.message)) {
        return true;
      }
      if (Object.keys(this.files).length > 0) {
        return true;
      }
      return false;
    },
    hasChatDocID() {
      if (!empty(this.chating_with_user_uuid)) {
        return true;
      }
      return false;
    },
    hasUserData() {
      if (Object.keys(this.user_data).length > 0) {
        return true;
      }
      return false;
    },
    getUserData() {
      return this.user_data;
    },
    getUserTyping() {
      return this.user_typing_data;
    },
    hasConversation() {
      if (!APIinterface.empty(this.conversation_id)) {
        return true;
      }
      return false;
    },
  },
  watch: {
    is_typing(newval, oldval) {
      if (newval) {
        this.UpdateWhoistyping(true);
      } else {
        this.UpdateWhoistyping(false);
      }
    },
    message(newval, oldval) {
      if (!this.is_typing) {
        setTimeout(() => {
          this.is_typing = false;
        }, 1000); // 2.5 sec delay
      }
      this.is_typing = true;
    },
  },
  methods: {
    scrollTobottom() {
      try {
        setTimeout(() => {
          let el = this.$refs.scroll_ref;
          if (!APIinterface.empty(el)) {
            const target = getScrollTarget(el);
            const offset = el.offsetTop;
            const duration = 1;
            setVerticalScrollPosition(target, offset, duration);
          }
        }, 500);
      } catch (error) {
        console.log(error);
      }
    },
    onSelectEmoji(emoji) {
      insertTextAtCursor(document.querySelector("textarea"), emoji.i);
      this.$refs.proxy.hide();
    },
    getMessages() {
      this.loading = true;
      const chatDocRef = doc(
        firebaseDb,
        firebaseCollectionEnum.chats,
        this.conversation_id
      );
      const messagesQuery = query(
        collection(chatDocRef, "messages"),
        orderBy("timestamp", "asc"),
        limit(firebaseCollectionEnum.limit)
      );

      const SnapMessages = onSnapshot(
        messagesQuery,
        (querySnapshot) => {
          this.data = [];
          this.loading = false;
          querySnapshot.forEach((doc) => {
            if (doc.exists()) {
              const message = doc.data();
              let timestamp = message.timestamp.toDate().toISOString();
              this.data.push({
                fileType: message.fileType,
                fileUrl: message.fileUrl,
                message: message.message,
                senderID: message.senderID,
                //time: DateTime.fromISO(timestamp).toFormat("ccc hh:mm a"),
                timestamp: timestamp,
                time: date.formatDate(timestamp, "hh:mm a"),
              });
            } else {
              console.log("Conversation document does not exist");
            }
          });
          this.scrollTobottom();
        },
        (error) => {
          this.loading = false;
          console.error("Error fetching messages:", error);
        }
      );
    },
    getWhoIsTyping() {
      const chatDocRef = doc(
        firebaseDb,
        firebaseCollectionEnum.chats,
        this.conversation_id
      );
      const SnapWhoistyping = onSnapshot(
        chatDocRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            //console.log("getWhoIsTyping");
            let results = docSnapshot.data();
            this.user_typing_data = results.isTyping || [];
            Object.entries(this.user_typing_data).forEach(
              ([userIID, isTYping]) => {
                if (isTYping && userIID != this.user_uuid) {
                  this.scrollTobottom();
                }
              }
            );
          } else {
            this.user_typing_data = [];
          }
        },
        (error) => {
          console.error("Error fetching chat document:", error);
        }
      );
    },
    async getParticipant() {
      try {
        const docRef = doc(
          firebaseDb,
          firebaseCollectionEnum.chats,
          this.conversation_id
        );
        const dataSnapshot = await getDoc(docRef);
        if (dataSnapshot.exists()) {
          this.participants = dataSnapshot.data().participants;

          let resp_participants = this.participants.filter(
            (i) => !i.includes(this.user_uuid)
          );
          this.participant_user_uuid = resp_participants[0]
            ? resp_participants[0]
            : null;

          this.getUser();
        } else {
          console.log("Conversation document does not exist");
        }
      } catch (error) {
        console.error("Error getting participants:", error);
      }
    },
    getUser() {
      this.loading_user = true;
      APIinterface.fetchDataChats("getUsers", {
        main_user_type: this.main_user_type,
        users: this.participants,
      })
        .then((data) => {
          this.user_data = data.details;
        })
        .catch((error) => {
          this.user_data = [];
        })
        .then((data) => {
          this.loading_user = false;
        });
    },
    async UpdateWhoistyping(data) {
      try {
        const docRef = doc(
          firebaseDb,
          firebaseCollectionEnum.chats,
          this.conversation_id
        );
        await updateDoc(docRef, {
          [`isTyping.${this.user_uuid}`]: data,
        });
      } catch (error) {
        console.error("Error updating typing status:", error);
      }
    },
    onSubmit() {
      if (Object.keys(this.files).length > 0) {
        this.$refs.uploader.upload();
      } else {
        this.saveChatMessage();
      }
    },
    async saveChatMessage() {
      this.loading = true;
      const messagesRef = collection(
        firebaseDb,
        firebaseCollectionEnum.chats,
        this.conversation_id,
        "messages"
      );
      try {
        await addDoc(messagesRef, {
          message: this.message,
          senderID: this.user_uuid,
          timestamp: Timestamp.now(),
          fileUrl: this.file_url,
          fileType: this.file_type,
        });
        this.loading = false;
        this.documentLastUpdate(this.conversation_id);
        this.resetChat();
        this.notifyUser();
      } catch (error) {
        console.error("Error adding message to the conversation:", error);
        APIinterface.notify("dark", error, "error", this.$q);
      }
    },
    async documentLastUpdate(doc_id) {
      try {
        const chatRef = doc(firebaseDb, firebaseCollectionEnum.chats, doc_id);
        await updateDoc(chatRef, {
          lastUpdated: serverTimestamp(),
        });
      } catch (error) {
        APIinterface.notify("dark", error, "error", this.$q);
      }
    },
    resetChat() {
      this.message = "";
      this.file_url = "";
      this.file_type = "";
      this.files = {};
      this.$refs.uploader.reset();
    },
    pickFiles() {
      this.$refs.uploader.pickFiles();
    },
    onRejectedFiles(data) {
      APIinterface.notify(
        "dark",
        this.$t("Invalid file type"),
        "error",
        this.$q
      );
    },
    afterAddedFiles(data) {
      Object.entries(data).forEach(([key, items]) => {
        this.files[items.name] = {
          name: items.name,
        };
      });
    },
    afterRemoveFiles(data) {
      Object.entries(data).forEach(([key, items]) => {
        delete this.files[items.name];
      });
    },
    onUploadingFiles(data) {
      this.upload_loading = true;
    },
    afterUploaded(data) {
      if (data.xhr.status == 200) {
        let result = JSON.parse(data.xhr.response);
        let code = result.code || false;
        let details = result.details || [];
        let message = result.msg || "";
        if (code == 1) {
          this.file_url = details.file_url;
          this.file_type = details.file_type;
          this.saveChatMessage();
        } else {
          APIinterface.notify("dark", message, "error", this.$q);
          this.$refs.uploader.reset();
        }
      } else {
        APIinterface.notify(
          "dark",
          this.$t("IError uploading files"),
          "error",
          this.$q
        );
        this.$refs.uploader.reset();
      }
    },
    afterFinishUpload() {
      this.upload_loading = false;
    },
    notifyUser() {
      APIinterface.fetchDataChats("notifyUser", {
        from_user_uuid: this.user_uuid,
        user_uuid: this.participant_user_uuid,
      })
        .then((data) => {})
        .catch((error) => {})
        .then((data) => {});
    },
    async getDocumentDetails() {
      const docRef = doc(
        firebaseDb,
        firebaseCollectionEnum.chats,
        this.conversation_id
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.order_id = docSnap.data().orderID;
      } else {
        this.order_id = "";
      }
    },
    //
  },
};
</script>
<style lang="scss">
.q-uploader__list {
  min-height: auto !important;
}
</style>
