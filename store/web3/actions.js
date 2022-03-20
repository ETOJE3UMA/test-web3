import axios from 'axios';
import BigNumber from 'bignumber.js';
import {
  connectWallet,
  fetchContractData,
  sendTransaction,
  getUserAddress,
  shiftedBy,
  fetchTransactionHistory,
} from '~/utils/web3';
import { ERC20 } from '~/utils/abis';

export default {

  async connectWallet({ commit, dispatch }) {
    await connectWallet();
    commit('setIsConnected', true);
    dispatch('getTokens');
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

  async allowance({ getters, commit }, spender) {
    const tokens = getters.getTokenData;
    await Promise.all(tokens.map(async (token) => {
      const response = await fetchContractData('allowance', ERC20, token.token, [getUserAddress(), spender]);
      commit('setAllowance', {
        token: token.token,
        allowance: response,
      });
    }));
  },

  async approve({ getters }, { token, spender, amount }) {
    const decimals = getters.getDecimalsByAddress(token);
    const convertAmount = new BigNumber(+amount).shiftedBy(+decimals).toString();
    const fee = getters.getFee;
    await sendTransaction('approve', ERC20, token, [spender, convertAmount], { maxPriorityFeePerGas: fee, maxFeePerGas: fee });
  },

  async transfer({ getters }, { token, recipient, amount }) {
    const fee = getters.getFee;
    const decimals = getters.getDecimalsByAddress(token);
    const convertAmount = new BigNumber(+amount).shiftedBy(+decimals).toString();
    await sendTransaction('transfer', ERC20, token, [recipient, convertAmount], { maxPriorityFeePerGas: fee, maxFeePerGas: fee });
  },

  async transactionsHistory({ commit, getters }) {
    const tokens = getters.getTokenData;
    await Promise.all(tokens.map(async (token) => {
      const response = await fetchTransactionHistory(token.token, token.result.symbol, token.result.decimals);
      commit('setTransactions', response);
    }));
  },
};
