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
          :mode="'border-green'"
          class="transfer__button"
          @click="close"
        >
          Cancel
        </base-btn>
        <base-btn
          :disabled="sendStatus"
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
}
.base-modal {
  @include modalKit;
}
</style>
