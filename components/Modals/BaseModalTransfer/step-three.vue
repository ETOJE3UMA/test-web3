<template>
  <base-modal-box class="transfer">
    <div class="transfer__title">
      Transfer
    </div>
    <div class="transfer__info info">
      <div class="info__recipient recipient">
        <div class="recipient__title">
          Confirm send to
        </div>
        <div class="recipient__address">
          {{ recipient }}
        </div>
      </div>
      <div class="info__eth eth">
        <div class="eth__title">
          Amount {{ options.token.result.symbol }}
        </div>
        <div class="eth__amount">
          {{ options.amount }}
        </div>
      </div>
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
        class="transfer__button"
        @click="sendTransfer"
      >
        Confirm
      </base-btn>
    </div>
  </base-modal-box>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      isTransferInProgress: false,
    };
  },
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
    }),
    total() {
      return (Number(this.options.amountUSD) + Number(this.options.fee)).toFixed(2);
    },
    recipient() {
      return this.GetShortAddress(this.options.address);
    },
  },
  methods: {
    ...mapActions({
      transfer: 'web3/transfer',
    }),
    async sendTransfer() {
      try {
        const payload = {
          token: this.options.token.token,
          recipient: this.options.address,
          amount: this.options.amount,
        };
        this.SetLoader(true);
        await this.transfer(payload);
        this.SetLoader(false);
        this.CloseModal();
      } catch (e) {
        this.SetLoader(false);
        this.ShowToast(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.transfer {
  padding: 20px;
  border-radius: 4px;
  min-width: 600px;
  background-color: #F8F8F8;
  .info {
    width: 100%;
  }
  .recipient, .eth {
    padding: 32px;
    border-bottom: 1px solid #E4E3FF;
    display: flex;
    justify-content: space-between;
    &__title, &__amount, &__address {
      color: #373583;
      font-size: 18px;
      font-weight: 500;
    }
  }
  &__buttons {
    display: flex;
    justify-content: space-around;
    column-gap: 20px;
    margin-top: 16px;
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
