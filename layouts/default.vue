<template>
  <div class="primary">
    <div class="primary__template template">
      <Header />
      <div class="template__content">
        <nuxt />
      </div>
    </div>
    <base-modal-container />
    <loader-screen />
  </div>
</template>
<script>
import Header from '@/components/Header';

export default {
  components: {
    Header,
  },
};
</script>
<style lang="scss" scoped>
.primary {
  background-color: #F8F8F8;
  height: 100vh;
  overflow-y: auto;
  &__template {
    height: 100%;
    display: grid;
    grid-template-rows: 100px 1fr auto;
  }
}

.template {
  height: 100%;
  min-height: 100vh;
  overflow: auto;
}
</style>
