<template>
  <q-pull-to-refresh @refresh="refresh">
    <q-header
      reveal
      reveal-offset="20"
      :class="{
        'bg-mydark text-white': $q.dark.mode,
        'bg-white text-dark': !$q.dark.mode,
      }"
    >
      <q-toolbar>
        <q-btn
          @click="$router.back()"
          flat
          round
          dense
          icon="las la-angle-left"
          class="q-mr-sm"
          :color="$q.dark.mode ? 'white' : 'dark'"
        />
        <q-toolbar-title class="text-weight-bold">{{
          $t("Wallet")
        }}</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page class="q-pl-md q-pr-md">
      <!-- POINTS BALANCE -->
      <div
        class="q-pa-md q-mb-sm radius8"
        :class="{
          'bg-grey600 text-white': $q.dark.mode,
          'bg-grey-1 text-black': !$q.dark.mode,
        }"
      >
        <div class="row items-center q-gutter-md">
          <div>
            <q-skeleton type="QAvatar" v-if="loading_balance" />
            <q-icon
              v-else
              color="grey-4"
              name="o_account_balance_wallet"
              style="font-size: 60px"
            />
          </div>
          <div class="col">
            <template v-if="loading_balance">
              <q-skeleton type="text" />
              <q-skeleton type="text" />
            </template>
            <template v-else>
              <h4 class="no-margin">{{ balance }}</h4>
              <p class="font12 no-margin">{{ $t("Available Balance") }}</p>
            </template>
          </div>
          <div>
            <q-skeleton type="circle" v-if="loading_balance" />
            <template v-else>
              <q-btn
                v-if="DataStore.digitalwallet_enabled_topup"
                round
                :color="$q.dark.mode ? 'grey300' : 'primary'"
                icon="add"
                @click="this.$refs.topup.dialog = true"
              />
            </template>
          </div>
        </div>
      </div>
      <!-- POINTS BALANCE -->

      <div class="q-mt-sm q-mb-sm">
        <WalletBunos ref="bunos"></WalletBunos>
      </div>

      <q-tabs
        v-model="tab"
        dense
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
        no-caps
        :class="{
          'text-grey300': $q.dark.mode,
          'text-dark': !$q.dark.mode,
        }"
        :breakpoint="0"
        @update:model-value="tabChange"
      >
        <template v-for="items in tabs" :key="items">
          <q-tab
            :name="items.name"
            :label="items.label"
            no-caps
            content-class="text-weight-500 "
          />
        </template>
      </q-tabs>

      <q-tab-panels
        v-model="tab"
        animated
        transition-next="fade"
        transition-prev="fade"
        :class="{
          'bg-mydark ': $q.dark.mode,
          'bg-white ': !$q.dark.mode,
        }"
      >
        <template v-for="items in tabs" :key="items">
          <q-tab-panel
            :name="items.name"
            class="q-pl-none q-pr-none"
            style="min-height: 300px"
          >
            <!-- tab -->

            <q-infinite-scroll
              ref="nscroll"
              @load="getWalletTransaction"
              :offset="250"
            >
              <template v-slot:default>
                <div
                  v-if="!hasData && !loading"
                  class="flex flex-center"
                  style="min-height: calc(40vh)"
                >
                  <p class="text-grey">{{ $t("No data available") }}</p>
                </div>
                <q-list>
                  <template v-for="datas in data" :key="datas">
                    <template
                      v-for="items in datas"
                      :key="items.transaction_date"
                    >
                      <q-item>
                        <q-item-section>
                          <q-item-label>{{
                            items.transaction_description
                          }}</q-item-label>
                          <q-item-label caption>{{
                            items.transaction_date
                          }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                          <div
                            class="text-bold"
                            :class="{
                              'text-green': items.transaction_type == 'credit',
                              'text-red': items.transaction_type == 'debit',
                            }"
                          >
                            {{ items.transaction_amount }}
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-separator spaced inset />
                    </template>
                  </template>
                </q-list>
              </template>

              <template v-slot:loading>
                <template v-if="page <= 1">
                  <div class="q-pa-xl">
                    <q-inner-loading
                      :showing="true"
                      color="primary"
                      size="md"
                      label-class="dark"
                      class="transparent"
                    />
                  </div>
                </template>
                <div
                  v-else-if="page > 2"
                  class="row justify-center absolute-bottom"
                >
                  <q-spinner-dots color="secondary" size="40px" />
                </div>
              </template>
            </q-infinite-scroll>

            <!-- end tab -->
          </q-tab-panel>
        </template>
      </q-tab-panels>

      <WalletTopupform
        ref="topup"
        @after-preparepayment="afterPreparepayment"
      ></WalletTopupform>

      <WalletTopupreceipt
        ref="receipt"
        :data="receipt_data"
        @after-receiptclose="afterReceiptclose"
      >
      </WalletTopupreceipt>

      <!-- PAYMENTS COMPONENTS -->

      <StripeComponents
        ref="stripe"
        payment_code="stripe"
        title="Add Stripe"
        :label="{
          submit: this.$t('Add Stripe'),
          notes: this.$t('Add your card account'),
        }"
        :payment_credentials="credentials"
        @after-addpayment="afterAddpayment"
        @after-payment="afterPayment"
        @after-cancel-payment="AfterCancelPayment"
        @after-successfulpayment="afterSuccessfulpayment"
        @after-failedpayment="afterFailedpayment"
        @close-payment="closePayment"
      />

      <RazorpayComponents
        ref="razorpay"
        payment_code="razorpay"
        title="Add Razorpay"
        :label="{
          submit: this.$t('Submit'),
          notes: this.$t('Pay using your Razorpay account'),
        }"
        :payment_credentials="credentials"
        @after-addpayment="afterAddpayment"
        @after-payment="afterPayment"
        @after-cancel-payment="AfterCancelPayment"
        @after-successfulpayment="afterSuccessfulpayment"
        @after-failedpayment="afterFailedpayment"
        @close-payment="closePayment"
      />

      <PaypalComponents
        ref="paypal"
        payment_code="paypal"
        title="Add Paypal"
        :label="{
          submit: this.$t('Add Paypal'),
          notes: this.$t('Pay using your paypal account'),
          payment_title: this.$t('Pay using Paypal'),
          payment_subtitle: this.$t(
            'You will re-direct to paypal account to login to your account.'
          ),
        }"
        :payment_credentials="credentials"
        @after-addpayment="afterAddpayment"
        @after-payment="afterPayment"
        @after-cancel-payment="AfterCancelPayment"
        @after-successfulpayment="afterSuccessfulpayment"
        @after-failedpayment="afterFailedpayment"
        @close-payment="closePayment"
      />

      <MercadopagoComponents
        ref="mercadopago"
        payment_code="mercadopago"
        title="Add Mercadopago"
        :label="{
          submit: this.$t('Add Mercadopago'),
          submit_form: this.$t('Submit'),
          notes: this.$t('Pay using your mercadopago account'),
        }"
        :payment_credentials="credentials"
        @after-addpayment="afterAddpayment"
        @after-payment="afterPayment"
        @after-cancel-payment="AfterCancelPayment"
        @after-successfulpayment="afterSuccessfulpayment"
        @after-failedpayment="afterFailedpayment"
        @close-payment="closePayment"
      />

      <!-- PAYMENTS COMPONENTS -->
    </q-page>
  </q-pull-to-refresh>
