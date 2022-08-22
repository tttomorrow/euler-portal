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
  --o-pagination-font-color_active: var(--e-color-brand1);

  --o-pagination-bg-color: var(--e-color-text5);
  --o-pagination-bg-color_hover: var(--e-color-brand5);
  --o-pagination-bg-color_selected: var(--e-color-brand5);

  --o-pagination-number-border-color_active: var(--e-color-brand1);

  &.el-pagination {
    justify-content: center;
    .el-pagination__sizes {
      margin: 0 var(--o-spacing-h8) 0 0;
    }
    .el-input {
      --el-input-bg-color: var(--o-pagination-bg-color);
      --el-input-text-color: var(--o-pagination-font-color);
    }
    .el-input__wrapper {
      border-radius: 0px;
      box-shadow: none;
      height: 36px;
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
      height: 36px;
      width: 36px;
      &:hover {
        color: var(--e-color-text2) !important;
        background-color: var(--o-pagination-font-color_active);
      }
    }
    .el-pager li.is-active.number {
      background: var(--o-pagination-font-color_active);
      color: var(--e-color-text2);
      font-weight: 400;
      font-size: var(--o-font-size-text);
    }
    .btn-next,
    .btn-prev {
      width: 36px;
      height: 36px;
      color: var(--o-pagination-font-color);
      border-radius: 0px;
      background: var(--o-pagination-bg-color);
    }
    .btn-prev:disabled {
      background: var(--e-color-text5);
    }
    .btn-next {
      margin-right: var(--o-spacing-h5) !important;
    }
    .btn-next:disabled {
      background: var(--e-color-text5);
    }

    .el-pagination__jump {
      height: 36px;
      font-size: var(--o-font-size-text);
      font-weight: 400;
      line-height: var(--o-line-height-text);
      color: var(--e-color-neutral8);
      border-radius: 0px;
      margin-left: var(--o-spacing-h4);
      .el-input__wrapper {
        flex-grow: 0.273;
      }
    }
  }
}
.o-pagination-popper {
  &.el-popper {
    box-shadow: none !important;
    --el-popper-border-radius: none;
    border: none;
    // .is-light {
    //   // border: 1px solid red;
    // }
    .el-popper__arrow {
      display: none;
    }

    .el-select-dropdown__item {
      color: var(--e-color-text1);

      &:hover {
        color: var(--e-color-brand1);
        background: var(--e-color-bg1);
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
