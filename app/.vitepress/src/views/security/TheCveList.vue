<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { useI18n } from '@/i18n';
import { useRouter } from 'vitepress';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import TagFilter from '@/components/TagFilter.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';
import AppContent from '@/components/AppContent.vue';

import banner from '@/assets/banner-secondary.png';
import cve from '@/assets/illustrations/cve.png';
import search from '@/assets/illustrations/search.png';

import { getCveList } from '@/api/api-security';
import { CveLists, CveQuery } from '@/shared/@types/type-support';
import useWindowResize from '@/components/hooks/useWindowResize';
const windowWidth = ref(useWindowResize());

const screenWidth = ref(1080);
const i18n = useI18n();
const router = useRouter();
const currentPage = ref(1);
const totalPage = ref(0);
const total = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');
const searchContent = ref('');
const activeIndex = ref(0);
const filterIndex = ref(0);

const tableData = ref<CveLists[]>([
  {
    announcementTime: '',
    cveId: '',
    cvsssCoreOE: '',
    status: '',
    summary: '',
    updateTime: '',
    packageName: '',
  },
]);

const queryData: CveQuery = reactive({
  pages: {
    page: 1,
    size: 10,
  },
  keyword: '',
  status: '',
});

function getCveLists(data: CveQuery) {
  try {
    getCveList(data).then((res: any) => {
      tableData.value = res.result.cveDatabaseList;
      total.value = res.result.totalCount;
      totalPage.value = Math.ceil(total.value / queryData.pages.size);
    });
  } catch (e: any) {
    throw new Error(e);
  }
}

const tagClick = (i: number, category: string) => {
  activeIndex.value = i;
  queryData.status = category;
};

const handleSizeChange = (val: number) => {
  queryData.pages.size = val;
  totalPage.value = Math.ceil(total.value / val);
};

const handleCurrentChange = (val: number) => {
  queryData.pages.page = val;
  currentPage.value = val;
};

function filterClick(i: number, category: string) {
  filterIndex.value = i;
  queryData.status = category;
}

function searchValchange() {
  queryData.keyword = searchContent.value;
}

function turnPage(option: string) {
  if (option === 'prev' && queryData.pages.page > 1) {
    queryData.pages.page = queryData.pages.page - 1;
  } else if (option === 'next' && queryData.pages.page < total.value) {
    queryData.pages.page = queryData.pages.page + 1;
  }
}

function goCveDetail(id: string, name: string) {
  router.go(`${router.route.path}detail/?cveId=${id}&packageName=${name}`);
}

onMounted(() => {
  getCveLists(queryData);
});

