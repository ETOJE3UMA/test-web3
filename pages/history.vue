<template>
  <div class="history">
    <div class="history__title">
      History of transactions
    </div>
    <div
      v-for="history in getHistory"
      :key="history.transactionHash"
      class="history__list list"
    >
      {{ history }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  middleware: 'auth',
  layout: 'auth',
  computed: {
    ...mapGetters({
      getHistory: 'web3/getTransactions',
    }),
  },
  async mounted() {
    this.SetLoader(true);
    await this.showHistoryTransation();
    this.SetLoader(false);
  },
  methods: {
    ...mapActions({
      transactions: 'web3/transactionsHistory',
    }),
    async showHistoryTransation() {
      try {
        await this.transactions();
      } catch (e) {
        this.ShowToast(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
