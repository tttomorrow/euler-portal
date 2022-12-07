<script setup lang="ts">
import { useData } from 'vitepress';

import BannerLevel3 from '@/components/BannerLevel3.vue';

import banner from '@/assets/category/showcase/case-detail-bg.jpg';

const { frontmatter } = useData();
</script>

<template>
  <div class="layout">
    <BannerLevel3
      :background-image="banner"
      :title="frontmatter.title"
      :subtitle="frontmatter.summary"
    />
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
:deep(.banner-level3) {
  .wrap .banner-text {
    width: 100%;
  }
}

:deep(h2:nth-of-type(1)) {
  margin-top: 0;
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
