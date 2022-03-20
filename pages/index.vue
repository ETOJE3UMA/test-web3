<template>
  <div class="wallet">
    <div class="wallet__balance">
      <div class="wallet__balance-eth">
        {{ GetBalance }} ETH
      </div>
    </div>
    <div class="wallet__assets">
      <div
        v-for="token in getTokens"
        :key="`token-${token.token}`"
        class="wallet__assets asset"
      >
        <div class="asset__icon">
          <img
            src="@/assets/image/icon-token.svg"
            alt="icon"
            class="icon"
          >
        </div>
        <div class="asset__balance balance">
          <div class="balance__native">
            {{ token.result.balance }} {{ token.result.symbol }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  middleware: 'auth',
  layout: 'auth',
  computed: {
    ...mapGetters({
      getTokens: 'web3/getTokenData',
    }),
  },
  mounted() {
    this.SetLoader(false);
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
    font-size: 40px;
  }
  .asset {
    margin: auto;
    padding: 20px 0;
    display: grid;
    grid-template-columns: max-content minmax(100px, 200px);
    align-items: center;
    justify-content: center;
    margin: auto;
    width: 100%;
    border: 1px solid #807DC0;
    border-bottom: 0;
    border-radius: 4px;
    cursor: pointer;
    transition: .4s;
    &:first-child {
      border-top: 0;
    }
    &:last-child {
      border-bottom: 1px solid #807DC0;
    }
    .icon {
      margin: 0 20px;
      width: 44px;
      height: 44px;
    }
    &:hover {
      background-color: #fff;
    }
  }
  .balance {
    &__native {
      font-size: 25px;
      font-weight: 500;
      color: #373583;
    }
    &__usd {
      color: #807DC0;
    }
  }
}
</style>
