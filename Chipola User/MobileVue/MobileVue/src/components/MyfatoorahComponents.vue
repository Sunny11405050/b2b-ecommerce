<template>
  <q-dialog
    v-model="show_modal"
    persistent
    transition-show="fade"
    transition-hide="fade"
  >
    <q-card style="width: 500px; max-width: 80vw">
      <q-toolbar class="text-primary top-toolbar q-pl-md" dense>
        <q-space></q-space>
        <q-btn
          @click="show_modal = !true"
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

      <q-card-section class="q-pa-md">
        <h5 class="text-weight-bold no-margin">{{ title }}</h5>
        <div class="q-ma-sm">
          <p class="font12">{{ label.notes }}</p>
        </div>

        <q-list dense>
          <q-item tag="label" v-ripple v-for="items in getData" :key="items">
            <q-item-section avatar>
              <q-radio
                v-model="payment_id"
                :val="items.PaymentMethodId"
                @click="payment_name = items.PaymentMethodEn"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ items.PaymentMethodEn }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator spaced />
      <q-card-actions>
        <q-btn
          :label="label.submit"
          :loading="loading"
          @click="onSubmit()"
          unelevated
          no-caps
          color="primary text-white"
          class="full-width text-weight-bold"
          size="lg"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import APIinterface from "src/api/APIinterface";
import { useDataStorePersisted } from "stores/DataStorePersisted";

export default {
  name: "MyfatoorahComponents",
  props: ["title", "label", "payment_code", "payment_credentials"],
  data() {
    return {
      show_modal: false,
      data: [],
      loading: false,
      params: [],
      payment_id: "",
      payment_name: "",
      merchant_id: 0,
    };
  },
  setup() {
    const DataStorePersisted = useDataStorePersisted();
    return { DataStorePersisted };
  },
  computed: {
    getData() {
      return this.data;
    },
  },
  methods: {
    showPaymentForm() {
      this.show_modal = true;
      this.GetListPayment();
    },
    close() {
      this.show_modal = false;
    },
    GetListPayment() {
      this.merchant_id = 0;
      let MerchantType = 2;
      if (
        typeof this.payment_credentials[this.payment_code] !== "undefined" &&
        this.payment_credentials[this.payment_code] !== null
      ) {
        this.merchant_id =
          this.payment_credentials[this.payment_code].merchant_id;
        MerchantType =
          this.payment_credentials[this.payment_code].merchant_type;
      }
      this.params = {
        merchant_id: this.merchant_id,
        payment_code: this.payment_code,
        merchant_type: parseInt(MerchantType),
        currency_code: this.DataStorePersisted.getUseCurrency(),
      };

      this.loading = true;
      this.data = [];
      APIinterface.fetchDataByTokenPostPayment(
        "fatoorahpaymentlist",
        this.params
      )
        .then((data) => {
          this.data = data.details;
        })
        .catch((error) => {
          APIinterface.notify("dark", error, "error", this.$q);
        })
        .then((data) => {
          this.loading = false;
        });
    },
    onSubmit() {
      this.params = {
        payment_code: this.payment_code,
        merchant_id: this.merchant_id,
        payment_id: this.payment_id,
        payment_name: this.payment_name,
      };
      this.loading = true;
      APIinterface.fetchDataByTokenPostPayment(
        "fatoorahsavedpayment",
        this.params
      )
        .then((data) => {
          this.close();
          this.$emit("afterAddpayment");
        })
        .catch((error) => {
          APIinterface.notify("dark", error, "error", this.$q);
        })
        .then((data) => {
          this.loading = false;
        });
    },
    PaymentRender(data) {
      console.log(data);
      this.params = {
        cart_uuid: data.cart_uuid,
        order_uuid: data.order_uuid,
        payment_uuid: data.payment_uuid,
      };

      APIinterface.showLoadingBox(
        "Processing payment..<br/>don't close this window",
        this.$q
      );
      APIinterface.fetchDataByTokenPostPayment(
        "fatoorahcreatecheckout",
        this.params
      )
        .then((data) => {
          let redirect = data.details.redirect_url;
          if (this.$q.capacitor) {
            this.Webview(redirect);
          } else {
            window.open(redirect);
          }
        })
        .catch((error) => {
          APIinterface.notify("dark", error, "error", this.$q);
        })
        .then((data) => {
          APIinterface.hideLoadingBox(this.$q);
        });
    },
    Webview(url) {
      let inapp = cordova.InAppBrowser.open(url, "_blank", "location=no");

      inapp.addEventListener("loadstart", () => {
        console.log("loadstart");
      });

      inapp.addEventListener("loadstop", (event) => {
        console.log("loadstop");
        let even_url = event.url;
        console.log("=>" + even_url);
        let res = even_url.match(/success/gi);
        if (!APIinterface.empty(res)) {
          console.log("succesful");
          inapp.close();
          this.$emit("afterPayment", this.params);
        }

        let error = even_url.match(/failed/gi);
        if (!APIinterface.empty(error)) {
          inapp.executeScript(
            {
              code: "document.documentElement.innerText",
            },
            (html) => {
              inapp.close();
              APIinterface.notify("dark", html, "error", this.$q);
            }
          );
        }

        let cancel = even_url.match(/cancel/gi);
        if (!APIinterface.empty(cancel)) {
          inapp.close();
        }
      });
    },
  },
};
</script>
