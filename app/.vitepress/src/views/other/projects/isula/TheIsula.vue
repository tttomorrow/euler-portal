<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from '@/i18n';

import MiniCards from '../components/MiniCards.vue';
import MiniDescription from '../components/MiniDescription.vue';
import MiniFrame from '../components/MiniFrame.vue';
import MiniDocs from '../components/MiniDocs.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import useWindowResize from '@/components/hooks/useWindowResize';
import AppAnchor from '@/components/AppAnchor.vue';

import BannerIllustration from '/img/projects/isula/illustration-banner.png';
import BannerBackground from '/img/projects/share/banner-background.png';

const i18n = useI18n();
const isPC = ref(true);
if (useWindowResize().value < 767) {
  isPC.value = false;
} else {
  isPC.value = true;
}

const anchorData = [
  { id: 'architecture', name: '架构' },
  { id: 'docs', name: '文档' },
];
</script>
<template>
  <div class="isula-wraper">
    <BannerLevel2
      class="banner"
      :title="i18n.isula.ISULA_BANNER_TEXT[0]"
      :subtitle="i18n.isula.ISULA_BANNER_TEXT[1]"
      :illustration="BannerIllustration"
      :background-image="BannerBackground"
      background-text="SEARCH"
    />
    <MiniCards :cards-link="i18n.isula.ISULA_LINK" />
    <MiniDescription :description-desc="i18n.isula.ISULA_DESC_UP" />
    <MiniFrame
      :device="isPC"
      :frame-obj="i18n.isula.ISULA_FRAMEWORK"
      layout="upAndDown"
      id="architecture"
    />
    <MiniDocs id="docs" :device="isPC" :docs-obj="i18n.isula.ISULA_DOCUMENT" />

    <AppAnchor :data="anchorData" />
  </div>
</template>
<style lang="scss" scoped>
.isula-wraper {
  margin: 0 auto;
}
</style>
