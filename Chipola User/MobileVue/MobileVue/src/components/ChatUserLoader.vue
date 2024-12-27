<template>
  <q-list>
    <q-item v-for="items in rows" :key="items">
      <q-item-section avatar>
        <q-skeleton type="QAvatar" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" />
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: "ChatUserLoader",
  props: ["rows"],
  setup() {
    return {};
  },
};
</script>
