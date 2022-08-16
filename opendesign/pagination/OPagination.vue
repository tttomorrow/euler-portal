<script setup lang="ts">
import { useAttrs, computed } from 'vue';

const attrs = useAttrs();

const classNames = computed(() => {
  return `${attrs['popper-class']} o-pagination-popper`;
});
</script>

<template>
  <ElPagination class="o-pagination" v-bind="attrs" :popper-class="classNames">
    <slot></slot>
  </ElPagination>
</template>

<style lang="scss">
.o-pagination {
  --o-pagination-font-color: var(--e-color-text1);
  --o-pagination-font-color_active: var(--e-color-brand3);

  --o-pagination-bg-color: var(--e-color-bg4);
  --o-pagination-bg-color_hover: var(--e-color-brand5);
  --o-pagination-bg-color_selected: var(--e-color-brand5);
  --o-pagination-bg-color_disabled: var(--o-color-secondary);

  --o-pagination-number-border-color_active: var(--e-color-brand1);

  &.el-pagination {
    --el-pagination-button-bg-color: var(--o-pagination-bg-color_disabled);
    justify-content: center;
    .el-input {
      --el-input-bg-color: var(--o-pagination-bg-color);
      --el-input-text-color: var(--o-pagination-font-color);
    }
    .el-input__wrapper {
      border-radius: 0px;
      box-shadow: none;
    }
    .el-select {
      --el-select-border-color-hover: none;
      --el-select-input-focus-border-color: none;
      & .el-input .el-select__caret {
        color: var(--o-pagination-font-color);
      }
    }
    .el-select-dropdown__wrap {
      background-color: #000 !important;
    }
    .el-pager li {
      color: var(--o-pagination-font-color);
      background: var(--o-pagination-bg-color);
      border-radius: 0px;
      &:hover {
        color: var(--o-pagination-font-color);
        background-color: var(--e-color-brand5);
      }
    }
    .el-pager li.is-active.number {
      background: var(--e-color-brand5);
      color: var(--o-pagination-font-color);
      border: 1px solid var(--e-color-brand1);
      font-weight: 400;
      font-size: var(--o-font-size-text);
    }
    .btn-next,
    .btn-prev {
      color: var(--o-pagination-font-color);
      border-radius: 0px;
      background: var(--o-pagination-bg-color);
      &:disabled {
        background-color: var(--o-color-bg6) !important;
      }
    }
    .btn-next {
      margin-right: var(--o-spacing-h5);
    }

    .el-pagination__jump {
      color: var(--o-pagination-font-color);
      border-radius: 0px;
      margin-left: var(--o-spacing-h4);
    }
  }
}
.o-pagination-popper {
  &.el-popper {
    box-shadow: none !important;
    --el-popper-border-radius: none;

    .is-light {
      border: 1px solid red;
    }

    .el-popper__arrow {
      display: none;
    }

    .el-select-dropdown__item {
      color: var(--e-color-text1);

      &:hover {
        color: var(--e-color-brand1);
      }
    }

    .el-select-dropdown__item.selected {
      background-color: var(--e-color-bg1);
    }

    .el-select-dropdown__item.selected {
      font-weight: normal;
      color: var(--e-color-brand1);
    }

    .el-select-dropdown__wrap {
      background-color: var(--e-color-bg2);
    }
  }
}
</style>
