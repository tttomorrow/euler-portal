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
  --o-tabs-font: var(--e-color-text1);
  --o-tabs-color: var(--e-color-text1);
  --o-tabs-color_hover: var(--e-color-brand1);
  --o-font-color: var(--o-tabs-font);
  .el-tabs__nav-wrap {
    &::after {
      display: none;
    }
    .el-tabs__item {
      color: var(--o-tabs-color);
      &:hover {
        color: var(--o-tabs-color_hover);
      }
    }
    .el-tabs__item.is-active {
      color: var(--o-tabs-color_hover);
    }
  }
  @media screen and (max-width: 768px) {
    .el-tabs__nav-wrap {
      .el-tabs__item {
        padding: 0 var(--o-spacing-h8);
      }
    }
    // .el-tabs__nav {
    //   height: 35px;
    // }
  }
}
</style>
