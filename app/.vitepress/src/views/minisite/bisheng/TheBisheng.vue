<script lang="ts" setup>
import { useI18n } from '@/i18n';

import MiniFrame from '../components/MiniFrame.vue';
import MiniCards from '../components/MiniCards.vue';
import MiniDescription from '../components/MiniDescription.vue';
import MiniDocs from '../components/MiniDocs.vue';
import MiniReference from './MiniReference.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import illustration from '@/assets/illustrations/minisite/bisheng.png';
import banner from '@/assets/banner/banner-minisite.png';
const i18n = useI18n();
</script>

<template>
  <BannerLevel2
    class="banner"
    :title="i18n.bisheng.BISHENG_BANNER_TEXT[0]"
    :subtitle="i18n.bisheng.BISHENG_BANNER_TEXT[1]"
    :illustration="illustration"
    :background-image="banner"
    background-text="DISCOVERY"
  />
  <AppContent class="bisheng">
    <!-- 背景插画 -->
    <div class="bisheng-bg"></div>
    <MiniCards :cards-link="i18n.bisheng.BISHENG_LINK" />
    <MiniDescription
      :description-desc="i18n.bisheng.BISHENG_DESC"
      :description-info="i18n.bisheng.BISHENG_INFO"
      :description-more="i18n.bisheng.BISHENG_MORE"
    />
    <!-- 架构模块 -->
    <MiniFrame :frame-obj="i18n.bisheng.BISHENG_FRAMEWORK" layout="upAndDown" />
    <!-- 学习模块 -->
    <MiniDocs :docs-obj="i18n.bisheng.BISHENG_LEARN" />
    <!-- 友情链接模块 -->
    <MiniReference :reference-obj="i18n.bisheng.BISHENG_REFERENCE" />
  </AppContent>
</template>

<style lang="scss" scoped>
.bisheng {
  position: relative;
  z-index: 0;
  &-bg {
    position: absolute;
    z-index: -1;
    width: 1735px;
    height: 785px;
    background-image: url(@/assets/category/minisite/bisheng/bg.png);
    background-size: 100%;
    background-repeat: no-repeat;
    top: 99px;
    left: -116px;
    right: 0;
    margin: 0 auto;
    display: none;
    @media screen and (min-width: 1440px) {
      display: block;
    }
  }
}
</style>
