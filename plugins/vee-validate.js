import Vue from 'vue';

import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
  setInteractionMode,
} from 'vee-validate';

import * as rules from 'vee-validate/dist/rules';
import { getWeb3 } from '~/utils/web3';

Vue.component('validation-provider', ValidationProvider);
Vue.component('validation-observer', ValidationObserver);
setInteractionMode('eager');

Object.keys(rules).forEach((rule) => {
  extend(rule, {
    ...rules[rule],
  });
});

extend('validAddress', {
  validate: (value) => {
    const isValidAddress = getWeb3().utils.isAddress(value.toLowerCase());
    return {
      valid: isValidAddress,
    };
  },
});

export default ({ app }) => {
  configure({
    defaultMessage: (_field_, values) => app.i18n.t(`messages.${values._rule_}`, values),
  });
};
