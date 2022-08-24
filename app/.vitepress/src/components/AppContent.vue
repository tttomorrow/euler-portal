<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  mobileTop: {
    type: Number,
    default: 40,
  },
});

const mobileTopPaddingTop = computed(() => {
  return props.mobileTop + 'px';
});
</script>

<template>
  <div class="app-content"><slot></slot></div>
</template>

<style lang="scss" scoped>
.app-content {
  padding-top: var(--o-spacing-h1);
  padding-bottom: var(--o-spacing-h1);
  padding-left: 44px;
  padding-right: 44px;
  max-width: 1504px;
  margin: 0 auto;
  @media (max-width: 1100px) {
    padding-left: 16px;
    padding-right: 16px;
    padding-top: v-bind('mobileTopPaddingTop');
    padding-bottom: var(--o-spacing-h2);
  }
}
</style>
