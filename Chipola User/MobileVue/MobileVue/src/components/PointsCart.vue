<template>
  <template v-if="getData">
    <div class="relative-position">
      <div
        class="q-pl-md q-pr-md q-mt-sm ellipsis font13 text-weight-bold q-pt-xs border-grey-top"
      >
        <div class="font13">{{ $t("Points discount") }}</div>
      </div>

      <q-inner-loading :showing="loading" color="primary" size="md" />
      <q-list>
        <q-item clickable @click.stop="showDialog">
          <q-item-section avatar>
            <q-avatar color="secondary" size="md" text-color="white">
              <q-icon name="card_giftcard" size="21px"></q-icon>
            </q-avatar>
          </q-item-section>

          <q-item-section v-if="use_thresholds">
            <q-item-label>
              {{ $t("Add Points") }}
            </q-item-label>
          </q-item-section>

          <q-item-section v-else>
            <q-item-label>
              <template v-if="data.discount > 0">
                {{ data.discount_label }}
              </template>
              <template v-else>
                {{ data.redeem_discount }}
              </template>
            </q-item-label>
            <q-item-label caption lines="2" v-if="data.discount <= 0">
              {{ data.redeem_label }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              v-if="data.discount > 0"
              @click.stop="removePoints"
              flat
              :color="$q.dark.mode ? 'secondary' : 'blue'"
              no-caps
              :label="$t('Remove')"
              dense
              size="md"
              :loading="loading_remove"
            />
            <q-icon v-else name="navigate_next" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </template>

  <q-dialog v-model="dialog" position="bottom">
    <q-card>
      <q-toolbar class="text-primary top-toolbar q-pl-md" dense>
        <q-toolbar-title
          class="text-weight-bold"
          :class="{
            'text-white': $q.dark.mode,
            'text-dark': !$q.dark.mode,
          }"
        >
          {{ $t("Apply discount") }}
        </q-toolbar-title>
        <q-space></q-space>
        <q-btn
          @click="dialog = !true"
          color="white"
          square
          unelevated
          text-color="grey"
          icon="las la-times"
          dense
          no-caps
          size="sm"
          class="border-grey radius8"
        />
      </q-toolbar>
      <q-card-section>
        <q-form @submit="applyPoints" class="q-gutter-sm">
          <div>
            <template v-if="use_thresholds">
              <template v-if="loading_points">
                <div class="text-center q-pa-sm">
                  <q-spinner color="primary" size="2em" />
                </div>
              </template>
              <template v-else>
                <q-tabs
                  v-model="points_tab"
                  class="text-dark q-mb-lg"
                  no-caps
                  active-color="white"
                  active-bg-color="blue"
                  indicator-color="blue"
                  @update:model-value="setPoints"
                >
                  <template v-for="items in data_points" :key="items">
                    <q-tab
                      :name="items"
                      :disable="balance > items.points ? false : true"
                    >
                      <div class="text-caption">{{ items.label }}</div>
                      <div class="text-subtitle2 q-mb-sm">
                        {{ items.amount }}
                      </div>
                      <q-linear-progress
                        size="18px"
                        :value="balance / items.points"
                        style="min-width: 70px"
                        class="radius28"
                        :color="balance >= items.points ? 'green' : 'blue'"
                      >
                        <div
                          v-if="balance >= items.points"
                          class="absolute-full flex flex-center"
                        >
                          <span class="text-white font12 text-weight-bold">{{
                            $t("REDEEM")
                          }}</span>
                        </div>
                      </q-linear-progress>
                    </q-tab>
                  </template>
                </q-tabs>
              </template>
            </template>
            <template v-else>
              <q-input
                v-model="points"
                :label="$t('Enter points to convert to discount')"
                outlined
                lazy-rules
                :bg-color="$q.dark.mode ? 'grey600' : 'input'"
                :label-color="$q.dark.mode ? 'grey300' : 'grey'"
                borderless
                class="input-borderless"
              />
            </template>
          </div>
          <div>
            <q-btn
              :loading="loading_apply"
              :disable="points > 0 ? false : true"
              type="submit"
              unelevated
              color="primary"
              text-color="white"
              no-caps
              class="full-width"
              :label="$t('Apply')"
              size="lg"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import APIinterface from "src/api/APIinterface";

export default {
  props: ["currency_code", "use_thresholds"],
  name: "PointsCart",
  data() {
    return {
      loading: false,
      loading_apply: false,
      loading_remove: false,
      data: [],
      dialog: false,
      points: 0,
      loading_points: false,
      points_tab: 0,
      data_points: [],
      balance: 0,
      points_id: 0,
    };
  },
  mounted() {
    this.getCartpoints();
  },
  computed: {
    getData() {
      if (Object.keys(this.data).length > 0) {
        return this.data;
      }
      return false;
    },
  },
  methods: {
    showDialog() {
      if (this.use_thresholds) {
        this.getPointsthresholds();
      }
      this.dialog = !this.dialog;
    },
    getCartpoints() {
      this.loading = true;
      APIinterface.fetchDataByTokenPost(
        "getCartpoints",
        "cart_uuid=" +
          APIinterface.getStorage("cart_uuid") +
          "&currency_code=" +
          this.currency_code
      )
        .then((data) => {
          this.data = data.details;
        })
        .catch((error) => {
          this.data = [];
        })
        .then((data) => {
          this.loading = false;
        });
    },
    applyPoints() {
      this.loading_apply = true;
      APIinterface.fetchDataByTokenPost(
        "applyPoints",
        "cart_uuid=" +
          APIinterface.getStorage("cart_uuid") +
          "&currency_code=" +
          this.currency_code +
          "&points=" +
          this.points +
          "&points_id=" +
          this.points_id
      )
        .then((data) => {
          this.dialog = false;
          this.$emit("afterApplypoints");
          this.getCartpoints();
        })
        .catch((error) => {
          APIinterface.notify("dark", error, "error", this.$q);
        })
        .then((data) => {
          this.loading_apply = false;
        });
    },
    removePoints() {
      this.loading_remove = true;
      APIinterface.fetchDataByTokenPost(
        "removePoints",
        "cart_uuid=" + APIinterface.getStorage("cart_uuid")
      )
        .then((data) => {
          this.$emit("afterApplypoints");
          this.getCartpoints();
        })
        .catch((error) => {
          APIinterface.notify("dark", error, "error", this.$q);
        })
        .then((data) => {
          this.loading_remove = false;
        });
    },
    getPointsthresholds() {
      this.loading_points = true;
      APIinterface.fetchDataByTokenPost(
        "getPointsthresholds",
        "cart_uuid=" +
          APIinterface.getStorage("cart_uuid") +
          "&currency_code=" +
          this.currency_code
      )
        .then((data) => {
          this.data_points = data.details.data;
          this.balance = data.details.balance;
        })
        .catch((error) => {
          APIinterface.notify("dark", error, "error", this.$q);
        })
        .then((data) => {
          this.loading_points = false;
        });
    },
    setPoints() {
      this.points = this.points_tab.points;
      this.points_id = this.points_tab.id;
    },
  },
};
</script>
