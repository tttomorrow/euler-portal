<script lang="ts" setup>
import { reactive, ref, watch, onMounted } from 'vue';
import { useData, useRouter } from 'vitepress';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import banner from '@/assets/banner-secondary.png';
import search from '@/assets/illustrations/search.png';
import IconSearch from '~icons/app/icon-search.svg';

import { getSecurityList } from '@/api/api-security';
import {
  BulletinParams,
  SecurityLists,
} from '@/shared/@types/type-safety-bulletin';

const router = useRouter();
const { theme: i18n } = useData();
const inputName = ref('');
const total = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');
const classIndex = ref(-1);

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
const queryData: BulletinParams = reactive({
  page: 1,
  pageSize: 10,
});

function getSecurityLists(data: BulletinParams) {
  try {
    getSecurityList(data).then((res: any) => {
      tableData.value = res.result.securityNoticeList;
      total.value = res.result.totalCount;
    });
  } catch (e: any) {
    throw new Error(e);
  }
}

const handleSizeChange = (val: number) => {
  queryData.pageSize = val;
};

const handleCurrentChange = (val: number) => {
  queryData.page = val;
};

function jumpBulletinDetail(val: any) {
  router.go(`zh/security/safety-bulletin/detail/?id=${JSON.stringify(val)}`);
}

onMounted(() => {
  getSecurityLists(queryData);
});
function handleselectClass(i: number) {
  classIndex.value = i;
}
watch(
  queryData,
  //   {
  //   pages: { page: queryData.page, size: queryData.pageSize },
  // }
  () => getSecurityLists(queryData)
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
    <div class="bulletin-main">
      <div class="input-container">
        <OInput
          v-model="inputName"
          :prefix-icon="IconSearch"
          :placeholder="i18n.security.SEARCH"
        ></OInput>
      </div>
      <OCard class="filter-card">
        <template #header>
          <div class="card-header">
            <span class="category">{{ i18n.security.SEVERITY }}</span>
            <span
              v-for="(item, index) in i18n.security.SEVERITY_LIST"
              :key="item"
              class="category-item"
              :class="index === classIndex ? 'active' : ''"
              @click="handleselectClass(index)"
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
        v-model:page-size="queryData.pageSize"
        v-model:currentPage="queryData.page"
        class="pagination"
        :page-sizes="[10, 20, 40, 80]"
        :layout="layout"
        :total="total"
        :background="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <span>5/20</span>
      </OPagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bulletin-main {
  max-width: 1504px;
  padding: var(--o-spacing-h2);
  margin: var(--o-spacing-h1) auto;
  margin-top: var(--o-spacing-h2);
  background-color: var(--o-color-bg);
  .input-container {
    margin-top: var(--o-spacing-h1);
    .o-input {
      height: 48px !important;
    }
  }
  .filter-card {
    margin: var(--o-spacing-h4) 0;
    .category {
      display: inline-block;
      width: 56px;
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: var(--o-color-text2);
      line-height: var(--o-line-height-text);
    }
    .category-item {
      display: inline-block;
      height: 28px;
      border: none;
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: var(--o-color-text3);
      line-height: var(--o-line-height-text);
      margin-left: var(--o-spacing-h4);
      cursor: pointer;
    }
    .active {
      display: inline-block;
      border: 1px solid #002fa7;
      color: #002fa7;
      padding: 0px 12px;
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
    margin: var(--o-spacing-h2) 0 var(--o-spacing-h1) 0;
  }
}
</style>