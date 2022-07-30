<script lang="ts" setup>
import { useRouter, useData } from 'vitepress';

import IconArrowRight from '~icons/app/arrow-right';

const router = useRouter();
const { lang } = useData();

defineProps({
  dataList: {
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
const goLink = (path: string) => {
  if (path.startsWith('https:')) {
    window.open(path, '_blank');
  } else {
    router.go(`/${lang.value}` + path);
  }
};
</script>

<template>
  <div v-if="device" class="docs-wraper">
    <div class="document">
      <div class="docs-list">
        <div v-for="(item, index) in dataList" :key="index" class="item">
          <div class="item-content">
            <div v-if="item.THEME" class="item-theme">{{ item.THEME }}</div>
            <div v-if="item.DESC" class="item-desc">{{ item.DESC }}</div>
            <div class="item-link">
              <OButton
                animation
                type="text"
                size="small"
                class="item-link-button"
                v-for="(i, key) in item.LINK"
                :key="key"
                @click="goLink(i.LINK)"
              >
                {{ i.TEXT }}
                <template #suffixIcon>
                  <OIcon><IconArrowRight /></OIcon>
                </template>
              </OButton>
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
    <div class="docs-wrapper">
      <div v-for="(item, index) in dataList" :key="index" class="docs-item">
        <div class="docs-item-content">
          <div v-if="item.THEME" class="docs-item-theme">
            {{ item.THEME }}
          </div>
          <div v-if="item.DESC" class="docs-item-desc">
            {{ item.DESC }}
          </div>
          <div class="docs-item-link">
            <OButton
              animation
              type="text"
              size="small"
              class="button"
              v-for="(i, key) in item.LINK"
              :key="key"
              @click="goLink(i.LINK)"
            >
              {{ i.TEXT }}
              <template #suffixIcon>
                <OIcon><IconArrowRight /></OIcon>
              </template>
            </OButton>
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
  padding: 0;
  .document {
    width: 100%;
    margin: 0 auto;
    position: relative;
    padding: 0;
    .docs-list {
      .item {
        height: 192px;
        padding: var(--o-spacing-h2) 0 var(--o-spacing-h2) var(--o-spacing-h2);
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
          height: var(--o-line-height-h7);
          font-size: var(--o-font-size-h7);
          color: var(--o-color-text2);
          line-height: var(--o-line-height-h7);
          font-weight: 600;
        }
        &-desc {
          max-width: 256px;
          font-size: var(--o-font-size-text);
          font-weight: 400;
          color: var(--o-color-text3);
          line-height: var(--o-line-height-text);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        &-link {
          max-width: 256px;
          margin-top: var(--o-spacing-h2);
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          &-button {
            padding: 0 !important;
            margin-right: 10px;
            svg {
              color: var(--o-color-brand);
            }
          }
        }
        &-img {
          width: 130px;
          height: 130px;
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
          background-size: 100%;
          z-index: 1;
        }
        &-backgroundtwo {
          position: absolute;
          right: 0px;
          top: -37px;
          width: 314px;
          height: 241px;
          background-size: 100%;
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
      max-width: 1440px;
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
  width: 100%;
  background-color: var(--o-color-bg2);
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
        margin-top: var(--o-spacing-h8);
        max-width: 170px;
        color: var(--o-color-text3);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      &-link {
        width: 220px;
        padding: var(--o-spacing-h3) 0 0 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .button {
          padding: 0 !important;
          margin-right: 10px;
          svg {
            color: var(--o-color-brand);
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
</style>
