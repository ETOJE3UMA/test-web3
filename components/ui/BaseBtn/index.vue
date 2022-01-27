<template>
  <a
    v-if="link !== ''"
    class="base-btn"
    :class="btnClass"
    :href="link"
    target="_blank"
  >
    <slot />
  </a>
  <nuxt-link
    v-else-if="nuxtLink !==''"
    class="base-btn"
    :class="btnClass"
    :to="nuxtLink"
  >
    <slot />
  </nuxt-link>
  <button
    v-else
    class="base-btn"
    :class="btnClass"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
<script>
export default {
  props: {
    link: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: '',
    },
    nuxtLink: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    btnClass() {
      const { mode, disabled } = this;
      return [
        { 'base-btn_disabled': mode === 'disabled' || disabled },
        { 'base-btn_transparrent': mode === 'transparrent' },
        { 'base-btn_blue': mode === 'blue' },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
.base-btn {
  padding: 0 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  font-weight: 500;
  width: 100%;
  &_transparrent {
    color: #4C4AA1;
    background: transparent;
    border: 1px solid #4C4AA1;
    border-radius: 4px;
    padding: 5px 0;
  }
  &_blue {
    color: #FFF;
    background: #3B38D0;
    border: 1px solid #4C4AA1;
    border-radius: 4px;
    padding: 5px 0;
  }
}
</style>
