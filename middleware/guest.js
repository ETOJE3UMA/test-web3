export default function guest({ store, redirect }) {
  if (store.getters['web3/getIsConnected']) {
    redirect('/wallet');
  }
}
