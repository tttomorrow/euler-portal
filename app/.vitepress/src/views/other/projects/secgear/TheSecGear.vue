<script lang="ts" setup>
import { useI18n } from '@/i18n';

import MiniDescription from '../components/MiniDescription.vue';
import MiniFrame from '../components/MiniFrame.vue';
import MiniDocs from '../components/MiniDocs.vue';
import BannerMinisite from '@/components/BannerMinisite.vue';

import BannerIllustration from '/img/projects/secgear/illustration-banner.png';
import BannerBackground from '/img/projects/share/banner-background.png';

const i18n = useI18n();
</script>
<template>
  <div class="secgear-wraper">
    <BannerMinisite
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
      :frame-obj="i18n.secgear.SECGEAR_FRAMEWORK"
      layout="leftAndRight"
    />
    <!-- 文档 -->
    <MiniDocs
      :docs-obj="i18n.secgear.SECGEAR_DOCUMENT"
    />
  </div>
</template>

<style lang="scss" scoped>
.secgear-wraper {
  margin: 0 auto;
}
</style>
