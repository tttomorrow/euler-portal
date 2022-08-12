<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from '@/i18n';

import MiniCards from '../components/MiniCards.vue';
import MiniDescription from '../components/MiniDescription.vue';
import MiniFrame from '../components/MiniFrame.vue';
import MiniDocs from '../components/MiniDocs.vue';
import MiniFeatures from './MiniFeatures.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import useWindowResize from '@/components/hooks/useWindowResize';

import BannerIllustration from '/img/projects/stratovirt/illustration-banner.png';
import BannerBackground from '/img/projects/share/banner-background.png';

const i18n = useI18n();
const isPC = ref(true);
if (useWindowResize().value < 767) {
  isPC.value = false;
} else {
  isPC.value = true;
}
</script>
<template>
  <div class="svirt-wraper">
    <BannerLevel2
      class="banner"
      :title="i18n.stratovirt.SVIRT_BANNER_TEXT[0]"
      :subtitle="i18n.stratovirt.SVIRT_BANNER_TEXT[1]"
      :illustration="BannerIllustration"
      :background-image="BannerBackground"
      background-text="SEARCH"
    />
    <!-- 卡片 -->
    <MiniCards :cards-link="i18n.stratovirt.SVIRT_LINK" />
    <!-- 中间文字介绍部分 -->
    <MiniDescription :description-desc="i18n.stratovirt.SVIRT_DESC" />
    <!-- 特征 -->
    <MiniFeatures :features-obj="i18n.stratovirt.SVIRT_CHARACTER" />
    <!-- 架构 -->
    <MiniFrame
      :device="isPC"
      :frame-obj="i18n.stratovirt.SVIRT_FRAMEWORK"
      layout="leftAndRight"
    />
    <!-- 文档 -->
    <MiniDocs :device="isPC" :docs-obj="i18n.stratovirt.SVIRT_DOCUMENT" />
  </div>
</template>

<style lang="scss" scoped>
.svirt-wraper {
  margin: 0 auto;
}
</style>
