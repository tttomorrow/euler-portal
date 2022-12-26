<script setup lang="ts">
import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import banner from '@/assets/category/honor/banner.jpg';
import illustration from '@/assets/category/honor/ill.png';

const honorData = {
  title: '社区荣誉',
};
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="COMMUNITY"
    :title="honorData.title"
    :illustration="illustration"
  />
  <AppContent>
    <div class="honor">社区荣誉</div>
  </AppContent>
</template>

<style lang="scss" scoped></style>
