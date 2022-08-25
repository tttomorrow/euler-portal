<script lang="ts" setup>
import { useI18n } from '@/i18n';

import MiniCards from '../components/MiniCards.vue';
import MiniDescription from '../components/MiniDescription.vue';
import MiniFrame from '../components/MiniFrame.vue';
import MiniDocs from '../components/MiniDocs.vue';
import BannerMinisite from '@/components/BannerMinisite.vue';
import AppContent from '@/components/AppContent.vue';

import BannerIllustration from '/img/projects/isula/illustration-banner.png';
import banner from '@/assets/banner-secondary.png';

const i18n = useI18n();
</script>
<template>
  <BannerMinisite
    class="banner"
    :title="i18n.isula.ISULA_BANNER_TEXT[0]"
    :subtitle="i18n.isula.ISULA_BANNER_TEXT[1]"
    :illustration="BannerIllustration"
    :background-image="banner"
    background-text="SEARCH"
  />
  <AppContent :pc-top="64">
    <MiniCards :cards-link="i18n.isula.ISULA_LINK" />
    <MiniDescription :description-desc="i18n.isula.ISULA_DESC_UP" />
    <MiniFrame :frame-obj="i18n.isula.ISULA_FRAMEWORK" layout="upAndDown" />
    <MiniDocs :docs-obj="i18n.isula.ISULA_DOCUMENT" />
  </AppContent>
</template>
