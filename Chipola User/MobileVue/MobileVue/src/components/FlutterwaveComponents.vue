<template>
  <q-dialog v-model="show_modal" persistent transition-show="fade" transition-hide="fade">
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
import { loadScript } from "vue-plugin-load-script";

export default {
  name: "FlutterwaveComponents",
  props: ["title", "label", "payment_code", "payment_credentials"],
  data() {
    return {
      show_modal: false,
      data: [],
      loading: false,
      credentials: [],
      payment_data: [],
    };
  },
  created() {
    this.loadFlutterwave();
  },
  methods: {
    loadFlutterwave() {
      loadScript("https://checkout.flutterwave.com/v3.js")
        .then(() => {
          console.log("flutterwave loaded");
        })
        .catch(() => {
          console.log("failed loading flutterwave");
        });
    },
    showPaymentForm() {
      this.show_modal = true;
    },
    close() {
      this.show_modal = false;
    },
    closePayment() {
      this.$emit("afterCancelPayment");
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
      };
      this.loading = true;
      APIinterface.SavedPaymentProvider($data)
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
      this.payment_data = data;
      let merchantId = "";
      let merchantType = "";
      if (
        typeof this.payment_credentials[this.payment_code] !== "undefined" &&
        this.payment_credentials[this.payment_code] !== null
      ) {
        merchantId = this.payment_credentials[this.payment_code].merchant_id;
        merchantType = this.payment_credentials[this.payment_code].merchant_type;
      }
      const params = {
        cart_uuid: data.cart_uuid,
        order_uuid: data.order_uuid,
        payment_uuid: data.payment_uuid,
        payment_code: data.payment_code,
        merchant_id: merchantId,
        merchant_type: merchantType,
      };
      APIinterface.showLoadingBox(
        "Processing payment..<br/>don't close this window",
        this.$q
      );
      APIinterface.fetchDataByTokenPostPayment("fwgetpaymentdetails", params)
        .then((data) => {
          this.initPayment(data.details);
        })
        .catch((error) => {
          APIinterface.notify("dark", error, "error", this.$q);
        })
        .then((data) => {
          APIinterface.hideLoadingBox(this.$q);
        });
    },
    initPayment(data) {
      let $params = {
        public_key: data.public_key,
        tx_ref: data.order_uuid,
        amount: parseFloat(data.amount),
        currency: data.currency,
        payment_options: data.payment_options,
        callback: (payment) => {
          console.log("callback payment");
          this.verifyPayment(payment.transaction_id, data.order_uuid);
        },
        onclose: (incomplete) => {
          console.log("callback onclose");
          console.log(incomplete);
        },
        meta: {
          consumer_id: data.customer.client_uuid,
        },
        customer: {
          email: data.customer.email_address,
          phone_number: data.customer.phone_number,
          name: data.customer.name,
        },
        customizations: {
          title: data.customizations.title,
          description: data.customizations.description,
        },
      };
      FlutterwaveCheckout($params);
    },
    verifyPayment(transaction_id, order_uuid) {
      let merchantId = "";
      let merchantType = "";
      if (
        typeof this.payment_credentials[this.payment_code] !== "undefined" &&
        this.payment_credentials[this.payment_code] !== null
      ) {
        merchantId = this.payment_credentials[this.payment_code].merchant_id;
        merchantType = this.payment_credentials[this.payment_code].merchant_type;
      }
      const params = {
        cart_uuid: this.payment_data.cart_uuid,
        order_uuid: this.payment_data.order_uuid,
        payment_uuid: this.payment_data.payment_uuid,
        payment_code: this.payment_code,
        merchant_id: merchantId,
        merchant_type: merchantType,
        transaction_id: transaction_id,
      };
      APIinterface.showLoadingBox(
        "Processing payment..<br/>don't close this window",
        this.$q
      );
      APIinterface.fetchDataByTokenPostPayment("fwverifypayment", params)
        .then((data) => {
          this.$emit("afterPayment", data.details);
        })
        .catch((error) => {
          APIinterface.notify("dark", error, "error", this.$q);
        })
        .then((data) => {
          APIinterface.hideLoadingBox(this.$q);
        });
    },
    //
  },
};
</script>