</template>

<script>
import { defineAsyncComponent } from "vue";
import APIinterface from "src/api/APIinterface";
import { usePaymentStore } from "stores/PaymentStore";
import { useDataStore } from "stores/DataStore";

export default {
  name: "WalletDigital",
  components: {
    WalletBunos: defineAsyncComponent(() =>
      import("components/WalletBunos.vue")
    ),
    WalletTopupform: defineAsyncComponent(() =>
      import("components/WalletTopupform.vue")
    ),
    WalletTopupreceipt: defineAsyncComponent(() =>
      import("components/WalletTopupreceipt.vue")
    ),
    // PAYMENT COMPONENTS
    StripeComponents: defineAsyncComponent(() =>
      import("components/StripeComponents.vue")
    ),
    RazorpayComponents: defineAsyncComponent(() =>
      import("components/RazorpayComponents.vue")
    ),
    PaypalComponents: defineAsyncComponent(() =>
      import("components/PaypalComponents.vue")
    ),
    MercadopagoComponents: defineAsyncComponent(() =>
      import("components/MercadopagoComponents.vue")
    ),
  },
  setup() {
    const PaymentStore = usePaymentStore();
    const DataStore = useDataStore();
    return { PaymentStore, DataStore };
  },
  data() {
    return {
      loading_balance: false,
      balance: 0,
      credentials: [],
      receipt_data: [],
      data: [],
      page: 0,
      is_refresh: undefined,
      tab: "all",
      tabs: [
        {
          name: "all",
          label: this.$t("All"),
        },
        {
          name: "order",
          label: this.$t("Orders"),
        },
        {
          name: "refund",
          label: this.$t("Refunds"),
        },
        {
          name: "topup",
          label: this.$t("Top-ups"),
        },
        {
          name: "cashback",
          label: this.$t("Cashbacks"),
        },
        {
          name: "adjustment",
          label: this.$t("Adjustment"),
        },
      ],
    };
  },
  mounted() {
    this.getWalletBalance();
    this.getPaymentCredentials();
  },
  computed: {
    hasData() {
      if (Object.keys(this.data).length > 0) {
        return true;
      }
      return false;
    },
  },
  methods: {
    refresh(done) {
      this.is_refresh = done;
      this.resetPage();
      this.getWalletBalance();
      this.$refs.bunos.getDiscount();
      // setTimeout(() => {
      //   this.getWalletBalance();
      // }, 100);
    },
    getPaymentCredentials() {
      APIinterface.fetchDataByTokenPost("getPaymentCredentials")
        .then((data) => {
          this.credentials = data.details;
        })
        .catch((error) => {})
        .then((data) => {});
    },
    getWalletBalance() {
      this.loading_balance = true;
      APIinterface.fetchDataByTokenPost("getWalletBalance")
        .then((data) => {
          if (data.code == 1) {
            this.balance = data.details.total;
          } else {
            this.balance = 0;
          }
        })
        .catch((error) => {})
        .then((data) => {
          this.loading_balance = false;
        });
    },
    resetPage() {
      this.resetPagination();
    },
    resetPagination() {
      this.page = 0;
      this.data = [];
      this.$refs.nscroll[0].reset();
      this.$refs.nscroll[0].resume();
      this.$refs.nscroll[0].trigger();
    },
    tabChange(value) {
      this.page = 0;
      this.data = [];
    },
    getWalletTransaction(index, done) {
      this.loading = true;
      this.page = index;
      APIinterface.fetchDataByTokenPost(
        "getWalletTransaction",
        "page=" + index + "&transaction_type=" + this.tab
      )
        .then((data) => {
          if (data.code == 1) {
            this.data.push(data.details.data);
          } else {
            this.$refs.nscroll[0].stop();
          }
        })
        .catch((error) => {
          this.loading = false;
          if (this.$refs.nscroll) {
            this.$refs.nscroll[0].stop();
          }
        })
        .then((data) => {
          this.loading = false;
          done();
          if (!APIinterface.empty(this.is_refresh)) {
            this.is_refresh();
          }
        });
    },
    afterPreparepayment(data) {
      try {
        this.$refs[data.payment_code].Dopayment(data.data, data);
      } catch (error) {
        APIinterface.notify("dark", error, "error", this.$q);
      }
    },
    afterSuccessfulpayment(data) {
      this.receipt_data = data;
      this.$refs.topup.dialog = false;
      this.$refs.receipt.dialog = true;
    },
    afterReceiptclose() {
      this.getWalletBalance();
      this.resetPage();
    },
    afterCancelPayment(data) {
      console.log("afterCancelPayment");
      console.log(data);
      if (!APIinterface.empty(data)) {
        APIinterface.notify("dark", data, "error", this.$q);
      }
    },
    closePayment() {
      this.$refs.topup.dialog = false;
    },
  },
};
</script>
