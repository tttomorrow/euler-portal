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
  --o-card-font-color: var(--e-color-text1);
  --o-card-bg-color: var(--e-color-bg2);
  --o-card-division-color: var(--e-color-division1);

  &.el-card {
    color: var(--o-card-font-color);
    border-radius: 0;
    background-color: var(--o-card-bg-color);
    transition: none;
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

    .el-card__header {
      border-bottom: 1px solid var(--o-card-division-color);
    }
  }
}
</style>
