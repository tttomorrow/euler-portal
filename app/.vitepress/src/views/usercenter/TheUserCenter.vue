<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import NotFound from '@/NotFound.vue';
import { getUserAuth, refreshInfo, showGuard } from '@/shared/login';
import { useCommon } from '@/stores/common';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';

const i18n = useI18n();
const { token } = getUserAuth();
const commonStore = useCommon();
const { lang } = useData();
const iframeIns = ref();
const iframeUri = 'https://openeuler-usercenter.test.osinfra.cn/user';
const sendMsg = () => {
  // 向该窗口发送消息
  const data = {
    token,
    theme: commonStore.theme,
    lang: lang.value,
    source: 'usercenter',
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
  }
};
const sendRefreshMsg = () => {
  // 向该窗口发送刷新消息
  const data = {
    token,
    theme: commonStore.theme,
    lang: lang.value,
    source: 'usercenter',
  };
  if (iframeIns.value) {
    iframeIns.value.contentWindow.postMessage(data, iframeUri);
  }
};
// 接收iframe信息
const receiveMsg = () => {
  window.addEventListener('message', handleMessage);
};
const handleMessage = (e: { data: { key: string } }) => {
  if (e?.data?.key === 'refresh') {
    refreshInfo();
  }
};
onMounted(() => {
  sendMsg();
  receiveMsg();
});
onUnmounted(() => {
  window.removeEventListener('message', handleMessage);
});
watch(
  () => [commonStore.theme, lang.value],
  () => sendRefreshMsg()
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
  <NotFound v-else>
    <template #title>
      <p>
        {{ i18n.common.PLEASE }}
        <a @click="showGuard()">{{ i18n.common.LOGIN }}</a> !
      </p>
    </template>
  </NotFound>
</template>

<style lang="scss" scoped>
.user-iframe {
  width: 100%;
  height: 1276px;
}
</style>
