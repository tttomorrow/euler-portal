<script lang="ts" setup>
import { useData } from 'vitepress';

import MiniFrame from '../components/MiniFrame.vue';
import MiniCards from '../components/MiniCards.vue';
import MiniDescription from '../components/MiniDescription.vue';
import MiniDocs from '../components/MiniDocs.vue';
import MiniReference from './MiniReference.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';

import BannerIllustration from '/img/projects/bisheng/illustration-banner.png';
import BannerBackground from '/img/projects/share/banner-background.png';

const { theme: i18n } = useData();
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
        :frame-obj="i18n.bishengjdk.BISHENG_FRAMEWORK"
        layout="upAndDown"
      />
      <!-- 学习模块 -->
      <MiniDocs :docs-obj="i18n.bishengjdk.BISHENG_LEARN" />
      <!-- 友情链接模块 -->
      <MiniReference :reference-obj="i18n.bishengjdk.BISHENG_REFERENCE" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bisheng-wraper {
  margin: 0 auto;
}
</style>
