<script lang="ts" setup>
import { useI18n } from '@/i18n';

import MiniCards from '../components/MiniCards.vue';
import MiniDescription from '../components/MiniDescription.vue';
import MiniFrame from '../components/MiniFrame.vue';
import MiniDocs from '../components/MiniDocs.vue';
import BannerMinisite from '@/components/BannerMinisite.vue';
import AppContent from '@/components/AppContent.vue';

// TODO:该页面是视频先用插画代替
import BannerIllustration from '/img/projects/atune/illustration-banner.png';
import banner from '@/assets/banner-secondary.png';

const i18n = useI18n();
</script>
<template>
  <BannerMinisite
    class="banner"
    :title="i18n.atune.ATUNE_BANNER_TEXT[0]"
    :subtitle="i18n.atune.ATUNE_BANNER_TEXT[1]"
    :illustration="BannerIllustration"
    :background-image="banner"
    background-text="SEARCH"
  />
  <AppContent>
    <MiniCards :cards-link="i18n.atune.ATUNE_LINK" />
    <MiniDescription :description-desc="i18n.atune.ATUNE_DESC" />
    <MiniFrame :frame-obj="i18n.atune.ATUNE_FRAMEWORK" layout="upAndDown" />
    <MiniDocs :docs-obj="i18n.atune.ATUNE_DOCUMENT" />
  </AppContent>
</template>
