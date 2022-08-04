<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from '@/i18n';

import MiniFrame from '../components/MiniFrame.vue';
import MiniCards from '../components/MiniCards.vue';
import MiniDescription from '../components/MiniDescription.vue';
import MiniDocs from '../components/MiniDocs.vue';
import MiniReference from './MiniReference.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import useWindowResize from '@/components/hooks/useWindowResize';

import BannerIllustration from '/img/projects/bisheng/illustration-banner.png';
import BannerBackground from '/img/projects/share/banner-background.png';

const i18n = computed(() => useI18n());
const isPC = ref(true);
if (useWindowResize().value < 767) {
  isPC.value = false;
} else {
  isPC.value = true;
}
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
        :device="isPC"
        :frame-obj="i18n.bishengjdk.BISHENG_FRAMEWORK"
        layout="upAndDown"
      />
      <!-- 学习模块 -->
      <MiniDocs :device="isPC" :docs-obj="i18n.bishengjdk.BISHENG_LEARN" />
      <!-- 友情链接模块 -->
      <MiniReference
        :device="isPC"
        :reference-obj="i18n.bishengjdk.BISHENG_REFERENCE"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bisheng-wraper {
  margin: 0 auto;
  .bisheng-info {
    position: relative;
    z-index: 0;
    &-backgrain {
      position: absolute;
      z-index: -1;
      width: 1734px;
      height: 785px;
      background-image: url(/img/projects/bisheng/background.png);
      background-size: 100%;
      background-repeat: no-repeat;
      top: 35px;
      left: 0;
      right: 0;
      margin: 0 auto;
      display: none;
      @media screen and (min-width: 1440px) {
        display: block;
      }
    }
  }
}
</style>
