<template>
  <q-dialog v-model="dialog" full-width persistent @before-hide="beforeHide">
    <q-card>
      <q-card-section>
        <div class="text-center">
          <div class="text-h4">{{ $t("Congratulations") }}!</div>
          <div class="text-body2">
            {{ $t("Your digital wallet has been successfully loaded") }}.
          </div>
        </div>
      </q-card-section>

      <q-list separator>
        <q-item-label header class="text-dark text text-weight-bold"
          >{{ $t("Transaction Details") }}!</q-item-label
        >
        <q-item>
          <q-item-section>
            <q-item-label>{{ $t("Amount Loaded") }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>{{ data.amount }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>{{ $t("Payment Method") }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>{{ data.payment_name }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>{{ $t("Transaction ID") }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>{{ data.transaction_id }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>{{ $t("Date and Time") }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>{{ data.transaction_date }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-card-actions>
        <q-btn
          :color="$q.dark.mode ? 'grey300' : 'primary'"
          :label="$t('Close')"
          class="fit"
          size="lg"
          no-caps
          unelevated
          @click="dialog = !dialog"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "WalletTopupreceipt",
  props: ["data"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    beforeHide() {
      this.$emit("afterReceiptclose");
    },
  },
};
</script>
