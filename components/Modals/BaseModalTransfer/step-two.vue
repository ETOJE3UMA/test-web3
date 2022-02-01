<template>
  <base-modal-box class="transfer">
    <validation-observer
      v-slot="{ handleSubmit }"
      tag="div"
      class="transfer__content"
    >
      <div class="transfer__title">
        Transfer
      </div>
      <form @submit.prevent="handleSubmit(nextStep)">
        <base-input
          v-model="recipient"
          :placeholder="'Public addresses'"
          :label="'Send to'"
          rules="required"
          name="Send to"
          :is-disabled="true"
        >
          <template slot="left">
            <img
              class="transfer__slot-tick"
              src="@/assets/image/tick.svg"
              alt="tick"
            >
          </template>
          <template slot="option">
            <span
              class="transfer__option"
              @click="previosStep"
            >Change</span>
          </template>
        </base-input>
        <base-dropdown
          v-model="token"
          :value="token"
          :options="getTokens"
          :label="'Assets'"
        />
        <!-- TODO send maximum -->
        <div class="double__input">
          <base-input
            v-model="amountETH"
            :placeholder="token.result.symbol || getTokens[0].result.symbol"
            :label="'Amount'"
            :rules="{ required: true, regex: /^[+]?\d+(\.\d+)?$/ }"
            name="amount"
            type="number"
          >
            <template slot="right">
              {{ token.result.symbol || getTokens[0].result.symbol }}
            </template>
          </base-input>
          <!-- TODO reset when asset change -->
          <base-input
            v-model="amountUSD"
            :placeholder="'USD'"
            :is-disabled="true"
          >
            <template slot="right">
              USD
            </template>
          </base-input>
        </div>
        <base-input
          v-model="fee"
          :label="'Transaction fee'"
          :placeholder="'Transaction fee'"
          :is-disabled="true"
        />
        <div class="transfer__buttons">
          <!-- TODO fix cancel -->
          <base-btn
            :mode="'transparrent'"
            class="transfer__button"
            @click="CloseModal()"
          >
            Cancel
          </base-btn>
          <base-btn
            :mode="'blue'"
            :disabled="!recipient"
            class="transfer__button"
            type="submit"
          >
            Next
          </base-btn>
        </div>
      </form>
    </validation-observer>
  </base-modal-box>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getFee } from '~/utils/web3';

export default {
  data: () => ({
    amountETH: '',
    token: {
      result: {
        symbol: '',
        decimals: null,
        balance: null,
      },
      token: '',
    },
  }),
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
      getTokens: 'web3/getTokenData',
      getApproveFee: 'web3/getApproveFee',
      getTransferFee: 'web3/getTransferFee',
    }),
    recipient() {
      return this.GetShortAddress(this.options.address);
    },
    amountUSD() {
      return this.GetPriceInUsd(this.amountETH);
    },
    fee() {
      if (this.getApproveFee) {
        return this.getTransferFee;
      }
      return this.getApproveFee + this.getTransferFee;
    },
  },
  async mounted() {
    // eslint-disable-next-line prefer-destructuring
    this.token = await this.getTokens[0];
    await this.fetchAllowance();
    await this.fetchFee();
  },
  methods: {
    ...mapActions({
      allowance: 'web3/allowance',
      approve: 'web3/approve',
      calcFee: 'web3/calcFee',
    }),
    async fetchAllowance() {
      try {
        await this.allowance(this.options.address);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchFee() {
      try {
        const payload = {
          token: this.getTokens[0],
          spender: this.options.address,
          amount: this.amountETH,
        };
        await this.calcFee(payload);
      } catch (e) {
        console.log(e);
      }
    },
    async nextStep() {
      const payload = {
        token: this.token.token,
        spender: this.options.address,
        amount: this.amountETH,
      };
      await this.approve(payload);
    },
    previosStep() {
      this.ShowModal({
        key: 'base-modal-transfer',
      });
    },
  },
};
</script>

<style scoped lang="scss">
.transfer {
  padding: 20px;
  border-radius: 4px;
  min-width: 600px;
  &__buttons {
    display: flex;
    justify-content: space-around;
    column-gap: 20px;
  }
  .double__input {
    display: flex;
    align-items: flex-end;
    grid-gap: 20px;
  }
  &__slot-tick {
    margin-right: 10px;
  }
  &__title {
    margin-bottom: 15px;
    color: #373583;
    font-size: 21px;
    font-weight: 500;
  }
}
.base-modal {
  @include modalKit;
}
</style>
