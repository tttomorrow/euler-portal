<script lang="ts" setup>
import { reactive, ref, onMounted, computed, watch } from 'vue';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import TagFilter from '@/components/TagFilter.vue';

import banner from '@/assets/banner-secondary.png';
import cve from '@/assets/illustrations/cve.png';
import search from '@/assets/illustrations/search.png';

import { getCveList } from '@/api/api-security';
import { cveLists, cveQuery } from '@/shared/@types/type-support';

const i18n = computed(() => useI18n());
const total = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');
const searchContent = ref('');
const activeIndex = ref(0);
const filterIndex = ref(0);

const tableData = ref<cveLists[]>([
  {
    announcementTime: '',
    cveId: '',
    cvsssCoreOE: '',
    status: '',
    summary: '',
    updateTime: '',
  },
]);

const queryData: cveQuery = reactive({
  pages: {
    page: 1,
    size: 10,
  },
  keyword: '',
  status: '',
});

function getCveLists(data: cveQuery) {
  try {
    getCveList(data).then((res: any) => {
      tableData.value = res.result.cveDatabaseList;
      total.value = res.result.totalCount;
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
};

const handleCurrentChange = (val: number) => {
  queryData.pages.page = val;
};

function filterClick(i: number, category: string) {
  filterIndex.value = i;
  queryData.status = category;
}

function searchValchange() {
  queryData.keyword = searchContent.value;
}

onMounted(() => {
  getCveLists(queryData);
});

watch(queryData, () => getCveLists(queryData));
</script>
<template>
  <BannerLevel2
    class="banner-pc"
    :background-image="banner"
    background-text="SUPPORT"
    :title="i18n.security.CVE"
    subtitle=""
    :illustration="search"
  />
  <BannerLevel2
    class="banner-mobile"
    :background-image="banner"
    background-text="SUPPORT"
    :title="i18n.security.CVE"
    subtitle=""
    :illustration="cve"
  />
  <div class="wrapper">
    <OSearch
      v-model="searchContent"
      class="o-search"
      :placeholder="i18n.security.INPUT_CVE_ID"
      @change="searchValchange"
    ></OSearch>

    <div class="filter-card">
      <TagFilter label="严重等级" :show="false">
        <OTag
          v-for="(item, index) in i18n.security.CATEGORY_LIST"
          :key="'tag' + index"
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
      <!-- <OTableColumn :label="i18n.security.OPERATION"> </OTableColumn> -->
      <el-table-column :label="i18n.security.OPERATION" width="80">
        <template #default>
          <span>详情</span>
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
      <li v-for="item in tableData" :key="item" class="item">
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
            <span>{{ i18n.security.OPERATION }}:</span><a>详情</a>
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
  padding: 0 var(--o-spacing-h2);
  @media screen and (max-width: 1080px) {
    padding: var(--o-spacing-h5) var(--o-spacing-h5) 0;
    margin: 0 auto;
  }
  .o-search {
    height: 48px;
    @media screen and (max-width: 1080px) {
      display: none;
    }
  }
}
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
.filter-card {
  margin: var(--o-spacing-h4) 0;
  background-color: var(--o-color-bg);
  padding: var(--o-spacing-h5) var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    display: none;
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
    margin-bottom: 32px;
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
.pc-list {
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.pagination {
  margin: var(--o-spacing-h2) 0 0 0;
  margin-left: 50%;
  transform: translateX(-50%);
  @media screen and (max-width: 1080px) {
    display: none;
  }
}
</style>
