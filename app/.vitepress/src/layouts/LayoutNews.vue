<script setup lang="ts">
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';
import AppMdHead from './AppMdHead.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

const { frontmatter, lang } = useData();
const i18n = useI18n();
const newsInfo = {
  link: `/${lang.value}/interaction/news-list/`,
  name: i18n.value.common.NAV_ROUTER.NEWS,
};
</script>

<template>
  <div class="bread">
    <BreadCrumbs
      :bread1="newsInfo.name"
      :bread2="frontmatter.title"
      :link1="newsInfo.link"
    />
  </div>
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
.bread {
  margin: 0 var(--o-spacing-h5);
}
</style>
