<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { useData } from 'vitepress';

import { getSecurityDetail } from '@/api/api-security';
import { DetailParams } from '@/shared/@types/type-bulletin-detail';
import type { AxiosResponse } from '@/shared/axios';

const { theme: i18n } = useData();

const queryData: DetailParams = reactive({
  securityNoticeNo: '',
});

function getSecurityDetailInfo(data: any) {
  try {
    getSecurityDetail(data).then((res: AxiosResponse) => {
      return res;
    });
  } catch (e: any) {
    throw new Error(e);
  }
}
onMounted(() => {
  const index1 = decodeURIComponent(window.location.href).indexOf('"');
  const index2 = decodeURIComponent(window.location.href).indexOf(
    '"',
    index1 + 1
  );
  queryData.securityNoticeNo = decodeURIComponent(
    window.location.href
  ).substring(index1 + 1, index2);
  getSecurityDetailInfo(queryData);
});
</script>
<template>
  <div class="breadcrumb">
    {{ i18n.security.SECURITY_ADVISORIES }}>{{
      i18n.security.SECURITY_ADVISORIES_DETAIL
    }}
  </div>
</template>
<style lang="scss" scoped>
.breadcrumb {
  margin: 120px 0 40px 0;
}
</style>