<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import NotFound from '@/NotFound.vue';
import { getUserAuth } from '@/shared/login';
import { useCommon } from '@/stores/common';
import { useData } from 'vitepress';

const { token } = getUserAuth();
const commonStore = useCommon();
const { lang } = useData();
const iframeIns = ref();
const iframeUri = 'https://openeuler-usercenter.test.osinfra.cn/#/user';
const sendMsg = () => {
  // 向该窗口发送消息
  const data = {
    token,
    theme: commonStore.theme,
    lang: lang.value,
  };
  if (iframeIns.value) {
    if (iframeIns.value.attachEvent) {
      iframeIns.value.attachEvent('onload', function () {
        iframeIns.value.contentWindow.postMessage(data, iframeUri);
      });
    } else {
      iframeIns.value!.onload = () => {
        iframeIns.value.contentWindow.postMessage(data, iframeUri);
      };
    }
    iframeIns.value.contentWindow.postMessage(data, iframeUri);
  }
};
onMounted(() => {
  sendMsg();
});
watch(
  () => [commonStore.theme, lang.value],
  () => sendMsg()
);
</script>

<template>
  <iframe
    v-if="token"
    ref="iframeIns"
    class="user-iframe"
    :src="iframeUri"
    frameborder="0"
  ></iframe>
  <NotFound v-else></NotFound>
</template>

<style lang="scss" scoped>
.user-iframe {
  width: 100%;
  height: 1276px;
}
</style>
