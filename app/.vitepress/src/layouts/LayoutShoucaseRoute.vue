<script lang="ts" setup>
import { useData } from 'vitepress';

import { useI18n } from '@/i18n';

import AppRouterTemplate from '@/components/AppRouterTemplate.vue';

import banner from '@/assets/banner/banner-community.png';
import illustration from '@/assets/illustrations/search.png';
import { useRouter } from 'vitepress';

const { lang } = useData();
const i18n = useI18n();

const router = useRouter();
const clickTab = (val: string) => {
  val === 'showcase'
    ? router.go(`/${lang.value}/showcase/`)
    : router.go(`/${lang.value}/showcase/${val}/`);
};
const bannerData = {
  bannerImg: banner,
  bannerText: 'COMMNUNITY',
  bannerTitle: i18n.value.showcase.bannerTitle,
  bannerIllustration: illustration,
};
const tabsData = {
  tabPane: [
    {
      label: i18n.value.showcase.showcase,
      name: 'showcase',
    },
    {
      label: i18n.value.showcase.whilePaper,
      name: 'white-paper',
    },
  ],
};
</script>
<template>
  <div>
    <AppRouterTemplate
      :banner-data="bannerData"
      :tabs-data="tabsData"
      @click-tab="clickTab"
    />
    <Content />
  </div>
</template>

<style scoped lang="scss"></style>
