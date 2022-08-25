<script lang="ts" setup>
import { useI18n } from '@/i18n';

import MiniCards from '../components/MiniCards.vue';
import MiniDescription from '../components/MiniDescription.vue';
import MiniFrame from '../components/MiniFrame.vue';
import MiniDocs from '../components/MiniDocs.vue';
import MiniFeatures from './MiniFeatures.vue';
import BannerMinisite from '@/components/BannerMinisite.vue';
import AppContent from '@/components/AppContent.vue';

import BannerIllustration from '/img/projects/stratovirt/illustration-banner.png';
import banner from '@/assets/banner-secondary.png';

const i18n = useI18n();
</script>
<template>
  <BannerMinisite
    class="banner"
    :title="i18n.stratovirt.SVIRT_BANNER_TEXT[0]"
    :subtitle="i18n.stratovirt.SVIRT_BANNER_TEXT[1]"
    :illustration="BannerIllustration"
    :background-image="banner"
    background-text="SEARCH"
  />
  <AppContent>
    <!-- 卡片 -->
    <MiniCards :cards-link="i18n.stratovirt.SVIRT_LINK" />
    <!-- 中间文字介绍部分 -->
    <MiniDescription :description-desc="i18n.stratovirt.SVIRT_DESC" />
    <!-- 特征 -->
    <MiniFeatures :features-obj="i18n.stratovirt.SVIRT_CHARACTER" />
    <!-- 架构 -->
    <MiniFrame
      :frame-obj="i18n.stratovirt.SVIRT_FRAMEWORK"
      layout="leftAndRight"
    />
    <!-- 文档 -->
    <MiniDocs :docs-obj="i18n.stratovirt.SVIRT_DOCUMENT" />
  </AppContent>
</template>
