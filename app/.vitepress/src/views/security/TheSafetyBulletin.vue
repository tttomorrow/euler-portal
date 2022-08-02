<script lang="ts" setup>
import { reactive, ref, watch, onMounted, computed } from 'vue';
import { useRouter } from 'vitepress';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import banner from '@/assets/banner-secondary.png';
import TagFilter from '@/components/TagFilter.vue';
import search from '@/assets/illustrations/search.png';
import cve from '@/assets/illustrations/cve.png';

import { getSecurityList } from '@/api/api-security';
import { SecurityLists, cveQuery } from '@/shared/@types/type-support.ts';
import OSearch from 'opendesign/search/OSearch.vue';

const i18n = computed(() => useI18n());

const router = useRouter();

const inputName = ref('');
const total = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');
const years = ['', '2019', '2020', '2021'];
const activeIndex = ref(0);
const activeIndex1 = ref(0);
const filterIndex = ref(0);

const tableData = ref<SecurityLists[]>([
  {
    affectedComponent: '',
    affectedProduct: '',
    announcementTime: '',
    securityNoticeNo: '',
    summary: '',
    type: '',
  },
]);

const queryData: cveQuery = reactive({
  pages: {
    page: 1,
    size: 10,
  },
  keyword: '',
  type: '',
  year: '',
});

function getSecurityLists(data: cveQuery) {
  try {
    getSecurityList(data).then((res: any) => {
      tableData.value = res.result.securityNoticeList;
      total.value = res.result.totalCount;
    });
  } catch (e: any) {
    throw new Error(e);
  }
}

const tagClick = (i: number, type: string) => {
  activeIndex.value = i;
  queryData.type = type;
};

function filterClick(i: number, category: string) {
  filterIndex.value = i;
  queryData.type = category;
}

const yearTagClick = (i: number, type: string) => {
  queryData.year = type;
  activeIndex1.value = i;
};

const handleSizeChange = (val: number) => {
  queryData.pages.size = val;
};

const handleCurrentChange = (val: number) => {
  queryData.pages.page = val;
};

function searchValchange() {
  queryData.keyword = inputName.value;
}

function jumpBulletinDetail(val: any) {
  router.go(`zh/security/safety-bulletin/detail/?id=${JSON.stringify(val)}`);
}

onMounted(() => {
  getSecurityLists(queryData);
});

watch(queryData, () => getSecurityLists(queryData));
</script>

