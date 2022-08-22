<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from '@/i18n';
import { getSigList } from '@/api/api-sig';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import TheSigList from './TheSigList.vue';
import TheSigBoard from './TheSigBoard.vue';
import TheSigLandscape from './TheSigLandscape.vue';
import banner from '@/assets/banner-secondary.png';
import illustration from '@/assets/illustrations/search.png';
import moillustration from '@/assets/category/sig/sig-list/sigmo-bg.png';
import useWindowResize from '@/components/hooks/useWindowResize';

interface SIGLIST {
  group_name: string;
  home_page: string;
  id: number;
  irc: string;
  maillist: string;
  owners: string;
}

const i18n = useI18n();
const sigList = ref<SIGLIST[]>([]);

const screenWidth = useWindowResize();
const isMobile = computed(() => {
  return screenWidth.value <= 768 ? true : false;
});

onMounted(() => {
  try {
    getSigList().then((res) => {
      sigList.value = res;
    });
  } catch (error) {
    throw Error();
  }
});
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    :illustration="isMobile ? moillustration : illustration"
    title="SIG"
    :subtitle="i18n.sig.SIG_DESCRIPTION.MEANING"
    :background-text="isMobile ? 'SIG' : ''"
  />
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
        <TheSigList />
      </OTabPane>
      <OTabPane label="SIG Board" lazy>
        <TheSigBoard :sig-list="sigList" />
      </OTabPane>
      <OTabPane label="SIG Landscape">
        <TheSigLandscape />
      </OTabPane>
    </OTabs>
  </div>
</template>
<style lang="scss" scoped>
.sig-ul {
  font-size: var(--o-font-size-text);
  font-weight: 400;
  line-height: var(--o-line-height-h8);
  color: var(--e-color-text1);
  max-width: 1504px;
  margin: var(--o-spacing-h1) auto;
  padding: 0 44px;
  @media (max-width: 780px) {
    padding: var(--o-spacing-h5) 0px var(--o-spacing-h2) var(--o-spacing-h5);
    font-size: var(--o-font-size-tip);
  }
  ul {
    list-style: disc;
    li {
      margin-top: var(--o-spacing-h8);
    }
  }
  @media (max-width: 780px) {
    margin: 0px var(--o-spacing-h4);
  }
}
.sig-list {
  max-width: 1504px;
  margin: var(--o-spacing-h1) auto;
  padding: 0 44px;
  p {
    display: none;
  }
  @media (max-width: 780px) {
    margin: 0px var(--o-spacing-h4);
    padding: 0 0;
    :deep(.el-tabs__header) {
      display: none;
    }
    p {
      display: block;
      text-align: center;
    }
  }
}
</style>
