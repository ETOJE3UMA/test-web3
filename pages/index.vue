<template>
  <div class="">
    <!-- <button
      class="btn btn-primary"
      @click="handleConnectWallet()"
    >
      connect
    </button>
    <div>
      isConnected: {{ isConnected }}
    </div> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  middleware: 'auth',
  computed: {
    ...mapGetters({
      isConnected: 'web3/getIsConnected',
    }),
  },
  methods: {
    ...mapActions({
      connectWallet: 'web3/connectWallet',
    }),
    async handleConnectWallet() {
      await this.connectWallet();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
