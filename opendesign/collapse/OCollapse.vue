<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElCollapse class="o-collapse" v-bind="attrs">
    <slot></slot>
  </ElCollapse>
</template>

<style lang="scss">
.o-collapse {
  --o-collapse-color-bg: var(--o-color-bg);
  --o-collapse-color-border: var(--o-color-brand);
  --o-collapse-color-text: var(--o-color-text2);
  --o-collapse-padding-left: var(--o-spacing-h6);
  --o-collapse-padding: var(--o-spacing-h8);
  --o-collapse-font-size: var(--o-font-size-h7);
  --o-collapse-line-height: var(--o-line-height-h7);
  --o-collapse-color-bg2: var(--o-color-bg2);

  &.el-collapse {
    border-left: 2px solid var(--o-collapse-color-border);
    .el-collapse-item__header {
      color: var(--o-collapse-color-text);
      padding-left: var(--o-collapse-padding-left);
      background-color: var(--o-collapse-color-bg);
      font-size: var(--o-collapse-font-size);
      line-height: var(--o-collapse-line-height);
    }
    .el-collapse-item__content {
      background-color: var(--o-collapse-color-bg2);
      color: var(--o-collapse-color-text);
      padding: var(--o-collapse-padding);
    }
  }
}
</style>
