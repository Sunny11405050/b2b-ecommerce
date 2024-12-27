<template>
  <template v-if="MenuStore.loading_similar_items">
    <q-skeleton type="text" style="width: 80px" />
    <div class="row q-gutter-sm">
      <div class="col-9">
        <q-skeleton height="60px" square class="radius8" />
      </div>
      <div class="col-2">
        <q-skeleton height="60px" square class="radius8" />
      </div>
    </div>
  </template>
  <template v-else>
    <div class="text-h6 text-weight-boldx q-mb-xs">{{ title }}</div>
    <swiper :slides-per-view="2.5" :space-between="10">
      <template
        v-for="items in MenuStore.data_similar_items[merchant_id]"
        :key="items"
      >
        <swiper-slide>
          <div class="font12 cursor-pointer" @click="onClickitem(items)">
            <div class="relative-position">
              <q-img
                :src="items.url_image"
                style="max-width: 100%; height: 100px"
                spinner-color="primary"
                spinner-size="sm"
                placeholder-src="placeholder.png"
                class="radius10"
              ></q-img>
              <div class="absolute-bottom-right q-pa-sm">
                <q-btn round color="dark" icon="add" unelevated size="sm" />
              </div>
            </div>

            <div class="q-pt-sm">
              <div class="text-weight-bold text-h5" v-if="items.price">
                <template v-if="items.price[0]">
                  <template v-if="items.price[0].discount > 0">
                    {{ items.price[0].pretty_price_after_discount }}
                  </template>
                  <template v-else>
                    {{ items.price[0].pretty_price }}
                  </template>
                </template>
              </div>
              <div class="line-normal text-body2">
                {{ items.item_name }}
              </div>
            </div>
          </div>
        </swiper-slide>
      </template>
    </swiper>
  </template>

  <ItemDetails
    ref="refItem"
    :slug="CartStore.cart_merchant.slug"
    :money_config="MenuStore.money_config"
    @after-additems="afterAdditems"
  />

  <ItemDetailsCheckbox
    ref="refItem2"
    :slug="CartStore.cart_merchant.slug"
    :money_config="MenuStore.money_config"
    @after-additems="afterAdditems"
  />

  <div class="q-pa-sm"></div>
</template>

<script>
import { defineAsyncComponent, ref, onMounted } from "vue";
import APIinterface from "src/api/APIinterface";
import { useCartStore } from "src/stores/CartStore";
import { useMenuStore } from "src/stores/MenuStore";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { useDataStore } from "stores/DataStore";

export default {
  name: "SimilarItems",
  props: ["title", "bg", "merchant_id"],
  components: {
    Swiper,
    SwiperSlide,
    ItemDetails: defineAsyncComponent(() =>
      import("components/ItemDetails.vue")
    ),
    ItemDetailsCheckbox: defineAsyncComponent(() =>
      import("components/ItemDetailsCheckbox.vue")
    ),
  },
  setup(props) {
    const slide = ref(0);
    const loading = ref(false);
    const data = ref([]);
    const rows = ref(2);
    const moneyConfig = ref([]);
    const refItem = ref(null);
    const refItem2 = ref(null);
    const payload = ref([
      "items",
      "subtotal",
      "distance_local",
      "items_count",
      "merchant_info",
      "check_opening",
      "transaction_info",
    ]);

    const CartStore = useCartStore();
    const MenuStore = useMenuStore();
    const DataStore = useDataStore();

    onMounted(() => {
      if (Object.keys(MenuStore.data_similar_items).length <= 0) {
        MenuStore.getSimilarItems(props.merchant_id);
      } else {
        if (!MenuStore.data_similar_items[props.merchant_id]) {
          MenuStore.getSimilarItems(props.merchant_id);
        }
      }
    });

    const getSimilarItems = () => {
      loading.value = true;
      APIinterface.SimilarItems(
        APIinterface.getStorage("cart_uuid"),
        rows.value
      )
        .then((results) => {
          data.value = results.details;
        })
        .catch((error) => {
          console.debug(error);
        })
        .then((data) => {
          loading.value = false;
        });
    };

    const onClickitem = (data) => {
      const $params = {
        cat_id: data.cat_id,
        item_uuid: data.item_uuid,
      };
      if (DataStore.addons_use_checkbox) {
        refItem2.value.showItem2($params, CartStore.cart_merchant.slug);
      } else {
        refItem.value.showItem2($params, CartStore.cart_merchant.slug);
      }
    };

    const afterAdditems = (data) => {
      CartStore.getCart(false, payload.value);
    };

    const getMoneyConfig = () => {
      APIinterface.getMoneyConfig()
        .then((data) => {
          moneyConfig.value = data.details;
        })
        // eslint-disable-next-line
        .catch((error) => {})
        .then((data) => {});
    };

    return {
      slide,
      loading,
      data,
      getSimilarItems,
      onClickitem,
      getMoneyConfig,
      moneyConfig,
      CartStore,
      afterAdditems,
      refItem,
      refItem2,
      MenuStore,
    };
  },
};
</script>
