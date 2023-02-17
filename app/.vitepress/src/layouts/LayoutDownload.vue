<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { useData } from 'vitepress';

import { useI18n } from '@/i18n';
import seoConfig from '@/data/common/seo';

import AppRouterTemplate from '@/components/AppRouterTemplate.vue';

import banner from '@/assets/banner/banner-download.png';
import illustration from '@/assets/illustrations/iso.png';
import { useRouter } from 'vitepress';

const { lang } = useData();
const i18n = useI18n();

const router = useRouter();
const clickTab = (val: string) => {
  val === 'download'
    ? router.go(`/${lang.value}/download/`)
    : router.go(`/${lang.value}/download/${val}/`);
};
const bannerData = {
  bannerImg: banner,
  bannerText: 'DOWNLOAD',
  bannerTitle: i18n.value.download.OUTSIDE_TITLE,
  bannerIllustration: illustration,
};

const tabsData = reactive({
  tabPane: [
    {
      label: computed(() => {
        return i18n.value.download.VERSION;
      }),
      name: 'download',
    },
    {
      label: computed(() => {
        return i18n.value.download.ARCHITECTURE;
      }),
      name: 'architecture',
    },
  ],
});
</script>
<template>
  <div>
    <SeoBox :seo-data="seoConfig[lang]?.download" />
    <AppRouterTemplate
      @click-tab="clickTab"
      :banner-data="bannerData"
      :tabs-data="tabsData"
    />
    <Content />
  </div>
</template>

<style scoped lang="scss"></style>
