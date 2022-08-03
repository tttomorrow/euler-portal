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
    <div class="makdown-wrap">
      <Content />
    </div>
  </div>
</template>

<style lang="scss"></style>
