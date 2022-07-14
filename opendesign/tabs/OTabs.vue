<script setup lang="ts">
import { useAttrs } from 'vue';
const attrs = useAttrs();
</script>

<template>
  <ElTabs class="o-tabs" v-bind="attrs">
    <slot> </slot>
  </ElTabs>
</template>

<style lang="scss">
.o-tabs {
  --o-font-color: var(--o-color-text2);
  .el-tabs__nav-wrap {
    &::after {
      display: none;
    }
    .el-tabs__item {
      color: var(--o-font-color);
      &:hover {
        color: var(--o-color-brand);
      }
    }
  }
}
</style>
