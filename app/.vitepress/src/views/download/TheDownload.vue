<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useI18n } from '@/i18n';

import { getUrlParam } from '@/shared/utils';

import bannerImg from '@/assets/banner/banner-download.png';
import illustrationImg from '@/assets/illustrations/iso.png';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import DownloadBusiness from './DownloadBusiness.vue';
import DownloadCommunity from './DownloadCommunity.vue';

const i18n = useI18n();
const bannerData = {
  bannerImg: bannerImg,
  bannerText: 'DOWNLOAD',
  bannerTitle: i18n.value.download.OUTSIDE_TITLE,
  bannerIllustration: illustrationImg,
};
const tabsData = reactive({
  tabPane: [
    {
      label: computed(() => {
        return i18n.value.download.COMMUNITY;
      }),
      name: 'community',
    },
    {
      label: computed(() => {
        return i18n.value.download.BUSINESS;
      }),
      name: 'business',
    },
  ],
});
const activeName = ref(tabsData.tabPane[0].name);
onMounted(() => {
  if (getUrlParam('name')) {
    activeName.value = getUrlParam('name');
  }
});
</script>
<template>
  <div class="download">
    <BannerLevel2
      :background-image="bannerData.bannerImg"
      :background-text="bannerData.bannerText"
      :title="bannerData.bannerTitle"
      :illustration="bannerData.bannerIllustration"
    />
    <div class="download-tabs">
      <OTabs v-model="activeName">
        <OTabPane
          v-for="item in tabsData.tabPane"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        ></OTabPane>
      </OTabs>
    </div>
    <AppContent :pc-top="40" :mobile-top="24">
      <DownloadCommunity v-if="activeName === 'community'" />
      <DownloadBusiness v-else />
    </AppContent>
  </div>
</template>
<style lang="scss" scoped>
.download {
  .download-tabs {
    margin: 0 auto;
    background-color: var(--o-color-bg2);
    :deep(.el-tabs__nav-scroll) {
      display: flex;
      justify-content: center;
    }
  }
  .detail {
    p {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      color: var(--o-color-text1);
      @media (max-width: 1100px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
      &.detail-last {
        margin-top: var(--o-spacing-h2);
        @media (max-width: 1100px) {
          margin-top: var(--o-spacing-h4);
        }
      }
    }
  }
  .download-content {
    margin-top: var(--o-spacing-h4);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h6);
    }
    .content-selection {
      display: flex;
      .selection-item {
        flex-grow: 1;
        text-align: center;
        background-color: var(--o-color-bg2);
        border: 1px solid var(--o-color-border2);
        color: var(--o-color-text1);
        font-size: var(--o-font-size-h8);
        line-height: 40px;
        cursor: pointer;
        @media (max-width: 1100px) {
          font-size: var(--o-font-size-text);
          line-height: 22px;
          padding: 10px 0;
        }
        &.active {
          background-color: var(--o-color-brand1);
          border: 1px solid var(--o-color-brand1);
          color: var(--o-color-white);
        }
      }
    }
  }
}
</style>
