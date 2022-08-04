<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import banner from '@/assets/banner-secondary.png';
import TagFilter from '@/components/TagFilter.vue';
import search from '@/assets/illustrations/search.png';

import { getCompatibilityList } from '@/api/api-security';

import { cveQuery, compatibilityList } from '@/shared/@types/type-support.ts';

const i18n = computed(() => useI18n());
const inputName = ref('zhangsan');
const activeIndex = ref(0);
const total = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');

const queryData: cveQuery = reactive({
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

const tableData = ref<compatibilityList>([]);

const getCompatibilityData = (data: cveQuery) => {
  try {
    getCompatibilityList(data).then((res: any) => {
      tableData.value = res.result.hardwareCompList;
    });
  } catch (e) {
    console.error(e);
  }
};

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
  getCompatibilityData(queryData);
});
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="CONTENT"
    title="兼容性列表"
    subtitle=""
    :illustration="search"
  />
  <OTabs>
    <!-- 整机 -->
    <OTabPane label="整机">
      <div class="wrapper">
        <OSearch v-model="inputName" class="o-search"></OSearch>
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

        <OTable class="pc-list" :data="tableData" style="width: 100%">
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.ARCHITECTURE"
            prop="architecture"
            width="160"
          >
          </OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_NAME"
            prop="summary"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_OS"
            prop="osVersion"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.VERSION"
            prop="updateTime"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.TYPE"
            prop="updateTime"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVER_DATE"
            prop="status"
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
        <p class="about">
          关于硬件兼容性测试，openEuler提供了完整的测试流程和工具，详见
          <a href="#">openEuler 硬件兼容性测试整体介绍</a>
        </p>
      </div>
    </OTabPane>
    <!-- 板卡 -->
    <OTabPane label="板卡"> </OTabPane>
    <!-- 开源软件 -->
    <OTabPane label="开源软件"> </OTabPane>
    <!-- 商业软件 -->
    <OTabPane label="商业软件"> </OTabPane>
  </OTabs>
</template>
<style lang="scss" scoped>
:deep(.el-tabs__nav-scroll) {
  display: flex;
  justify-content: center;
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
