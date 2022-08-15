<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from '@/i18n';

import MiniDescription from '../components/MiniDescription.vue';
import MiniFrame from '../components/MiniFrame.vue';
import MiniDocs from '../components/MiniDocs.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import useWindowResize from '@/components/hooks/useWindowResize';
import AppAnchor from '@/components/AppAnchor.vue';

import BannerIllustration from '/img/projects/secgear/illustration-banner.png';
import BannerBackground from '/img/projects/share/banner-background.png';

const i18n = useI18n();
const isPC = ref(true);
if (useWindowResize().value < 767) {
  isPC.value = false;
} else {
  isPC.value = true;
}

const anchorData = [
  { id: 'architecture', name: '架构' },
  { id: 'docs', name: '文档' },
];
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
      id="architecture"
      :device="isPC"
      :frame-obj="i18n.secgear.SECGEAR_FRAMEWORK"
      layout="leftAndRight"
    />
    <!-- 文档 -->
    <MiniDocs
      id="docs"
      :device="isPC"
      :docs-obj="i18n.secgear.SECGEAR_DOCUMENT"
    />

    <AppAnchor :data="anchorData" />
  </div>
</template>

<style lang="scss" scoped>
.secgear-wraper {
  margin: 0 auto;
}
</style>
