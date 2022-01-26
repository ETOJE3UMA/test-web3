<template>
  <div class="header">
    <div class="header__user user">
      <div class="user__logo">
        <img
          src="@/assets/image/logotype.svg"
          alt="logotype"
        >
      </div>
      <div class="user__wallet wallet">
        <div class="wallet__address">
          Address: {{ userInfo.address }}
        </div>
        <div class="wallet__balance">
          Balance: {{ userInfo.balance }} ETH
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserAddress, getUserBalance } from '~/utils/web3';

export default {
  computed: {
    userInfo() {
      return { address: getUserAddress(), balance: Number(getUserBalance()).toFixed(6) };
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  min-height: 100px;
  height: 100%;
  width: 100%;
  background-color: #4C4AA1;
  color: #fff;
  padding: 0 15px;
  .user {
    height: 100%;
    display: flex;
    align-items: center;
    &__logo {
      width: 64px;
      height: 64px;
    }
  }
  .wallet {
    margin-left: 20px;
    &__address, &__balance {
      font-weight: 100;
    }
  }
}
</style>
