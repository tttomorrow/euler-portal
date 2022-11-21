<script setup lang="ts">
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';

import BannerLevel3 from '@/components/BannerLevel3.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

const { frontmatter, lang } = useData();
const i18n = useI18n();
const blogInfo = {
  link: `/${lang.value}/showcase/`,
  name: i18n.value.showcase.bannerTitle,
};
</script>

<template>
  <div class="layout">
    <BannerLevel3
      v-if="frontmatter.banner"
      :background-image="frontmatter.banner"
      :title="frontmatter.title"
      :subtitle="frontmatter.subtitle"
    />
    <div class="bread">
      <BreadCrumbs
        :bread1="blogInfo.name"
        :bread2="frontmatter.title"
        :link1="blogInfo.link"
      />
    </div>
    <Content class="markdown" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.case-img) {
  text-align: center;
  img {
    width: 58%;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
}
.bread {
  padding-top: 40px;
  padding-left: 44px;
  padding-right: 44px;
  max-width: 1504px;
  margin: 0 auto;
  @media (max-width: 1439px) {
    padding-left: 24px;
    padding-right: 24px;
  }
  @media (max-width: 1100px) {
    padding-left: 16px;
    padding-right: 16px;
  }
  @media (max-width: 768px) {
    padding-top: 16px;
  }
}
</style>
