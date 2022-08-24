<script setup lang="ts">
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';
import AppMdHead from './AppMdHead.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

const { frontmatter, lang } = useData();
const i18n = useI18n();
const blogInfo = {
  link: `/${lang.value}/interaction/blog-list/`,
  name: i18n.value.common.NAV_ROUTER.BLOG,
};
</script>

<template>
  <div class="bread">
    <BreadCrumbs
      :bread1="blogInfo.name"
      :bread2="frontmatter.title"
      :link1="blogInfo.link"
    />
  </div>

  <div class="makdown-wrap markdown">
    <AppMdHead :frontmatter="frontmatter" />
    <Content />
  </div>
</template>

<style lang="scss" scoped>
.bread {
  margin: 0 var(--o-spacing-h5);
}
</style>