watch(queryData, () => getCveLists(queryData));
watch(windowWidth, () => {
  screenWidth.value = windowWidth.value;
});
</script>
<template>
  <BannerLevel2
    class="banner-pc"
    :background-image="banner"
    background-text="SUPPORT"
    :title="i18n.security.CVE"
    subtitle=""
    :illustration="screenWidth >= 1000 ? search : cve"
  />
  <AppContent :mobileTop="16">
    <OSearch
      class="o-search"
      v-model="searchContent"
      :placeholder="i18n.security.INPUT_CVE_ID"
      @change="searchValchange"
    ></OSearch>

    <div class="filter-card">
      <TagFilter :label="i18n.security.SEVERITY" :show="false">
        <OTag
          v-for="(item, index) in i18n.security.CATEGORY_LIST"
          :key="'tag' + index"
          checkable
          :type="activeIndex === index ? 'primary' : 'text'"
          @click="tagClick(index, item.LABEL)"
        >
          {{ item.NAME }}
        </OTag>
      </TagFilter>
    </div>

    <OTable class="pc-list" :data="tableData" style="width: 100%">
      <OTableColumn :label="i18n.security.CVE" prop="cveId" width="160">
      </OTableColumn>
      <OTableColumn
        :label="i18n.security.SYNOPSIS"
        prop="summary"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.security.CVSS_SCORE"
        prop="cvsssCoreOE"
        width="120"
      ></OTableColumn>
      <OTableColumn
        width="180"
        :label="i18n.security.RELEASE_DATE"
        prop="updateTime"
      ></OTableColumn>
      <OTableColumn
        width="180"
        :label="i18n.security.MODIFIED_TIME"
        prop="updateTime"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.security.STATUS"
        prop="status"
        width="120"
      ></OTableColumn>
      <el-table-column :label="i18n.security.OPERATION" width="80">
        <template #default="scope">
          <span
            class="detail-page"
            @click="goCveDetail(scope.row.cveId, scope.row.packageName)"
            >{{ i18n.security.DETAIL }}</span
          >
        </template>
      </el-table-column>
    </OTable>

    <div class="filter-mobile">
      <div class="filter">
        <div
          v-for="(item, index) in i18n.security.CATEGORY_LIST"
          :key="item"
          :class="filterIndex === index ? 'selected' : ''"
          class="filter-item"
          @click="filterClick(index, item.LABEL)"
        >
          {{ item.NAME }}
        </div>
      </div>
    </div>

    <ul class="mobile-list">
      <li v-for="item in tableData" :key="item.cveId" class="item">
        <ul>
          <li>
            <span>{{ i18n.security.CVE }}:</span>{{ item.cveId }}
          </li>
          <li>
            <span>{{ i18n.security.SYNOPSIS }}:</span>{{ item.summary }}
          </li>
          <li>
            <span>{{ i18n.security.CVSS_SCORE }}:</span>{{ item.cvsssCoreOE }}
          </li>
          <li>
            <span>{{ i18n.security.RELEASE_DATE }}:</span
            >{{ item.announcementTime }}
          </li>
          <li>
            <span>{{ i18n.security.MODIFIED_TIME }}:</span>{{ item.updateTime }}
          </li>
          <li>
            <span>{{ i18n.security.STATUS }}:</span>{{ item.status }}
          </li>
          <li>
            <span>{{ i18n.security.OPERATION }}:</span
            ><a
              class="detail-page"
              @click="goCveDetail(item.cveId, item.packageName)"
              >{{ i18n.security.DETAIL }}</a
            >
          </li>
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
      <span class="pagination-slot"> {{ currentPage }}/{{ totalPage }}</span>
    </OPagination>

    <AppPaginationMo
      :current-page="queryData.pages.page"
      :total-page="Math.ceil(total / 10)"
      @turn-page="turnPage"
    />
  </AppContent>
</template>
<style lang="scss" scoped>
.o-search {
  height: 48px;
  @media screen and (max-width: 1000px) {
    display: none;
  }
}
.filter-card {
  margin: var(--o-spacing-h4) 0;
  background-color: var(--e-color-bg2);
  padding: var(--o-spacing-h5) var(--o-spacing-h2);
  @media screen and (max-width: 1000px) {
    display: none;
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
.mobile-list {
  display: none;
  margin-bottom: var(--o-spacing-h5);
  box-shadow: var(--e-shadow1);
  @media screen and (max-width: 1000px) {
    display: block;
  }
  .item {
    padding: var(--o-spacing-h5);
    font-size: var(--o-font-size-tip);
    font-weight: 400;
    color: #999999;
    line-height: var(--o-line-height-tip);
    background-color: var(--e-color-bg2);
    &:nth-child(odd) {
      background: var(--e-color-bg4);
    }
    & li {
      margin-bottom: var(--o-spacing-h8);
    }
    li:last-child {
      margin-bottom: 0;
      a {
        color: var(--e-color-link1);
      }
    }
    li:nth-child(2) {
      display: flex;
      span {
        min-width: 30px;
      }
    }
    span {
      color: var(--e-color-text1);
      margin-right: var(--o-spacing-h8);
    }
  }
}
.pc-list {
  .detail-page {
    cursor: pointer;
    color: var(--e-color-link1);
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
}
.pagination {
  margin: var(--o-spacing-h2) 0 0 0;
  .pagination-slot {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: var(--o-spacing-h4);
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
}
</style>
