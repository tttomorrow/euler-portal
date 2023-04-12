<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useI18n } from '@/i18n';

import bannerImg from '@/assets/banner/banner-download.png';
import illustrationImg from '@/assets/illustrations/iso.png';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import DownloadContent from './DownloadContent.vue';
import AppContent from '@/components/AppContent.vue';
import TheDownload from './TheDownload.vue';

const i18n = useI18n();
const downloadList = i18n.value.download.DOWNLOAD_LIST;
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
        return i18n.value.download.VERSION;
      }),
      name: 'download',
    },
    {
      label: computed(() => {
        return i18n.value.download.ARCHITECTURE;
      }),
      name: 'architecturess',
    },
  ],
});
const activeName = ref(tabsData.tabPane[0].name);
const handleTabClick = (val: string) => {
  console.log(val, activeName.value);
  // val === 'download'
  //   ? router.go(`/${lang.value}/download/`)
  //   : router.go(`/${lang.value}/download/${val}/`);
};
// 获取版版本数据
const showIndex = [downloadList[0].NAME, downloadList[1].NAME];
const versionShownIndex = ref(downloadList[0].NAME);
function setVersionShownIndex(index: string) {
  versionShownIndex.value = index;
}
const getData: any = computed(() => {
  return downloadList.filter(
    (item: any) => item.NAME === versionShownIndex.value
  );
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
      <OTabs v-model="activeName" @tab-click="handleTabClick">
        <OTabPane
          v-for="item in tabsData.tabPane"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        ></OTabPane>
      </OTabs>
    </div>
    <AppContent>
      <div v-if="activeName === 'download'">
        <div class="detail">
          <p>{{ i18n.download.DETAIL1 }}</p>
          <p>
            {{ i18n.download.DETAIL2 }}
            <a :href="i18n.download.ARCHIVE_LINK">{{
              i18n.download.CLICK_VIEW
            }}</a>
          </p>
          <p class="detail-last">
            {{ i18n.download.DETAIL3
            }}<a href="">{{ i18n.download.CLICK_List }}</a>
          </p>
        </div>
        <div class="download-content">
          <div class="content-selection">
            <div
              class="selection-item"
              :class="{ active: versionShownIndex === showIndex[0] }"
              @click="setVersionShownIndex(showIndex[0])"
            >
              {{ downloadList[0].NAME }}
            </div>
            <div
              class="selection-item"
              :class="{ active: versionShownIndex === showIndex[1] }"
              @click="setVersionShownIndex(showIndex[1])"
            >
              {{ downloadList[1].NAME }}
            </div>
          </div>
          <DownloadContent :content-data="getData" />
        </div>
      </div>
      <TheDownload v-else />
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
