<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useData } from 'vitepress';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import banner from '@/assets/banner-secondary.png';
import search from '@/assets/illustrations/search.png';

import { BulletinParams } from '@/shared/@types/type-safety-bulletin';

const { theme: i18n } = useData();
const inputName = ref('zhangsan');
const activeIndex = ref(0);
const total = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');

const queryData: BulletinParams = reactive({
  page: 1,
  size: 10,
});

const tagClick = (i: number) => {
  activeIndex.value = i;
};

const handleSizeChange = (val: number) => {
  queryData.size = val;
};

const handleCurrentChange = (val: number) => {
  queryData.page = val;
};
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
        <OTable>
          <OTableColumn label="架构" prop=""></OTableColumn>
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
    <OTabPane label="板卡"> </OTabPane>
    <OTabPane label="开源软件"> </OTabPane>
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
