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
main {
  margin: 80px auto 0;
  @media (max-width: 1100px) {
    margin-top: 48px;
  }
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
