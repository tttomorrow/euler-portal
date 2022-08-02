<script lang="ts" setup>
import { reactive, ref, watch, onMounted } from 'vue';
import { useData, useRouter } from 'vitepress';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import banner from '@/assets/banner-secondary.png';
import search from '@/assets/illustrations/search.png';

import { getSecurityList } from '@/api/api-security';
import { BulletinParams, SecurityLists } from '@/shared/@types/type-support.ts';
import OSearch from 'opendesign/search/OSearch.vue';

const router = useRouter();
const { theme: i18n } = useData();
const inputName = ref('');
const total = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');
const activeIndex = ref(0);

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
const queryData = reactive({
  page: 1,
  size: 10,
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

const tagClick = (i: number) => {
  activeIndex.value = i;
};

const handleSizeChange = (val: number) => {
  queryData.size = val;
};

const handleCurrentChange = (val: number) => {
  queryData.page = val;
};

function jumpBulletinDetail(val: any) {
  router.go(`zh/security/safety-bulletin/detail/?id=${JSON.stringify(val)}`);
}

onMounted(() => {
  // { pages: { page: queryData.page, size: queryData.size } }
  getSecurityLists(queryData);
});

watch(
  queryData,
  //   {
  //   pages: { page: queryData.page, size: queryData.size },
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
        <OSearch v-model="inputName"></OSearch>
      </div>
      <OCard class="filter-card">
        <template #header>
          <div class="card-header">
            <span class="category">{{ i18n.security.SEVERITY }}</span>
            <TagFilter label="全部" :show="true">
              <OTag
                v-for="(item, index) in i18n.security.SEVERITY_LIST"
                :key="'tag' + index"
                :type="activeIndex === index ? 'primary' : 'text'"
                @click="tagClick(index)"
              >
                {{ item.NAME }}
              </OTag>
            </TagFilter>
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
      <OPagination
        v-model:page-size="queryData.size"
        v-model:currentPage="queryData.page"
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
.bulletin-main {
  max-width: 1504px;
  padding: 0 var(--o-spacing-h2);
  margin: var(--o-spacing-h1) auto 0;
  margin-top: var(--o-spacing-h2);
  // background-color: var(--o-color-bg);
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
      margin-right: var(--o-spacing-h4);
    }
    .category-item {
      display: inline-block;
      height: 28px;
      border: none;
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
  .pagination {
    margin-top: var(--o-spacing-h2);
  }
  .slot-content {
    color: var(--o-color-text2);
  }
}
</style>
