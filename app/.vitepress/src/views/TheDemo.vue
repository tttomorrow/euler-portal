<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import BannerLevel3 from '@/components/BannerLevel3.vue';
import AppCalendar from '@/components/AppCalendar.vue';
import AppAnchor from '@/components/AppAnchor.vue';
import TagFilter from '@/components/TagFilter.vue';

import { getMeetingData } from '@/api/api-calendar';
import { TableData } from '@/shared/@types/type-calendar';

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
interface MeetingData {
  tableData: TableData[];
}

const calendarData = ref<TableData[]>([
  {
    date: '',
    timeData: [
      {
        creator: '',
        duration_time: '',
        join_url: '',
        startTime: '',
        start_date: '',
        endTiem: '',
        url: '',
        id: '',
      },
    ],
  },
]);

const anchorData = ['anchor1', 'anchor2', 'anchor3'];

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
// tagFiter end
onMounted(() => {
  getMeetingData().then((res: MeetingData) => {
    calendarData.value = res.tableData;
  });
});
</script>

<template>
  <div class="demo">
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
      <h4>日历</h4>
      <AppCalendar v-if="calendarData.length > 1" :table-data="calendarData" />
    </div>

    <div class="demo-box">
      <h4>TagFilter</h4>
      <TagFilter label="全部" :show="true" @toggle-click="toggleClick">
        <OTag
          v-for="(item, index) in tagArrLen"
          :key="'tag' + index"
          :type="activeIndex === index ? 'primary' : 'text'"
          @click="tagClick(index)"
        >
          {{ 'TagFilter' + index }}
        </OTag>
      </TagFilter>
      <TagFilter label="全部">
        <OButton v-for="(item, index) in 10" :key="'tag' + index">
          {{ item }}
        </OButton>
      </TagFilter>
    </div>

    <div class="demo-box">
      <h4>OTag</h4>
      <OTag type="text">OTag-0</OTag>
      <OTag type="primary">OTag-0</OTag>
      <OTag type="secondary">特殊tag</OTag>
      <OTag size="small">OTag-1</OTag>
    </div>

    <div class="demo-box">
      <h4>封装elementplus OInput</h4>
      <OInput v-model="inputName"></OInput>
    </div>

    <div class="demo-box">
      <h4>封装elementplus OCard</h4>
      <OCard header="OCard" shadow="hover"></OCard>
    </div>

    <div class="demo-box">
      <h4>OTimelien</h4>
      <OTimeline
        v-model="date"
        :right-arrow="true"
        :left-arrow="true"
      ></OTimeline>
    </div>
  </div>

  <div class="demo-box">
    <h4>AppAnchor</h4>
    <AppAnchor :data="anchorData" />
    <div id="archor1"></div>
    <div id="archor2"></div>
    <div id="archor3"></div>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  // max-width: 1504px;
  // padding: 20px 44px;
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
  background: var(--o-color-bg2);
}

#archor1,
#archor2,
#archor3 {
  width: 100%;
  height: 200px;
  background-color: aqua;
  margin-top: 20px;
}
</style>
