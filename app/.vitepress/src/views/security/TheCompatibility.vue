<script lang="ts" setup>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import banner from '@/assets/banner-secondary.png';
import TagFilter from '@/components/TagFilter.vue';
import search from '@/assets/illustrations/search.png';

import type { TabsPaneContext } from 'element-plus';

import {
  getCompatibilityList,
  getDriverList,
  driverArchitectureOptions,
  driverOSOptions,
} from '@/api/api-security';

import { CveQuery, CompatibilityList } from '@/shared/@types/type-support.ts';

const i18n = computed(() => useI18n());
const searchContent = ref('');
const activeIndex = ref(0);
const activeIndex1 = ref(0);
const total = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');
const architectureSelect = ref<string[]>(['全部']);
const osOptions = ref<string[]>(['全部']);
const activeName = ref('first');

const queryData: CveQuery = reactive({
  pages: {
    page: 1,
    size: 10,
  },
  architecture: '',
  keyword: '',
  cpu: '',
  os: '',
  lang: 'zh',
});

const tableData = ref<CompatibilityList>([]);
// 整机
const getCompatibilityData = (data: CveQuery) => {
  try {
    getCompatibilityList(data).then((res: any) => {
      // console.log(res);
      total.value = res.result.totalCount;
      tableData.value = res.result.hardwareCompList;
    });
  } catch (e: any) {
    throw new Error(e);
  }
};
// 板卡
const getDriverData = (data: CveQuery) => {
  try {
    getDriverList(data).then((res: any) => {
      // console.log(res);
      total.value = res.result.totalCount;
      tableData.value = res.result.driverCompList;
    });
  } catch (e: any) {
    throw new Error(e);
  }
};
// 开源软件

// 商业软件

const handleClick = (tab: TabsPaneContext) => {
  // console.log(tab.props.label, event);
  switch (tab.props.label) {
    case '整机':
      getCompatibilityData(queryData);
      break;
    case '板卡':
      getDriverData(queryData);
      break;
    case '开源软件':
      // console.log(3);
      break;
    case '商业软件':
      // console.log(4);
      break;
  }
};

const tagClick = (i: number, item: string) => {
  activeIndex.value = i;
  queryData.os = item === '全部' ? '' : item;
};

const optionTagClick = (i: number, item: string) => {
  activeIndex1.value = i;
  queryData.architecture = item === '全部' ? '' : item;
};

const handleSizeChange = (val: number) => {
  queryData.pages.size = val;
};

const handleCurrentChange = (val: number) => {
  queryData.pages.page = val;
};

function searchValchange() {
  queryData.keyword = searchContent.value;
}

onMounted(() => {
  getCompatibilityData(queryData);
  driverArchitectureOptions({ lang: 'zh' }).then((res) => {
    res.result.forEach((item: string) => {
      architectureSelect.value.push(item);
    });
  });
  driverOSOptions({ lang: 'zh' }).then((res) => {
    res.result.forEach((item: string) => {
      osOptions.value.push(item);
    });
  });
});

