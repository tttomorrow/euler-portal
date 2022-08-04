<script setup lang="ts">
import { computed } from 'vue';
import { useData, useRouter } from 'vitepress';
import { useI18n } from '@/i18n';
const configData = useData();
const i18n = computed(() => useI18n());
const router = useRouter();
const language = configData.lang;

defineProps({
  sigList: {
    type: Array,
    default: () => [],
  },
});

const toSigDetail = (value: any) => {
  router.go(`/${language.value}/sig/sig-detail/?id=${value.id}`);
};
</script>

<template>
  <OTable :data="sigList">
    <el-table-column :label="i18n.sig.SIG_LIST.NAME">
      <template #default="scope">
        <a
          target="_blank"
          style="cursor: pointer"
          @click="toSigDetail(scope.row)"
        >
          {{ scope.row.group_name }}
        </a>
      </template>
    </el-table-column>
    <el-table-column :label="i18n.sig.SIG_LIST.HOME_PAGE">
      <template #default="scope">
        <a :href="scope.row.home_page" target="_blank">
          <img src="@/assets/homePageLogo.png" />
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
