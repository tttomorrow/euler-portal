<script lang="ts" setup>
import { computed } from 'vue';

import MiniTitle from './MiniTitle.vue';
import FrameList from './FrameList.vue';
import { useCommon } from '@/stores/common';
defineProps({
  frameObj: {
    type: Object,
    default: function () {
      return {};
    },
  },
  layout: {
    type: String,
    default: '',
  },
  device: {
    type: Boolean,
    default: true,
  },
});
const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});
</script>

<template>
  <div class="framework-box">
    <MiniTitle
      :device="device"
      :inside-title="frameObj.TITLE_INSIDE"
      :outside-title="frameObj.TITLE_OUTSIDE"
    />
    <!-- 上下布局 -->
    <div v-if="layout === 'upAndDown'" class="framework-upanddown">
      <!-- PC 端 -->
      <template v-if="device">
        <!-- 有选项卡 -->
        <template v-if="frameObj.TAB">
          <OTabs v-if="frameObj.TAB">
            <OTabPane
              v-for="item in frameObj.TAB"
              :key="item.VALUE"
              :label="item.VALUE"
            >
              <FrameList
                :desc-list="frameObj[item.KEY].DESC_LIST"
                :framework-img="frameObj[item.KEY].FRAMEWORK_IMG"
                :framework-dark-img="frameObj[item.KEY].FRAMEWORK_IMG_DARK"
                :framework-title="frameObj[item.KEY].FRAMEWORK_TITLE"
                :dark-img="isDark"
              />
            </OTabPane>
          </OTabs>
        </template>
        <!-- 无选项卡 -->
        <template v-else>
          <FrameList
            :desc-list="frameObj.DESC_LIST"
            :framework-img="frameObj.FRAMEWORK_IMG"
            :framework-dark-img="frameObj.FRAMEWORK_IMG_DARK"
            :framework-title="frameObj.FRAMEWORK_TITLE"
            :dark-img="isDark"
          />
        </template>
      </template>
      <!-- 移动端 -->
      <template v-else>
        <!-- 有选项卡只渲染第一项 -->
        <template v-if="frameObj.TAB">
          <FrameList
            :desc-list="frameObj[frameObj.TAB[0].KEY].DESC_LIST"
            :framework-img="frameObj[frameObj.TAB[0].KEY].FRAMEWORK_IMG"
            :framework-dark-img="frameObj.FRAMEWORK_IMG_DARK"
            :framework-title="frameObj[frameObj.TAB[0].KEY].FRAMEWORK_TITLE"
            :dark-img="isDark"
          />
        </template>
        <!-- 无选项卡 -->
        <template v-else>
          <FrameList
            :desc-list="frameObj.DESC_LIST"
            :framework-img="frameObj.FRAMEWORK_IMG"
            :framework-dark-img="frameObj.FRAMEWORK_IMG_DARK"
            :framework-title="frameObj.FRAMEWORK_TITLE"
            :dark-img="isDark"
          />
        </template>
      </template>
    </div>
    <!-- 左右布局 -->
    <div v-if="layout === 'leftAndRight'" class="framework-leftandright">
      <div class="info">
        <div class="desc">
          <p class="desc-title">{{ frameObj.DESC_LIST[0] }}</p>
          <p
            v-for="(item, index) in frameObj.DESC_LIST"
            :key="index"
            class="desc-item"
          >
            <template v-if="index > 0"> {{ `${index}、` }}{{ item }} </template>
          </p>
          <div
            class="desc-background"
            :style="{ backgroundImage: `url(${frameObj.DESC_BACKGROUND})` }"
          ></div>
        </div>
        <div class="img">
          <img v-if="isDark" :src="frameObj.FRAMEWORK_IMG_DARK" alt="" />
          <img v-else :src="frameObj.FRAMEWORK_IMG" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.framework-box {
  width: 100%;
  padding: 0 var(--o-spacing-h5);
  .framework-upanddown {
    margin: 0 auto;
    max-width: 1440px;
    position: relative;
  }
  .framework-leftandright {
    width: 100%;
    margin: 0 auto;
    .info {
      padding: 0 0 var(--o-spacing-h2) 0;
      display: flex;
      justify-content: space-around;
      .desc {
        flex: 1;
        background-color: var(--o-color-bg);
        margin: 0 var(--o-spacing-h5) 0 0;
        padding: var(--o-spacing-h2) var(--o-spacing-h2) 0 var(--o-spacing-h2);
        position: relative;
        &-item {
          color: var(--o-color-text2);
          font-size: var(--o-font-size-h7);
          line-height: var(--o-line-height-h8);
          padding: var(--o-spacing-h8) 0;
        }
        &-title {
          font-size: var(--o-font-size-h5);
          font-weight: 500;
          color: var(--o-color-text2);
          line-height: var(--o-line-height-h5);
          padding-bottom: var(--o-spacing-h4);
        }
        &-background {
          background-size: 100%;
          position: absolute;
          right: 0;
          bottom: 0;
          z-index: 11;
          width: 456px;
          height: 282px;
        }
      }
      .img {
        flex: 1;
        background-color: var(--o-color-bg);
        margin-left: var(--o-spacing-h5);
        img {
          margin: 0 auto;
          display: block;
          margin-top: var(--o-spacing-h3);
          margin-bottom: var(--o-spacing-h3);
        }
      }
    }
    @media screen and (min-width: 1440px) {
      max-width: 1440px;
      .info {
        .img {
          img {
            width: 467px;
          }
        }
      }
    }
    @media screen and (min-width: 1080px) and (max-width: 1439px) {
      .info {
        .img {
          img {
            width: 350px;
          }
        }
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      .info {
        .desc {
          padding: var(--o-spacing-h5) var(--o-spacing-h5) 0 var(--o-spacing-h5);
          &-title {
            font-size: var(--o-font-size-text);
            font-weight: 500px;
            color: var(--o-color-text2);
            line-height: var(--o-line-height-h8);
            padding-bottom: var(--o-spacing-h6);
          }
          &-item {
            color: var(--o-color-text2);
            line-height: var(--o-line-height-tip);
            font-size: var(--o-font-size-tip);
            padding: var(--o-spacing-h8) 0;
          }
        }
        .img {
          img {
            width: 250px;
          }
        }
      }
    }
    @media screen and (max-width: 767px) {
      width: 100%;
      .info {
        display: block;
        padding: 0;
        .desc {
          width: 100%;
          margin: 0;
          padding: var(--o-spacing-h5);
          &-title {
            padding-bottom: 0;
          }
          p {
            font-size: var(--o-font-size-tip);
          }
          &-background {
            width: 202px;
            height: 165px;
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: bottom;
          }
        }
        .img {
          padding: var(--o-spacing-h5);
          margin-top: var(--o-spacing-h5);
          margin-left: 0;
          width: 100%;
          background-color: var(--o-color-bg);
          img {
            margin: 0 auto;
            display: block;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
