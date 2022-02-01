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
          :label="'Add repicient'"
          rules="required|validAddress"
          name="recipient"
          is-address
        />
        <div class="transfer__buttons">
          <base-btn
            :mode="'transparrent'"
            class="transfer__button"
            type="button"
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
    recipient: '',
  }),
  computed: {
    ...mapGetters({
      options: 'modals/getOptions',
    }),

  },
  methods: {
    nextStep() {
      this.ShowModal({
        key: 'base-modal-transfer-step-two',
        address: this.recipient,
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
