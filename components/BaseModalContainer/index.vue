<template>
  <transition name="fade">
    <div
      v-if="isShow"
      class="base-modal"
      @mousedown.self="backgroundClick"
    >
      <component :is="currentModalKey" />
    </div>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex';
import modals from '@/store/modals/modals';

import BaseModalStatus from '@/components/Modals/BaseModalStatus';
import BaseModalDefault from '@/components/Modals/BaseModalDefault';
import BaseModalTransfer from '@/components/Modals/BaseModalTransfer';
import BaseModalTransferStepTwo from '@/components/Modals/BaseModalTransfer/step-two.vue';
import BaseModalTransferStepThree from '@/components/Modals/BaseModalTransfer/step-three.vue';

export default {
  components: {
    'base-modal-status': BaseModalStatus,
    'base-modal-default': BaseModalDefault,
    'base-modal-transfer': BaseModalTransfer,
    'base-modal-transfer-step-two': BaseModalTransferStepTwo,
    'base-modal-transfer-step-three': BaseModalTransferStepThree,
  },
  data: () => ({
    modals,
  }),
  computed: {
    ...mapGetters({
      isShow: 'modals/getIsShow',
      currentModalKey: 'modals/getCurrentModalKey',
      options: 'modals/getOptions',
    }),
  },
  methods: {
    backgroundClick() {
      if (!this.options.isUnclosable) {
        this.close();
      }
    },
    close() {
      this.$store.dispatch('modals/hide');
    },
  },
};
</script>
<style lang="scss" scoped>
.base-modal {
  @include modalKit;
}
</style>
