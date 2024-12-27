<template>
  <template v-if="loading">
    <q-skeleton height="120px" square />
  </template>
  <template v-else>
    <swiper :slides-per-view="1.1" :space-between="10">
      <template v-for="items in data" :key="items">
        <swiper-slide>
          <div
            class="fit border-grey rounded-borders bg-bluex text-white"
            :class="{
              'bg-grey600 text-grey300': $q.dark.mode,
              'bg-blue text-white': !$q.dark.mode,
            }"
          >
            <div class="q-pa-sm">
              <div class="text-subtitle1 text-weight-bold">
                {{ items.title }}
              </div>
              <div class="text-body2">
                {{ items.discount_details }}
              </div>
              <div class="text-caption text-weight-medium">
                {{ items.valid_discount }}
              </div>
            </div>
          </div>
        </swiper-slide>
      </template>
    </swiper>
  </template>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import APIinterface from "src/api/APIinterface";

export default {
  name: "WalletBunos",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      loading: false,
      data: [],
    };
  },
  mounted() {
    this.getDiscount();
  },
  methods: {
    getDiscount() {
      this.loading = true;
      APIinterface.fetchDataByTokenPost(
        "getDiscount",
        "transaction_type=digital_wallet"
      )
        .then((data) => {
          this.data = data.details;
        })
        .catch((error) => {})
        .then((data) => {
          this.loading = false;
        });
    },
  },
};
</script>
