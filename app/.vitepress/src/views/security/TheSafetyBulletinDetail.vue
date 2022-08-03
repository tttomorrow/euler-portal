<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { useData } from 'vitepress';

import { getSecurityDetail } from '@/api/api-security';
import { DetailParams } from '@/shared/@types/type-support.ts';
import type { AxiosResponse } from '@/shared/axios';

const { theme: i18n } = useData();

const queryData: DetailParams = reactive({
  securityNoticeNo: '',
});

function getSecurityDetailInfo(data: any) {
  try {
    getSecurityDetail(data).then((res: AxiosResponse) => {
      return res;
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
    <p class="bulletin-name">openEuler-SA-2021-1283</p>
    <div class="bulletin-intro">
      <p><span>概要</span>krb5 security update</p>
      <p><span>发布时间</span>2021-07-27</p>
    </div>
    <div class="tabs-container">
      <OTabs class="o-tabs">
        <OTabPane label="概述">
          <div class="tab-content">
            <div class="tab-content-item">
              <h5 class="tab-content-item-title">简介</h5>
              <p class="tab-content-item-text">
                An update for krb5 is now available for openEuler-20.03-LTS-SP1
                and openEuler-20.03-LTS-SP2.
              </p>
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
