<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from '@/i18n';

import DownloadContent from './DownloadContent.vue';

const i18n = useI18n();
const downloadList = i18n.value.download.COMMUNITY_LIST;
// 获取版版本数据
const showIndex = [downloadList[0].NAME, downloadList[1].NAME];
const versionShownIndex = ref(downloadList[0].NAME);
function setVersionShownIndex(index: string) {
  versionShownIndex.value = index;
}
</script>

<template>
  <div class="download-community">
    <div class="detail">
      <p>{{ i18n.download.DETAIL1 }}</p>
      <p>
        {{ i18n.download.DETAIL2 }}
        <a :href="i18n.download.ARCHIVE_LINK">{{ i18n.download.CLICK_VIEW }}</a>
      </p>
      <p class="detail-last">
        {{ i18n.download.DETAIL3 }}<a href="">{{ i18n.download.CLICK_List }}</a>
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
      <DownloadContent :version="versionShownIndex" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.download-community {
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
          width: 50%;
          font-size: var(--o-font-size-text);
          line-height: 22px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
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
