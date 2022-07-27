<script lang="ts" setup>
import { reactive, ref, watch, onMounted } from 'vue';
import { useData } from 'vitepress';

import BannerLevel2 from '@/components/BannerLevel2.vue';

import banner from '@/assets/banner-secondary.png';
import search from '@/assets/illustrations/search.png';

import { getCveList } from '@/api/api-security';
import { CveLists, QueryParams } from '@/shared/@types/type-cvelist';

const inputName = ref('');
const { theme: i18n } = useData();
const total = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');
const activeIndex = ref(0);

const tableData = ref<CveLists[]>([
  {
    announcementTime: '',
    cveId: '',
    cvsssCoreOE: '',
    status: '',
    summary: '',
    updateTime: '',
  },
]);

const queryData: QueryParams = reactive({
  page: 1,
  size: 10,
});

function getCveLists(data: QueryParams) {
  try {
    getCveList(data).then((res: any) => {
      tableData.value = res.result.cveDatabaseList;
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
onMounted(() => {
  getCveLists(queryData);
});
watch(
  queryData,
  //   {
  //   pages: { page: queryData.page, size: queryData.size },
  // }
  () => getCveLists(queryData)
);
</script>
<template>
  <BannerLevel2
    :background-image="banner"
    background-text="CONTENT"
    :title="i18n.security.CVE"
    subtitle=""
    :illustration="search"
  />
  <div class="wrapper">
    <OSearch class="o-search" v-model="inputName"></OSearch>
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
    </OCard>
    <OTable :data="tableData" style="width: 100%">
      <OTableColumn :label="i18n.security.CVE" prop="cveId"> </OTableColumn>
      <OTableColumn
        :label="i18n.security.SYNOPSIS"
        prop="summary"
      ></OTableColumn>
      <OTableColumn
        :label="i18n.security.CVSS_SCORE"
        prop="cvsssCoreOE"
      ></OTableColumn>
      <OTableColumn
        width="210"
        :label="i18n.security.RELEASE_DATE"
        prop="updateTime"
      ></OTableColumn>
      <OTableColumn
        width="210"
        :label="i18n.security.MODIFIED_TIME"
        prop="updateTime"
      ></OTableColumn>
      <OTableColumn :label="i18n.security.STATUS" prop="status"></OTableColumn>
      <OTableColumn :label="i18n.security.OPERATION"> </OTableColumn>
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
      <span>5/20</span>
    </OPagination>
  </div>
</template>
<style lang="scss" scoped>
.wrapper {
  max-width: 1504px;
  margin: var(--o-spacing-h1) auto 0;
  padding: var(--o-spacing-h1) var(--o-spacing-h2) 0px;
  .o-search {
    height: 48px;
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
  .card-header {
    line-height: 54px;
  }
  .category-item {
    width: 28px;
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text3);
    line-height: var(--o-line-height-text);
    cursor: pointer;
  }
  .active {
    border: 1px solid #002fa7;
    color: #002fa7;
    padding: 3px 12px;
  }
}
.pagination {
  margin: var(--o-spacing-h2) 0 var(--o-spacing-h1) 0;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>
