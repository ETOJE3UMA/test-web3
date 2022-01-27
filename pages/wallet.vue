<template>
  <div class="wallet">
    <div class="wallet__balance">
      <div class="wallet__balance-usd">
        ${{ getBalanceInUsd.toFixed(2) }} USD
      </div>
      <div class="wallet__balance-eth">
        {{ getBalance }} ETH
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { getUserBalance } from '~/utils/web3';

export default {
  middleware: 'auth',
  layout: 'auth',
  computed: {
    ...mapGetters({
      getPrice: 'web3/getPriceInUsd',
    }),
    getBalance() {
      return Number(getUserBalance()).toFixed(6);
    },
    getBalanceInUsd() {
      return this.getBalance * this.getPrice;
    },
  },
  mounted() {
    this.priceUSD();
  },
  methods: {
    ...mapActions({
      priceUSD: 'web3/getUsdPrice',
    }),
  },
};
</script>

<style lang="scss" scoped>
.wallet {
  min-width: 100%;
  &__balance {
    width: 100%;
    height: 130px;
    background-color: #4C4AA1;
    color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    &-usd {
      font-size: 40px;
    }
    &-eth {
      opacity: 0.8;
    }
  }
}
</style>
