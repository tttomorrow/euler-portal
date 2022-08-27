<script setup lang="ts">
import { ref, computed } from 'vue';
import IconLeft from '~icons/app/icon-left.svg';
import IconRight from '~icons/app/icon-right.svg';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import BannerLevel3 from '@/components/BannerLevel3.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';
import AppAnchor from '@/components/AppAnchor.vue';
import TagFilter from '@/components/TagFilter.vue';

import banner from '@/assets/banner-secondary.png';
import search from '@/assets/illustrations/search.png';

const currentPage1 = ref(5);
const pageSize4 = ref(100);
const total = ref(100);
const date = ref('2022-07');

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];

const inputName = ref('zhangsan');

// 锚点只支持二级列表
const anchorData = [
  { id: 'anchor1', name: '锚点1' },
  {
    id: 'anchor2',
    name: '锚点2',
    children: [
      { id: 'anchor3-1', name: '锚点3-1' },
      { id: 'anchor3-2', name: '锚点3-2' },
    ],
  },
  { id: 'anchor3', name: '锚点3' },
];
const anchorData1 = [
  { id: 'anchor4', name: '锚点4' },
  { id: 'anchor5', name: '锚点5' },
  { id: 'anchor6', name: '锚点6' },
  { id: 'anchor7', name: '锚点7' },
];

// tagFiter strart
const isAll = ref(false);
const tagArrLen = computed(() => {
  return isAll.value ? 30 : 10;
});
const toggleClick = (flag: boolean) => {
  isAll.value = flag;
};

const activeIndex = ref(0);
const tagClick = (i: number) => {
  activeIndex.value = i;
};
// tagFiter end-

const isDrawerOpen = ref(false);
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const radioValue = ref('');
const handleRadioChange = (val: string) => {
  radioValue.value = val;
};

const switchVal = ref(false);
// 移动端分页器 start
const currentPage = ref(1);
const totalPage = ref(3);
function turnPage(option: string) {
  if (option === 'prev' && currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
  } else if (option === 'next' && currentPage.value < totalPage.value) {
    currentPage.value = currentPage.value + 1;
  }
}
// 移动端分页器 end
</script>

