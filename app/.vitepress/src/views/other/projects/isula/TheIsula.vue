<script lang="ts" setup>
import { useI18n } from '@/i18n';

import MiniCards from '../components/MiniCards.vue';
import MiniDescription from '../components/MiniDescription.vue';
import MiniFrame from '../components/MiniFrame.vue';
import MiniDocs from '../components/MiniDocs.vue';
import BannerMinisite from '@/components/BannerMinisite.vue';
import AppAnchor from '@/components/AppAnchor.vue';

import BannerIllustration from '/img/projects/isula/illustration-banner.png';
import BannerBackground from '/img/projects/share/banner-background.png';

const i18n = useI18n();
</script>
<template>
  <div class="isula-wraper">
    <BannerMinisite
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
      :id="i18n.isula.ISULA_ANCHOR_DATA[0].id"
      :frame-obj="i18n.isula.ISULA_FRAMEWORK"
      layout="upAndDown"
    />
    <MiniDocs
      :id="i18n.isula.ISULA_ANCHOR_DATA[1].id"
      :docs-obj="i18n.isula.ISULA_DOCUMENT"
    />

    <AppAnchor class="anchor" :data="i18n.isula.ISULA_ANCHOR_DATA" />
  </div>
</template>
<style lang="scss" scoped>
.isula-wraper {
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
