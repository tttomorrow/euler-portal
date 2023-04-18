<script lang="ts" setup>
import { useData } from 'vitepress';

import { useI18n } from '@/i18n';

import AppRouterTemplate from '@/components/AppRouterTemplate.vue';

import banner from '@/assets/banner/banner-sig.png';
import illustration from '@/assets/illustrations/sig-list.png';
import { useRouter } from 'vitepress';

const { lang } = useData();
const i18n = useI18n();

const router = useRouter();
const clickTab = (val: string) => {
  let path = '';
  switch (val) {
    case 'sig-list':
      path = '/sig/sig-list/';
      break;
    case 'sig-guidance':
      path = '/sig/sig-guidance/';
      break;
    case 'role-description':
      path = '/sig/role-description/';
      break;
  }
  router.go(`/${lang.value + path}`);
};
const bannerData = {
  bannerImg: banner,
  bannerText: 'SIG',
  bannerTitle: i18n.value.sig.SIG_LIST.SIG,
  bannerIllustration: illustration,
};
const tabsData = {
  tabPane: [
    {
      label: i18n.value.sig.SIG_LIST.SIG,
      name: 'sig-list',
    },
    {
      label: i18n.value.sig.GUIDANCE_LIST.GUIDE.TITLE,
      name: 'sig-guidance',
    },
    {
      label: i18n.value.sig.ROLE_DESCRIPTION.ROLE_DESCRIPTION,
      name: 'role-description',
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
