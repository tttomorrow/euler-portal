<script setup lang="ts">
import { useData } from 'vitepress';
import AppMdHead from './AppMdHead.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

const { frontmatter, lang, theme: i18n } = useData();
const blogInfo = {
  link: `/${lang.value}/blog/`,
  name: i18n.value.common.NAV_ROUTER.BLOG,
};
</script>

<template>
  <BreadCrumbs
    :bread1="blogInfo.name"
    :bread2="frontmatter.title"
    :link1="blogInfo.link"
  />
  <div class="makdown-wrap markdown">
    <AppMdHead :frontmatter="frontmatter" />
    <Content />
  </div>
</template>

<style lang="scss" scoped></style>
