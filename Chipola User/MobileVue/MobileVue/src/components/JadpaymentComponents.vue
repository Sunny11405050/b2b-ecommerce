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

      <q-form @submit="onSubmit">
        <q-card-section class="q-pa-md">
          <div class="column q-col-gutter-sm">
            <q-input
              dense
              :bg-color="$q.dark.mode ? 'grey600' : 'mygrey'"
              :color="$q.dark.mode ? 'grey300' : 'primary'"
              outlined
              v-model="card_number"
              label="Card number"
              :rules="[(val) => (val && val.length > 0) || 'this field is required']"
              mask="#### #### #### ####"
            />
          </div>

          <div class="row q-col-gutter-md">
            <div class="col">
              <q-input
                dense
                :bg-color="$q.dark.mode ? 'grey600' : 'mygrey'"
                :color="$q.dark.mode ? 'grey300' : 'primary'"
                outlined
                v-model="expiry_date"
                label="Exp. date"
                class="no-margin"
                :rules="[(val) => (val && val.length > 0) || 'this field is required']"
                mask="##/##"
              />
            </div>
            <div class="col">
              <q-input
                dense
                :bg-color="$q.dark.mode ? 'grey600' : 'mygrey'"
                :color="$q.dark.mode ? 'grey300' : 'primary'"
                outlined
                v-model="cvv"
                label="Security Code"
                class="no-margin"
                :rules="[(val) => (val && val.length > 0) || 'this field is required']"
                mask="####"
              />
            </div>
          </div>
          <!-- row -->

          <div class="row q-col-gutter-md">
            <div class="col">
              <q-input
                dense
                :bg-color="$q.dark.mode ? 'grey600' : 'mygrey'"
                :color="$q.dark.mode ? 'grey300' : 'primary'"
                outlined
                v-model="first_name"
                label="First name"
                class="no-margin"
                :rules="[(val) => (val && val.length > 0) || 'this field is required']"
              />
            </div>
            <div class="col">
              <q-input
                dense
                :bg-color="$q.dark.mode ? 'grey600' : 'mygrey'"
                :color="$q.dark.mode ? 'grey300' : 'primary'"
                outlined
                v-model="last_name"
                label="Last name"
                class="no-margin"
                :rules="[(val) => (val && val.length > 0) || 'this field is required']"
              />
            </div>
          </div>
          <!-- row -->

          <div class="column q-col-gutter-sm">
            <q-input
              dense
              :bg-color="$q.dark.mode ? 'grey600' : 'mygrey'"
              :color="$q.dark.mode ? 'grey300' : 'primary'"
              outlined
              v-model="email_address"
              label="Email address"
              :rules="[
                (val, rules) => rules.email(val) || 'Please enter a valid email address',
              ]"
            />
          </div>
          <!-- columnm -->

          <div class="row q-col-gutter-md">
            <div class="col">
              <q-input
                dense
                :bg-color="$q.dark.mode ? 'grey600' : 'mygrey'"
                :color="$q.dark.mode ? 'grey300' : 'primary'"
                outlined
                v-model="street"
                label="Street"
                class="no-margin"
                :rules="[(val) => (val && val.length > 0) || 'this field is required']"
              />
            </div>
            <div class="col">
              <q-input
                dense
                :bg-color="$q.dark.mode ? 'grey600' : 'mygrey'"
                :color="$q.dark.mode ? 'grey300' : 'primary'"
                outlined
                v-model="city"
                label="City"
                class="no-margin"
                :rules="[(val) => (val && val.length > 0) || 'this field is required']"
              />
            </div>
          </div>
          <!-- row -->

          <div class="row q-col-gutter-md">
            <div class="col">
              <q-input
                dense
                :bg-color="$q.dark.mode ? 'grey600' : 'mygrey'"
                :color="$q.dark.mode ? 'grey300' : 'primary'"
                outlined
                v-model="postal_code"
                label="Postal code"
                class="no-margin"
                :rules="[(val) => (val && val.length > 0) || 'this field is required']"
              />
            </div>
            <div class="col">
              <q-input
                dense
                :bg-color="$q.dark.mode ? 'grey600' : 'mygrey'"
                :color="$q.dark.mode ? 'grey300' : 'primary'"
                outlined
                v-model="state"
                label="State"
                class="no-margin"
                :rules="[(val) => (val && val.length > 0) || 'this field is required']"
              />
            </div>
          </div>
          <!-- row -->

          <q-separator spaced />
          <q-card-actions>
            <q-btn
              type="submit"
              :label="label.submit"
              :loading="loading"
              unelevated
              no-caps
              color="primary text-white"
              class="full-width text-weight-bold"
              size="lg"
            />
          </q-card-actions>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import APIinterface from "src/api/APIinterface";

export default {
  name: "JadpaymentComponents",
  props: ["title", "label", "payment_code", "payment_credentials"],
  data() {
    return {
      show_modal: false,
      data: [],
      loading: false,
      credentials: [],
      card_number: "",
      expiry_date: "",
      cvv: "",
      first_name: "",
      last_name: "",
      email_address: "",
      street: "",
      city: "",
      postal_code: "",
      state: "",
      payment_uuid: "",
      order_uuid: "",
      nonce: "",
    };
  },
  methods: {
    close() {
      this.show_modal = false;
    },    
    closePayment() {
      this.$emit("afterCancelPayment");
    },
    setCredentials() {
      if (
        typeof this.payment_credentials[this.payment_code] !== "undefined" &&
        this.payment_credentials[this.payment_code] !== null
      ) {
        this.credentials = this.payment_credentials[this.payment_code];
      }
    },
    PaymentRender(data) {
      this.payment_uuid = data.payment_uuid;
      this.order_uuid = data.order_uuid;
      this.setCredentials();
      const $data = {
        merchant_id: this.credentials.merchant_id,
        payment_code: this.payment_code,
        merchant_type: this.credentials.merchant_type,
      };
      APIinterface.showLoadingBox(
        "Getting payment information..<br/>don't close this window",
        this.$q
      );
      APIinterface.fetchDataByTokenPostPayment("JadCardnonce", $data)
        .then((data) => {
          this.nonce = data.details.nonce;
          this.show_modal = true;
        })
        .catch((error) => {
          APIinterface.notify("dark", error, "error", this.$q);
        })
        .then((data) => {
          APIinterface.hideLoadingBox(this.$q);
        });
    },
    onSubmit() {
      var str = this.expiry_date;
      var expiry = str.split("/");
      var expiry_month = expiry[0];
      var expiry_year = expiry[1];

      const str_card = this.card_number;
      const card_number = str_card.replace(/ /g, "");
      this.loading = true;
      APIinterface.fetchDataByTokenPostPayment("JadCardpayment", {
        merchant_id: this.credentials.merchant_id,
        payment_code: this.payment_code,
        merchant_type: this.credentials.merchant_type,
        order_uuid: this.order_uuid,
        card_number: card_number,
        expiry_month: expiry_month,
        expiry_year: expiry_year,
        cvv: this.cvv,
        first_name: this.first_name,
        last_name: this.last_name,
        email_address: this.email_address,
        street: this.street,
        city: this.city,
        postal_code: this.postal_code,
        state: this.state,
        nonce: this.nonce,
      })
        .then((data) => {
          this.$emit("afterPayment", data.details);
        })
        .catch((error) => {
          APIinterface.notify("dark", error, "error", this.$q);
        })
        .then((data) => {
          this.loading = false;
        });
    },
  },
};
</script>
