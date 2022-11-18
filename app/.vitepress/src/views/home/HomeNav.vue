<script setup lang="ts">
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import { computed } from 'vue';

const i18n = useI18n();
const commonStore = useCommon();

const handleGo = (path: string) => {
  window.open(path, '_blank');
};

const imgUrl = computed(() => (item: { IMG_DARK: any; IMG: any }) => {
  return commonStore.theme === 'dark' ? item.IMG_DARK : item.IMG;
});

const imgUrlHover = computed(
  () => (item: { IMG_DARK_HOVER: any; IMG_HOVER: any }) => {
    return commonStore.theme === 'dark' ? item.IMG_DARK_HOVER : item.IMG_HOVER;
  }
);
</script>

<template>
  <div class="home-nav">
    <div
      v-for="item in i18n.home.HOME_NAV"
      :key="item.LINK"
      class="nav-item"
      @click="handleGo(item.LINK)"
    >
      <div class="nav-icon">
        <img :src="imgUrl(item)" :alt="item.TITLE" class="nav-item-icon" />
        <img
          :src="imgUrlHover(item)"
          :alt="item.TITLE"
          class="nav-item-icon-hover"
        />
      </div>
      <div class="nav-text">
        <h4 class="nav-title">
          {{ item.TITLE }}
        </h4>
        <p class="nav-description">{{ item.DSSCRIPTIVE }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-nav {
  padding: var(--o-spacing-h4);
  position: relative;
  display: grid;
  margin-top: -102px;
  grid-template-columns: repeat(4, minmax(82px, 1fr));
  column-gap: 0;
  row-gap: 0;
  background: var(--o-color-bg2);
  z-index: 10;

  .nav-item {
    cursor: pointer;
    padding-left: var(--o-spacing-h5);
    display: flex;
    align-items: center;
    border-left: 1px solid var(--o-color-division1);
    .nav-item-icon-hover {
      display: none;
    }
    .nav-item-icon {
      display: block;
    }
    .nav-icon {
      width: 48px;
      img {
        width: 100%;
      }
    }
    .nav-text {
      margin-left: var(--o-spacing-h5);
      .nav-title {
        word-break: break-all;
        color: var(--o-color-text1);
        line-height: var(--o-line-height-text);
        font-weight: 500;
        font-size: var(--o-font-size-h7);
        @media screen and (max-width: 768px) {
          text-align: center;
        }
      }
      // .nav-title-en {
      //   font-weight: 400;
      //   color: var(--o-color-text1);
      //   font-size: var(--o-font-size-h7);
      // }
      .nav-description {
        line-height: var(--o-line-height-text);
        font-size: var(--o-font-size-text);
        color: var(--o-color-text4);
        text-align: left;
      }
    }
    &:hover {
      @media screen and (min-width: 1100px) {
        .nav-item-icon-hover {
          display: block;
        }
        .nav-item-icon {
          display: none;
        }
        .nav-text {
          .nav-title,
          .nav-description {
            color: var(--o-color-brand1);
          }
        }
      }
    }
  }
  .nav-item:first-child {
    padding: 0;
    border: none;
  }
  @media screen and (max-width: 1440px) {
    margin-top: 0;
    position: relative;
    grid-template-columns: repeat(2, minmax(82px, 1fr));
    column-gap: 60px;
    &::after {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 50%;
      content: '';
      width: 1px;
      height: calc(100% - 48px);
      background-color: var(--o-color-division1);
    }
    .nav-item {
      padding: 0;
      border: none;
      flex-direction: column;
      .nav-icon {
        width: 40px;
      }
      .nav-text {
        margin: 0;
        .nav-title {
          font-size: var(--o-font-size-text);
        }
        .nav-title-en {
          text-align: center;
        }
        .nav-description {
          display: none;
          text-align: left;
        }
      }
    }
    .nav-item:nth-child(3) {
      border: 0;
    }
    .nav-item:nth-child(-n + 2) {
      padding-top: 0;
      padding-bottom: var(--o-spacing-h6);
      border-bottom: 1px solid var(--o-color-division1);
    }
    .nav-item:nth-child(2) {
      position: relative;
    }
    .nav-item:nth-child(n + 3) {
      padding-top: var(--o-spacing-h6);
    }
  }
}
</style>
