<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useData, useRouter } from 'vitepress';
import { getSigList } from '@/api/api-sig';

const configData = useData();
const { theme: i18n } = useData();
const router = useRouter();
const language = configData.lang;

const sigList = ref([]);

const toSigDetail = (value: any) => {
  router.go(`/${language.value}/sig/sig-detail/?id=${value.id}`);
}

onMounted(() => {
  try{
    getSigList().then((res) => {
      sigList.value = res;
    })
  }catch (error) {
    throw Error();
  }
})
</script>

<template>
  <OTable :data="sigList">
    <el-table-column :label="i18n.sig.SIG_LIST.NAME">
      <template #default="scope">
        <a target="_blank" @click="toSigDetail(scope.row)">
          {{ scope.row.group_name }}
        </a>
      </template>
    </el-table-column>
    <el-table-column :label="i18n.sig.SIG_LIST.HOME_PAGE">
      <template #default="scope">
        <a :href="scope.row.home_page" target="_blank">
          <img src="@/assets/homePageLogo.png"/>
        </a>
      </template>
    </el-table-column>
    <el-table-column :label="i18n.sig.SIG_LIST.MAIL">
      <template #default="scope">
        <a :href="'mailto:' + scope.row.maillist" target="_blank">
          {{ scope.row.maillist }}
        </a>
      </template>
    </el-table-column>
    <OTableColumn :label="i18n.sig.SIG_LIST.IRC" prop="irc"></OTableColumn>
  </OTable>
</template>
