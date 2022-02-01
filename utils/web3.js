import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import Web4 from '@cryptonteam/web4';
import { output, error } from '~/utils/index';
import { ERC20 } from './abis';

let web4;
let web3Wallet;
let userAddress;
let chainId;
let userBalance;

export const fetchContractData = async (method, abi, address, params) => {
  try {
    const Contract = new web3Wallet.eth.Contract(abi, address);
    return await Contract.methods[method].apply(this, params).call();
  } catch (err) {
    console.log(err);
    return false;
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
    console.log(e);
    return false;
  }
};

// Send transactions from web4
export const createInst = async (abi, address) => {
  const abstracion = web4.getContractAbstraction(abi);
  return await abstracion.getInstance(address);
};

export const connectWallet = async () => {
  try {
    const { ethereum } = window; // ethereum - metamask
    web3Wallet = new Web3(ethereum); // init web3
    if (await web3Wallet.eth.getCoinbase() === null) { // проверяем подключен ли metamask
      await ethereum.enable(); // подключить metamask
    }
    userAddress = await web3Wallet.eth.getCoinbase(); // получить адрес пользователя
    chainId = await web3Wallet.eth.net.getId(); // запись сети
    userBalance = web3Wallet.utils.fromWei(await web3Wallet.eth.getBalance(userAddress)); // баланс пользователя
    // userBalance = web3Wallet.eth.toDecimal(userBalance);
    if (+chainId !== 4) {
      // TODO switch network request
      return error(500, 'current site work in rinkeby', chainId);
    }
    web4 = new Web4();
    await web4.setProvider(ethereum, userAddress);
    return output();
  } catch (err) {
    console.log(err);
    return error(500, 'err', err);
  }
};

export const getFee = async (
  method, abi, address, params,
) => {
  try {
    return await web3Wallet.eth.getGasPrice();
  } catch (e) {
    console.log(e);
    return '';
  }
};

export const shiftedBy = (value, decimals, mode = 0) => {
  const decimalsInt = mode === 0 ? parseInt(decimals, 10) : -parseInt(decimals, 10);
  return new BigNumber(+value).shiftedBy(+decimalsInt).toString();
};

export const getWeb3 = () => web3Wallet;
export const getUserAddress = () => userAddress;
export const getUserBalance = () => userBalance;
