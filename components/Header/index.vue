<template>
  <div class="header">
    <div class="wrap">
      <div class="header__user user">
        <div class="user__logo">
          <img
            src="@/assets/image/logotype.svg"
            alt="logotype"
          >
        </div>
        <div class="user__wallet wallet">
          <div class="wallet__name">
            Your account name
          </div>
          <div class="wallet__address">
            {{ GetShortAddress(userInfo.address) }}
          </div>
        </div>
      </div>
      <div class="header__navbar navbar">
        <nuxt-link
          class="navbar__nav"
          to="/"
        >
          Assets
        </nuxt-link>
        <nuxt-link
          class="navbar__nav"
          to="/history"
        >
          History
        </nuxt-link>
        <button
          class="navbar__nav"
          @click="showTransferModal"
        >
          Transfer
        </button>
        <nuxt-link
          class="navbar__nav"
          to="/accounts"
        >
          Accounts
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { getUserAddress, getUserBalance } from '~/utils/web3';

export default {
  computed: {
    userInfo() {
      return { address: getUserAddress(), balance: Number(getUserBalance()).toFixed(6) };
    },
  },
  methods: {
    showTransferModal() {
      this.ShowModal({
        key: 'base-modal-transfer',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  min-height: 100px;
  color: #fff;
  background-color: #4C4AA1;
  display: flex;
  justify-content: center;
  .wrap {
    @include container;
    display: flex;
    justify-content: space-between;
  }
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
    &__name {
      font-size: 16px;
    }
    &__address {
      font-weight: 100;
      opacity: 0.8;
    }
  }
  .navbar {
    display: flex;
    &__nav {
      padding-right: 20px;
      color: #fff;
      font-size: 17px;
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
