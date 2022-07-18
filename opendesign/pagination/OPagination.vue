<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElPagination popper-class="filter" class="o-pagination" v-bind="attrs">
    <slot></slot>
  </ElPagination>
</template>

<style lang="scss" scoped>
.o-pagination {
  :deep.el-pagination {
    --el-pagination-button-bg-color: var(--o-color-secondary);
    .el-input {
      --el-input-bg-color: var(--o-color-secondary);
      --el-input-text-color: var(--o-color-base_inverse);
    }
    .el-input__wrapper {
      border-radius: 0px;
      box-shadow: none;
    }
    .el-select {
      --el-select-border-color-hover: none;
      --el-select-input-focus-border-color: none;
      & .el-input .el-select__caret {
        color: var(--o-color-base_inverse);
      }
    }
    .el-pager li {
      color: var(--o-color-base_inverse);
      border-radius: 0px;
      &:hover {
        background-color: var(--o-color-brand_disabled);
      }
    }
    .el-pager li.is-active.number {
      background: var(--o-color-brand_disabled);
      color: var(--o-color-brand_active);
      border: 1px solid var(--o-color-brand);
      font-weight: 400;
      font-size: var(--o-font-size-text);
    }
    .btn-next,
    .btn-prev {
      color: var(--o-color-base_inverse);
      border-radius: 0px;
      &:disabled {
        background: var(--o-color-secondary);
      }
    }
    .btn-next {
      margin-right: var(--o-spacing-s2);
    }
    .el-pagination__jump {
      color: var(--o-color-base_inverse);
      border-radius: 0px;
    }
  }
}
</style>
