<template>
  <q-dialog
    v-model="show_modal"
    persistent
    transition-show="fade"
    transition-hide="fade"
  >
    <q-card style="width: 500px; max-width: 90vw">
      <q-toolbar class="text-dark top-toolbar q-pl-md" dense>
        <q-toolbar-title>{{ title }}</q-toolbar-title>
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
      <q-card-section>
        <q-form @submit="submitForm">
          <q-input
            v-model="billing_name"
            :label="$t('Name')"
            outlined
            lazy-rules
            :bg-color="$q.dark.mode ? 'grey600' : 'input'"
            :label-color="$q.dark.mode ? 'grey300' : 'grey'"
            :rules="[
              (val) =>
                (val && val.length > 0) || this.$t('This field is required'),
            ]"
          />
          <q-input
            v-model="billing_address"
            :label="$t('Address')"
            outlined
            lazy-rules
            :bg-color="$q.dark.mode ? 'grey600' : 'input'"
            :label-color="$q.dark.mode ? 'grey300' : 'grey'"
            :rules="[
              (val) =>
                (val && val.length > 0) || this.$t('This field is required'),
            ]"
          />
          <q-input
            v-model="billing_city"
            :label="$t('City')"
            outlined
            lazy-rules
            :bg-color="$q.dark.mode ? 'grey600' : 'input'"
            :label-color="$q.dark.mode ? 'grey300' : 'grey'"
            :rules="[
              (val) =>
                (val && val.length > 0) || this.$t('This field is required'),
            ]"
          />
          <q-input
            v-model="billing_state"
            :label="$t('State')"
            outlined
            lazy-rules
            :bg-color="$q.dark.mode ? 'grey600' : 'input'"
            :label-color="$q.dark.mode ? 'grey300' : 'grey'"
            :rules="[
              (val) =>
                (val && val.length > 0) || this.$t('This field is required'),
            ]"
          />
          <q-input
            v-model="billing_zip"
            :label="$t('Zip')"
            outlined
            lazy-rules
            :bg-color="$q.dark.mode ? 'grey600' : 'input'"
            :label-color="$q.dark.mode ? 'grey300' : 'grey'"
            :rules="[
              (val) =>
                (val && val.length > 0) || this.$t('This field is required'),
            ]"
          />
          <q-input
            v-model="billing_country"
            :label="$t('Country')"
            outlined
            lazy-rules
            :bg-color="$q.dark.mode ? 'grey600' : 'input'"
            :label-color="$q.dark.mode ? 'grey300' : 'grey'"
            :rules="[
              (val) =>
                (val && val.length > 0) || this.$t('This field is required'),
            ]"
          />
          <q-input
            v-model="billing_tel"
            :label="$t('Telephone')"
            outlined
            lazy-rules
            :bg-color="$q.dark.mode ? 'grey600' : 'input'"
            :label-color="$q.dark.mode ? 'grey300' : 'grey'"
            :rules="[
              (val) =>
                (val && val.length > 0) || this.$t('This field is required'),
            ]"
          />
          <q-input
            v-model="billing_email"
            :label="$t('Email address')"
            outlined
            lazy-rules
            :bg-color="$q.dark.mode ? 'grey600' : 'input'"
            :label-color="$q.dark.mode ? 'grey300' : 'grey'"
            :rules="[
              (val) =>
                (val && val.length > 0) || this.$t('This field is required'),
            ]"
          />

          <q-btn
            type="submit"
            :label="label.submit"
            unelevated
            no-caps
            color="primary text-white"
            class="full-width text-weight-bold"
            size="lg"
            :loading="loading"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import APIinterface from "src/api/APIinterface";

export default {
  name: "KotakComponents",
  props: ["title", "label", "payment_code", "payment_credentials"],
  data() {
    return {
      params: [],
      show_modal: false,
      loading: false,
      billing_name: "Charli",
      billing_address: "Room no 1101, near Railway station Ambad",
      billing_city: "Indore",
      billing_state: "MP",
      billing_zip: "425001",
      billing_country: "India",
      billing_tel: "9876543210",
      billing_email: "test@test.com",
      merchant_id: "",
      merchant_type: "",
    };
  },
  methods: {
    showPaymentForm() {
      this.show_modal = true;
    },
    submitForm() {
      if (
        typeof this.payment_credentials[this.payment_code] !== "undefined" &&
        this.payment_credentials[this.payment_code] !== null
      ) {
        this.merchant_id =
          this.payment_credentials[this.payment_code].merchant_id;
        this.merchant_type =
          this.payment_credentials[this.payment_code].merchant_type;
      }

      this.loading = true;
      const params = {
        merchant_id: this.merchant_id,
        merchant_type: this.merchant_type,
        payment_code: this.payment_code,
        billing_name: this.billing_name,
        billing_address: this.billing_address,
        billing_city: this.billing_city,
        billing_state: this.billing_state,
        billing_zip: this.billing_zip,
        billing_country: this.billing_country,
        billing_tel: this.billing_tel,
        billing_email: this.billing_email,
      };
      APIinterface.fetchDataByTokenPostPayment("kotaksavebilling", params)
        .then((data) => {
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
      if (
        typeof this.payment_credentials[this.payment_code] !== "undefined" &&
        this.payment_credentials[this.payment_code] !== null
      ) {
        this.merchant_id =
          this.payment_credentials[this.payment_code].merchant_id;
        this.merchant_type =
          this.payment_credentials[this.payment_code].merchant_type;
      }

      this.params = {
        cart_uuid: data.cart_uuid,
        order_uuid: data.order_uuid,
        payment_uuid: data.payment_uuid,
        payment_code: data.payment_code,
        merchant_id: this.merchant_id,
        merchant_type: this.merchant_type,
      };
      APIinterface.showLoadingBox(
        this.$t("Processing payment..<br/>don't close this window"),
        this.$q
      );
      APIinterface.fetchDataByTokenPostPayment(
        "kotakinittransaction",
        this.params
      )
        .then((data) => {
          console.log(data);
          let redirect = data.details.redirect_url;
          console.log(redirect);
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
      console.log("Webview");

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
    //
  },
};
</script>
