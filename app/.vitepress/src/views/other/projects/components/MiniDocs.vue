<script lang="ts" setup>
import { defineProps, ref, reactive, Ref } from 'vue';

interface Info {
  info: Docsobj;
}

interface Docsobj {
  TAB?: Tab[];
  TITLE_OUTSIDE?: string;
  TITLE_INSIDE?: string;
  FRAMEWORK_IMG?: string;
  DATA_LIST?: Data_list_item[];
  DESC_LIST?: Data_list_item[];
}

interface Tab {
  KEY: string;
  VALUE: string;
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

interface DocsInfo {
  [ISULAD: string]: boolean;
  ISULAD_BUILD: boolean;
  ISULAD_TRANSFORM: boolean;
}

const props = defineProps({
  docsObj: {
    type: Object,
    default: function () {
      return {};
    },
  },
  device: {
    type: Boolean,
    default: true,
  },
});
/*eslint-disable*/
let activeTab: Ref = ref('');
const infoObj = reactive<Info>({ info: {} });
// init
if (props.docsObj.TAB) {
  activeTab = ref(props.docsObj.TAB[0].KEY);
  infoObj.info = props.docsObj[props.docsObj.TAB[0].KEY];
} else {
  infoObj.info = props.docsObj;
}
const changeDocs = function (key: string) {
  activeTab.value = key;
  infoObj.info = props.docsObj[key];
};
const docsInfo: DocsInfo = reactive({
  ISULAD: true,
  ISULAD_BUILD: false,
  ISULAD_TRANSFORM: false,
});
const showDocs = function (key: string) {
  docsInfo[key] = !docsInfo[key];
};
</script>

<template>
  <div v-if="device" class="docs-wraper">
    <div class="document">
      <div v-if="docsObj.TAB" class="tab">
        <div
          v-for="item in docsObj.TAB"
          :key="item.KEY"
          class="tab-item"
          :class="
            activeTab === item.KEY ? 'tab-item tab-item-active' : 'tab-item'
          "
          @click="changeDocs(item.KEY)"
        >
          {{ item.VALUE }}
        </div>
      </div>
      <!-- 有点问题 TODO: -->
      <!-- <OTabs v-if="docsObj.TAB" class="tab">
        <OTabPane
          v-for="item in docsObj.TAB"
          :key="item.VALUE"
          :label="item.VALUE"    
          @click="changeDocs(item.KEY)"      
        >
        </OTabPane>
      </OTabs> -->
      <div class="title">
        <div class="title-outside">{{ docsObj.TITLE_OUTSIDE }}</div>
        <div class="title-inside">{{ docsObj.TITLE_INSIDE }}</div>
      </div>
      <div class="docs-list">
        <div
          v-for="(item, index) in infoObj.info.DATA_LIST"
          :key="index"
          class="item"
        >
          <div class="item-content">
            <div v-if="item.THEME" class="item-theme">{{ item.THEME }}</div>
            <div v-if="item.DESC" class="item-desc">{{ item.DESC }}</div>
            <div class="item-link">
              <a
                v-for="(value, key) in item.LINK"
                :key="key"
                :href="value.LINK"
                target="_blank"
                >{{ value.TEXT }}
                <img src="@/assets/svg-icons/arrow-right.svg" alt="" />
              </a>
            </div>
          </div>
          <div
            :style="{ backgroundImage: `url(${item.BACKGROUND.IMG})` }"
            :class="
              item.BACKGROUND.TYPE === 2
                ? 'item-backgroundone'
                : 'item-backgroundtwo'
            "
          ></div>
          <img v-if="item.IMG" class="item-img" :src="item.IMG" alt="" />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="mobile-docs">
    <div class="title">
      <div class="title-outside">{{ docsObj.TITLE_OUTSIDE }}</div>
      <div class="title-inside">{{ docsObj.TITLE_INSIDE }}</div>
    </div>
    <div v-if="docsObj.TAB" class="docs-options">
      <div v-for="item in docsObj.TAB" :key="item.KEY" class="docs-tabs">
        <div class="docs-tabs-item" @click="showDocs(item.KEY)">
          {{ item.VALUE }}
          <transition name="fade">
            <img
              v-if="docsInfo[item.KEY]"
              src="@/assets/svg-icons/icon-arrow-up.svg"
            />
            <img v-else src="@/assets/svg-icons/icon-arrow-down.svg" />
          </transition>
        </div>
        <transition-group name="fade">
          <template v-if="docsInfo[item.KEY]">
            <div
              v-for="(i, index) in infoObj.info.DATA_LIST"
              :key="index"
              class="docs-item"
            >
              <div class="docs-item-content">
                <div v-if="i.THEME" class="docs-item-theme">
                  {{ i.THEME }}
                </div>
                <div v-if="i.DESC" class="docs-item-desc">
                  {{ i.DESC }}
                </div>
                <div class="docs-item-link">
                  <a
                    v-for="(value, key) in i.LINK"
                    :key="key"
                    :href="value.LINK"
                    target="_blank"
                    >{{ value.TEXT }}
                    <img src="@/assets/svg-icons/arrow-right.svg" alt="" />
                  </a>
                </div>
              </div>
              <div
                :style="{
                  backgroundImage:
                    i.BACKGROUND.TYPE === 2
                      ? `url(/img/projects/share/mobile-group.png)`
                      : `url(/img/projects/share/mobile-group.png)`,
                }"
                :class="
                  i.BACKGROUND.TYPE === 2
                    ? 'docs-item-backgroundone'
                    : 'docs-item-backgroundtwo'
                "
              ></div>
              <img v-if="i.IMG" class="docs-item-img" :src="i.IMG" alt="" />
            </div>
          </template>
        </transition-group>
      </div>
    </div>
    <div v-else class="docs-wrapper">
      <div
        v-for="(item, index) in infoObj.info.DATA_LIST"
        :key="index"
        class="docs-item"
      >
        <div class="docs-item-content">
          <div v-if="item.THEME" class="docs-item-theme">
            {{ item.THEME }}
          </div>
          <div v-if="item.DESC" class="docs-item-desc">
            {{ item.DESC }}
          </div>
          <div class="docs-item-link">
            <a
              v-for="(value, key) in item.LINK"
              :key="key"
              :href="value.LINK"
              target="_blank"
              >{{ value.TEXT }}
              <img src="@/assets/svg-icons/arrow-right.svg" alt="" />
            </a>
          </div>
        </div>
        <div
          :style="{
            backgroundImage:
              item.BACKGROUND.TYPE === 2
                ? `url(/img/projects/share/mobile-group.png)`
                : `url(/img/projects/stratovirt/mobile-grain.png)`,
          }"
          :class="
            item.BACKGROUND.TYPE === 2
              ? 'docs-item-backgroundone'
              : 'docs-item-backgroundtwo'
          "
        ></div>
        <img v-if="item.IMG" class="docs-item-img" :src="item.IMG" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.docs-wraper {
  margin: var(--o-spacing-h2) 0;
  padding: 0 var(--o-spacing-h5);
  .document {
    width: 100%;
    margin: 0 auto;
    position: relative;
    .tab {
      display: flex;
      position: absolute;
      color: var(--o-color-text2);
      top: 70px;
      &-item {
        margin-right: var(--o-spacing-h4);
        padding: var(--o-spacing-h8) 0;
        cursor: pointer;
        &-active {
          color: var(--o-color-brand_hover);
          border-bottom: 1px solid var(--o-color-brand_hover);
        }
      }
    }
    .title {
      margin: 0 auto;
      font-size: var(--o-font-size-h3);
      color: var(--o-color-text2);
      line-height: var(--o-line-height-h3);
      position: relative;
      text-align: center;
      margin-bottom: 80px;
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
    }
    .docs-list {
      .item {
        height: 192px;
        padding: var(--o-spacing-h4) 0 var(--o-spacing-h4) var(--o-spacing-h4);
        background-color: var(--o-color-bg);
        box-shadow: var(--o-shadow-base);
        font-size: var(--o-font-size-h7);
        color: var(--o-color-text2);
        line-height: var(--o-line-height-h6);
        position: relative;
        &-content {
          position: absolute;
          z-index: 3;
        }
        &-theme {
          height: var(--o-line-height-h8);
          font-size: var(--o-font-size-h7);
          font-weight: 500;
          color: var(--o-color-text2);
          line-height: var(--o-line-height-h8);
          font-weight: 600;
        }
        &-desc {
          max-width: 256px;
          font-size: var(--o-font-size-tip);
          font-weight: 400;
          color: var(--o-color-text3);
          line-height: var(--o-line-height-h8);
        }
        &-link {
          max-width: 256px;
          margin-top: var(--o-spacing-h2);
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          a {
            display: block;
            height: var(--o-line-height-h8);
            font-size: var(--o-font-size-tip);
            font-weight: 400;
            color: var(--o-color-text2);
            line-height: var(--o-line-height-h7);
            position: relative;
            margin-right: var(--o-spacing-h5);
            padding-right: var(--o-spacing-h3);
            overflow: hidden;
          }
          img {
            position: absolute;
            right: -40px;
            top: 4px;
            width: 18px;
            height: 18px;
            filter: drop-shadow(var(--o-color-brand) -44px 0);
          }
        }
        &-img {
          position: absolute;
          right: 30px;
          top: 30px;
          bottom: 30px;
          z-index: 2;
        }
        &-backgroundone {
          position: absolute;
          right: -38px;
          top: -37px;
          width: 301px;
          height: 228px;
          z-index: 1;
        }
        &-backgroundtwo {
          position: absolute;
          right: 0px;
          top: -37px;
          width: 314px;
          height: 241px;
          z-index: 1;
        }
      }
      .item:hover {
        box-shadow: var(--o-shadow-base_hover);
      }
    }
    @media screen and (max-width: 767px) {
      .docs-list {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 24px;
      }
    }
    @media screen and (min-width: 1080px) {
      max-width: 1416px;
      .docs-list {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-row-gap: 24px;
        grid-column-gap: 24px;
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1079px) {
      .docs-list {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-row-gap: 24px;
        grid-column-gap: 24px;
      }
    }
  }
}
.mobile-docs {
  padding: var(--o-spacing-h5) var(--o-spacing-h5) 0 var(--o-spacing-h5);
  width: 100%;
  background-color: var(--o-color-bg2);
  .title {
    margin: 0 auto var(--o-spacing-h3);
    margin-bottom: var(--o-spacing-h5);
    font-size: var(--o-font-size-h8);
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h3);
    position: relative;
    text-align: center;
    &-outside {
      position: absolute;
      left: 50%;
      top: 8px;
      transform: translateX(-50%);
      z-index: 1;
    }
    &-inside {
      color: var(--o-color-text3);
    }
  }
  .docs-options {
    .docs-tabs {
      &-item {
        width: 100%;
        height: 34px;
        font-size: var(--o-font-size-tip);
        padding: var(--o-spacing-h8) 0 var(--o-spacing-h8) var(--o-spacing-h8);
        background-color: var(--o-color-bg);
        border-bottom: 1px solid var(--o-color-division);
        position: relative;
        color: var(--o-color-text2);
        img {
          position: absolute;
          right: 8px;
          top: 9px;
          bottom: 9px;
          width: 16px;
          height: 16px;
        }
      }
      .docs-item {
        width: 100%;
        height: 144px;
        margin: var(--o-spacing-h5) 0;
        background-color: var(--o-color-bg);
        padding: var(--o-spacing-h5) 0 var(--o-spacing-h5) var(--o-spacing-h6);
        position: relative;
        overflow: hidden;
        &-content {
          position: absolute;
          z-index: 3;
        }
        &-theme {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          height: 22px;
          color: var(--o-color-text2);
        }
        &-desc {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          height: 18px;
          margin-top: var(--o-spacing-h8);
          max-width: 190px;
          color: var(--o-color-text3);
        }
        &-link {
          width: 220px;
          padding: var(--o-spacing-h3) 0 0 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          a {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            height: 22px;
            position: relative;
            color: var(--o-color-text2);
            overflow: hidden;
            padding-right: var(--o-spacing-h3);
            img {
              width: 16px;
              height: 16px;
              position: absolute;
              right: -20px;
              top: 2.5px;
              filter: drop-shadow(var(--o-color-brand) -34px 0);
            }
          }
        }
        &-backgroundone {
          width: 291px;
          height: 180px;
          position: absolute;
          top: 17px;
          right: 0;
          z-index: 1;
          background-position: right bottom;
          background-repeat: no-repeat;
          background-size: 100%;
        }
        &-img {
          position: absolute;
          right: 12px;
          top: 22px;
          bottom: 22px;
          z-index: 2;
          width: 100px;
          height: 100px;
        }
      }
    }
  }
  .docs-wrapper {
    .docs-item {
      width: 100%;
      height: 144px;
      margin: var(--o-spacing-h5) 0;
      background-color: var(--o-color-bg);
      padding: var(--o-spacing-h5) 0 var(--o-spacing-h5) var(--o-spacing-h6);
      position: relative;
      &-content {
        position: absolute;
        z-index: 3;
      }
      &-theme {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        height: 22px;
        color: var(--o-color-text2);
      }
      &-desc {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        height: 18px;
        margin-top: var(--o-spacing-h8);
        max-width: 170px;
        color: var(--o-color-text3);
      }
      &-link {
        width: 220px;
        padding: var(--o-spacing-h3) 0 0 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        a {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          height: 22px;
          position: relative;
          color: var(--o-color-text2);
          overflow: hidden;
          padding-right: var(--o-spacing-h3);
          img {
            width: 16px;
            height: 16px;
            position: absolute;
            right: -20px;
            top: 2.5px;
            filter: drop-shadow(var(--o-color-brand) -34px 0);
          }
        }
      }
      &-backgroundone {
        width: 291px;
        height: 180px;
        position: absolute;
        top: 17px;
        right: 0;
        z-index: 1;
        background-position: right bottom;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      &-backgroundtwo {
        width: 246px;
        height: 152px;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        background-position: right bottom;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      &-img {
        position: absolute;
        right: 12px;
        top: 22px;
        bottom: 22px;
        z-index: 2;
        width: 100px;
        height: 100px;
      }
    }
  }
}

.fade-enter-active {
  transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.6, 0.4, 0.4);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  height: 0 !important;
}
</style>
