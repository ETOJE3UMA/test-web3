export const output = (res) => ({
  ok: true,
  result: res,
});

export const error = (code, data) => {
  // eslint-disable-next-line no-undef
  $nuxt.$store.dispatch('modals/showToast', {
    code: code || 0,
  });
  return {
    ok: false,
    code, // eslint-disable-next-line no-undef
    msg: $nuxt.$t(`toasts.errors.${code || 0}`),
    data,
  };
};
