export default {
  getIsConnected: (state) => state.isConnected,
  getPriceInUsd: (state) => state.priceInUsd,
  getTokenData: (state) => state.tokenData,
  getAllowanceData: (state) => state.allowanceData,
  getDecimalsByAddress: (state) => (payload) => state.tokenData.find((item) => item.token === payload).result.decimals,
  getAllowanceByAddress: (state) => (payload) => state.allowanceData.find((item) => item.token === payload)?.allowance,
  getApproveFee: (state) => state.approveFee,
  getTransferFee: (state) => state.transferFee,
};
