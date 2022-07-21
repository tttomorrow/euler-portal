<script setup lang="ts">
import IconArrowRight from '~icons/app/arrow-right.svg';
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';

const commonStore = useCommon();

const { theme: i18n } = useData();
</script>

<template>
  <div class="community">
    <h3>{{ i18n.home.COMMUNITY_ACTIVITY.TITLE }}</h3>
    <div class="community-list">
      <OCard class="community-card" :style="{ padding: '0px' }">
        <div class="community-title">
          {{ i18n.home.COMMUNITY_ACTIVITY.CARD.TITLE }}
        </div>
        <div class="community-word">
          {{ i18n.home.COMMUNITY_ACTIVITY.CARD.CONTENT }}
        </div>
        <div class="community-detail">
          {{ i18n.home.COMMUNITY_ACTIVITY.CARD.VIEW_DETAILS
          }}<IconArrowRight class="community-detail-icon"></IconArrowRight>
        </div>
      </OCard>

      <OCard class="round-card" :style="{ padding: '0px' }">
        <div class="round-list">
          <div
            v-for="(item, index) in i18n.home.COMMUNITY_ACTIVITY.ROUND_LIST"
            :key="index"
            class="round-item"
          >
            <img
              :src="
                commonStore.theme === 'dark'
                  ? item.ROUND_IMG_DARK
                  : item.ROUND_IMG
              "
              class="round-img"
            />

            <div class="round-value">{{ item.ROUND_VALUE }}</div>
            <div class="round-title">{{ item.ROUND_TEXT }}</div>
          </div>
        </div>
      </OCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.round {
  &-card {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 30px;

    :deep(.el-card__body) {
      width: 100%;
      padding: var(--o-spacing-m);
      @media (max-width: 768px) {
        padding: var(--o-spacing-s3) 0 0 0;
      }
    }
  }

  &-list {
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    @media (max-width: 768px) {
      justify-content: center;
    }
  }

  &-item {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 90px;

    @media (max-width: 768px) {
      width: 32%;
      margin-bottom: var(--o-spacing-s3);
    }
  }

  &-value {
    font-size: var(--o-font-size-h5);
    font-family: 'PingFangSC-Medium, PingFang SC';
    font-weight: 500;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h5);
    margin-top: var(--o-spacing-s2);
    @media (max-width: 768px) {
      margin-top: 4px;
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }

  &-title {
    font-size: var(--o-font-size-h7);
    font-family: 'PingFangSC-Medium, PingFang SC';
    font-weight: 400;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h7);
    margin-top: var(--o-spacing-s1);
    @media (max-width: 768px) {
      margin-top: 4px;
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }

  &-img {
    width: 48px;
    height: 48px;
    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
    }
  }
}
.community {
  margin-top: var(--o-spacing-l);
  @media (max-width: 768px) {
    margin-top: var(--o-spacing-m);
  }
  h3 {
    font-size: var(--o-font-size-h3);
    font-family: 'PingFangSC-Light, PingFang SC';
    font-weight: 300;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }

  &-title {
    font-size: var(--o-font-size-h7);
    font-family: 'PingFangSC-Medium, PingFang SC';
    font-weight: 500;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h7);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }

  &-word {
    font-size: var(--o-font-size-text);
    font-family: 'PingFangSC-Regular, PingFang SC';
    font-weight: 400;
    color: var(--o-color-text3);
    line-height: var(--o-line-height-text);
    margin-top: var(--o-spacing-s2);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    @media (max-width: 768px) {
      margin-top: var(--o-spacing-s1);
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  &-list {
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-top: var(--o-spacing-m);
    grid-gap: var(--o-spacing-m);

    @media (max-width: 1080px) {
      display: grid;
      grid-template-columns: 1fr;
      margin-top: var(--o-spacing-s2);
      grid-gap: var(--o-spacing-s2);
    }
  }

  &-detail {
    font-size: var(--o-font-size-text);
    font-family: 'PingFangSC-Regular, PingFang SC';
    font-weight: 400;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-text);
    margin-top: var(--o-spacing-s4);
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;

    &-icon {
      width: var(--o-font-size-h8);
      height: var(--o-font-size-h8);
      color: var(--o-color-brand);
      margin-left: var(--o-spacing-s1);
    }

    @media (max-width: 768px) {
      margin-top: var(--o-spacing-s3);
    }
  }

  &-card {
    width: 100%;
    background-image: url('/img/home/round-bg.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;

    :deep(.el-card__body) {
      padding: var(--o-spacing-m);
      @media (max-width: 768px) {
        padding: var(--o-spacing-s2) 12px;
      }
    }
  }
}
</style>
