<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from '@/i18n';
import { getSigList } from '@/api/api-sig';
import AppContext from '@/components/AppContent.vue';
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
  </AppContext>
</template>
<style lang="scss" scoped>
.sig-ul {
  font-size: var(--o-font-size-text);
  font-weight: 400;
  line-height: var(--o-line-height-h8);
  color: var(--e-color-text1);
  @media (max-width: 1100px) {
    padding: 0px 0px var(--o-spacing-h2) var(--o-spacing-h5);
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
  @media (max-width: 780px) {
    margin: 0px;
    padding: 0 0;
    :deep(.el-tabs__header) {
      display: none;
    }
    p {
      display: block;
      color: var(--e-color-text1);
      text-align: center;
    }
  }
}
</style>
