<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

const { frontmatter } = useData();
const isDoc = computed(() => {
  return !!frontmatter.value.doc;
});
</script>

<template>
  <AppHeader />
  <main><Content :class="{ markdown: isDoc }" /></main>
  <AppFooter />
</template>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  background-color: var(--o-color-bg2);
  margin-top: 80px;
  @media (max-width: 1100px) {
    margin-top: 48px;
  }
}
</style>
