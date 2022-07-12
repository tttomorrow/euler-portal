<script setup lang="ts">
import { useData } from 'vitepress';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { theme } = useData();
const i18n = theme.value;

const { t, locale } = useI18n();
const home = computed(() => {
  return { info: t('button1') };
});

const name = ref('');

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

onMounted(() => {
  window.addEventListener('click', () => {
    locale.value = locale.value === 'zh' ? 'en' : 'zh';
  });
});
</script>
<template>
  <div class="demo">
    <div class="page-box">
      <OTable :data="tableData" style="width: 100%">
        <OTableColumn prop="date" label="Date" width="180" />
        <OTableColumn prop="name" label="Name" width="180" />
        <OTableColumn prop="address" label="Address" width="180" />
      </OTable>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>

    <div class="page-box">
      <OPagination
        :background="true"
        v-model:currentPage="currentPage1"
        v-model:page-size="pageSize4"
        :page-sizes="[100, 200, 300, 400]"
        layout="sizes, prev, pager, next, slot, jumper"
        :total="total"
      >
        <span>5/50</span>
      </OPagination>
    </div>
    <h1>{{ i18n.a }}</h1>
    <h1>{{ home.info }}</h1>
    <OButton>sss</OButton>
    <!-- <ElInput /> -->
    <h4>封装elementplus</h4>
    <OInput v-model="name"></OInput>
    <h4>封装elementplus</h4>
    <OCard header="b" shadow="hover"></OCard>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  min-height: 800px;
  padding-top: 100px;
}
.page-box {
  margin: 20px 0 20px 100px;
}
h4 {
  margin-top: 20px;
}
</style>
