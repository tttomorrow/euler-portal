<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from '@/i18n';

import MiniCards from '../components/MiniCards.vue';
import MiniDescription from '../components/MiniDescription.vue';
import MiniFrame from '../components/MiniFrame.vue';
import MiniDocs from '../components/MiniDocs.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import useWindowResize from '@/components/hooks/useWindowResize';

// TODO:该页面是视频先用插画代替
import BannerIllustration from '/img/projects/atune/illustration-banner.png';
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
  <div class="atune-wraper">
    <BannerLevel2
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
      :device="isPC"
      :frame-obj="i18n.atune.ATUNE_FRAMEWORK"
      layout="upAndDown"
    />
    <!-- 文档 -->
    <MiniDocs :device="isPC" :docs-obj="i18n.atune.ATUNE_DOCUMENT" />
  </div>
</template>

<style lang="scss" scoped>
.atune-wraper {
  margin: 0 auto;
}
</style>
