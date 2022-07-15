<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElCard class="o-card" v-bind="attrs">
    <slot name="header"></slot>
    <slot></slot>
  </ElCard>
</template>

<style lang="scss">
.o-card {
  --o-font-color: var(--o-color-text2);
  --o-card-bg-color: var(--o-color-bg);
  --o-card-border-color: var(--o-color-border);

  &.el-card {
    color: var(--o-font-color);
    border-radius: 0;
    background-color: var(--o-card-bg-color);
    border: none;

    &.is-always-shadow {
      box-shadow: var(--o-shadow-base);
    }

    &.is-hover-shadow {
      &:hover,
      &:focus {
        box-shadow: var(--o-shadow-base_hover);
      }
    }
  }
}

:deep(.el-card) {
  .el-card__header {
    border-bottom: 1px solid var(--o-card-border-color) !important;
  }
}
</style>
