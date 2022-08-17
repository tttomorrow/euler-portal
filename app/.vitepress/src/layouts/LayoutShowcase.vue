<script setup lang="ts">
import { useData } from 'vitepress';

import BannerLevel3 from '@/components/BannerLevel3.vue';

const { frontmatter } = useData();
</script>

<template>
  <div class="layout">
    <BannerLevel3
      v-if="frontmatter.banner"
      :background-image="frontmatter.banner"
      :title="frontmatter.title"
      :subtitle="frontmatter.subtitle"
    />
    <Content class="markdown" />
  </div>
</template>

<style lang="scss">
.case-img {
  text-align: center;
  img {
    width: 58%;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
}
</style>
