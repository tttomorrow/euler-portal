<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue';
import { useRouter, useData } from 'vitepress';

import { useI18n } from '@/i18n';

import { getSecurityDetail } from '@/api/api-security';
import { DetailParams } from '@/shared/@types/type-support';

import IconChevronRight from '~icons/app/icon-chevron-right.svg';

const i18n = useI18n();
const router = useRouter();
const { lang } = useData();

const detailData: any = ref({});
const cveIdList = ref<string[]>([]);

const queryData: DetailParams = reactive({
  securityNoticeNo: '',
});

function getSecurityDetailInfo(data: any) {
  try {
    getSecurityDetail(data).then((res: any) => {
      if (res) {
        detailData.value = res;
        cveIdList.value = res.cveId.split(';');
      }
    });
  } catch (e: any) {
    throw new Error(e);
  }
}

function goBackPage() {
  const i = router.route.path.lastIndexOf('d');
  router.go(`${router.route.path.substring(0, i)}`);
}

function goCveDetail(val: string) {
  router.go(
    `/${lang.value}/security/cve/detail/?cveId=${val}&packageName=${detailData.value.affectedComponent}`
  );
}

onMounted(() => {
  const index1 = window.location.href.indexOf('=');
  queryData.securityNoticeNo = window.location.href.substring(index1 + 1);
  getSecurityDetailInfo(queryData);
});
</script>
<template>
  <div class="wrapper">
    <div class="breadcrumb">
      <p class="last-page" @click="goBackPage">
        {{ i18n.safetyBulletin.SECURITY_ADVISORIES }}
      </p>
      <span class="separtor">
        <OIcon><IconChevronRight /></OIcon>
      </span>
      <p class="current-page">
        {{ i18n.safetyBulletin.SECURITY_ADVISORIES_DETAIL }}
      </p>
    </div>

    <div class="bulletin-head">
      <p class="bulletin-name">{{ detailData.securityNoticeNo }}</p>
      <div class="bulletin-intro">
        <div>
          <span>{{ i18n.safetyBulletin.SYNOPSIS }}:</span>
          <p>{{ detailData.summary }}</p>
        </div>
        <div>
          <span>{{ i18n.safetyBulletin.RELEASE_DATE }}:</span>
          <p>{{ detailData.announcementTime }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="wrapper2">
    <div class="tabs-container">
      <OTabs class="o-tabs">
        <div class="wrapper1">
          <OTabPane :label="i18n.safetyBulletin.OVERVIEW">
            <div class="tab-content">
              <div class="tab-content-item">
                <h5 class="tab-content-item-title">
                  {{ i18n.safetyBulletin.BRIEF_INTRODUCTION }}
                </h5>
                <p class="tab-content-item-text">
                  {{ detailData.introduction }}
                </p>
              </div>
              <div class="tab-content-item">
                <h5 class="tab-content-item-title">
                  {{ i18n.safetyBulletin.SEVERITY }}
                </h5>
                <p class="tab-content-item-text">
                  {{ detailData.type }}
                </p>
              </div>
              <div class="tab-content-item">
                <h5 class="tab-content-item-title">
                  {{ i18n.safetyBulletin.THEME }}
                </h5>
                <p class="tab-content-item-text">
                  {{ detailData.subject }}
                </p>
              </div>
              <div class="tab-content-item">
                <h5 class="tab-content-item-title">
                  {{ i18n.safetyBulletin.DESCRIPTION }}
                </h5>
                <p class="tab-content-item-text">
                  {{ detailData.description }}
                </p>
              </div>
              <div class="tab-content-item">
                <h5 class="tab-content-item-title">
                  {{ i18n.safetyBulletin.AFFECTED_COMPONENTS }}
                </h5>
                <p class="tab-content-item-text">
                  {{ detailData.affectedComponent }}
                </p>
              </div>
              <div class="tab-content-item">
                <h5 class="tab-content-item-title">
                  {{ i18n.safetyBulletin.CVE }}
                </h5>
                <p
                  v-for="(item, index) in cveIdList"
                  :key="index"
                  class="tab-content-item-link"
                  @click="goCveDetail(item)"
                >
                  {{ item }}
                </p>
              </div>
              <div class="tab-content-item">
                <h5 class="tab-content-item-title">
                  {{ i18n.safetyBulletin.REFERENCE_DOCUMENTS }}
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

          <OTabPane :label="i18n.safetyBulletin.UPDATED_PACKAGES">
            <div class="tab-content">
              <div
                v-for="item in detailData.packageHelperList"
                :key="item"
                class="packge-item"
              >
                <h1 class="packge-item-title">{{ item.productName }}</h1>
                <div
                  v-for="it in item.child"
                  :key="it"
                  class="packge-item-class"
                >
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
        </div>
      </OTabs>
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-tabs) {
  .el-tabs__header {
    margin-bottom: 0;
    background-color: var(--o-color-bg2);
    box-shadow: var(--o-shadow-l1);
    z-index: 20;
    @media screen and (max-width: 768px) {
      box-shadow: none;
    }
  }
  .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
    height: 48px;
    @media screen and (max-width: 768px) {
      height: 38px;
      background-color: var(--o-color-bg2);
    }
  }
}
.wrapper {
  max-width: 1504px;
  margin: var(--o-spacing-h2) auto 0;
  background-color: var(--o-color-bg1);
  padding: 0 44px;
  @media screen and (max-width: 768px) {
    margin: 16px 0 0;
    padding: 0;
  }
}
.wrapper1 {
  max-width: 1504px;
  margin: 0 auto var(--o-spacing-h1);
  background-color: var(--o-color-bg1);
  @media screen and (max-width: 768px) {
    margin: 16px 0 40px;
  }
}
.wrapper2 {
  max-width: 1504px;
  margin: 0 auto;
  padding: 0 44px;
  background-color: var(--o-color-bg1);
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
}
.breadcrumb {
  color: var(--o-color-text1);
  background: var(--o-color-bg1);
  display: flex;
  margin-bottom: 0;
  @media screen and (max-width: 768px) {
    margin-bottom: var(--o-spacing-h5);
    margin-top: 0;
    padding: 0 var(--o-spacing-h5);
  }
  .last-page {
    font-size: var(--o-font-size-tip);
    font-weight: normal;
    color: var(--o-color-text4);
    line-height: var(--o-line-height-tip);
    cursor: pointer;
  }
  .separtor {
    margin: 0 var(--o-spacing-h10);
    .o-icon {
      color: var(--o-color-text1);
    }
  }
  .current-page {
    font-size: var(--o-font-size-tip);
    font-weight: 600;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-tip);
  }
}
.bulletin-head {
  padding: var(--o-spacing-h2) var(--o-spacing-h2) var(--o-spacing-h2) 0;
  background: var(--o-color-bg1);
  @media screen and (max-width: 768px) {
    padding: var(--o-spacing-h5);
    margin: 0 var(--o-spacing-h5) var(--o-spacing-h5);
    background: var(--o-color-bg2);
    box-shadow: var(--o-shadow-l1);
  }
  .bulletin-name {
    font-size: var(--o-font-size-h3);
    font-weight: normal;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h3);
    @media screen and (max-width: 768px) {
      line-height: var(--o-line-height-h8);
      font-size: var(--o-font-size-h8);
      font-weight: 300;
      color: var(--o-color-text1);
      margin-bottom: var(--o-spacing-h8);
    }
  }
  .bulletin-intro {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-text);
    margin-top: var(--o-spacing-h4);
    & div {
      display: flex;
    }
    span {
      display: inline-block;
      margin-right: var(--o-spacing-h8);
    }
    @media screen and (max-width: 768px) {
      margin: 0;
      font-size: var(--o-font-size-tip);
      font-weight: 400;
      color: var(--o-color-text1);
      line-height: var(--o-line-height-tip);
    }
  }
}

