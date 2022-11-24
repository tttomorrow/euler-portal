<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { useI18n } from '@/i18n';
import { downloadCard } from '@/api/api-certification';

import AppContent from '@/components/AppContent.vue';

import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404_dark.png';
import successTipImg from '@/assets/category/certification/success-tip.png';
const i18n = useI18n();
const { lang } = useData();
const commonStore = useCommon();

const language = computed(() => (lang.value === 'zh' ? 'zh_CN' : 'en_US'));
const notFoundImg = computed(() =>
  commonStore.theme === 'light' ? notFoundImg_light : notFoundImg_dark
);
const disabledTip = ref('');
// 下载事件处理
// 是否下载成功
const downTip = ref(false);
function download(paString: string) {
  downloadCard(paString, language.value)
    .then((res) => {
      if (res.success) {
        disabledTip.value = '';
        function dataURLtoBlob(dataurl: any) {
          const arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], { type: mime });
        }
        function blobToFile(theBlob: any, fileName: any) {
          theBlob.lastModifiedDate = new Date();
          theBlob.name = fileName;
          return theBlob;
        }
        const str = 'data:application/pdf;base64,' + res.data.data;
        const blob = dataURLtoBlob(str);
        const file = blobToFile(blob, 'zs');
        const href = URL.createObjectURL(file);
        const downloadElement = document.createElement('a');
        downloadElement.href = href;
        downloadElement.download = res.data.fileName;
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        downTip.value = true;
      } else {
        disabledTip.value = res.message;
      }
    })
    .catch((error: any) => {
      throw new Error(error);
    });
}
// 获取url里面携带的PA参数
function getQueryString(name: string) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.slice(1).match(reg);

  if (r !== null) {
    return decodeURI(r[2]);
  }
  return '';
}
// 点击关闭弹出的蒙层
function clickPopover() {
  downTip.value = false;
}
onMounted(() => {
  download(getQueryString('PA'));
});
</script>
<template>
  <AppContent>
    <h2>{{ i18n.certification.certificateDownload }}</h2>
    <div v-if="disabledTip !== ''" class="nofound">
      <img class="nofound-img" :src="notFoundImg" alt="404" />
      <p class="nofound-text">
        {{ disabledTip }}
      </p>
    </div>
    <transition name="tip">
      <div v-show="downTip" class="popover" @click="clickPopover">
        <img :src="successTipImg" alt="" />
      </div>
    </transition>
  </AppContent>
</template>
<style lang="scss" scoped>
h2 {
  font-size: var(--o-font-size-h3);
  line-height: var(--o-line-height-h3);
  color: var(--o-color-text1);
  text-align: center;
  font-weight: 300;
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
  }
}
.nofound {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: var(--o-font-size-h6);
  color: var(--o-color-text1);
  padding: var(--o-spacing-h2) 0;
  min-height: calc(100vh - 339px);
  .nofound-text {
    margin-top: var(--o-spacing-h5);
    font-size: var(--o-font-size-h7);
  }
  .nofound-img {
    height: 300px;
  }
  @media screen and (max-width: 768px) {
    padding-top: var(--o-spacing-h2);
    font-size: var(--o-font-size-text);
    .nofound-img {
      max-height: 232px;
    }
    .nofound-text {
      margin-top: var(--o-spacing-h6);
      font-size: var(--o-font-size-tip);
    }
  }
}
.popover {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--o-color-bg6);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media screen and (max-width: 1100px) {
    align-items: flex-start;
    padding-top: 20vh;
  }
  img {
    width: 40vw;
    @media screen and (max-width: 1100px) {
      width: 80vw;
    }
  }
}
.tip-enter-from,
.tip-leave-to {
  opacity: 0;
}
.tip-enter-active,
.tip-leave-active {
  transition: all 0.5s;
}
.tip-enter-to,
.tip-leave-from {
  opacity: 1;
}
</style>
