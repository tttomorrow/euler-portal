<script setup lang="ts">
import IconArrowRight from '~icons/app/arrow-right.svg';
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';

const commonStore = useCommon();

const i18n = useI18n();

const handleGo = (path: string) => {
  window.open(path, '_blank');
};
</script>

<template>
  <div class="community">
    <h3>{{ i18n.home.COMMUNITY_ACTIVITY.TITLE }}</h3>
    <div class="community-list">
      <OCard class="community-card" :style="{ padding: '0px' }" shadow="hover">
        <div class="community-title">
          {{ i18n.home.COMMUNITY_ACTIVITY.CARD.TITLE }}
        </div>
        <div class="community-word">
          {{ i18n.home.COMMUNITY_ACTIVITY.CARD.CONTENT }}
        </div>

        <OButton
          animation
          type="text"
          class="community-detail"
          @click="handleGo(i18n.home.COMMUNITY_ACTIVITY.CARD.VIEW_DETAILS)"
        >
          {{ i18n.home.IMG_CAROUSE.BUTTON }}
          <template #suffixIcon>
            <IconArrowRight class="community-detail-icon"></IconArrowRight>
          </template>
        </OButton>
      </OCard>

      <OCard class="round-card" :style="{ padding: '0px' }">
        <div class="round-list">
          <div
            v-for="item in i18n.home.HOME_ROUND.ROUND_LIST"
            :key="item.ROUND_TEXT"
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
      padding: var(--o-spacing-h2);
      @media (max-width: 768px) {
        padding: var(--o-spacing-h4) 0 0 0;
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
    @media (max-width: 768px) {
      width: 32%;
      margin-bottom: var(--o-spacing-h4);
    }
  }

  &-value {
    font-size: var(--o-font-size-h5);
    font-weight: 500;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h5);
    margin-top: var(--o-spacing-h5);
    @media (max-width: 768px) {
      margin-top: var(--o-spacing-h10);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }

  &-title {
    font-size: var(--o-font-size-h7);
    font-weight: 400;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h7);
    margin-top: var(--o-spacing-h8);
    @media (max-width: 768px) {
      margin-top: var(--o-spacing-h10);
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }

  &-img {
    width: 48px;
    @media (max-width: 768px) {
      width: 40px;
    }
  }
}
.community {
  @media (max-width: 768px) {
    margin-top: var(--o-spacing-h2);
  }
  h3 {
    margin-top: var(--o-spacing-h1);
    margin-bottom: var(--o-spacing-h2);
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      margin-top: var(--o-spacing-h2);
    }
  }

  &-title {
    font-size: var(--o-font-size-h7);
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
    font-weight: 400;
    color: var(--o-color-text3);
    line-height: var(--o-line-height-text);
    margin-top: var(--o-spacing-h5);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    @media (max-width: 768px) {
      margin-top: var(--o-spacing-h8);
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  &-list {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: var(--o-spacing-h2);

    @media (max-width: 1080px) {
      display: grid;
      grid-template-columns: 1fr;
      margin-top: var(--o-spacing-h5);
      grid-gap: var(--o-spacing-h5);
    }
  }

  &-detail {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-text);
    margin-top: var(--o-spacing-h4);
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    &:hover {
      color: var(--o-color-brand);
    }

    &-icon {
      width: var(--o-font-size-h8);
      height: var(--o-font-size-h8);
      color: var(--o-color-brand);
    }

    @media (max-width: 768px) {
      margin-top: var(--o-spacing-h4);
    }
  }

  &-card {
    width: 100%;
    background-image: url('../../assets/category/home/round-bg.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;

    :deep(.el-card__body) {
      padding: var(--o-spacing-h2);
      @media (max-width: 768px) {
        padding: var(--o-spacing-h5) var(--o-spacing-h8);
      }
    }
    &:hover {
      box-shadow: var(--o-shadow-base_hover);
    }
  }
}
</style>
