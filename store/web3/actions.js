import { connectWallet } from '~/utils/web3';

export default {
  async connectWallet({ commit }) {
    const response = await connectWallet();
    if (!response.ok) {
      console.log(response);
      return;
    }
    commit('setIsConnected', true);
  },
};
