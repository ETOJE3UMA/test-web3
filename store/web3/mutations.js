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
  setAllowance(state, payload) {
    state.allowanceData.push(payload);
  },
  setApproveFee(state, payload) {
    state.approveFee = payload;
  },
  setTransferFee(state, payload) {
    state.transferFee = payload;
  },
};
