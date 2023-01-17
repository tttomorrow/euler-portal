<script setup lang="ts">
import { useData } from 'vitepress';
import type { Component } from 'vue';
import { computed, onMounted, ref } from 'vue';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import LayoutBlog from '@/layouts/LayoutBlog.vue';
import LayoutNews from '@/layouts/LayoutNews.vue';
import LayoutShowcase from '@/layouts/LayoutShowcase.vue';
import LayoutMigration from '@/layouts/LayoutMigration.vue';
import LayoutAboutUs from '@/layouts/LayoutAboutUs.vue';

import categories from '@/data/common/category';
import { setStoreData } from './shared/login';

const { frontmatter } = useData();

const compMapping: {
  [name: string]: Component;
} = {
  blog: LayoutBlog,
  news: LayoutNews,
  showcase: LayoutShowcase,
  migration: LayoutMigration,
  'about-us': LayoutAboutUs,
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

// cookies使用提示
const isCookieTip = ref(false);
function onCookieClick() {
  isCookieTip.value = false;
  localStorage.setItem('euler-cookie', 'false');
}

onMounted(() => {
  const show = localStorage.getItem('euler-cookie');
  isCookieTip.value = show ? false : true;
  setStoreData();
});
</script>

<template>
  <AppHeader />
  <main>
    <component :is="comp" v-if="isCustomLayout"></component>
    <Content v-else />
  </main>
  <AppFooter :is-cookie-tip="isCookieTip" @click-cookie="onCookieClick" />
</template>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  position: relative;
  min-height: calc(100vh - 259px);
  background-color: var(--o-color-bg1);
  padding-top: 80px;
  overflow: hidden;

  @media (max-width: 1100px) {
    padding-top: 48px;
  }
}
</style>
