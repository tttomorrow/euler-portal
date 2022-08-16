<script lang="ts" setup>
import { useI18n } from '@/i18n';

import MiniFrame from '../components/MiniFrame.vue';
import MiniCards from '../components/MiniCards.vue';
import MiniDescription from '../components/MiniDescription.vue';
import MiniDocs from '../components/MiniDocs.vue';
import MiniReference from './MiniReference.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppAnchor from '@/components/AppAnchor.vue';

import BannerIllustration from '/img/projects/bisheng/illustration-banner.png';
import BannerBackground from '/img/projects/share/banner-background.png';

const i18n = useI18n();

const anchorData = [
  { id: 'architecture', name: '架构' },
  { id: 'learn', name: '学习' },
  { id: 'link', name: '友情链接' },
];
</script>

<template>
  <div class="bisheng-wraper">
    <!-- 下面放 banner 组件 -->
    <BannerLevel2
      class="banner"
      :title="i18n.bishengjdk.BISHENG_BANNER_TEXT[0]"
      :subtitle="i18n.bishengjdk.BISHENG_BANNER_TEXT[1]"
      :illustration="BannerIllustration"
      :background-image="BannerBackground"
      background-text="SEARCH"
    />
    <!-- banner 下面详情页面 -->
    <div class="bisheng-info">
      <!-- 背景插画 -->
      <div class="bisheng-info-backgrain"></div>
      <MiniCards :cards-link="i18n.bishengjdk.BISHENG_LINK" />
      <MiniDescription
        :description-desc="i18n.bishengjdk.BISHENG_DESC"
        :description-info="i18n.bishengjdk.BISHENG_INFO"
        :description-more="i18n.bishengjdk.BISHENG_MORE"
      />
      <!-- 架构模块 -->
      <MiniFrame
        id="architecture"
        :frame-obj="i18n.bishengjdk.BISHENG_FRAMEWORK"
        layout="upAndDown"
      />
      <!-- 学习模块 -->
      <MiniDocs id="learn" :docs-obj="i18n.bishengjdk.BISHENG_LEARN" />
      <!-- 友情链接模块 -->
      <MiniReference
        id="link"
        :reference-obj="i18n.bishengjdk.BISHENG_REFERENCE"
      />

      <AppAnchor class="anchor" :data="anchorData" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bisheng-wraper {
  margin: 0 auto;
  position: relative;
  z-index: 0;
  .bisheng-info {
    &-backgrain {
      position: absolute;
      z-index: -1;
      width: 1735px;
      height: 785px;
      background-image: url(/img/projects/bisheng/background.png);
      background-size: 100%;
      background-repeat: no-repeat;
      top: 376px;
      left: 0;
      right: 0;
      margin: 0 auto;
      display: none;
      @media screen and (min-width: 1440px) {
        display: block;
      }
    }
    .anchor {
      @media screen and (min-width: 768px) {
        display: block;
      }
      @media screen and (max-width: 768px) {
        display: none;
      }
    }
  }
}
</style>