.tabs-container {
  .o-tabs {
    .tab-content {
      padding: var(--o-spacing-h2);
      background-color: var(--o-color-bg2);
      @media screen and (max-width: 768px) {
        margin: var(--o-spacing-h5) var(--o-spacing-h5) 0;
        padding: var(--o-spacing-h5);
        &-item:last-child {
          margin-bottom: 0;
        }
      }
      &-item {
        margin-bottom: var(--o-spacing-h2);
        @media screen and (max-width: 768px) {
          margin-bottom: var(--o-spacing-h4);
        }
        &:last-child {
          margin-bottom: 0;
        }
        &-title {
          font-size: var(--o-font-size-h5);
          font-weight: 500;
          color: var(--o-color-text1);
          line-height: var(--o-line-height-h5);
          margin-bottom: var(--o-spacing-h5);
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-text);
            font-weight: 500;
            line-height: var(--o-line-height-text);
          }
        }
        &-link {
          color: var(--o-color-link1);
          font-size: var(--o-font-size-text);
          font-weight: 400;
          line-height: var(--o-line-height-text);
          cursor: pointer;
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-tip);
            font-weight: 400;
            line-height: var(--o-line-height-tip);
          }
        }
        &-text {
          white-space: pre-wrap;
          text-align: justify;
          font-size: var(--o-font-size-text);
          font-weight: 400;
          color: var(--o-color-text1);
          line-height: var(--o-line-height-text);
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-tip);
            font-weight: 400;
            line-height: var(--o-line-height-tip);
          }
          a {
            color: var(--o-color-link1);
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
          color: var(--o-color-text1);
        }
        &-class {
          margin-bottom: var(--o-spacing-h4);
          &:last-child {
            margin-bottom: 0;
          }
          &-achitecture {
            color: var(--o-color-text1);
            font-size: var(--o-font-size-h8);
            line-height: 64px;
            border-bottom: 1px solid var(--o-color-border1);
          }
          &-rpm {
            line-height: var(--o-line-height-h3);
            font-size: var(--o-font-size-text);
            color: var(--o-color-text4);
            border-bottom: 1px solid var(--o-color-border1);
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
