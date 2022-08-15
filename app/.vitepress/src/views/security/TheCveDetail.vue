<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useI18n } from '@/i18n';
import { getCveDetail, getAffectedProduct } from '@/api/api-security';
import { useRouter } from 'vitepress';

import IconChevron from '~icons/app/chevron-right.svg';

const i18n = useI18n();
const router = useRouter();

const cveDetailData: any = ref({});
const AffectedProductList: any = ref([]);

function goBackPage() {
  const i = router.route.path.lastIndexOf('d');
  router.go(`${router.route.path.substring(0, i)}`);
}

function toDetail(id: string) {
  const url = router.route.path.replace('cve', 'safety-bulletin');
  router.go(url + `?id="${id}"`);
}

onMounted(() => {
  const i1 = decodeURIComponent(window.location.href).indexOf('=');
  const i2 = decodeURIComponent(window.location.href).lastIndexOf('&');
  const i3 = decodeURIComponent(window.location.href).lastIndexOf('=');
  const cveId = decodeURIComponent(window.location.href).substring(i1 + 1, i2);
  const packageName = decodeURIComponent(window.location.href).substring(
    i3 + 1
  );

  try {
    getCveDetail(cveId, packageName).then((res: any) => {
      cveDetailData.value = res.result;
    });
  } catch (e: any) {
    throw new Error(e);
  }

  try {
    getAffectedProduct(cveId, packageName).then((res: any) => {
      AffectedProductList.value = res.result;
    });
  } catch (e: any) {
    throw new Error(e);
  }
});
</script>
<template>
  <div class="wrapper">
    <div class="breadcrumb">
      <p class="last-page" @click="goBackPage">
        {{ i18n.security.CVE }}
      </p>
      <span class="separtor"
        ><o-icon><icon-chevron></icon-chevron></o-icon
      ></span>
      <p class="current-page">{{ i18n.security.CVE_DETAIL }}</p>
    </div>
    <div class="bulletin-head">
      <p class="bulletin-name">{{ cveDetailData.cveId }}</p>
      <div class="bulletin-intro">
        <p>
          <span>{{ i18n.security.MODIFIED_TIME }}</span
          >{{ cveDetailData.updateTime }}
        </p>
        <p>
          <span>{{ i18n.security.RELEASE_DATE }}</span
          >{{ cveDetailData.announcementTime }}
        </p>
      </div>
    </div>
    <div class="detail-item">
      <h2 class="detail-item-title">{{ i18n.security.SYNOPSIS }}</h2>
      <p class="detail-item-content">
        {{ cveDetailData.summary }}
      </p>
    </div>
    <div class="detail-item">
      <h2 class="detail-item-title">{{ i18n.security.METRICS_V3 }}</h2>
      <ul class="metrics-list">
        <li class="item">
          <ul>
            <li></li>
            <li>NVD</li>
            <li>openEuler</li>
          </ul>
        </li>
        <li class="item">
          <ul>
            <li>CVSS{{ i18n.security.SCORE }}</li>
            <li>{{ cveDetailData.cvsssCoreNVD }}</li>
            <li>{{ cveDetailData.cvsssCoreOE }}</li>
          </ul>
        </li>
        <li class="item">
          <ul>
            <li>Attack Vector</li>
            <li>{{ cveDetailData.attackVectorNVD }}</li>
            <li>{{ cveDetailData.attackVectorOE }}</li>
          </ul>
        </li>
        <li class="item">
          <ul>
            <li>Attack Complexity</li>
            <li>{{ cveDetailData.attackComplexityNVD }}</li>
            <li>{{ cveDetailData.attackComplexityOE }}</li>
          </ul>
        </li>
        <li class="item">
          <ul>
            <li>Privileges Required</li>
            <li>{{ cveDetailData.privilegesRequiredNVD }}</li>
            <li>{{ cveDetailData.privilegesRequiredOE }}</li>
          </ul>
        </li>
        <li class="item">
          <ul>
            <li>User Interaction</li>
            <li>{{ cveDetailData.userInteractionNVD }}</li>
            <li>{{ cveDetailData.userInteractionOE }}</li>
          </ul>
        </li>
        <li class="item">
          <ul>
            <li>Scope</li>
            <li>{{ cveDetailData.scopeNVD }}</li>
            <li>{{ cveDetailData.scopeOE }}</li>
          </ul>
        </li>
        <li class="item">
          <ul>
            <li>Confidentiality</li>
            <li>{{ cveDetailData.confidentialityNVD }}</li>
            <li>{{ cveDetailData.confidentialityOE }}</li>
          </ul>
        </li>
        <li class="item">
          <ul>
            <li>Integrity</li>
            <li>{{ cveDetailData.integrityNVD }}</li>
            <li>{{ cveDetailData.integrityOE }}</li>
          </ul>
        </li>
        <li class="item">
          <ul>
            <li>Availability</li>
            <li>{{ cveDetailData.availabilityNVD }}</li>
            <li>{{ cveDetailData.availabilityOE }}</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="detail-item">
      <h2 class="detail-item-title">{{ i18n.security.AFFECTED_PRODUCTS }}</h2>
      <ul class="affect-list">
        <li class="item">
          <ul>
            <li>{{ i18n.security.PRODUCT }}</li>
            <li>{{ i18n.security.PACKAGE }}</li>
            <li>{{ i18n.security.STATUS }}</li>
            <li>{{ i18n.security.SECURITY_ADVISORIES }}</li>
            <li>{{ i18n.security.RELEASE_DATE }}</li>
          </ul>
        </li>
        <li v-for="item in AffectedProductList" :key="item" class="item">
          <ul>
            <li>
              <span>{{ i18n.security.PRODUCT }}:</span>
              {{ item.productName }}
            </li>
            <li>
              <span>{{ i18n.security.PACKAGE }}:</span>
              {{ item.packageName }}
            </li>
            <li>
              <span>{{ i18n.security.STATUS }}:</span>
              {{ item.status }}
            </li>
            <li>
              <span>{{ i18n.security.SECURITY_ADVISORIES }}:</span>
              <a class="detail-link" @click="toDetail(item.securityNoticeNo)">{{
                item.securityNoticeNo
              }}</a>
            </li>
            <li>
              <span>{{ i18n.security.RELEASE_DATE }}:</span>
              {{ item.releaseTime }}
            </li>
          </ul>
        </li>
      </ul>

      <ul class="mobile-list">
        <li
          v-for="item in AffectedProductList"
          :key="item.securityNoticeNo"
          class="item"
        >
          <ul>
            <li>
              <span>{{ i18n.security.PRODUCT }}:</span>{{ item.productName }}
            </li>
            <li>
              <span>{{ i18n.security.PACKAGE }}:</span>{{ item.packageName }}
            </li>
            <li>
              <span>{{ i18n.security.STATUS }}:</span>{{ item.status }}
            </li>
            <li>
              <span>{{ i18n.security.SECURITY_ADVISORIES }}:</span
              ><a
                class="detail-link"
                @click="toDetail(item.securityNoticeNo)"
                >{{ item.securityNoticeNo }}</a
              >
            </li>
            <li>
              <span>{{ i18n.security.RELEASE_DATE }}:</span
              >{{ item.releaseTime }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.detail-link {
  color: var(--o-color-link);
  cursor: pointer;
}
.wrapper {
  max-width: 1504px;
  margin: 0 auto;
  padding: 0 44px;
  @media screen and (max-width: 768px) {
    padding: 0 var(--o-spacing-h5);
  }
}
.breadcrumb {
  margin-top: var(--o-spacing-h2);
  color: var(--o-color-text2);
  background: #f5f6f8;
  display: flex;
  @media screen and (max-width: 768px) {
    margin-bottom: var(--o-spacing-h5);
    // padding: 0 var(--o-spacing-h5);
  }
  .last-page {
    font-size: var(--o-font-size-tip);
    font-weight: normal;
    color: var(--o-color-text3);
    line-height: var(--o-line-height-tip);
    cursor: pointer;
  }
  .separtor {
    margin: 0 var(--o-spacing-h10);
  }
  .current-page {
    font-size: var(--o-font-size-tip);
    font-weight: 600;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-tip);
  }
}
.bulletin-head {
  padding: var(--o-spacing-h2) var(--o-spacing-h2) var(--o-spacing-h2) 0;
  background: #f5f6f8;
  @media screen and (max-width: 768px) {
    padding: var(--o-spacing-h5);
    // margin: 0 var(--o-spacing-h5);
    margin-bottom: var(--o-spacing-h5);
    background: var(--o-color-bg);
    box-shadow: 0px 1px 5px 0px rgba(45, 47, 51, 0.1);
  }
  .bulletin-name {
    font-size: var(--o-font-size-h3);
    font-weight: normal;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h3);
    @media screen and (max-width: 768px) {
      line-height: var(--o-line-height-h8);
      font-size: var(--o-font-size-h8);
      font-weight: 300;
      color: var(--o-color-text2);
      margin-bottom: var(--o-spacing-h8);
    }
  }
  .bulletin-intro {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-text);
    margin-top: var(--o-spacing-h4);
    span {
      display: inline-block;
      width: 100px;
    }
    @media screen and (max-width: 768px) {
      margin: 0;
      font-size: 12px;
      font-weight: 400;
      color: #000000;
      line-height: 18px;
    }
  }
}
.detail-item {
  margin-bottom: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    padding: 16px;
    background-color: #fff;
  }
  &-title {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 400;
  }
  &-content {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    line-height: 32px;
    margin-bottom: 40px;
  }
  .metrics-list,
  .affect-list {
    margin-bottom: 40px;
    .item:first-child {
      li {
        color: #000 !important;
        font-size: 14px !important;
      }
    }
    .item > ul {
      display: flex;
      min-height: 60px;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.85);
      margin: 0 30px;
      li:first-child {
        font-size: 14px;
        color: #000;
        @media (max-width: 1000px) {
          font-size: 14px !important;
        }
      }
      li:nth-child(2) {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        text-align: center;
      }
      li:nth-child(3) {
        font-size: 14px;
        text-align: right;
        color: rgba(0, 0, 0, 0.85);
      }
      li:nth-child(4) {
        font-size: 14px;
        text-align: right;
        color: rgba(0, 0, 0, 0.85);
      }
      li {
        flex: 0 0 20%;
        span {
          display: none;
        }
      }
    }
    .item > ul::after {
      content: '';
      min-height: inherit;
      font-size: 0;
    }
    .item:nth-child(odd) {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
  .affect-list {
    @media screen and (max-width: 768px) {
      display: none;
    }
    .item:nth-of-type(n + 1) {
      ul {
        min-height: 60px;
        line-height: 20px;
        height: fit-content;
        @media (max-width: 1000px) {
          line-height: inherit;
        }
      }
    }
    .item > ul {
      li:nth-child(3),
      li:nth-child(4),
      li:nth-child(5) {
        text-align: center;
      }
    }
  }
  .mobile-list {
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
    }
    .item {
      padding: var(--o-spacing-h5);
      font-size: var(--o-font-size-tip);
      font-weight: 400;
      color: #999999;
      line-height: var(--o-line-height-tip);
      background-color: var(--o-color-bg);
      &:nth-child(odd) {
        background: var(--o-color-bg6);
      }
      & li {
        margin-bottom: 8px;
      }
      li:last-child {
        margin-bottom: 0;
        a {
          color: #002fa7;
        }
      }
      li:nth-child(2) {
        display: flex;
        span {
          min-width: 30px;
        }
      }
      span {
        color: var(--o-color-text2);
        margin-right: var(--o-spacing-h8);
      }
    }
  }
}
</style>
