<script lang="ts" setup>
import { reactive, ref, watch, onMounted } from 'vue';
import { useRouter } from 'vitepress';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';
import TagFilter from '@/components/TagFilter.vue';

import banner from '@/assets/banner-secondary.png';
import search from '@/assets/illustrations/search.png';
import cve from '@/assets/illustrations/cve.png';
import IconCalendar from '~icons/app/icon-calendar.svg';

import { getSecurityList } from '@/api/api-security';
import { SecurityLists, CveQuery } from '@/shared/@types/type-support';
import OSearch from 'opendesign/search/OSearch.vue';
import useWindowResize from '@/components/hooks/useWindowResize';

const windowWidth = ref(useWindowResize());
const i18n = useI18n();
const router = useRouter();
const screenWidth = ref(1080);

const inputName = ref('');
const total = ref(0);
const currentPage = ref(1);
const totalPage = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');
const years = ['', '2021', '2020', '2019'];
const selectedYear = ref('2021');
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

const queryData: CveQuery = reactive({
  pages: {
    page: 1,
    size: 10,
  },
  keyword: '',
  type: '',
  year: '',
});

function getSecurityLists(data: CveQuery) {
  try {
    getSecurityList(data).then((res: any) => {
      tableData.value = res.result.securityNoticeList;
      if (res.result.totalCount) {
        total.value = res.result.totalCount;
        totalPage.value = Math.ceil(total.value / queryData.pages.size);
      } else {
        total.value = 1;
      }
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
  totalPage.value = Math.ceil(total.value / val);
};

const handleCurrentChange = (val: number) => {
  queryData.pages.page = val;
  currentPage.value = val;
};

function searchValchange() {
  queryData.keyword = inputName.value;
}

function jumpBulletinDetail(val: any) {
  router.go(`${router.route.path}detail/?id=${JSON.stringify(val)}`);
}

const selectYear = (val: string) => {
  selectedYear.value = val;
  queryData.year = val;
};

function turnPage(option: string) {
  if (option === 'prev' && queryData.pages.page > 1) {
    queryData.pages.page = queryData.pages.page - 1;
  } else if (option === 'next' && queryData.pages.page < total.value) {
    queryData.pages.page = queryData.pages.page + 1;
  }
}

onMounted(() => {
  getSecurityLists(queryData);
});

watch(queryData, () => getSecurityLists(queryData));
watch(windowWidth, () => {
  screenWidth.value = windowWidth.value;
});
</script>

<template>
  <BannerLevel2
    class="banner-pc"
    :background-image="banner"
    background-text="CONTENT"
    :title="i18n.security.SECURITY_ADVISORIES"
    subtitle=""
    :illustration="screenWidth >= 1000 ? search : cve"
  />
  <div class="wrapper">
    <div class="bulletin-main">
      <div class="input-container">
        <OSearch
          v-model="inputName"
          :placeholder="i18n.security.SEARCH"
          @change="searchValchange"
        ></OSearch>
      </div>

      <OCard class="filter-card">
        <template #header>
          <div class="card-header">
            <TagFilter :label="i18n.security.SEVERITY" :show="false">
              <OTag
                v-for="(item, index) in i18n.security.SEVERITY_LIST"
                :key="'tag' + index"
                checkable
                :type="activeIndex === index ? 'primary' : 'text'"
                @click="tagClick(index, item.LABEL)"
              >
                {{ item.NAME }}
              </OTag>
            </TagFilter>
          </div>
        </template>
        <div class="card-body">
          <TagFilter :show="false" :label="i18n.security.YEAR">
            <OTag
              v-for="(item, index) in years"
              :key="'tag' + index"
              checkable
              :type="activeIndex1 === index ? 'primary' : 'text'"
              @click="yearTagClick(index, item)"
            >
              {{ item === '' ? i18n.security.ALL : item }}
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

      <div class="calendar-mobile">
        <el-collapse>
          <el-collapse-item>
            <template #title>
              <o-icon><icon-calendar></icon-calendar></o-icon>
              <span class="selected-year">{{
                selectedYear === '' ? i18n.security.ALL : selectedYear
              }}</span>
            </template>
            <div class="years">
              <p
                v-for="item in years"
                :key="item"
                class="years-item"
                :class="selectedYear === item ? 'selected' : ''"
                @click="selectYear(item)"
              >
                {{ item === '' ? i18n.security.ALL : item }}
              </p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <OTable class="pc-list" :data="tableData" style="width: 100%">
        <el-table-column>
          <template #header>
            <span>{{ i18n.security.ADVISORY }}</span>
          </template>
          <template #default="scope">
            <span
              class="detail-page"
              @click="jumpBulletinDetail(scope.row.securityNoticeNo)"
            >
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
          width="160"
        ></OTableColumn>
        <OTableColumn
          :label="i18n.security.AFFECTED_PRODUCTS"
          prop="affectedProduct"
        ></OTableColumn>
        <OTableColumn
          :label="i18n.security.AFFECTED_COMPONENTS"
          width="220"
          prop="affectedComponent"
        ></OTableColumn>
        <OTableColumn
          :label="i18n.security.RELEASE_DATE"
          width="160"
          prop="announcementTime"
        ></OTableColumn>
      </OTable>

      <ul class="mobile-list">
        <li v-for="item in tableData" :key="item.securityNoticeNo" class="item">
          <ul>
            <li @click="jumpBulletinDetail(item.securityNoticeNo)">
              <span>{{ i18n.security.ADVISORY }}:</span
              ><span class="notice">{{ item.securityNoticeNo }}</span>
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
        :hide-on-single-page="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <span class="slot-content">{{ currentPage }}/{{ totalPage }}</span>
      </OPagination>

      <AppPaginationMo
        :current-page="queryData.pages.page"
        :total-page="Math.ceil(total / 10)"
        @turn-page="turnPage"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bulletin-main {
  max-width: 1504px;
  padding: 0 var(--o-spacing-h2);
  margin: var(--o-spacing-h1) auto 0;
  @media screen and (max-width: 1000px) {
    margin: 0 auto;
    padding: var(--o-spacing-h5);
    padding-bottom: 0;
  }
  .input-container {
    @media screen and (max-width: 1000px) {
      display: none;
    }
    .o-search {
      height: 48px !important;
    }
  }
  .calendar-mobile {
    display: none;
    margin: var(--o-spacing-h5) 0;
    width: 100%;
    background-color: var(--e-color-bg2);
    .o-icon {
      color: var(--e-color-text1);
    }
    .selected-year {
      color: var(--e-color-text1);
    }
    :deep(.el-collapse) {
      border: none;
      .el-collapse-item__header {
        background-color: var(--e-color-bg2);
        padding: 0 8px;
        border: none;
        height: 34px;
      }
      .el-collapse-item__wrap {
        border: none;
      }
      .el-collapse-item__content {
        padding-bottom: 0;
      }
    }

    .selected-year {
      margin-left: 8px;
    }
    .years {
      padding: 0 8px 8px;
      background-color: var(--e-color-bg2);
      color: var(--e-color-text1);
      .selected {
        background-color: var(--e-color-bg4);
      }
    }
    @media screen and (max-width: 1000px) {
      display: block;
    }
  }
  .filter-card {
    margin: var(--o-spacing-h4) 0;
    @media screen and (max-width: 1000px) {
      display: none;
    }
    :deep(.el-card__body) {
      padding: var(--o-spacing-h8) var(--o-spacing-h2);
    }
    .category {
      display: inline-block;
      width: 56px;
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: var(--e-color-text1);
      line-height: var(--o-line-height-text);
      margin-right: var(--o-spacing-h4);
    }
    .category-item {
      display: inline-block;
      height: 28px;
      border: none;
      margin-right: var(--o-spacing-h3);
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: var(--e-color-text4);
      line-height: var(--o-line-height-text);

      cursor: pointer;
    }
    .active {
      display: inline-block;
      border: 1px solid var(--e-color-link1);
      color: var(--e-color-link1);
      padding: 0px var(--o-spacing-h6);
    }
    .card-header {
      padding-bottom: var(--o-spacing-h8);
      border-bottom: 1px solid #ccc;
    }
    .card-body {
      padding-top: var(--o-spacing-h8);
    }
  }
  .filter-mobile {
    display: none;
    @media screen and (max-width: 1000px) {
      display: block;
    }
    .filter {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: var(--o-spacing-h8);
      .selected {
        background-color: var(--e-color-brand1);
        color: var(--e-color-text2);
      }
      &-item {
        cursor: pointer;
        flex: 1;
        text-align: center;
        padding: var(--o-spacing-h9);
        font-size: var(--o-font-size-text);
        font-weight: 400;
        color: var(--e-color-brand1);
        line-height: var(--o-line-height-text);
        border: 1px solid var(--e-color-brand1);
        border-right: 0;
        &:last-child {
          border: 1px solid var(--e-color-brand1);
        }
      }
    }
  }
  .pc-list {
    .detail-page {
      color: var(--e-color-link1);
      cursor: pointer;
    }
    @media screen and (max-width: 1000px) {
      display: none;
    }
  }
  .mobile-list {
    display: none;
    margin-bottom: var(--o-spacing-h5);
    box-shadow: var(--e-shadow1);
    @media screen and (max-width: 1000px) {
      display: block;
    }
    .item {
      padding: var(--o-spacing-h5) var(--o-spacing-h5) var(--o-spacing-h8);
      font-size: var(--o-font-size-tip);
      font-weight: 400;
      color: var(--e-color-neutral8);
      line-height: var(--o-line-height-tip);
      background-color: var(--e-color-bg2);
      &:nth-child(odd) {
        background: var(--e-color-bg4);
      }
      & li {
        margin-bottom: var(--o-spacing-h8);
      }
      li:first-child {
        margin-bottom: 0;
        .notice {
          color: var(--e-color-link1);
        }
      }
      li:nth-child(4) {
        display: flex;
        span {
          min-width: 52px;
        }
      }
      span {
        color: var(--e-color-text1);
        margin-right: var(--o-spacing-h8);
      }
    }
  }
  .pagination {
    margin-top: var(--o-spacing-h2);
    @media screen and (max-width: 1000px) {
      display: none;
    }
    .slot-content {
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: var(--e-color-text1);
      line-height: var(--o-spacing-h4);
    }
  }
  .mobile-pagination {
    display: none;
    @media screen and (max-width: 1000px) {
      display: block;
    }
  }
}
</style>
