<script lang="ts" setup>
import { reactive } from 'vue';
import { useData } from 'vitepress';

import { getSecurityDetail } from '@/api/api-security';

const { theme: i18n } = useData();

const index1 = decodeURIComponent(window.location.href).indexOf('"');
const index2 = decodeURIComponent(window.location.href).indexOf('"', index1 + 1);

interface query {
  securityNoticeNo: string;
}

const queryData: query = reactive({
  securityNoticeNo: '',
});

queryData.securityNoticeNo = decodeURIComponent(window.location.href).substring(
  index1 + 1,
  index2
);
console.log(queryData);

function SecurityDetail(data: any) {
  try {
    getSecurityDetail(data).then((res) => {
      console.log(res);
    });
  } catch (e) {}
}
SecurityDetail(queryData);

// TODO:window方法 放在onMOunted里面
</script>
<template>
  <div>
    <div class="breadcrumb">
      {{ i18n.security.SECURITY_ADVISORIES }}>{{
        i18n.security.SECURITY_ADVISORIES_DETAIL
      }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.breadcrumb {
  margin: 120px 0 40px 0;
}
</style>