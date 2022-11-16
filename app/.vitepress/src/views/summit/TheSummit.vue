<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';

import AppContext from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';

import banner from '@/assets/category/summit/summit2022/banner.jpg';
import bannerMo from '@/assets/category/summit/summit2022/banner-mo.png';
import liveLight from '@/assets/category/summit/summit2022/live.png';
import liveDark from '@/assets/category/summit/summit2022/live-dark.png';

const i18n = useI18n();
const commonStore = useCommon();
const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLight : liveDark
);
const bannerInfo = {
  pc_banner: banner,
  mo_banner: bannerMo,
};
</script>
<template>
  <SummitBanner :banner="bannerInfo" />
  <AppContext>
    <div class="detail">{{ i18n.summit.SUMMIT2022.DETAIL }}</div>
    <div class="content">
      <div
        v-for="item in i18n.summit.SUMMIT2022.CONTENTLIST"
        :key="item.LINK"
        class="content-item"
      >
        <a :href="item.LINK" target="_blank">
          <img :src="item.IMG" :alt="item.NAME" />
        </a>
      </div>
    </div>
    <div class="previous">
      <div class="previous-title">
        <h3>{{ i18n.summit.SUMMIT2022.PREVIOUS.TITLE }}</h3>
        <img :src="liveImg" alt="live" />
      </div>
      <div class="link-box">
        <a
          v-for="item in i18n.summit.SUMMIT2022.PREVIOUS.LIST"
          :key="item.LINK"
          :href="item.LINK"
          :target="item.TARGET"
          >{{ item.NAME }}</a
        >
      </div>
    </div>
  </AppContext>
</template>
<style scoped lang="scss">
.dark img {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.detail {
  font-size: var(--o-font-size-h6);
  line-height: var(--o-line-height-h6);
  color: var(--o-color-text1);
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
}
.content {
  margin: var(--o-spacing-h4) auto 0 auto;
  max-width: 1266px;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 950px) {
    padding: 0 20px;
  }
  @media screen and (max-width: 865px) {
    flex-wrap: wrap;
    max-width: 570px;
  }
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h6);
    max-width: 370px;
    padding: 0 0;
    justify-content: center;
  }
  .content-item {
    @media screen and (max-width: 768px) {
      text-align: center;
    }
    a {
      display: inline-block;
    }
  }
}
.previous {
  margin-top: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h4);
  }
  .previous-title {
    display: flex;
    h3 {
      font-size: 26px;
      line-height: 30px;
      color: var(--o-color-text1);
      margin-right: var(--o-spacing-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        margin-right: var(--o-spacing-h7);
      }
    }
    img {
      @media screen and (max-width: 768px) {
        width: 22px;
      }
    }
  }

  .link-box {
    margin-top: var(--o-spacing-h3);
    display: grid;
    grid-template-columns: repeat(1, 290px);
    @media screen and (max-width: 768px) {
      margin-top: var(--o-spacing-h6);
    }
  }
  a {
    display: block;
    width: auto;
    font-size: var(--o-font-size-h6);
    line-height: var(--o-line-height-h6);
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
    & + a {
      margin-top: var(--o-spacing-h4);
      @media screen and (max-width: 768px) {
        margin-top: var(--o-spacing-h8);
      }
    }
  }
}
</style>
