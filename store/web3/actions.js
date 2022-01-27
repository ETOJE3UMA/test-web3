import axios from 'axios';
import { connectWallet } from '~/utils/web3';

const { COINGECKO } = process.env;

export default {
  async connectWallet({ commit }) {
    const response = await connectWallet();
    if (!response.ok) {
      console.log(response);
      return;
    }
    commit('setIsConnected', true);
  },
  async getUsdPrice({ commit }) {
    const response = await axios.get(`${COINGECKO}/simple/price?ids=ethereum&vs_currencies=usd`);
    commit('setPriceInUsd', response.data.ethereum.usd);
    return response.data.ethereum.usd;
  },
};
