<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';

import BannerLevel2 from '@/components/BannerLevel2.vue';

import banner from '@/assets/banner-secondary.png';
import search from '@/assets/illustrations/search.png';
import IconSearch from '~icons/app/icon-search.svg';

import { getSecurityList } from '@/api/api-security';
import { useData } from 'vitepress';

const { theme: i18n } = useData();
const inputName = ref('');
const total = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');

interface query {
  page: number;
  pageSize: number;
}

interface securityLists {
  affectedComponent: string;
  affectedProduct: string;
  announcementTime: string;
  securityNoticeNo: string;
  summary: string;
  type: string;
}

const tableData = ref<securityLists[]>([
  {
    affectedComponent: '',
    affectedProduct: '',
    announcementTime: '',
    securityNoticeNo: '',
    summary: '',
    type: '',
  },
]);

const queryData: query = reactive({
  page: 1,
  pageSize: 10,
});

function getSecurityLists(data) {
  try {
    getSecurityList(data).then((res: any) => {
      tableData.value = res.result.securityNoticeList;
      total.value = res.result.totalCount;
    });
  } catch (e) {}
}
getSecurityLists(queryData);

const handleSizeChange = (val: number) => {
  queryData.pageSize = val;
};
const handleCurrentChange = (val: number) => {
  queryData.page = val;
};
watch(queryData, () =>
  getSecurityLists({
    pages: { page: queryData.page, size: queryData.pageSize },
  })
);
</script>

<template>
  <div class="wrapper">
    <BannerLevel2
      :background-image="banner"
      background-text="CONTENT"
      :title="i18n.security.SECURITY_ADVISORIES"
      subtitle=""
      :illustration="search"
    />
    <OInput
      v-model="inputName"
      :prefix-icon="IconSearch"
      :placeholder="i18n.security.SEARCH"
      style="margin-top: 64px; height: 48px"
    ></OInput>
    <OCard class="filter-card">
      <template #header>
        <div class="card-header">
          <span class="category">{{ i18n.security.SEVERITY }}</span>
          <span
            v-for="item in i18n.security.SEVERITY_LIST"
            :key="item"
            class="category-item"
            >{{ item.NAME }}</span
          >
        </div>
      </template>
      <div class="card-body">
        <span class="category">{{ i18n.security.YEAR }}</span>
        <span class="category-item">2021</span>
      </div>
    </OCard>
    <OTable :data="tableData" style="width: 100%">
      <OTableColumn
        :label="i18n.security.ADVISORY"
        prop="securityNoticeNo"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.security.SYNOPSIS"
        prop="summary"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.security.SEVERITY"
        prop="type"
        width="140"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.security.AFFECTED_PRODUCTS"
        prop="affectedProduct"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.security.AFFECTED_COMPONENTS"
        prop="affectedComponent"
        width="200"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.security.RELEASE_DATE"
        prop="announcementTime"
        width="160"
      ></OTableColumn>
    </OTable>
    <OPagination
      class="pagination"
      :background="true"
      v-model:page-size="queryData.pageSize"
      v-model:currentPage="queryData.page"
      :page-sizes="[10, 20, 40, 80]"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <span>5/20</span>
    </OPagination>
  </div>
</template>

<style lang="scss" scoped>
.filter-card {
  margin: var(--o-spacing-s3) 0;
  .category {
    display: inline-block;
    width: 56px;
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-text);
  }
  .category-item {
    width: 28px;
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text3);
    line-height: var(--o-line-height-text);
    margin-left: var(--o-spacing-s4);
  }
  .card-header {
    padding-bottom: 19px;
    border-bottom: 1px solid #ccc;
  }
  .card-body {
    padding-top: 19px;
  }
}
.pagination {
  margin: var(--o-spacing-m) 0 var(--o-spacing-l) 0;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>
