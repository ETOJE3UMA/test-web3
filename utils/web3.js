import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { output, error } from '~/utils/index';
import { ERC20 } from './abis';

let web3Wallet;
let userAddress;
let chainId;
let userBalance;

const expectedChainId = 4; // rinkeby

export const fetchContractData = async (method, abi, address, params) => {
  try {
    const Contract = new web3Wallet.eth.Contract(abi, address);
    return await Contract.methods[method].apply(this, params).call();
  } catch (e) {
    throw error(401, e);
  }
};

// Send transactions from web3
export const sendTransaction = async (method, abi, address, params) => {
  try {
    const Contract = new web3Wallet.eth.Contract(abi, address);
    const data = Contract.methods[method].apply(null, params).encodeABI();
    return web3Wallet.eth.sendTransaction({
      to: address,
      data,
      from: userAddress,
    });
  } catch (e) {
    throw error(400, e);
  }
};

export const changeNetwork = async () => {
  const { ethereum } = window;
  if (chainId !== expectedChainId) {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: Web3.utils.toHex(expectedChainId) }],
    });
  }
};

export const connectWallet = async () => {
  const { ethereum } = window;
  web3Wallet = new Web3(ethereum);
  if (await web3Wallet.eth.getCoinbase() === null) {
    await ethereum.enable();
  }
  userAddress = await web3Wallet.eth.getCoinbase();
  chainId = await web3Wallet.eth.net.getId();
  userBalance = web3Wallet.utils.fromWei(await web3Wallet.eth.getBalance(userAddress));
  await changeNetwork();
};

export const fetchTransactionHistory = async (token, symbol) => {
  try {
    const Contract = new web3Wallet.eth.Contract(ERC20, token);
    const history = await Contract.getPastEvents('AllEvents', { fromBlock: 0, toBlock: 'latest' });
    const filteredResult = history.filter((it) => !!it.event).map((item) => {
      const owner = item.returnValues?.owner?.toLowerCase() || '';
      const spender = item.returnValues?.spender?.toLowerCase() || '';
      const from = item.returnValues?.from?.toLowerCase() || '';
      const to = item.returnValues?.to?.toLowerCase() || '';
      const { transactionHash } = item;
      if (from.toLowerCase() === userAddress || to.toLowerCase() === userAddress
        || owner.toLowerCase() === userAddress || spender.toLowerCase() === userAddress
      ) {
        return {
          type: item.event,
          from: item.returnValues.from || item.returnValues.owner,
          to: item.returnValues.to || item.returnValues.spender,
          amount: item.returnValues.value,
          symbol,
          transactionHash,
        };
      }
      return null;
    }).filter((item) => item !== null);
    return filteredResult;
  } catch (e) {
    throw error(600, e);
  }
};

export const shiftedBy = (value, decimals, mode = 0) => {
  const decimalsInt = mode === 0 ? parseInt(decimals, 10) : -parseInt(decimals, 10);
  return new BigNumber(+value).shiftedBy(+decimalsInt).toString();
};

export const getWeb3 = () => web3Wallet;
export const getUserAddress = () => userAddress;
export const getUserBalance = () => userBalance;
