<script lang="ts" setup>
import { useI18n } from '@/i18n';

import MiniDescription from '../components/MiniDescription.vue';
import MiniFrame from '../components/MiniFrame.vue';
import MiniDocs from '../components/MiniDocs.vue';
import BannerMinisite from '@/components/BannerMinisite.vue';
import AppContent from '@/components/AppContent.vue';

import BannerIllustration from '/img/projects/secgear/illustration-banner.png';
import banner from '@/assets/banner-secondary.png';

const i18n = useI18n();
</script>
<template>
  <BannerMinisite
    class="banner"
    :title="i18n.secgear.SECGEAR_BANNER_TEXT[0]"
    :subtitle="i18n.secgear.SECGEAR_BANNER_TEXT[1]"
    :illustration="BannerIllustration"
    :background-image="banner"
  />
  <AppContent>
    <MiniDescription :description-desc="i18n.secgear.SECGEAR_DESC" />
    <MiniFrame
      :frame-obj="i18n.secgear.SECGEAR_FRAMEWORK"
      layout="leftAndRight"
    />
    <MiniDocs :docs-obj="i18n.secgear.SECGEAR_DOCUMENT" />
  </AppContent>
</template>