<script setup lang="ts">
import { toRefs, computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'large',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placement: {
    type: String,
    default: '',
  },
  plain: {
    type: Boolean,
    default: false,
  },
});

const { size, type, disabled, placement, plain } = toRefs(props);

// 状态
const buttonType = ['primary', ' ', 'warning ', 'danger', 'info', 'text'];
const types = computed(() =>
  buttonType.includes(type.value) ? `o-button--${type.value}` : ''
);

// 大小
const buttonSize = ['large', 'small', 'normal'];
const sizes = computed(() =>
  buttonSize.includes(size.value) ? `o-button--${size.value}` : ''
);

// 禁用
const isDisabled = computed(() => (disabled.value ? `o-button--disabled` : ''));

// 是否为朴素按钮
const isPlain = computed(() => (plain.value ? `o-button--plain` : ''));

// 位置
const site = ['left', 'right'];
const placementSite = computed(() =>
  site.includes(placement.value) ? `o-button--${placement.value}` : ''
);
</script>

<template>
  <button
    class="o-button"
    :class="[sizes, placementSite, isDisabled, types, isPlain]"
  >
    <div class="o-button-wrap">
      <slot name="left" />
      <slot></slot>
      <slot name="right" />
    </div>
  </button>
</template>

<style lang="scss" scoped>
.o-button {
  padding: 12px 28px;
  line-height: 24px;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid var(--e-color-brand1);
  color: var(--e-color-brand1);
  display: inline-flex;
  align-items: center;
  outline: none;
  cursor: pointer;
  transition: color 0.2s, background-color 0.3s, border-color 0.3s;
  border-radius: 0;
  box-sizing: border-box;
  white-space: nowrap;
  &:hover {
    border: 1px solid var(--e-color-brand2);
    color: var(--e-color-brand2);
  }
  &--large {
    height: 48px;
  }
  &--normal {
    height: 32px;
    padding: 5px 16px;
    line-height: 22px;
  }
  &--left {
    padding: 12px 28px 12px 20px;
    :deep(.o-icon) {
      margin-right: 8px;
    }
  }
  &--right {
    padding: 12px 20px 12px 28px;
    :deep(.o-icon) {
      margin-left: 8px;
      transition: all 0.2s linear;
      color: var(--e-color-brand1);
    }
    &:hover {
      :deep(.o-icon) {
        -webkit-transform: translateX(4px);
        transform: translateX(4px);
        color: var(--e-color-brand2);
      }
    }
  }
  &-wrap {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &--text {
    border-color: transparent;
    min-width: auto;
    padding: 0 !important;
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    &:hover {
      color: var(--e-color-brand1) !important;
    }
  }
  &--primary {
    color: #ffffff;
    border-color: var(--e-color-brand1);
    background-color: var(--e-color-brand1);
    &:hover,
    &:active {
      border-color: var(--e-color-brand2);
      background-color: var(--e-color-brand2);
      color: #ffffff;
      :deep(.o-icon) {
        color: #ffffff;
      }
    }
    &.is-disabled,
    &.is-disabled:hover {
      color: var(--e-color-text4);
      background-color: var(--o-color-disabled);
      border-color: var(--o-color-disabled);
    }
    span {
      white-space: nowrap;
    }
    :deep(.o-icon) {
      color: #ffffff;
    }
  }
  &--plain {
    color: var(--e-color-brand1);
    border-color: var(--e-color-brand1);
    &:hover,
    &:active {
      border-color: var(--e-color-brand2);
      background-color: var(--e-color-brand2);
      color: #ffffff;
    }
  }
  &.is-disabled,
  &.is-disabled:hover {
    color: var(--e-color-text4);
    background-color: var(--o-color-disabled);
    border-color: var(--o-color-disabled);
    cursor: not-allowed;
  }
  :deep(.o-icon) {
    font-size: 24px;
    display: inline-flex;
  }
}
@media (max-width: 1100px) {
  .o-button {
    &--large {
      height: 32px;
      min-width: auto;
      font-size: 12px;
      padding: 8px 12px;
    }

    :deep(.o-icon) {
      font-size: 16px !important;
    }
  }
}
</style>
