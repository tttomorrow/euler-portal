<script lang="ts" setup>
import { ref } from 'vue';
import { useData } from 'vitepress';

import MiniDescription from '../components/MiniDescription.vue';
import MiniFrame from '../components/MiniFrame.vue';
import MiniDocs from '../components/MiniDocs.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import useWindowResize from '@/components/hooks/useWindowResize';

import BannerIllustration from '/img/projects/secgear/illustration-banner.png';
import BannerBackground from '/img/projects/share/banner-background.png';

const { theme: i18n } = useData();
const isPC = ref(true);
if (useWindowResize().value < 767) {
  isPC.value = false;
} else {
  isPC.value = true;
}
</script>
<template>
  <div class="secgear-wraper">
    <BannerLevel2
      class="banner"
      :title="i18n.secgear.SECGEAR_BANNER_TEXT[0]"
      :subtitle="i18n.secgear.SECGEAR_BANNER_TEXT[1]"
      :illustration="BannerIllustration"
      :background-image="BannerBackground"
    />
    <!-- 中间文字介绍部分 -->
    <MiniDescription :description-desc="i18n.secgear.SECGEAR_DESC" />
    <!-- 架构 -->
    <MiniFrame
      :device="isPC"
      :frame-obj="i18n.secgear.SECGEAR_FRAMEWORK"
      layout="leftAndRight"
    />
    <!-- 文档 -->
    <MiniDocs :device="isPC" :docs-obj="i18n.secgear.SECGEAR_DOCUMENT" />
  </div>
</template>

<style lang="scss" scoped>
.secgear-wraper {
  margin: 0 auto;
}
</style>
