<template>
  <q-dialog
    v-model="show_modal"
    persistent
    transition-show="fade"
    transition-hide="fade"
    full-width
  >
    <q-card style="width: 500px; max-width: 80vw">
      <q-form @submit="onSubmit">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">{{ title }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="text-h5">{{ $t("Billing Address") }}</div>

          <div class="">
            <q-input
              v-model="street1"
              :label="$t('Street')"
              outlined
              lazy-rules
              :bg-color="$q.dark.mode ? 'grey600' : 'input'"
              :label-color="$q.dark.mode ? 'grey300' : 'grey'"
              borderless
              class="input-borderless"
              :rules="[
                (val) =>
                  (val && val.length > 0) || this.$t('This field is required'),
              ]"
            />
            <q-input
              v-model="city"
              :label="$t('City')"
              outlined
              lazy-rules
              :bg-color="$q.dark.mode ? 'grey600' : 'input'"
              :label-color="$q.dark.mode ? 'grey300' : 'grey'"
              borderless
              class="input-borderless"
              :rules="[
                (val) =>
                  (val && val.length > 0) || this.$t('This field is required'),
              ]"
            />
            <q-input
              v-model="postal_code"
              :label="$t('Postal Code')"
              outlined
              lazy-rules
              :bg-color="$q.dark.mode ? 'grey600' : 'input'"
              :label-color="$q.dark.mode ? 'grey300' : 'grey'"
              borderless
              class="input-borderless"
              :rules="[
                (val) =>
                  (val && val.length > 0) || this.$t('This field is required'),
              ]"
            />

            <q-select
              v-model="country_code"
              :label="$t('Country')"
              outlined
              lazy-rules
              :bg-color="$q.dark.mode ? 'grey600' : 'input'"
              :label-color="$q.dark.mode ? 'grey300' : 'grey'"
              borderless
              class="input-borderless"
              :options="country_data"
              :loading="loading_country"
            />
          </div>
        </q-card-section>

        <q-separator spaced />
        <q-card-actions>
          <q-btn
            :label="label.submit"
            :loading="loading"
            unelevated
            no-caps
            color="primary text-white"
            class="full-width text-weight-bold"
            size="lg"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import APIinterface from "src/api/APIinterface";
import { useDataStorePersisted } from "stores/DataStorePersisted";

export default {
  name: "PaygreenComponents",
  props: ["title", "label", "payment_code", "payment_credentials"],
  data() {
    return {
      show_modal: false,
      data: [],
      loading: false,
      street1: "Wa street",
      city: "London",
      postal_code: "SW14 6ZG",
      country_code: "",
      country_data: [],
      loading_country: false,
    };
  },
  setup() {
    const DataStorePersisted = useDataStorePersisted();
    return { DataStorePersisted };
  },
  methods: {
    showPaymentForm() {
      this.show_modal = true;
      this.getLocationCountry();
    },
    close() {
      this.show_modal = false;
    },
    getLocationCountry() {
      this.loading_country = true;
      APIinterface.fetchDataByTokenPostPayment("paygreencountry")
        .then((data) => {
          this.country_code = data.details.default_data.shortcode;
          this.country_data = data.details.data;
        })
        .catch((error) => {})
        .then((data) => {
          this.loading_country = false;
        });
    },
    onSubmit() {
      let merchantId = 0;
      if (
        typeof this.payment_credentials[this.payment_code] !== "undefined" &&
        this.payment_credentials[this.payment_code] !== null
      ) {
        merchantId = this.payment_credentials[this.payment_code].merchant_id;
      }
      const $data = {
        merchant_id: merchantId,
        payment_code: this.payment_code,
        street1: this.street1,
        city: this.city,
        postal_code: this.postal_code,
        country_code: this.country_code,
      };
      this.loading = true;
      APIinterface.fetchDataByTokenPostPayment("paygreensavedpayment", $data)
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
        "paygreencreateorder",
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
