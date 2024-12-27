<template>
  <div class="relative-position">
    <q-list>
      <q-item tag="label">
        <q-item-section avatar top>
          <q-icon color="secondary" name="o_account_balance_wallet" />
        </q-item-section>
        <q-item-section>
          <q-item-label> {{ getData.balance }} </q-item-label>
          <q-item-label lines="2" caption class="font11">
            {{ $t("Digital Wallet Balance") }}
          </q-item-label>
          <q-item-label caption v-if="message">
            <div class="q-pa-sm bg-grey-2 radius10 text-dark">
              {{ message }}
            </div>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-checkbox
            v-model="use_wallet"
            val="1"
            :disable="!canUseWallet"
            @update:model-value="applyDigitalWallet"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <q-inner-loading :showing="loading" color="primary" size="md" />
  </div>
</template>

<script>
import APIinterface from "src/api/APIinterface";
import { useDataStorePersisted } from "stores/DataStorePersisted";
import { useCartStore } from "stores/CartStore";

export default {
  name: "WalletComponents",
  props: ["cart_updated"],
  data() {
    return {
      use_wallet: false,
      data: [],
      loading: false,
      message: "",
    };
  },
  setup() {
    const DataStorePersisted = useDataStorePersisted();
    const CartStore = useCartStore();
    return { DataStorePersisted, CartStore };
  },
  mounted() {
    this.getCartWallet();
  },
  computed: {
    canUseWallet() {
      if (Object.keys(this.data).length > 0) {
        if (this.data.balance_raw > 0) {
          return true;
        }
      }
      return false;
    },
    getData() {
      return this.data;
    },
  },
  watch: {
    cart_updated(newval, oldval) {
      if (newval == false && this.use_wallet) {
        this.applyDigitalWallet(true);
      }
    },
  },
  methods: {
    getCartWallet() {
      this.loading = true;
      APIinterface.fetchDataByTokenPost(
        "getCartWallet",
        "cart_uuid=" +
          APIinterface.getStorage("cart_uuid") +
          "&currency_code=" +
          this.DataStorePersisted.getUseCurrency()
      )
        .then((data) => {
          this.data = data.details;
          this.use_wallet = data.details.use_wallet;
          if (this.use_wallet) {
            this.applyDigitalWallet(this.use_wallet);
          }
        })
        .catch((error) => {
          this.data = [];
          this.use_wallet = false;
        })
        .then((data) => {
          this.loading = false;
        });
    },
    applyDigitalWallet(data) {
      this.loading = true;
      let use_wallet = data ? 1 : 0;
      APIinterface.fetchDataByTokenPost(
        "applyDigitalWallet",
        "cart_uuid=" +
          APIinterface.getStorage("cart_uuid") +
          "&currency_code=" +
          this.DataStorePersisted.getUseCurrency() +
          "&use_wallet=" +
          use_wallet +
          "&amount_to_pay=" +
          this.CartStore.cart_total.raw
      )
        .then((data) => {
          if (use_wallet) {
            this.message = data.msg;
          } else {
            this.message = "";
          }
          this.$emit("afterApplywallet", data.details);
        })
        .catch((error) => {
          this.use_wallet = false;
          this.message = "";
          APIinterface.notify("dark", error, "error", this.$q);
        })
        .then((data) => {
          this.loading = false;
        });
    },
  },
};
</script>
