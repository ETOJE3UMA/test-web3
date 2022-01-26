<template>
  <div class="main">
    <div class="main__logotype">
      <img
        src="@/assets/image/logotype.svg"
        alt="logotype"
        class="main__logotype"
      >
    </div>
    <div class="main__title">
      MetaMask prototypes
    </div>
    <base-btn
      class="main__btn"
      @click="connectUserWallet"
    >
      Signing & Tokens Home
    </base-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  middleware: 'guest',
  layout: 'guest',
  computed: {
    ...mapGetters({
      isConnected: 'web3/getIsConnected',
    }),
  },
  methods: {
    ...mapActions({
      connectWallet: 'web3/connectWallet',
    }),
    async connectUserWallet() {
      await this.connectWallet();
      if (this.isConnected) {
        console.log('hello');
        this.$router.push('/wallet');
      }
    },
  },
};
</script>

<style lang="scss" scope>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__logotype {
    width: 256px;
    height: 256px;
  }
  &__title {
    margin: 57px 0 114px 0;
    color: #373583;
    font-size: 44px;
    font-weight: 700;
  }
  &__btn {
    border: 1px solid #4C4AA1;
    border-radius: 4px;
    font-size: 20px;
  }
}
</style>
