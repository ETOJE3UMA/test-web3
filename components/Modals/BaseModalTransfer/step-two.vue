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
            v-model="amount"
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
        </div>
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
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    amount: null,
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
    }),
    recipient() {
      return this.GetShortAddress(this.options.address);
    },
  },
  async mounted() {
    this.SetLoader(true);
    // eslint-disable-next-line prefer-destructuring
    this.token = await this.getTokens[0];
    this.SetLoader(false);
  },
  methods: {
    nextStep() {
      // eslint-disable-next-line eqeqeq
      if (this.amount == 0 || this.amount >= this.token.result.balance) {
        this.ShowToast('Error');
      } else {
        this.ShowModal({
          key: 'base-modal-transfer-step-three',
          address: this.options.address,
          amount: this.amount,
          token: this.token,
        });
      }
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
