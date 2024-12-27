<template>
  <q-list>
    <q-item-label v-if="headerTitle" header>{{ headerTitle }}</q-item-label>
    <template v-for="items in data" :key="items">
      <q-item clickable @click="$emit('onChatuser', items.client_uuid)">
        <q-item-section avatar>
          <q-avatar>
            <img :src="items.photo_url" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-bold">
            {{ items.first_name }}
          </q-item-label>
          <q-item-label caption>
            {{ items.user_type }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator inset="item" />
    </template>
  </q-list>
</template>

<script>
export default {
  name: "ChatUserList",
  props: ["data", "headerTitle"],
  setup() {
    return {};
  },
};
</script>
