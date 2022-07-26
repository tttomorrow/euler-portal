<script setup lang="ts">
import { computed, useAttrs } from 'vue';

const attrs = useAttrs();

const classNames = computed(() => {
  return `${attrs['custom-class']} o-drawer`;
});
</script>

<template>
  <ElDrawer v-bind="attrs" :custom-class="classNames">
    <template #header>
      <slot name="header"></slot>
    </template>

    <slot></slot>

    <template #footer>
      <slot name="footer"></slot>
    </template>
  </ElDrawer>
</template>