watch(queryData, () => getCompatibilityData(queryData));
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="CONTENT"
    title="兼容性列表"
    subtitle=""
    :illustration="search"
  />
  <OTabs v-model="activeName" @tab-click="handleClick">
    <!-- 整机 -->
    <OTabPane label="整机" name="first">
      <div class="wrapper">
        <OSearch
          v-model="searchContent"
          class="o-search"
          @change="searchValchange"
        ></OSearch>
        <OCard class="filter-card">
          <template #header>
            <div class="card-header">
              <TagFilter :label="i18n.compatibility.ADAPTIVE" :show="false">
                <OTag
                  v-for="(item, index) in osOptions"
                  :key="'tag' + index"
                  :type="activeIndex === index ? 'primary' : 'text'"
                  @click="tagClick(index, item)"
                >
                  {{ item }}
                </OTag>
              </TagFilter>
            </div>
          </template>
          <div class="card-body">
            <TagFilter :show="false" :label="i18n.security.YEAR">
              <OTag
                v-for="(item, index) in architectureSelect"
                :key="'tag' + index"
                :type="activeIndex1 === index ? 'primary' : 'text'"
                @click="optionTagClick(index, item)"
              >
                {{ item }}
              </OTag>
            </TagFilter>
          </div>
        </OCard>
        <OTable class="pc-list" :data="tableData" style="width: 100%">
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.ARCHITECTURE"
            prop="architecture"
            width="160"
          >
          </OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_NAME"
            prop="hardDiskDrive"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_OS"
            prop="osVersion"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.VERSION"
            prop="biosUefi"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.TYPE"
            prop="updateTime"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVER_DATE"
            prop="date"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_VENDOR"
            prop="hardwareFactory"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.BOARD_MODEL"
            prop="hardwareModel"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_MODEL"
            prop="ram"
          ></OTableColumn>
        </OTable>
      </div>
    </OTabPane>
    <!-- 板卡 -->
    <OTabPane label="板卡" name="second">
      <div class="wrapper">
        <OSearch
          v-model="searchContent"
          class="o-search"
          @change="searchValchange"
        ></OSearch>
        <OCard class="filter-card">
          <template #header>
            <div class="card-header">
              <TagFilter :label="i18n.compatibility.ADAPTIVE" :show="false">
                <OTag
                  v-for="(item, index) in osOptions"
                  :key="'tag' + index"
                  :type="activeIndex === index ? 'primary' : 'text'"
                  @click="tagClick(index, item)"
                >
                  {{ item }}
                </OTag>
              </TagFilter>
            </div>
          </template>
          <div class="card-body">
            <TagFilter :show="false" :label="i18n.security.YEAR">
              <OTag
                v-for="(item, index) in architectureSelect"
                :key="'tag' + index"
                :type="activeIndex1 === index ? 'primary' : 'text'"
                @click="optionTagClick(index, item)"
              >
                {{ item }}
              </OTag>
            </TagFilter>
          </div>
        </OCard>
        <OTable class="pc-list" :data="tableData" style="width: 100%">
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.ARCHITECTURE"
            prop="architecture"
            width="160"
          >
          </OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_NAME"
            prop="hardDiskDrive"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_OS"
            prop="osVersion"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.VERSION"
            prop="biosUefi"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.TYPE"
            prop="updateTime"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVER_DATE"
            prop="date"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_VENDOR"
            prop="hardwareFactory"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.BOARD_MODEL"
            prop="hardwareModel"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_MODEL"
            prop="ram"
          ></OTableColumn>
        </OTable>
      </div>
    </OTabPane>
    <!-- 开源软件 -->
    <OTabPane label="开源软件" name="third"> </OTabPane>
    <!-- 商业软件 -->
    <OTabPane label="商业软件" name="fourth"> </OTabPane>
    <div class="bottom-wrapper">
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
      <p class="about">
        关于硬件兼容性测试，openEuler提供了完整的测试流程和工具，详见
        <a href="#">openEuler 硬件兼容性测试整体介绍</a>
      </p>
    </div>
  </OTabs>
</template>

<style lang="scss" scoped>
:deep(.el-tabs__nav-scroll) {
  display: flex;
  justify-content: center;
  background-color: #fff;
}
.bottom-wrapper {
  max-width: 1504px;
  margin: 0 auto;
  padding: 0 var(--o-spacing-h2);
}
.wrapper {
  max-width: 1504px;
  padding: var(--o-spacing-h1) var(--o-spacing-h2) 0px;
  margin: 0 auto;
  // margin-top: var(--o-spacing-h2);
  //   background-color: var(--o-color-bg);
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
  margin: var(--o-spacing-h2) 0 var(--o-spacing-h4);
}
.about {
  // margin-bottom: var(--o-spacing-h4);
  font-size: var(--o-font-size-h8);
  font-weight: 400;
  color: var(--o-color-text2);
  line-height: var(--o-line-height-h8);
}
</style>