<template>
  <div class="wrapper">
    <BannerLevel2
      class="banner-pc"
      :background-image="banner"
      background-text="CONTENT"
      :title="i18n.security.SECURITY_ADVISORIES"
      subtitle=""
      :illustration="search"
    />
    <BannerLevel2
      class="banner-mobile"
      :background-image="banner"
      background-text="CONTENT"
      :title="i18n.security.SECURITY_ADVISORIES"
      subtitle=""
      :illustration="cve"
    />

    <div class="bulletin-main">
      <div class="input-container">
        <OSearch v-model="inputName" @change="searchValchange"></OSearch>
      </div>

      <OCard class="filter-card">
        <template #header>
          <div class="card-header">
            <span class="category">{{ i18n.security.SEVERITY }}</span>
            <TagFilter label="" :show="true">
              <OTag
                v-for="(item, index) in i18n.security.SEVERITY_LIST"
                :key="'tag' + index"
                :type="activeIndex === index ? 'primary' : 'text'"
                @click="tagClick(index, item.LABEL)"
              >
                {{ item.NAME }}
              </OTag>
            </TagFilter>
          </div>
        </template>
        <div class="card-body">
          <span class="category">{{ i18n.security.YEAR }}</span>
          <TagFilter :show="true">
            <OTag
              v-for="(item, index) in years"
              :key="'tag' + index"
              :type="activeIndex1 === index ? 'primary' : 'text'"
              @click="yearTagClick(index, item)"
            >
              {{ item === '' ? '全部' : item }}
            </OTag>
          </TagFilter>
        </div>
      </OCard>

      <div class="filter-mobile">
        <div class="filter">
          <div
            v-for="(item, index) in i18n.security.SEVERITY_LIST"
            :key="item"
            :class="filterIndex === index ? 'selected' : ''"
            class="filter-item"
            @click="filterClick(index, item.LABEL)"
          >
            {{ item.NAME }}
          </div>
        </div>
      </div>
      <!-- TODO:日历样式及筛选 -->
      <div class="calendar-mobile">手机日历</div>

      <OTable class="pc-list" :data="tableData" style="width: 100%">
        <el-table-column>
          <template #header>
            <span>{{ i18n.security.ADVISORY }}</span>
          </template>
          <template #default="scope">
            <span @click="jumpBulletinDetail(scope.row.securityNoticeNo)">
              {{ scope.row.securityNoticeNo }}
            </span>
          </template>
        </el-table-column>
        <OTableColumn
          :label="i18n.security.SYNOPSIS"
          prop="summary"
        ></OTableColumn>
        <OTableColumn
          :label="i18n.security.SEVERITY"
          prop="type"
        ></OTableColumn>
        <OTableColumn
          :label="i18n.security.AFFECTED_PRODUCTS"
          prop="affectedProduct"
        ></OTableColumn>
        <OTableColumn
          :label="i18n.security.AFFECTED_COMPONENTS"
          prop="affectedComponent"
        ></OTableColumn>
        <OTableColumn
          :label="i18n.security.RELEASE_DATE"
          prop="announcementTime"
        ></OTableColumn>
      </OTable>

      <ul class="mobile-list">
        <li v-for="item in tableData" :key="item" class="item">
          <ul>
            <li>
              <span>{{ i18n.security.ADVISORY }}:</span
              >{{ item.securityNoticeNo }}
            </li>
            <li>
              <span>{{ i18n.security.OVERVIEW }}:</span>{{ item.summary }}
            </li>
            <li>
              <span>{{ i18n.security.SEVERITY }}:</span>{{ item.type }}
            </li>
            <li>
              <span>{{ i18n.security.AFFECTED_PRODUCTS }}:</span
              >{{ item.affectedProduct }}
            </li>
            <li>
              <span>{{ i18n.security.AFFECTED_COMPONENTS }}:</span
              >{{ item.affectedComponent }}
            </li>
            <li>
              <span>{{ i18n.security.RELEASE_DATE }}:</span
              >{{ item.announcementTime }}
            </li>
            <li></li>
          </ul>
        </li>
      </ul>

      <OPagination
        v-model:page-size="queryData.pages.size"
        v-model:currentPage="queryData.pages.page"
        class="pagination"
        :page-sizes="[10, 20, 40, 80]"
        :layout="layout"
        :total="total"
        :background="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <span class="slot-content">5/20</span>
      </OPagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner-pc {
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.banner-mobile {
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
}
.bulletin-main {
  max-width: 1504px;
  padding: 0 var(--o-spacing-h2);
  margin: var(--o-spacing-h1) auto 0;
  @media screen and (max-width: 768px) {
    margin: 0 auto;
    padding: 16px 16px 0;
  }
  .input-container {
    @media screen and (max-width: 768px) {
      display: none;
    }
    .o-input {
      height: 48px !important;
    }
  }
  .calendar-mobile {
    display: none;
    margin: 16px 0;
    width: 100%;
    height: 34px;
    background-color: var(--o-color-bg);
    @media screen and (max-width: 768px) {
      display: block;
    }
  }
  .filter-card {
    margin: var(--o-spacing-h4) 0;
    @media screen and (max-width: 768px) {
      display: none;
    }
    .category {
      display: inline-block;
      width: 56px;
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: var(--o-color-text2);
      line-height: var(--o-line-height-text);
      margin-right: var(--o-spacing-h4);
    }
    .category-item {
      display: inline-block;
      height: 28px;
      border: none;
      margin-right: 32px;
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: var(--o-color-text3);
      line-height: var(--o-line-height-text);

      cursor: pointer;
    }
    .active {
      display: inline-block;
      border: 1px solid #002fa7;
      color: #002fa7;
      padding: 0px 12px;
    }
    .card-header {
      padding-bottom: 14px;
      border-bottom: 1px solid #ccc;
      line-height: 54px;
    }
    .card-body {
      padding-top: 19px;
    }
  }
  .filter-mobile {
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
    }
    .filter {
      display: flex;
      align-items: center;
      width: 100%;
      .selected {
        background-color: #002fa7;
        color: var(--o-color-text);
      }
      &-item {
        cursor: pointer;
        flex: 1;
        text-align: center;
        padding: 6px;
        font-size: 14px;
        font-weight: 400;
        color: #002fa7;
        line-height: 22px;
        border: 1px solid #002fa7;
        border-right: 0;
        &:last-child {
          border: 1px solid #002fa7;
        }
      }
    }
  }
  .pc-list {
    @media screen and (max-width: 768px) {
      display: none;
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
  .pagination {
    margin-top: var(--o-spacing-h2);
    @media screen and (max-width: 768px) {
      display: none;
    }
    .slot-content {
      color: var(--o-color-text2);
    }
  }
}
</style>
