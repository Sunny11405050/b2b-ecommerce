<template>
  <div class="hidden">My component</div>
</template>

<script>
import APIinterface from "src/api/APIinterface";
import { Browser } from "@capacitor/browser";

export default {
  name: "PaytabsComponents",
  props: ["title", "label", "payment_code", "payment_credentials"],
  data() {
    return {
      params: [],
    };
  },
  methods: {
    PaymentRender(data) {
      this.params = {
        cart_uuid: data.cart_uuid,
        order_uuid: data.order_uuid,
      };
      APIinterface.showLoadingBox(
        "Processing payment..<br/>don't close this window",
        this.$q
      );
      APIinterface.fetchDataByTokenPostPayment("paytabsrequestpayment", this.params)
        .then((data) => {
          let redirect = data.details.redirect_url;
          console.log(redirect);
          console.log(data.details.return);
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
