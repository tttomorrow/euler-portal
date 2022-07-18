<script setup lang="ts">
import { ref } from 'vue';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import BannerLevel3 from '@/components/BannerLevel3.vue';

import banner from '@/assets/banner-secondary.png';
import search from '@/assets/illustrations/search.png';

const currentPage1 = ref(5);
const pageSize4 = ref(100);
const total = ref(100);

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
</script>

<template>
  <div class="demo">
    <h4>OTable</h4>
    <div class="page-box">
      <OTable :data="tableData" style="width: 100%">
        <OTableColumn label="Date" prop="date" width="180" />
        <OTableColumn prop="name" label="Name" width="180" />
        <OTableColumn prop="address" label="Address" />
      </OTable>
    </div>

    <h4>OPagination</h4>
    <div class="page-box">
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

    <h4>BannerLevel2.vue</h4>
    <BannerLevel2
      :background-image="banner"
      background-text="CONTENT"
      title="SIG"
      subtitle="SIG 就是 Special Interest Group 的缩写，openEuler 社区按照不同的 SIG 来组织"
      :illustration="search"
    />

    <h4>BannerLevel3.vue</h4>
    <BannerLevel3
      :background-image="banner"
      background-text="CONTENT"
      title="下载"
    />

    <h4>OButton</h4>
    <OButton>OButton</OButton>

    <h4>OTag</h4>
    <OTag type="text">OTag-0</OTag>
    <OTag type="primary">OTag-0</OTag>
    <OTag type="secondary">特殊tag</OTag>
    <OTag size="small">OTag-1</OTag>

    <h4>封装elementplus OInput</h4>
    <OInput v-model="inputName"></OInput>

    <h4>封装elementplus OCard</h4>
    <OCard header="OCard" shadow="hover"></OCard>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  max-width: 1504px;
  padding: 20px 44px;
  min-height: 800px;
  padding-top: 100px;
}
.page-box {
  margin: 20px 100px 20px 100px;
}
h4 {
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>
