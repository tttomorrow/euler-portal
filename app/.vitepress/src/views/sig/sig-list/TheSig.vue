<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from '@/i18n';

import AppContext from '@/components/AppContent.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import SigList from './SigList.vue';
import SigLandscape from './SigLandscape.vue';

import { getSigList } from '@/api/api-sig';

import banner from '@/assets/banner/banner-sig.png';
import illustration from '@/assets/illustrations/sig-list.png';

interface SIGLIST {
  group_name: string;
  home_page: string;
  id: number;
  irc: string;
  maillist: string;
  owners: string;
}

const i18n = useI18n();
const oldSigList = ref<SIGLIST[]>([]);

onMounted(() => {
  try {
    getSigList().then((res) => {
      oldSigList.value = res;
    });
  } catch (error) {
    throw Error();
  }
});
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    :illustration="illustration"
    title="SIG"
    :subtitle="i18n.sig.SIG_DESCRIPTION.MEANING"
    background-text="SIG"
  />
  <AppContext :mobile-top="16">
    <div class="sig-ul">
      <ul>
        <li>{{ i18n.sig.SIG_DESCRIPTION.LI1 }}</li>
        <li>{{ i18n.sig.SIG_DESCRIPTION.LI2 }}</li>
        <li>{{ i18n.sig.SIG_DESCRIPTION.LI3 }}</li>
      </ul>
    </div>
    <div class="sig-list">
      <p>SIG List</p>
      <OTabs>
        <OTabPane label="SIG List">
          <SigList v-if="oldSigList.length" :old-sig-list="oldSigList" />
        </OTabPane>
        <OTabPane label="SIG Landscape">
          <SigLandscape />
        </OTabPane>
      </OTabs>
    </div>
  </AppContext>
</template>
<style lang="scss" scoped>
.sig-ul {
  font-size: var(--o-font-size-text);
  font-weight: 400;
  line-height: var(--o-line-height-h8);
  color: var(--o-color-text1);
  @media (max-width: 1100px) {
    padding-left: var(--o-spacing-h5);
    font-size: var(--o-font-size-tip);
  }
  li {
    list-style: disc;
    + li {
      margin-top: var(--o-spacing-h8);
    }
  }
}
.sig-list {
  margin: var(--o-spacing-h1) auto 0;

  p {
    display: none;
  }
  @media (max-width: 1100px) {
    margin: var(--o-spacing-h2) auto 0;
  }

  @media (max-width: 768px) {
    padding: 0 0;
    :deep(.el-tabs__header) {
      display: none;
    }
    p {
      display: block;
      color: var(--o-color-text1);
      text-align: center;
    }
  }
}
</style>
