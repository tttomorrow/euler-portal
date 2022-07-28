<script setup lang="ts">
import { useData } from 'vitepress';
import { onMounted, ref } from 'vue';
import { getSigList } from '@/api/api-sig';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import TheSigList from './TheSigList.vue';
import TheSigBoard from './TheSigBoard.vue';
import TheSigLandscape from './TheSigLandscape.vue';
import banner from '@/assets/banner-secondary.png';
import illustration from '@/assets/illustrations/search.png';

const { theme: i18n } = useData();
const sigList: any = ref([]);

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
  <header>
    <BannerLevel2
      :background-image="banner"
      :illustration="illustration"
      title="SIG"
      :subtitle="i18n.sig.SIG_DESCRIPTION.MEANING"
    />
  </header>
  <div class="sig-ul">
    <ul>
      <li>{{ i18n.sig.SIG_DESCRIPTION.LI1 }}</li>
      <li>{{ i18n.sig.SIG_DESCRIPTION.LI2 }}</li>
      <li>{{ i18n.sig.SIG_DESCRIPTION.LI3 }}</li>
    </ul>
  </div>
  <main>
    <div class="sig-list">
      <OTabs>
        <OTabPane label="SIG List">
          <TheSigList :sig-list="sigList" />
        </OTabPane>
        <OTabPane label="SIG Board" lazy>
          <TheSigBoard :sig-list="sigList" />
        </OTabPane>
        <OTabPane label="SIG Landscape">
          <TheSigLandscape />
        </OTabPane>
      </OTabs>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.sig-ul {
  font-size: var(--o-font-size-text);
  font-weight: 400;
  line-height: var(--o-line-height-h8);
  color: var(--o-color-text2);
  max-width: 1380px;
  margin: var(--o-spacing-h1) auto;
  padding: 0 44px;
  @media (max-width: 780px) {
    padding: var(--o-spacing-h5) 0px var(--o-spacing-h2) var(--o-spacing-h5);
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
  max-width: 1380px;
  margin: var(--o-spacing-h1) auto;
  padding: 0 44px;
  @media (max-width: 780px) {
    margin: 0px var(--o-spacing-h4);
    padding: 0 0;
  }
}
</style>
