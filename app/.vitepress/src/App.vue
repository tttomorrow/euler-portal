<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import AppInfoDetail from '@/components/AppInfoDetail.vue';

const { frontmatter } = useData();
const isDoc = computed(() => {
  return !!frontmatter.value.doc;
});
const isCustomLayout = computed(() => !!frontmatter.value.customLayout);
</script>

<template>
  <AppHeader />
  <main>
    <AppInfoDetail v-if="isCustomLayout" />
    <Content v-else :class="{ markdown: isDoc }" />
  </main>
  <AppFooter />
</template>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  background-color: var(--o-color-bg2);
  padding-top: 80px;
  padding-bottom: var(--o-spacing-h1);
  @media (max-width: 1100px) {
    padding-top: 48px;
    padding-bottom: var(--o-spacing-h2);
  }
}
</style>
