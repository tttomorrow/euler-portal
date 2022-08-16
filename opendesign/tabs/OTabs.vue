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
  --o-font-color: var(--e-color-text1);
  .el-tabs__nav-wrap {
    &::after {
      display: none;
    }
    .el-tabs__item {
      color: var(--o-font-color);
      &:hover {
        color: var(--e-color-brand1);
      }
    }
  }
}
</style>
