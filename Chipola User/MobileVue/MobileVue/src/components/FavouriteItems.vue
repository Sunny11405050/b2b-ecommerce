<template>
  <div v-if="loading">
    <div class="fit q-pa-xl">
      <q-inner-loading
        :showing="true"
        color="primary"
        size="md"
        label-class="dark"
      />
    </div>
  </div>

  <template v-else-if="!loading && !hasData">
    <div class="flex flex-center q-pt-xl q-pb-xl">
      <q-img
        src="cuttery.png"
        fit="fill"
        spinner-color="primary"
        style="height: 160px; max-width: 150px"
      />
      <div class="text-h5 text-weight-bold line-normal">
        {{ $t("You don't have any save items here!") }}
      </div>
      <p class="text-grey font12">{{ $t("Let's change that!") }}</p>
    </div>
  </template>

  <template v-else>
    <div class="row items-start q-col-gutter-x-sm q-mb-sm">
      <template v-for="items in data" :key="items.item_id">
        <div v-if="data_items[items.item_id]" class="col-6">
          <div class="relative-position">
            <q-img
              :src="data_items[items.item_id].url_image"
              style="max-width: 100%; height: 100px"
              spinner-color="primary"
              spinner-size="sm"
              placeholder-src="placeholder.png"
              class="radius10"
            ></q-img>
            <div class="absolute-bottom-right q-pa-sm">
              <q-btn
                round
                color="dark"
                icon="add"
                unelevated
                size="sm"
                @click="
                  onClickitem({
                    slug: items.restaurant_slug,
                    cat_id: items.cat_id,
                    item_uuid: data_items[items.item_id].item_uuid,
                  })
                "
              />
            </div>
          </div>

          <div class="q-pt-sm q-pb-md">
            <div class="row items-center">
              <div class="col text-subtitle2 line-normal ellipsis">
                {{ data_items[items.item_id].item_name }}
              </div>
              <div class="col-3 text-right">
                <FavsItem
                  ref="favs"
                  :data="items"
                  :layout="3"
                  :item_token="data_items[items.item_id].item_uuid"
                  :cat_id="items.cat_id"
                  :active="items.save_item"
                  @after-savefav="afterSavefav"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </template>

  <ItemDetails
    ref="refItem"
    :slug="slug"
    :money_config="money_config"
    :currency_code="DataStorePersisted.use_currency_code"
    @after-additems="afterAdditems"
  />

  <ItemDetailsCheckbox
    ref="refItem2"
    :slug="slug"
    :money_config="money_config"
    :currency_code="DataStorePersisted.use_currency_code"
    @after-additems="afterAdditems"
  />
</template>

<script>
import { defineAsyncComponent } from "vue";
import APIinterface from "src/api/APIinterface";
import { useDataStore } from "stores/DataStore";
import { useMenuStore } from "src/stores/MenuStore";
import { useDataStorePersisted } from "stores/DataStorePersisted";

export default {
  name: "FavouriteItems",
  props: ["is_done"],
  components: {
    FavsItem: defineAsyncComponent(() => import("components/FavsItem.vue")),
    ItemDetails: defineAsyncComponent(() =>
      import("components/ItemDetails.vue")
    ),
    ItemDetailsCheckbox: defineAsyncComponent(() =>
      import("components/ItemDetailsCheckbox.vue")
    ),
  },
  data() {
    return {
      data: [],
      data_items: [],
      loading: true,
      slug: "",
      money_config: [],
    };
  },
  setup(props) {
    const MenuStore = useMenuStore();
    const DataStore = useDataStore();
    const DataStorePersisted = useDataStorePersisted();
    return { MenuStore, DataStore, DataStorePersisted };
  },
  mounted() {
    this.getSaveItems();
  },
  computed: {
    hasData() {
      if (this.data.length > 0) {
        return true;
      }
      return false;
    },
  },
  watch: {
    is_done(newval, oldval) {
      this.getSaveItems();
    },
  },
  methods: {
    getSaveItems() {
      if (APIinterface.empty(this.is_done)) {
        this.loading = true;
      }
      APIinterface.fetchDataByTokenPost(
        "getSaveItems",
        "currency_code=" + this.DataStorePersisted.use_currency_code
      )
        .then((data) => {
          this.data = data.details.data;
          this.data_items = data.details.items;
          this.money_config = data.details.money_config;
        })
        .catch((error) => {
          this.data = [];
          this.data_items = [];
        })
        .then((data) => {
          this.loading = false;
          if (!APIinterface.empty(this.is_done)) {
            this.is_done();
          }
        });
    },
    afterSavefav(data, found) {
      data.save_item = found;
    },
    onClickitem(data) {
      this.slug = data.slug;
      if (this.DataStore.addons_use_checkbox) {
        this.$refs.refItem2.showItem2(data, data.slug);
      } else {
        this.$refs.refItem.showItem2(data, data.slug);
      }
    },
    afterAdditems() {
      this.$emit("afterAdditems");
    },
  },
};
</script>
