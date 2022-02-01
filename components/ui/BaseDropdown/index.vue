<template>
  <div
    v-click-outside="closeDropdown"
    class="base-dropdown"
  >
    <div class="base-dropdown__label">
      {{ label }}
    </div>
    <div
      class="base-dropdown__head head"
      :class="classActive"
      @click="toggleDropdown()"
    >
      <div class="head__inner">
        <span class="base-dropdown__option">
          {{ defaultOption }}
        </span>
      </div>
    </div>
    <div
      v-if="isOptionVisible"
      class="base-dropdown__items"
    >
      <div class="base-dropdown__wrapper">
        <div
          v-for="(option, i) in options"
          :key="`base-dropdown__item_${i}`"
          class="base-dropdown__item item"
          @click="selectOption(option)"
        >
          <div class="item__inner">
            <span class="base-dropdown__option">
              {{ option.result.balance }} {{ option.result.symbol }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ClickOutside from 'vue-click-outside';

export default {
  directives: {
    ClickOutside,
  },
  props: {
    value: {
      type: [Number, Object, String],
      default: 0,
    },
    options: {
      type: Array,
      default: () => [],
    },
    active: {
      type: String,
      default: '',
    },
    iconClass: {
      type: String,
      default: '',
    },
    isLang: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    isOptionVisible: false,
    selectionOption: {},
  }),
  computed: {
    classActive() {
      const {
        isOptionVisible,
      } = this;
      return [
        {
          'base-dropdown__head_active': isOptionVisible === true,
        },
      ];
    },
    iconClasses() {
      const {
        iconClass,
      } = this;
      return [
        iconClass !== '' ? iconClass : 'icon-arrow-down',
      ];
    },
    defaultOption() {
      return Object.keys(this.selectionOption).length
        ? `${this.selectionOption.balance} ${this.selectionOption.symbol}`
        : `${this.options[0].result.balance} ${this.options[0].result.symbol}`;
    },
  },
  methods: {
    closeDropdown() {
      this.isOptionVisible = false;
    },
    selectOption(option) {
      this.$emit('input', option);
      this.selectionOption = option.result;
      this.isOptionVisible = false;
    },
    toggleDropdown() {
      this.isOptionVisible = !this.isOptionVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.base-dropdown {
  position: relative;
  width: 100%;
  font-weight: 500;
  font-size: 15px;
  line-height: 130%;
  color: #3148EA;
  margin-bottom: 20px;
  &__label {
    font-size: 18px;
    color: #373583;
    margin-bottom: 8px;
    min-width: 70px;
  }
  &__option {
    color: #373583;
    font-size: 18px;
    font-weight: 500;
    margin-right: 30px;
  }
  &__head {
    position: relative;
    display: flex;
    align-items: center;
    padding: 16px 15px;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    background-color: #fff;
    &_active .base-dropdown__icon {
      transform: rotate(180deg);
    }
  }
  .head {
    border: 1px solid transparent;
    &__inner {
      display: flex;
      align-items: center;
    }
    &:hover {
      border: 1px solid #3B38D0;
    }
  }
  &__wrapper {
    overflow-y: auto;
  }
  &__items {
    position: absolute;
    left: 0;
    top: 82px;
    display: flex;
    width: 100%;
    min-width: auto;
    flex-direction: column;
    background: #FFFFFF;
    box-shadow: 0 25px 35px rgba(70, 70, 76, 0.19);
    border-radius: 4px;
    z-index: 100;
  }
  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 12px;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    color: #46464C;
    &:hover {
      background: #F9F9F9;
    }
  }
  .item {
    &__inner {
      display: flex;
      align-items: center;
    }
  }
  &__icon {
    position: absolute;
    right: 15px;
    transition: 0.2s ease-in-out;
    &_lang {
      right: 8px;
      top: 17px;
      &:before {
        font-size: 18px !important;
        color: #515A5A !important;
        transition: 0.2s ease-in-out;
      }
    }
    &:before {
      font-size: 16px;
      color: #252C28;
      transition: 0.2s ease-in-out;
    }
  }
}
</style>
