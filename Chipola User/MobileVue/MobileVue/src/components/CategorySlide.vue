<template>
  <template v-if="MenuStore.loading_menu">
    <swiper :slides-per-view="2.2" :space-between="10">
      <template v-for="x in 5" :key="x">
        <swiper-slide>
          <q-skeleton height="40px" />
        </swiper-slide>
      </template>
    </swiper>
  </template>

  <template v-else>
    <swiper
      v-if="MenuStore.data_category[slug]"
      :slides-per-view="2.5"
      :space-between="10"
    >
      <template v-for="items in MenuStore.data_category[slug]" :key="items">
        <swiper-slide>
          <q-btn
            flat
            :label="items.category_name"
            no-caps
            class="line-1"
            color="grey"
            @click="this.$emit('afterCategoryselect', items.category_uiid)"
          ></q-btn>
        </swiper-slide>
      </template>
    </swiper>
  </template>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { useMenuStore } from "stores/MenuStore";

export default {
  name: "CategorySlide",
  props: ["slug"],
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const MenuStore = useMenuStore();
    return { MenuStore };
  },
};
</script>
