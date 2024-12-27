<template>
  <template v-if="layout == 2">
    <q-btn
      @click="this.$q.capacitor ? share() : webShare()"
      round
      color="transparent"
      text-color="primary"
      size="md"
      icon="share"
      unelevated
    />
  </template>
  <template v-else>
    <q-btn
      round
      @click="this.$q.capacitor ? share() : webShare()"
      unelevated
      :color="$q.dark.mode ? 'grey600' : 'mygrey'"
      :text-color="$q.dark.mode ? 'grey300' : 'dark'"
      icon="las la-share-square"
      dense
      size="sm"
      class="q-ml-sm"
    />
  </template>
</template>

<script>
import { Share } from "@capacitor/share";

export default {
  name: "ShareComponents",
  props: ["title", "text", "url", "dialogTitle", "layout"],
  methods: {
    share() {
      console.log("Share");
      Share.share({
        title: this.title,
        text: this.text,
        url: this.url,
        dialogTitle: this.dialogTitle,
      })
        .then((data) => {
          //
        })
        .catch((error) => {
          //APIinterface.notify("dark", error, "error", this.$q);
        });
    },
    webShare() {
      console.log("webShare");
      if (navigator.share) {
        navigator
          .share({
            title: this.title,
            text: this.text,
            url: this.url,
          })
          .then(() => console.log("Successful share"))
          .catch((error) => console.log("Error sharing", error));
      } else {
        console.log("web share not available");
      }
    },
  },
};
</script>
