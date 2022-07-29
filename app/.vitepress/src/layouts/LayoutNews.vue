<script setup lang="ts">
import { useData } from 'vitepress';
import AppMdHead from './AppMdHead.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

const { frontmatter, lang, theme: i18n } = useData();
const newsInfo = {
  link: `/${lang.value}/news/`,
  name: i18n.value.common.NAV_ROUTER.NEWS,
};
</script>

<template>
  <BreadCrumbs
    :bread1="newsInfo.name"
    :bread2="frontmatter.title"
    :link1="newsInfo.link"
  />
  <div class="makdown-wrap markdown">
    <div class="news-markdown-detail">
      <AppMdHead :frontmatter="frontmatter" />
      <Content />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news-markdown-detail {
  max-width: 880px;
  margin: 0 auto;
}
</style>
