<script lang="ts" setup>
import { useI18n } from '@/i18n';

import MiniCards from '../components/MiniCards.vue';
import MiniDescription from '../components/MiniDescription.vue';
import MiniFrame from '../components/MiniFrame.vue';
import MiniDocs from '../components/MiniDocs.vue';
import BannerMinisite from '@/components/BannerMinisite.vue';
import AppAnchor from '@/components/AppAnchor.vue';

// TODO:该页面是视频先用插画代替
import BannerIllustration from '/img/projects/atune/illustration-banner.png';
import BannerBackground from '/img/projects/share/banner-background.png';

const i18n = useI18n();
</script>
<template>
  <div class="atune-wraper">
    <BannerMinisite
      class="banner"
      :title="i18n.atune.ATUNE_BANNER_TEXT[0]"
      :subtitle="i18n.atune.ATUNE_BANNER_TEXT[1]"
      :illustration="BannerIllustration"
      :background-image="BannerBackground"
      background-text="SEARCH"
    />
    <MiniCards :cards-link="i18n.atune.ATUNE_LINK" />
    <!-- 中间文字介绍部分 -->
    <MiniDescription :description-desc="i18n.atune.ATUNE_DESC" />
    <!-- 架构 -->
    <MiniFrame
      :id="i18n.atune.ATUNE_ANCHOR_DATA[0].id"
      :frame-obj="i18n.atune.ATUNE_FRAMEWORK"
      layout="upAndDown"
    />
    <!-- 文档 -->
    <MiniDocs
      :id="i18n.atune.ATUNE_ANCHOR_DATA[1].id"
      :docs-obj="i18n.atune.ATUNE_DOCUMENT"
    />

    <AppAnchor class="anchor" :data="i18n.atune.ATUNE_ANCHOR_DATA" />
  </div>
</template>

<style lang="scss" scoped>
.atune-wraper {
  margin: 0 auto;
  .anchor {
    @media screen and (min-width: 768px) {
      display: block;
    }
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
}
</style>
