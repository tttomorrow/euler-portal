<script setup lang="ts">
import { useData } from 'vitepress';
import type { Component } from 'vue';
import { computed } from 'vue';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import LayoutBlog from '@/layouts/LayoutBlog.vue';
import LayoutNews from '@/layouts/LayoutNews.vue';
import LayoutShowcase from '@/layouts/LayoutShowcase.vue';
import LayoutMigration from '@/layouts/LayoutMigration.vue';

import categories from '@/data/category';

const { frontmatter } = useData();

const compMapping: {
  [name: string]: Component;
} = {
  blog: LayoutBlog,
  news: LayoutNews,
  showcase: LayoutShowcase,
  migration: LayoutMigration,
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
// const isShowTip = ref(true);
// function clickClose() {
//   isShowTip.value = false;
//   localStorage.setItem('euler-cookie', 'false');
// }
// onMounted(() => {
//   const show = localStorage.getItem('euler-cookie');
//   isShowTip.value = show ? false : true;
// });
// AppHeader :is-show-tip="isShowTip" @click-close="clickClose"
// main :class="{ cookie: isShowTip }"
</script>

<template>
  <AppHeader />
  <main>
    <component :is="comp" v-if="isCustomLayout"></component>
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
  position: relative;
  min-height: calc(100vh - 258px);
  background-color: var(--e-color-bg1);
  margin-top: 80px;
  overflow: hidden;
  &.cookie {
    margin-top: 140px;
    @media (max-width: 1100px) {
      margin-top: 108px;
    }
  }
  @media (max-width: 1100px) {
    margin-top: 48px;
  }
}
</style>
