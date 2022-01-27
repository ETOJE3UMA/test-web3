import Vue from 'vue';

Vue.mixin({
  methods: {
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