<template>
  <div class="demo">
    <div class="demo-box">
      <h4>ORadio</h4>
      <ORadioGroup
        v-model="radioValue"
        :style="{ marginBottom: '30px' }"
        @change="handleRadioChange"
      >
        <ORadio value="a">radio1</ORadio>
        <ORadio value="b">radio2</ORadio>
      </ORadioGroup>
      <ORadioGroup v-model="radioValue" @change="handleRadioChange">
        <ORadio value="a">
          <template #radio="{ checked }">
            <OTag checked checkable :type="checked ? 'primary' : 'text'"
              >tag1</OTag
            >
          </template>
        </ORadio>
        <ORadio value="b">
          <template #radio="{ checked }">
            <OTag checked checkable :type="checked ? 'primary' : 'text'"
              >tag2</OTag
            >
          </template>
        </ORadio>
      </ORadioGroup>
    </div>
    <div class="demo-box">
      <h4>OCheckBox</h4>
      <OCheckbox>checb</OCheckbox>
    </div>
    <div class="demo-box">
      <h4>OButton</h4>
      <div class="button-box">
        <OButton>type=outline</OButton>
        <OButton type="primary" disabled>type=primary</OButton>
        <OButton type="secondary">type=secondary</OButton>
        <OButton type="text" disabled>type=text</OButton>
      </div>
      <div class="button-box">
        <OButton type="primary" class="test">size=medium</OButton>
        <OButton type="primary" size="small">size=small</OButton>
        <OButton type="primary" size="mini">size=mini</OButton>
      </div>

      <div class="button-box">
        <OButton animation type="primary" size="medium">
          <template #prefixIcon>
            <OIcon><IconLeft /></OIcon>
          </template>
          Icon插槽
          <template #suffixIcon>
            <OIcon><IconRight /></OIcon>
          </template>
        </OButton>
      </div>
    </div>
    <div class="demo-box">
      <h4>OSwitch</h4>
      <OSwitch
        v-model="switchVal"
        size="large"
        active-text="是"
        inactive-text="否"
        active-color="#002fa7"
      />
    </div>
    <div class="demo-box">
      <h4>OContainer</h4>
      <OContainer class="container" :level-index="2"></OContainer>
    </div>
    <div class="demo-box">
      <h4>ODrawer</h4>
      <OButton type="primary" @click="toggleDrawer">toggle drawer</OButton>
      <ODrawer
        v-model="isDrawerOpen"
        direction="btt"
        :show-close="false"
        custom-class="o-drawer"
      >
      </ODrawer>
    </div>

    <div class="demo-box">
      <h4>OSearch</h4>
      <OSearch v-model="inputName"></OSearch>
    </div>

    <div class="demo-box">
      <h4>OTable</h4>
      <OTable :data="tableData" style="width: 100%">
        <OTableColumn label="Date" prop="date" width="180" />
        <OTableColumn prop="name" label="Name" width="180" />
        <OTableColumn prop="address" label="Address" />
        <OTableColumn label="Date" prop="date">
          <template #default="scope">
            <div>{{ scope.row.date }}</div>
          </template>
        </OTableColumn>
      </OTable>
    </div>

    <div class="demo-box">
      <h4>OPagination</h4>
      <div class="demo-box">
        <OPagination
          v-model:currentPage="currentPage1"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :background="true"
          layout="sizes, prev, pager, next, slot, jumper"
          :total="total"
        >
          <span>5/50</span>
        </OPagination>
      </div>
    </div>

    <div class="demo-box">
      <h4>BannerLevel2.vue</h4>
    </div>
    <BannerLevel2
      :background-image="banner"
      background-text="CONTENT"
      title="SIG"
      subtitle="SIG 就是 Special Interest Group 的缩写，openEuler 社区按照不同的 SIG 来组织"
      :illustration="search"
    />

    <div class="demo-box">
      <h4>BannerLevel3.vue</h4>
    </div>
    <BannerLevel3
      :background-image="banner"
      background-text="CONTENT"
      title="下载"
    />

    <div class="demo-box">
      <h4>TagFilter</h4>
      <OCard>
        <TagFilter label="筛选" :show="true" @toggle-click="toggleClick">
          <OTag
            v-for="(item, index) in tagArrLen"
            :key="'tag' + index"
            checkable
            :type="activeIndex === index ? 'primary' : 'text'"
            @click="tagClick(index)"
          >
            {{ 'TagFilter' + index }}
          </OTag>
        </TagFilter>
        <!-- 多选交互没写 -->
        <TagFilter label="多选">
          <OTag
            v-for="(item, index) in tagArrLen"
            :key="'tag' + index"
            :type="activeIndex === index ? 'primary' : 'text'"
            checked
            checkable
            @click="tagClick(index)"
          >
            {{ 'multiple' + index }}
          </OTag>
        </TagFilter>
      </OCard>
    </div>

    <div class="demo-box">
      <h4>OTag</h4>
      <OTag type="text">OTag-0</OTag>
      <OTag type="primary">OTag-0</OTag>
      <OTag type="secondary">特殊tag</OTag>
      <OTag size="small">OTag-1</OTag>
      <OTag size="small" checkable>可选中 checkable</OTag>
      <OTag type="primary" checked checkable>选中: checked</OTag>
    </div>

    <div class="demo-box">
      <h4>封装elementplus OInput</h4>
      <OInput v-model="inputName"></OInput>
    </div>

    <div class="demo-box">
      <h4>封装elementplus OCard</h4>
      <OCard header="OCard"></OCard>
    </div>

    <div class="demo-box">
      <h4>OTimeline</h4>
      <OTimeline
        v-model="date"
        :right-arrow="true"
        :left-arrow="true"
      ></OTimeline>
    </div>
    <div class="demo-box">
      <h4>AppAnchor 只支持二级列表</h4>
      <div id="anchor1" class="anchor-item">archor1</div>
      <div id="anchor2" class="anchor-item">
        archor2
        <div id="anchor3-1" class="anchor-item">archor2-1</div>
        <div id="anchor3-2" class="anchor-item">anchor2-2</div>
      </div>
      <div id="anchor3" class="anchor-item">archor3</div>
      <AppAnchor :data="anchorData" />
      <h4>AppAnchor 更换滚动容器</h4>
      <div class="anchor-main">
        <div class="anchor-side">
          <AppAnchor id="anchor-test" :data="anchorData1" left="12px" top="0" />
        </div>
        <div id="anchor-test" class="anchor-content">
          <div id="anchor4" class="anchor-item">archor4</div>
          <div id="anchor5" class="anchor-item">archor5</div>
          <div id="anchor6" class="anchor-item">archor6</div>
          <div id="anchor7" class="anchor-item">archor7</div>
        </div>
      </div>
    </div>
    <div class="demo-box">
      <h4>OCollapse不带图片</h4>
      <OCollapse>
        <OCollapseItem title="title1">
          <div>
            Consistent with real life: in line with the process and logic of
            real life, and comply with languages and habits that the users are
            used to;
          </div>
        </OCollapseItem>
      </OCollapse>
    </div>
    <div class="demo-box">
      <h4>OCollapse带图片</h4>
      <OCollapse>
        <OCollapseItem>
          <template #title>
            <div style="display: flex">
              <img src="@/assets/svg-icons/icon-time.svg" />
              <p style="padding: 5px">title2</p>
            </div>
          </template>
          <div>
            Consistent with real life: in line with the process and logic of
            real life, and comply with languages and habits that the users are
            used to;
          </div>
        </OCollapseItem>
      </OCollapse>
    </div>
    <!-- 移动端分页器 -->
    <AppPaginationMo
      :current-page="currentPage"
      :total-page="totalPage"
      @turn-page="turnPage"
    />
  </div>
</template>
<style lang="scss" scoped>
.demo {
  // max-width: 1504px;
  min-height: 800px;
  padding-top: 100px;
}
.demo-box {
  margin: 20px 100px 20px 100px;
}

h4 {
  margin-top: 50px;
  margin-bottom: 20px;
}
body {
  background: var(--e-color-bg1);
}

.button-box {
  display: flex;
  align-items: center;

  & + .button-box {
    margin-top: 20px;
  }
  .o-button {
    margin-left: 10px;
  }
}

.anchor-main {
  display: flex;
  margin-bottom: 100px;
  background-color: var(--e-color-bg2);
  .anchor-side {
    width: 200px;
    position: relative;
  }
  .anchor-content {
    flex: 1;
    height: 300px;
    overflow: auto;
    position: relative;
  }
}

.anchor-item {
  width: 80%;
  min-height: 200px;
  background-color: aqua;
  margin-bottom: 40px;
  padding: 24px;
  .anchor-item {
    margin-top: 64px;
    background: orange;
  }
}
.lecturer-list-title {
  margin: var(--o-spacing-h4) 0;
  p {
    color: var(--e-color-text1);
    font-size: var(--o-font-size-text);
    font-weight: 400;
    line-height: var(--o-line-height-text);
    text-align: center;
  }
}

.container {
  width: 100px;
  height: 100px;
}

.test {
  color: red;
}
</style>
