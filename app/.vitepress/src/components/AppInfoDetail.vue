<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';

import BannerLevel3 from '@/components/BannerLevel3.vue';
import AppMdHead from './AppMdHead.vue';

const { frontmatter } = useData();
const isDoc = computed(() => {
  return !!frontmatter.value.doc;
});
const title = computed(() => {
  return frontmatter.value.title || frontmatter.value.company;
});
const subtitle = computed(() => {
  return frontmatter.value.summary || frontmatter.value.subtitle;
});

// 新闻、博客详情页
const isInfo = computed(() => {
  return (
    frontmatter.value.module === 'blog' || frontmatter.value.module === 'news'
  );
});
</script>

<template>
  <div class="layout">
    <BannerLevel3
      v-if="frontmatter.banner"
      :background-image="frontmatter.banner"
      :title="title"
      :subtitle="subtitle"
    />
    <div
      class="makdown-wrap"
      :class="{ news: frontmatter.module === 'news', markdown: isInfo }"
    >
      <AppMdHead v-if="isInfo" :frontmatter="frontmatter" />
      <Content :class="{ markdown: isDoc }" />
    </div>
  </div>
</template>

<style lang="scss"></style>
