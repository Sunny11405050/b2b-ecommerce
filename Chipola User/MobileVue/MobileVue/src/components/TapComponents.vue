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

  <!-- PAYMENT -->

  <q-dialog
    v-model="payment_modal"
    persistent
    transition-show="fade"
    transition-hide="fade"
    maximized
  >
    <q-card>
      <q-toolbar class="text-primary top-toolbar q-pl-md" dense>
        <q-space></q-space>
        <q-btn
          @click="payment_modal = !true"
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
        <q-inner-loading :showing="card_element_loading" color="primary" />
        <h5 class="text-weight-bold no-margin">{{ title }}</h5>
        <div ref="payment_element" id="element-container"></div>
      </q-card-section>

      <q-separator spaced />
      <q-card-actions>
        <q-btn
          :label="label.submit"
          :loading="loading"
          @click="createToken"
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
  name: "TapComponents",
  props: ["title", "label", "payment_code", "payment_credentials"],
  data() {
    return {
      show_modal: false,
      payment_modal: false,
      data: [],
      loading: false,
      params: [],
      public_key: "",
      tap: undefined,
      card: undefined,
      card_element_loading: true,
      error: "",
      card_token: "",
    };
  },
  created() {
    this.initTap();
  },
  methods: {
    showPaymentForm() {
      this.show_modal = true;
    },
    close() {
      this.show_modal = false;
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
    initTap() {
      loadScript("https://secure.gosell.io/js/sdk/tap.min.js")
        .then(() => {
          //
        })
        .catch(() => {
          APIinterface.notify(
            "negative",
            "failed loading script",
            "error_outline",
            this.$q
          );
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
        this.public_key = this.payment_credentials[this.payment_code].attr2;
      }

      this.data = data;

      this.payment_modal = true;

      this.tap = Tapjsli(this.public_key);
      var elements = this.tap.elements({});
      var style = {
        base: {
          color: "#535353",
          lineHeight: "18px",
          fontFamily: "sans-serif",
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "rgba(0, 0, 0, 0.26)",
            fontSize: "15px",
          },
        },
        invalid: {
          color: "red",
        },
      };
      var paymentOptions = {
        currencyCode: ["KWD", "USD", "SAR"],
        labels: {
          cardNumber: this.$t("Card Number"),
          expirationDate: this.$t("MM/YY"),
          cvv: this.$t("CVV"),
          cardHolder: this.$t("Card Holder Name"),
        },
        TextDirection: "ltr",
      };

      this.card_element_loading = true;
      this.card = elements.create("card", { style: style }, paymentOptions);
      setTimeout(() => {
        this.card.mount("#element-container");
        this.card.addEventListener("change", (event) => {
          if (event.BIN) {
            //console.debug(event.BIN);
          }
          if (event.loaded) {
            this.card_element_loading = false;
          }
          if (event.error) {
            this.error = event.error.message;
          } else {
            this.error = "";
          }
        });
      }, 500);
    },
    createToken() {
      this.error = "";
      this.loading = true;
      this.tap.createToken(this.card).then((result) => {
        this.payment_loading = false;
        if (result.error) {
          this.error = result.error.message;
        } else {
          this.error = "";
          this.card_token = result.id;
          this.chargeCardToken();
        }
      });
    },
    chargeCardToken() {
      this.params = {
        card_token: this.card_token,
        cart_uuid: this.data.cart_uuid,
        order_uuid: this.data.order_uuid,
        payment_uuid: this.data.payment_uuid,
        payment_code: this.data.payment_code,
        merchant_id: this.merchant_id,
        merchant_type: this.merchant_type,
      };
      this.loading = true;
      APIinterface.fetchDataByTokenPostPayment(
        "tapchargecardtoken",
        this.params
      )
        .then((data) => {
          console.log(data.details);
          if (data.details.status == "INITIATED") {
            let redirect = data.details.redirect_url;
            if (this.$q.capacitor) {
              this.Webview(redirect);
            } else {
              window.open(redirect);
            }
          } else if (data.details.status == "CAPTURED") {
            this.$emit("afterPayment", data.details);
          } else {
            APIinterface.notify("dark", data.msg, "error", this.$q);
          }
        })
        .catch((error) => {
          APIinterface.notify("dark", error, "error", this.$q);
        })
        .then((data) => {
          this.loading = false;
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
