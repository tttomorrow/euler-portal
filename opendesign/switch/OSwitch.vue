<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <el-switch class="o-switch" v-bind="attrs"></el-switch>
</template>

<style lang="scss">
.o-switch {
  &__label {
    color: var(--o-color-text3) !important;
  }
  &__label.is-active {
    color: var(--o-color-text2) !important;
    font-weight: 600;
  }
}
</style>
