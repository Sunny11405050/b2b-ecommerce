<template>
  <template v-if="PaymentStore.loading">
    <div class="text-center">
      <q-spinner color="primary" size="sm" />
    </div>
  </template>
  <template v-else>
    <template v-if="hasSavedPayment && !isWalletFullPayment">
      <q-list>
        <template v-for="items in getPayment" :key="items">
          <q-item tag="label">
            <q-item-section v-if="items.logo_type == 'image'" avatar>
              <q-img
                :src="items.logo_image"
                fit="contain"
                style="height: 30px; width: 40px"
              />
            </q-item-section>
            <q-item-section v-else avatar>
              <q-icon color="secondary" name="las la-credit-card" />
            </q-item-section>
            <q-item-section>
              <q-item-label lines="2">
                {{ items.payment_name }}
                <template v-if="items.card_fee_percent && items.card_fee_fixed">
                  ({{ items.card_fee_percent }}% + {{ items.card_fee_fixed }})
                </template>
                <template v-else-if="items.card_fee_percent">
                  ({{ items.card_fee_percent }}% )
                </template>
                <template v-else-if="items.card_fee_fixed">
                  ({{ items.card_fee_fixed }})
                </template>
              </q-item-label>
              <q-item-label lines="2" caption class="font11">
                {{ items.attr2 }}
              </q-item-label>
              <q-item-label v-if="usePartialPayment" caption>
                {{ getPayRemaining }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-radio
                v-model="payment_uuid"
                :val="items.payment_uuid"
                color="secondary"
                @click="setPayment(items)"
              />
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </template>

    <template v-if="!PaymentStore.data[merchant_id] && !PaymentStore.loading">
      <div
        v-if="!isWalletFullPayment"
        class="q-pa-sm bg-red-2 text-dark q-ml-md q-mr-md radius10"
      >
        {{ $t("You don't have payment saved yet") }}.
      </div>
    </template>
  </template>
</template>

<script>
import { usePaymentStore } from "stores/PaymentStore";
import APIinterface from "src/api/APIinterface";

export default {
  name: "PaymentListSaved",
  props: ["merchant_id", "wallet_data"],
  data() {
    return {
      payment_uuid: "",
      loading: false,
      data: [],
      credentials: [],
      inner_loading: false,
    };
  },
  setup(props, { emit }) {
    const PaymentStore = usePaymentStore();
    return { PaymentStore };
  },
  created() {
    this.PaymentStore.SavedPaymentList(this.merchant_id);
  },
  watch: {
    payment_uuid(newval, oldval) {
      this.$emit("setPaymentuuid", newval);
    },
    PaymentStore: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (
          !APIinterface.empty(this.PaymentStore.payment_uuid[this.merchant_id])
        ) {
          this.payment_uuid = this.PaymentStore.payment_uuid[this.merchant_id];
        }
      },
    },
  },
  computed: {
    hasSavedPayment() {
      if (this.PaymentStore.data[this.merchant_id]) {
        if (Object.keys(this.PaymentStore.data[this.merchant_id]).length > 0) {
          return true;
        }
      }
      return false;
    },
    getPayment() {
      if (this.PaymentStore.data[this.merchant_id]) {
        if (Object.keys(this.PaymentStore.data[this.merchant_id]).length > 0) {
          return this.PaymentStore.data[this.merchant_id];
        }
      }
      return false;
    },
    isWalletFullPayment() {
      if (Object.keys(this.wallet_data).length > 0) {
        if (
          this.wallet_data.use_wallet &&
          this.wallet_data.amount_due_raw <= 0
        ) {
          return true;
        }
      }
      return false;
    },
    usePartialPayment() {
      if (Object.keys(this.wallet_data).length > 0) {
        if (
          this.wallet_data.use_wallet &&
          this.wallet_data.amount_due_raw > 0
        ) {
          return true;
        }
      }
      return false;
    },
    getPayRemaining() {
      if (Object.keys(this.wallet_data).length > 0) {
        if (this.wallet_data.use_wallet) {
          return this.wallet_data.pay_remaining;
        }
      }
      return false;
    },
  },
  methods: {
    setPayment(data) {
      this.$emit("setPayment", data);
    },
  },
};
</script>
