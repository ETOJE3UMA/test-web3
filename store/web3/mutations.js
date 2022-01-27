export default {
  setIsConnected(state, payload) {
    state.isConnected = payload;
  },
  setPriceInUsd(state, payload) {
    state.priceInUsd = payload;
  },
  setTokenData(state, payload) {
    state.tokenData.push(payload);
  },
};
