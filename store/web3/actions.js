import axios from 'axios';
import {
  connectWallet, fetchContractData, getUserAddress, shiftedBy,
} from '~/utils/web3';
import { ERC20 } from '~/utils/abis';

const { COINGECKO } = process.env;

export default {
  async connectWallet({ commit, dispatch }) {
    const response = await connectWallet();
    if (!response.ok) {
      console.log(response);
      return;
    }
    commit('setIsConnected', true);
    dispatch('getTokens');
  },
  async getUsdPrice({ commit }) {
    const response = await axios.get(`${COINGECKO}/simple/price?ids=ethereum&vs_currencies=usd`);
    commit('setPriceInUsd', response.data.ethereum.usd);
    return response.data.ethereum.usd;
  },
  async getTokens({ commit }) {
    const tokens = [
      process.env.CFI_TOKEN,
      process.env.VEE_TOKEN,
      process.env.USDT_TOKEN,
      process.env.DLD_TOKEN,
      process.env.SCHZ_TOKEN,
    ];
    tokens.forEach(async (token) => {
      const symbol = await fetchContractData('symbol', ERC20, token);
      const tokenBalance = await fetchContractData('balanceOf', ERC20, token, [getUserAddress()]);
      const decimals = await fetchContractData('decimals', ERC20, token);
      commit('setTokenData', {
        result: {
          symbol, balance: shiftedBy(tokenBalance, decimals, 1), decimals, allowance: '0',
        },
        token,
      });
    });
  },
};
