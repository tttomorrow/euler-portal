<script lang="ts" setup>
import { reactive, Ref, ref } from 'vue';

interface Info {
  info: Obj;
}

interface Obj {
  TAB?: string;
  TITLE_OUTSIDE?: string;
  TITLE_INSIDE?: string;
  FRAMEWORK_IMG?: string;
  DATA_LIST?: Data_list_item[];
  DESC_LIST?: Data_list_item[];
}

interface Data_list_item {
  IMG?: string;
  THEME?: string;
  DESC?: string;
  BACKGROUND: Background;
  LINK?: Link_list[];
}

interface Link_list {
  TEXT?: string;
  LINK?: string;
}

interface Background {
  IMG: string;
  TYPE: number;
}

const props = defineProps({
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
});
/*eslint-disable*/
let activeTab: Ref = ref('');
const infoObj = reactive<Info>({ info: {} });
// init:
if (props.frameObj.TAB) {
  activeTab = ref(props.frameObj.TAB[0].KEY);
  infoObj.info = props.frameObj[props.frameObj.TAB[0].KEY];
} else {
  infoObj.info = props.frameObj;
}
const changeFrame = function (key: string) {
  activeTab.value = key;
  infoObj.info = props.frameObj[key];
};
</script>

<template>
  <div class="framework-box">
    <div class="title">
      <div class="title-outside">{{ frameObj.TITLE_OUTSIDE }}</div>
      <div class="title-inside">{{ frameObj.TITLE_INSIDE }}</div>
    </div>
    <!-- 上下布局 -->
    <div v-if="layout === 'upAndDown'" class="framework-upanddown">
      <!-- tab 栏 -->
      <div v-if="frameObj.TAB" class="tab">
        <div
          v-for="item in frameObj.TAB"
          :key="item.KEY"
          class="tab-item"
          :class="
            activeTab === item.KEY ? 'tab-item tab-item-active' : 'tab-item'
          "
          @click="changeFrame(item.KEY)"
        >
          {{ item.VALUE }}
        </div>
      </div>
      <!-- 有点问题 TODO: -->
      <!-- <OTabs v-if="frameObj.TAB" class="tab">
        <OTabPane
          v-for="item in frameObj.TAB"
          :key="item.VALUE"
          :label="item.VALUE"
          @click.native="changeFrame(item.KEY)"
        >
        </OTabPane>
      </OTabs> -->
      <div class="info">
        <div class="desc">
          <p v-for="(item, index) in infoObj.info.DESC_LIST" :key="index">
            {{ item }}
          </p>
        </div>
        <img
          v-if="infoObj.info.FRAMEWORK_IMG"
          :src="infoObj.info.FRAMEWORK_IMG"
          alt=""
        />
      </div>
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
          <img :src="frameObj.FRAMEWORK_IMG" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.framework-box {
  width: 100%;
  padding: 0 var(--o-spacing-h5);
  .title {
    margin: 0 auto var(--o-spacing-h3);
    margin-bottom: var(--o-spacing-h1);
    margin-bottom: 100px;
    font-size: var(--o-font-size-h3);
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h3);
    position: relative;
    text-align: center;
    &-outside {
      position: absolute;
      left: 50%;
      top: 24px;
      transform: translateX(-50%);
      z-index: 1;
    }
    &-inside {
      color: var(--o-color-text3);
    }
    @media screen and (max-width: 767px) {
      margin-bottom: var(--o-spacing-h3);
      font-size: var(--o-font-size-h8);
      &-outside {
        top: 20%;
      }
    }
  }
  .tab {
    display: flex;
    margin-left: var(--o-spacing-h3);
    color: var(--o-color-text2);
    &-item {
      padding: var(--o-spacing-h8) 0;
      margin-right: var(--o-spacing-h4);
      cursor: pointer;
      &-active {
        color: var(--o-color-brand_hover);
        border-bottom: 1px solid var(--o-color-brand_hover);
      }
    }
    @media screen and (max-width: 767px) {
      margin-top: var(--o-spacing-h5);
      font-size: var(--o-font-size-tip);
    }
  }
  .framework-upanddown {
    margin: 0 auto;
    position: relative;
    .tab {
      position: absolute;
      top: -52px;
      left: -24px;
    }
    .info {
      padding: var(--o-spacing-h2) 0;
      background-color: var(--o-color-bg);
    }
    .desc {
      margin: 0 var(--o-spacing-h2) var(--o-spacing-h2) var(--o-spacing-h2);
      p {
        font-size: var(--o-font-size-h8);
        color: var(--o-color-text2);
        line-height: var(--o-line-height-h8);
      }
    }
    img {
      margin: 0 auto;
      display: block;
    }
    @media screen and (min-width: 1440px) {
      max-width: 1440px;
      img {
        width: 1016px;
      }
    }
    @media screen and (min-width: 1080px) and (max-width: 1439px) {
      img {
        width: 762px;
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      img {
        width: 542px;
      }
    }
    @media screen and (max-width: 767px) {
      .info {
        padding: var(--o-spacing-h5);
      }
      .desc {
        margin: 0;
        p {
          font-size: var(--o-font-size-tip);
        }
      }
      img {
        margin-top: var(--o-spacing-h5);
        width: 100%;
      }
    }
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
          font-weight: 500px;
          color: var(--o-color-text2);
          line-height: var(--o-line-height-h8);
          padding-bottom: var(--o-spacing-h4);
        }
        &-background {
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
