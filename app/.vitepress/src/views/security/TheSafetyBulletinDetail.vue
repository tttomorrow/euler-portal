<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue';
import { useI18n } from '@/i18n';

import { getSecurityDetail } from '@/api/api-security';
import { DetailParams } from '@/shared/@types/type-support';
import type { AxiosResponse } from '@/shared/axios';

const i18n = useI18n();
const detailData: any = ref({
  // securityNoticeNo: '',
  // summary: '',
  // announcementTime: '',
  // introduction: '',
  // type: '',
  // subject: '',
  // description: '',
  // affectedComponent: '',
  // cveId: '',
  // referenceList: [],
});

const queryData: DetailParams = reactive({
  securityNoticeNo: '',
});

function getSecurityDetailInfo(data: any) {
  try {
    getSecurityDetail(data).then((res: AxiosResponse) => {
      detailData.value = res;
    });
  } catch (e: any) {
    throw new Error(e);
  }
}

onMounted(() => {
  const index1 = decodeURIComponent(window.location.href).indexOf('"');
  const index2 = decodeURIComponent(window.location.href).indexOf(
    '"',
    index1 + 1
  );
  queryData.securityNoticeNo = decodeURIComponent(
    window.location.href
  ).substring(index1 + 1, index2);
  getSecurityDetailInfo(queryData);
});
</script>
<template>
  <div class="wrapper">
    <div class="breadcrumb">
      <p class="last-page">{{ i18n.security.SECURITY_ADVISORIES }}</p>
      <span class="separtor">></span>
      <p class="current-page">{{ i18n.security.SECURITY_ADVISORIES_DETAIL }}</p>
    </div>
    <p class="bulletin-name">{{ detailData.securityNoticeNo }}</p>
    <div class="bulletin-intro">
      <p>
        <span>{{ i18n.security.SYNOPSIS }}</span
        >{{ detailData.summary }}
      </p>
      <p>
        <span>{{ i18n.security.RELEASE_DATE }}</span
        >{{ detailData.announcementTime }}
      </p>
    </div>
    <div class="tabs-container">
      <OTabs class="o-tabs">
        <OTabPane :label="i18n.security.OVERVIEW">
          <div class="tab-content">
            <div class="tab-content-item">
              <h5 class="tab-content-item-title">
                {{ i18n.security.BRIEF_INTRODUCTION }}
              </h5>
              <p class="tab-content-item-text">
                {{ detailData.introduction }}
              </p>
            </div>
            <div class="tab-content-item">
              <h5 class="tab-content-item-title">
                {{ i18n.security.SEVERITY }}
              </h5>
              <p class="tab-content-item-text">
                {{ detailData.type }}
              </p>
            </div>
            <div class="tab-content-item">
              <h5 class="tab-content-item-title">{{ i18n.security.THEME }}</h5>
              <p class="tab-content-item-text">
                {{ detailData.subject }}
              </p>
            </div>
            <div class="tab-content-item">
              <h5 class="tab-content-item-title">
                {{ i18n.security.DESCRIPTION }}
              </h5>
              <p class="tab-content-item-text">
                {{ detailData.description }}
              </p>
            </div>
            <div class="tab-content-item">
              <h5 class="tab-content-item-title">
                {{ i18n.security.AFFECTED_COMPONENTS }}
              </h5>
              <p class="tab-content-item-text">
                {{ detailData.affectedComponent }}
              </p>
            </div>
            <div class="tab-content-item">
              <h5 class="tab-content-item-title">{{ i18n.security.CVE }}</h5>
              {{ detailData.cveId }}
            </div>
            <div class="tab-content-item">
              <h5 class="tab-content-item-title">
                {{ i18n.security.REFERENCE_DOCUMENTS }}
              </h5>
              <div
                v-for="item in detailData.referenceList"
                :key="item"
                class="tab-content-item-text"
              >
                <p>{{ item.url }}</p>
              </div>
            </div>
          </div>
        </OTabPane>
        <OTabPane label="更新的软件包">
          <div class="tab-content">更新的软件包</div>
        </OTabPane>
      </OTabs>
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-tabs__nav-scroll) {
  display: flex;
  justify-content: center;
}
.wrapper {
  max-width: 1504px;
  padding: var(--o-spacing-h2);
  margin: 0 auto var(--o-spacing-h1);
  background-color: var(--o-color-bg);
}
.breadcrumb {
  margin-bottom: var(--o-spacing-h2);
  color: var(--o-color-text2);
  display: flex;
  .last-page {
    font-size: var(--o-font-size-tip);
    font-weight: normal;
    color: var(--o-color-text3);
    line-height: var(--o-line-height-tip);
    cursor: pointer;
  }
  .separtor {
    margin: 0 var(--o-spacing-h7);
  }
  .current-page {
    font-size: var(--o-font-size-tip);
    font-weight: 600;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-tip);
  }
}
.bulletin-name {
  font-size: var(--o-font-size-h3);
  font-weight: normal;
  color: var(--o-color-text2);
  line-height: var(--o-line-height-h3);
}
.bulletin-intro {
  font-size: var(--o-font-size-text);
  font-weight: 400;
  color: var(--o-color-text2);
  line-height: var(--o-line-height-text);
  margin: var(--o-spacing-h4) 0 var(--o-spacing-h3) 0;
  span {
    display: inline-block;
    width: 100px;
  }
}
.tabs-container {
  // border-bottom: 1px solid var(--o-color-border);
  .o-tabs {
    .tab-content {
      width: 100%;
      padding: var(--o-spacing-h2);
      background-color: var(--o-color-bg);
      &-item {
        margin-bottom: var(--o-spacing-h2);
        &-title {
          font-size: var(--o-font-size-h5);
          font-weight: 500;
          color: var(--o-color-text2);
          line-height: var(--o-line-height-h5);
          margin-bottom: 20px;
        }
        &-text {
          font-size: var(--o-font-size-text);
          font-weight: 400;
          color: var(--o-color-text2);
          line-height: var(--o-line-height-text);
        }
      }
    }
  }
}
</style>
