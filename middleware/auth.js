export default function auth({ store, redirect }) {
  if (!store.getters['web3/getIsConnected']) {
    redirect('/login');
  }
}
