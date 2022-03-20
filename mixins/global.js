import Vue from 'vue';
import { mapActions } from 'vuex';
import { getUserBalance } from '~/utils/web3';

Vue.mixin({
  computed: {
    GetBalance() {
      return Number(getUserBalance()).toFixed(6);
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
  },
});
