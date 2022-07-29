<script setup lang="ts">
import { useData } from 'vitepress';
import { Component, computed } from 'vue';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import LayoutBlog from '@/layouts/LayoutBlog.vue';
import LayoutNews from '@/layouts/LayoutNews.vue';
import LayoutShowcase from '@/layouts/LayoutShowcase.vue';

import categories from '@/data/category';

const { frontmatter } = useData();

const compMapping: {
  [name: string]: Component;
} = {
  blog: LayoutBlog,
  news: LayoutNews,
  showcase: LayoutShowcase,
};

const isCustomLayout = computed(() => {
  return (
    !!frontmatter.value.category &&
    categories.indexOf(frontmatter.value.category) !== -1
  );
});
const comp = computed(() => {
  return compMapping[frontmatter.value.category];
});
</script>

<template>
  <AppHeader />
  <main>
    <component v-if="isCustomLayout" :is="comp"></component>
    <Content v-else />
  </main>
  <AppFooter />
</template>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  min-height: calc(100vh - 198px);
  background-color: var(--o-color-bg2);
  padding-top: 80px;
  padding-bottom: var(--o-spacing-h1);
  @media (max-width: 1100px) {
    padding-top: 48px;
    padding-bottom: var(--o-spacing-h2);
  }
}
</style>
