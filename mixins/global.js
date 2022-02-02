import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { getUserBalance } from '~/utils/web3';

Vue.mixin({
  // TODO fix all usd price functions (work wrong now!)
  computed: {
    ...mapGetters({
      getPrice: 'web3/getPriceInUsd',
    }),
    GetBalance() {
      return Number(getUserBalance()).toFixed(6);
    },
    GetBalanceInUsd() {
      return (this.GetBalance * this.getPrice).toFixed(2);
    },
  },
  methods: {
    ...mapActions({
      ShowModal: 'modals/show',
      CloseModal: 'modals/hide',
      SetLoader: 'loader/setLoading',
      ShowToast: 'modals/showToast',
    }),
    GetShortAddress(address) {
      if (!address) {
        return '';
      }
      const { length } = address;
      const trimLength = 6;
      return `${address.slice(0, trimLength)}...${address.slice(
        length - trimLength,
        length,
      )}`;
    },
    GetPriceInUsd(amount) {
      return (amount * this.getPrice).toFixed(2);
    },
  },
});
