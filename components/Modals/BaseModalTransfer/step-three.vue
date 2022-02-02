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
          {{ options.address }}
        </div>
      </div>
      <div class="info__usd usd">
        <div class="usd__title">
          Amount in USD
        </div>
        <div class="usd__amount">
          {{ options.amountUSD }}
        </div>
      </div>
      <div class="info__eth eth">
        <div class="eth__title">
          Amount in ETH
        </div>
        <div class="eth__amount">
          {{ options.amountETH }}
        </div>
      </div>
      <div class="info__fee fee">
        <div class="fee__title">
          Gas fee
        </div>
        <div class="fee__amount">
          {{ options.fee }}
        </div>
      </div>
      <div class="info__total total">
        <div class="total__title">
          Total
        </div>
        <div class="total__amount">
          {{ total }}
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
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
    }),
    total() {
      return (Number(this.options.amountUSD) + Number(this.options.fee)).toFixed(2);
    },
  },
  methods: {
    ...mapActions({
      transfer: 'web3/transfer',
    }),
    async sendTransfer() {
      const payload = {
        token: this.options.token.token,
        recipient: this.options.address,
        amount: this.options.amountETH,
      };
      await this.transfer(payload);
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
  .recipient, .usd, .eth, .fee, .total {
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
