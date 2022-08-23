<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue';
import { useI18n } from '@/i18n';
import { useRouter } from 'vitepress';

import { getSecurityDetail } from '@/api/api-security';
import { DetailParams } from '@/shared/@types/type-support';

import IconChevron from '~icons/app/chevron-right.svg';

import type { AxiosResponse } from '@/shared/axios';

const i18n = useI18n();
const router = useRouter();

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

function goBackPage() {
  const i = router.route.path.lastIndexOf('d');
  router.go(`${router.route.path.substring(0, i)}`);
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
      <p class="last-page" @click="goBackPage">
        {{ i18n.security.SECURITY_ADVISORIES }}
      </p>
      <span class="separtor">
        <o-icon><icon-chevron></icon-chevron></o-icon
      ></span>
      <p class="current-page">{{ i18n.security.SECURITY_ADVISORIES_DETAIL }}</p>
    </div>
    <div class="bulletin-head">
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
              <p class="tab-content-item-text">
                {{ detailData.cveId }}
              </p>
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
                <a :href="item.url" target="_blank">{{ item.url }}</a>
              </div>
            </div>
          </div>
        </OTabPane>
        <OTabPane label="更新的软件包">
          <div class="tab-content">
            <div
              v-for="item in detailData.packageHelperList"
              :key="item"
              class="packge-item"
            >
              <h1 class="packge-item-title">{{ item.productName }}</h1>
              <div v-for="it in item.child" :key="it" class="packge-item-class">
                <p class="packge-item-class-achitecture">
                  {{ it.productName }}
                </p>
                <p
                  v-for="single in it.child"
                  :key="single"
                  class="packge-item-class-rpm"
                >
                  {{ single.packageName }}
                </p>
              </div>
            </div>
          </div>
        </OTabPane>
      </OTabs>
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-tabs) {
  .el-tabs__nav-wrap {
    box-shadow: var(--e-shadow-l1);
  }
  .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
    height: 48px;
    @media screen and (max-width: 768px) {
      margin: var(--o-spacing-h5) 0 0 0;
      background-color: var(--e-color-bg2);
    }
  }
  .el-tabs__content {
    margin: 0 var(--o-spacing-h5);
  }
}
.wrapper {
  max-width: 1504px;
  margin: 0 auto;
  background-color: var(--e-color-bg2);
  @media screen and (max-width: 768px) {
    padding: var(--o-spacing-h5) 0;
    background-color: var(--e-color-bg1);
  }
}
.breadcrumb {
  margin-top: var(--o-spacing-h2);
  color: var(--e-color-text1);
  background: var(--e-color-bg1);
  display: flex;
  @media screen and (max-width: 768px) {
    margin-bottom: var(--o-spacing-h5);
    margin-top: 0;
    padding: 0 var(--o-spacing-h5);
  }
  .last-page {
    font-size: var(--o-font-size-tip);
    font-weight: normal;
    color: var(--e-color-text4);
    line-height: var(--o-line-height-tip);
    cursor: pointer;
  }
  .separtor {
    margin: 0 var(--o-spacing-h10);
    .o-icon {
      color: var(--e-color-text1);
    }
  }
  .current-page {
    font-size: var(--o-font-size-tip);
    font-weight: 600;
    color: var(--e-color-text1);
    line-height: var(--o-line-height-tip);
  }
}
.bulletin-head {
  padding: var(--o-spacing-h2) var(--o-spacing-h2) var(--o-spacing-h2) 0;
  background: var(--e-color-bg1);
  @media screen and (max-width: 768px) {
    padding: var(--o-spacing-h5);
    margin: 0 var(--o-spacing-h5);
    background: var(--e-color-bg2);
    box-shadow: var(--e-shadow-l1);
  }
  .bulletin-name {
    font-size: var(--o-font-size-h3);
    font-weight: normal;
    color: var(--e-color-text1);
    line-height: var(--o-line-height-h3);
    @media screen and (max-width: 768px) {
      line-height: var(--o-line-height-h8);
      font-size: var(--o-font-size-h8);
      font-weight: 300;
      color: var(--e-color-text1);
      margin-bottom: var(--o-spacing-h8);
    }
  }
  .bulletin-intro {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: var(--o-line-height-text);
    margin-top: var(--o-spacing-h4);
    span {
      display: inline-block;
      width: 100px;
    }
    @media screen and (max-width: 768px) {
      margin: 0;
      font-size: var(--o-font-size-tip);
      font-weight: 400;
      color: var(--e-color-text1);
      line-height: var(--o-line-height-tip);
    }
  }
}

.tabs-container {
  .o-tabs {
    .tab-content {
      width: 100%;
      padding: var(--o-spacing-h2);
      background-color: var(--e-color-bg2);
      @media screen and (max-width: 768px) {
        margin: var(--o-spacing-h5 --o-spacing-h5 --o-spacing-h2);
        padding: var(--o-spacing-h5);
        &-item:last-child {
          margin-bottom: 0;
        }
      }
      &-item {
        margin-bottom: var(--o-spacing-h2);
        &:last-child {
          margin-bottom: 0;
        }
        &-title {
          font-size: var(--o-font-size-h5);
          font-weight: 500;
          color: var(--e-color-text1);
          line-height: var(--o-line-height-h5);
          margin-bottom: 20px;
        }
        &-text {
          font-size: var(--o-font-size-text);
          font-weight: 400;
          color: var(--e-color-text1);
          line-height: var(--o-line-height-text);
          a {
            color: var(--e-color-link1);
          }
        }
      }
      .packge-item {
        // margin-bottom: 40px;
        &-title {
          font-size: var(--o-font-size-h5);
          font-weight: 400;
          line-height: var(--o-line-height-h8);
          margin-bottom: var(--o-spacing-h3);
          color: var(--e-color-text1);
        }
        &-class {
          margin-bottom: var(--o-spacing-h4);
          &:last-child {
            margin-bottom: 0;
          }
          &-achitecture {
            color: var(--e-color-text1);
            font-size: var(--o-font-size-h8);
            line-height: 64px;
            border-bottom: 1px solid var(--e-color-border1);
          }
          &-rpm {
            line-height: var(--o-line-height-h3);
            font-size: var(--o-font-size-text);
            color: var(--e-color-text4);
            border-bottom: 1px solid var(--e-color-border1);
            &:last-child {
              border: none;
            }
          }
        }
      }
    }
  }
}
</style>
