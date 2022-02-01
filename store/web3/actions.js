import axios from 'axios';
import BigNumber from 'bignumber.js';
import {
  connectWallet,
  fetchContractData,
  sendTransaction,
  getUserAddress,
  shiftedBy,
  getFee,
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
  async allowance({ getters, commit, dispatch }, spender) {
    const tokens = getters.getTokenData;
    await Promise.all(tokens.map(async (token) => {
      const response = await fetchContractData('allowance', ERC20, token.token, [getUserAddress(), spender]);
      commit('setAllowance', {
        token: token.token,
        allowance: response,
      });
      console.log({
        token: token.token,
        allowance: response,
      });
    }));
  },
  async calcFee({
    getters, dispatch, commit, state,
  }, { token, spender, amount }) {
    const { allowance } = state.allowanceData.find((item) => item.token === token);
    console.log(allowance);
    const decimals = getters.getDecimalsByAddress(token);
    const convertAmount = new BigNumber(+amount).shiftedBy(+decimals).toString();
    if (amount > allowance) {
      const approveFee = await getFee(
        'approve', ERC20, token, [spender, convertAmount],
      );
      const converApproveFee = shiftedBy(approveFee, decimals, 1);
      commit('setApproveFee', converApproveFee);
    }
    const transferFee = await getFee(
      'transfer', ERC20, token, [spender, convertAmount],
    );
    const converTransferFee = shiftedBy(transferFee, decimals, 1);
    commit('setTransferFee', converTransferFee);
  },
  // async approve({ getters, commit }, { token, spender, amount }) {
  //   const decimals = getters.getDecimalsByAddress(token);
  //   const convertAmount = new BigNumber(+amount).shiftedBy(+decimals).toString();
  //   const fee = await getFee(
  //     'approve', ERC20, token, [spender, convertAmount],
  //   );
  //   await sendTransaction('approve', ERC20, token, [spender, convertAmount], { maxPriorityFeePerGas: fee, maxFeePerGas: fee });
  // },
};
