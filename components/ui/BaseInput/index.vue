<template>
  <div
    :class="inputClass"
    class="base-input"
  >
    <validation-provider
      v-slot="{ errors }"
      :rules="rules"
      :vid="vid"
      :name="name"
    >
      <label
        v-if="label"
        class="base-input__label"
      >
        {{ label }}
      </label>
      <div
        class="base-input__control"
      >
        <div class="base-input__slot">
          <slot name="left" />
        </div>
        <input
          ref="baseInput"
          :value="value"
          :type="type"
          class="base-input__input"
          :class="{
            'base-input__short': short,
            'base-input__with-text': text
          }"
          :placeholder="placeholder"
          :autocomplete="autocomplete"
          @keyup.enter="$emit('enter')"
          @input="input"
          @change="$emit('change')"
          @focusout="$emit('focusout')"
        >
        <div
          v-if="value && isSearch"
          class="base-input__clear"
          @click="clear()"
        >
          <span class="icon-cross" />
        </div>
        <div class="base-input__slot">
          <slot name="right" />
        </div>
      </div>
      <div
        v-if="error"
        class="base-input__error"
      >
        {{ errors[0] }}
      </div>
    </validation-provider>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Boolean,
      default: true,
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    isSearch: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: [String, Object],
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    vid: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  computed: {
    isImg() {
      return !!this.$slots.left;
    },
    inputClass() {
      const {
        isDisabled,
      } = this;
      return [
        {
          'base-input_disabled': isDisabled,
        },
      ];
    },
  },
  methods: {
    input($event) {
      this.$emit('input', $event.target.value);
    },
    clear() {
      this.$emit('input', '');
      this.$emit('clear');
    },
    focus() {
      this.$refs.baseInput.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.base-input {
  position: relative;
  font-size: 18px;
  &__label {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 26px;
    color: #373583;
  }
  &__control {
    display: flex;
    align-items: center;
    width: 100%;
    height: 52px;
    padding: 0 15px;
    background: #FFFFFF;
    box-sizing: border-box;
    border-radius: 4px;
    transition: 0.2s ease-in-out;
    // &:hover {
    //   border-color: #807DC0;
    // }
    // &:focus-within {
    //   border-color:  #807DC0;
    // }
  }
  &__input {
    width: 100%;
    border: none;
    background: transparent;
    color: #373583;
    &::placeholder {
      font-size: 18px;
      color: #807DC0;
      opacity: 0.5;
    }
    &_no-img {
      margin: 0;
    }
  }
  &__input_uppercase {
    text-transform: uppercase;
    &::placeholder {
      text-transform: none;
    }
  }
  &__slot::v-deep {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    span {
      width: 24px;
      &:before {
        font-size: 24px;
      }
    }
  }
  &__error {
    display: flex;
    align-items: center;
    min-height: 20px;
    font-size: 12px;
    color: #EA3147;
    line-height: 100%;
  }
  &_disabled {
    .base-input {
      &__control {
        background: #F7F7F7;
        border: 1px solid #E9EAE9;
        pointer-events: none;
      }
      &__slot::v-deep {
        span {
          &:before {
            color: #A8ABA9;
          }
        }
      }
    }
  }
  &__title {
    position: relative;
    color: #A8ABA9;
    display: flex;
    justify-content: flex-end;
    max-width: 170px;
    width: 100%;
    margin: 0;
    cursor: text;
  }
  &__value {
    max-width: 160px;
    padding-right: 4px;
    word-break: keep-all;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__dollar {
    position: absolute;
    right: -10px;
  }
}
</style>
