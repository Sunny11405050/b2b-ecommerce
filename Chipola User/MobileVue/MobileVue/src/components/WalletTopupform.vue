<template>
  <q-dialog v-model="dialog" position="bottom">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $t("Add Funds to Your Wallet") }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-form @submit="onSubmit">
        <q-card-section>
          <div class="text-body2 q-mb-md">
            {{ $t("topup_message") }}
          </div>

          <div class="text-h5 text-weight-bold">{{ $t("Payment Method") }}</div>

          <template v-if="hasPayment">
            <div class="row q-mb-md items-center">
              <div class="col-2">
                <q-img
                  :src="getPayment.logo_image"
                  spinner-color="primary"
                  spinner-size="sm"
                  style="height: 30px; max-width: 50px"
                  fit="contain"
                />
              </div>
              <div class="col-3">
                <div class="text-body2 text-weight-medium">
                  {{ getPayment.attr1 }}
                </div>
                <div class="text-caption">{{ getPayment.attr2 }}</div>
              </div>
              <div class="col text-right">
                <q-btn
                  flat
                  :label="$t('Change')"
                  color="primary"
                  no-caps
                  to="/account/payments"
                ></q-btn>
              </div>
            </div>

            <q-input
              v-model="amount"
              :label="$t('Enter amount')"
              outlined
              lazy-rules
              :bg-color="$q.dark.mode ? 'grey600' : 'input'"
              :label-color="$q.dark.mode ? 'grey300' : 'grey'"
              borderless
              class="input-borderless"
              type="number"
              :rules="[
                (val) => val > 0 || this.$t('Please enter valid amount'),
              ]"
            />

            <q-btn
              type="submit"
              :label="$t('Add Funds')"
              :loading="loading"
              unelevated
              :color="$q.dark.mode ? 'grey300' : 'primary'"
              text-color="white"
              no-caps
              class="full-width"
              size="lg"
            />
          </template>

          <template v-else>
            <div class="q-gutter-y-sm">
              <div class="text-body q-pa-sm bg-red-2 radius10 text-dark">
                {{
                  $t(
                    "We noticed you haven't added a default payment method yet"
                  )
                }}.
              </div>
              <div class="text-body2">
                {{ $t("topup_message1") }}
              </div>

              <q-btn
                color="primary"
                :label="$t('Add online payment')"
                class="fit"
                size="lg"
                no-caps
                unelevated
                to="/account/payments"
              />
            </div>
          </template>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import APIinterface from "src/api/APIinterface";
import { useDataStorePersisted } from "stores/DataStorePersisted";

export default {
  name: "WalletTopupform",
  setup() {
    const DataStorePersisted = useDataStorePersisted();
    return { DataStorePersisted };
  },
  data() {
    return {
      dialog: false,
      amount: 1,
      loading: false,
      default_payment: [],
    };
  },
  mounted() {
    this.getCustomerDefaultPayment();
  },
  computed: {
    hasPayment() {
      if (Object.keys(this.default_payment).length > 0) {
        return true;
      }
      return false;
    },
    getPayment() {
      return this.default_payment;
    },
  },
  methods: {
    getCustomerDefaultPayment() {
      this.loading = true;
      APIinterface.fetchDataByTokenPost("getCustomerDefaultPayment")
        .then((data) => {
          this.default_payment = data.details.data;
        })
        .catch((error) => {
          APIinterface.notify("dark", error, "error", this.$q);
        })
        .then((data) => {
          this.loading = false;
        });
    },
    onSubmit() {
      this.loading = true;
      APIinterface.fetchDataByTokenPost(
        "prepareAddFunds",
        "amount=" +
          this.amount +
          "&payment_code=" +
          this.default_payment.payment_code +
          "&payment_uuid=" +
          this.default_payment.payment_uuid +
          "&currency_code=" +
          this.DataStorePersisted.getUseCurrency()
      )
        .then((data) => {
          this.$emit("afterPreparepayment", data.details);
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
