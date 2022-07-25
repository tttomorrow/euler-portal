<script setup lang="ts">
import { useData } from 'vitepress';
import { ref } from 'vue';
import IconArrowRight from '~icons/app/arrow-right.svg';
import IconDown from '~icons/app/icon-down.svg';

const { theme: i18n } = useData();

const active = ref(0);

const changeActive = (index: number) => {
  active.value = index;
};
</script>

<template>
  <div class="carousel">
    <h3>{{ i18n.home.IMG_CAROUSE.TITLE }}</h3>
    <div class="carousel-pc">
      <OCard class="carousel-pc-card" :style="{ padding: '0px' }">
        <div class="carousel-pc-content">
          <div class="carousel-pc-list">
            <div
              v-for="(item, index) in i18n.home.IMG_CAROUSE.LIST"
              :key="index"
              :class="['carousel-pc-title', active === index ? 'active' : '']"
              @click="changeActive(index)"
            >
              {{ item.TITLE }}
            </div>
          </div>
          <div class="carousel-pc-img">
            <img :src="i18n.home.IMG_CAROUSE.LIST[active].IMG_URL" />
          </div>
        </div>
        <div class="carousel-pc-button">
          {{ i18n.home.IMG_CAROUSE.BUTTON }}
          <IconArrowRight class="carousel-pc-button-icon"></IconArrowRight>
        </div>
      </OCard>
    </div>
    <div class="carousel-mobile">
      <div v-for="(item, index) in i18n.home.IMG_CAROUSE.LIST" :key="index">
        <OCard
          class="carousel-mobile-card"
          :style="{ padding: '0px' }"
          @click="changeActive(index)"
        >
          <div class="carousel-mobile-content">
            <div class="carousel-mobile-title">
              {{ item.TITLE }}
            </div>
            <IconDown class="carousel-mobile-icon"></IconDown>
          </div>
        </OCard>
        <div v-if="index === active" class="carousel-mobile-img">
          <img :src="i18n.home.IMG_CAROUSE.LIST[active].IMG_URL" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  max-width: 1504px;
  margin: 0 auto;
  padding: 0;
  h3 {
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    margin-top: var(--o-spacing-h1);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      margin-top: var(--o-spacing-h2);
    }
  }

  &-mobile {
    margin-top: var(--o-spacing-h5);
    display: none;
    @media (max-width: 1080px) {
      display: flex;
      flex-flow: column;
    }
    &-card {
      :deep(.el-card__body) {
        padding: var(--o-spacing-h4);
        @media (max-width: 768px) {
          padding: var(--o-spacing-h8);
        }
      }
    }

    &-content {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
    }

    &-img {
      width: 100%;
      margin: var(--o-spacing-h5) 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &-title {
      font-size: var(--o-font-size-h5);
      font-weight: 500;
      color: var(--o-color-text2);
      line-height: var(--o-line-height-h5);
      @media (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }

    &-icon {
      font-size: var(--o-font-size-h8);
      color: var(--o-color-text3);
    }
  }
  &-pc {
    margin-top: var(--o-spacing-h2);
    @media (max-width: 1080px) {
      display: none;
    }
    &-card {
      :deep(.el-card__body) {
        padding: var(--o-spacing-h1) var(--o-spacing-h1) var(--o-spacing-h2);
      }
    }

    &-content {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
      padding-bottom: var(--o-spacing-h2);
      border-bottom: 1px solid var(--o-color-division);
    }

    &-list {
      display: flex;
      flex-flow: column;
      margin-right: var(--o-spacing-h1);
      justify-content: space-between;
      height: 400px;
      align-items: center;
      :nth-child(4) {
        border-bottom: 0px;
        padding-bottom: 0px;
      }

      @media (max-width: 1280px) {
        height: 320px;
      }
    }

    &-img {
      flex: 1;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &-title {
      font-size: var(--o-font-size-h4);
      font-weight: 400;
      color: var(--o-color-text2);
      line-height: var(--o-line-height-h4);
      text-align: start;
      border-bottom: 1px solid var(--o-color-division);
      padding-bottom: var(--o-spacing-h2);
      @media (max-width: 1280px) {
        padding-bottom: var(--o-spacing-h3);
      }
    }

    &-button {
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      margin-top: var(--o-spacing-h2);
      &-icon {
        width: var(--o-font-size-h8);
        height: var(--o-font-size-h8);
        color: var(--o-color-brand);
        margin-left: var(--o-spacing-h8);
      }
    }
  }
}
.active {
  color: var(--o-color-brand);
}
</style>
