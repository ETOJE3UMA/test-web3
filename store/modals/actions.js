/* eslint-disable no-undef */
export default {
  show({ commit }, payload) {
    commit('setIsShow', true);
    commit('setCurrentModalKey', payload.key);
    commit('setOptions', payload);
  },
  hide({ commit }) {
    commit('setIsShow', false);
    commit('setCurrentModalKey', '');
    commit('setOptions', {});
  },
  setUnclosable({ commit }) {
    commit('setUnclosable');
  },
  showToast({ commit }, value) {
    const codeText = value?.code ? $nuxt.$t(`toasts.errors.${value.code}`) : $nuxt.$t('toasts.errors.0');
    this._vm.$bvToast.toast(value?.text || codeText, {
      title: value.title || $nuxt.$t('toasts.title'),
      variant: value.variant || 'danger',
      solid: true,
      toaster: value.toaster || 'b-toaster-bottom-right',
      appendToast: value.appendToast || false,
      autoHideDelay: value.delay || 5000,
    });
  },
};
