<template>
  <base-modal-box class="transfer">
    <validation-observer
      v-slot="{ handleSubmit }"
      tag="div"
      class="transfer__content"
    >
      <base-input
        v-model="recipient"
        :placeholder="'hello'"
        :label="'Add repicient'"
      />
      <div class="transfer__buttons">
        <base-btn
          :mode="'transparrent'"
          class="transfer__button"
          @click="close"
        >
          Cancel
        </base-btn>
        <base-btn
          :mode="'blue'"
          :disabled="!recipient"
          class="transfer__button"
          @click="handleSubmit(addTicket)"
        >
          Next
        </base-btn>
      </div>
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
};
</script>

<style scoped lang="scss">
.transfer {
  padding: 20px;
  border-radius: 4px;
  &__buttons {
    display: flex;
    justify-content: space-around;
    column-gap: 20px;
  }
  // &__button {
  //   margin: 0 10px;
  // }
}
.base-modal {
  @include modalKit;
}
</style>
