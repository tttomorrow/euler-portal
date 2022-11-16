<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const { lang } = useData();

const i18n = useI18n();

const active = ref(0);

const activeMobile = ref(0);

const handleChangeActive = (index: number) => {
  active.value = index;
  activeMobile.value = index;
};

const handleChangeActiveMobile = (activeNames: any) => {
  if (activeNames !== '') {
    active.value = activeNames;
  }
};

const handleGo = (path: string) => {
  window.open(path, '_blank');
};
</script>

<template>
  <div class="carousel">
    <h3>{{ i18n.home.IMG_CAROUSE.TITLE }}</h3>
    <OContainer data-aos="fade-up" class="carousel-container" :level-index="1">
      <div class="carousel-pc">
        <OCard
          class="carousel-pc-card"
          shadow="never"
          :style="{ padding: '0px' }"
        >
          <div class="carousel-pc-content">
            <div class="carousel-pc-list">
              <div
                v-for="(item, index) in i18n.home.IMG_CAROUSE.LIST"
                :key="item.TITLE"
                :class="[
                  'carousel-pc-title',
                  active === index ? 'active' : '',
                  lang !== 'zh' ? 'carousel-pc-en-title' : '',
                ]"
                @click="handleChangeActive(index)"
              >
                {{ item.TITLE }}
              </div>
            </div>
            <div class="carousel-pc-img">
              <img
                :src="i18n.home.IMG_CAROUSE.LIST[active]?.IMG_URL"
                :alt="i18n.home.IMG_CAROUSE.LIST[active]?.TITLE"
              />
            </div>
          </div>
          <div class="carousel-pc-button">
            <OButton
              animation
              type="text"
              class="carousel-pc-button-item"
              @click="handleGo(i18n.home.IMG_CAROUSE.TRY_URL)"
            >
              <template #suffixIcon>
                <IconArrowRight
                  class="carousel-pc-button-icon"
                ></IconArrowRight>
              </template>
              {{ i18n.home.IMG_CAROUSE.BUTTON }}
            </OButton>
          </div>
        </OCard>
      </div>

      <OCollapse
        v-model="activeMobile"
        class="carousel-mobile"
        accordion
        @change="handleChangeActiveMobile"
      >
        <OCollapseItem
          v-for="(item, index) in i18n.home.IMG_CAROUSE.LIST"
          :key="item.TITLE"
          :name="index"
          class="carousel-mobile-card"
        >
          <template #title>
            <div class="carousel-mobile-content">
              <div class="carousel-mobile-title">
                {{ item.TITLE }}
              </div>
            </div>
          </template>
          <div class="carousel-mobile-img">
            <img
              :src="i18n.home.IMG_CAROUSE.LIST[index]?.IMG_URL"
              :alt="i18n.home.IMG_CAROUSE.LIST[index]?.TITLE"
            />
          </div>
        </OCollapseItem>
      </OCollapse>
    </OContainer>
  </div>
</template>

<style lang="scss" scoped>
.carousel {
  :deep(.el-collapse) {
    border: none;
    background-color: var(--o-color-bg1);
  }
  &-container {
    @media screen and (max-width: 1100px) {
      box-shadow: none;
    }
  }
  :deep(.el-collapse-item__content) {
    padding: 0;
  }

  h3 {
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--o-color-text1);
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
    flex-flow: column;
    @media screen and (max-width: 1100px) {
      display: flex;
    }

    &-card {
      &:last-child :deep(.el-collapse-item__header)::after {
        display: none;
      }
      :deep(.el-collapse-item__content) {
        padding: 0px !important;
      }

      :deep(.el-collapse-item__header) {
        position: relative;
        height: 100%;
        padding: var(--o-spacing-h4);
        border: none !important;
        &.is-active {
          &::after {
            opacity: 0;
          }
        }
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 1px;
          width: calc((100% - 48px));
          transition: all 0.3s;
          background-color: var(--o-color-border2);
        }
        @media (max-width: 768px) {
          padding: var(--o-spacing-h8);
          &::after {
            width: calc((100% - 16px));
          }
        }
      }

      :deep(.el-collapse-item__wrap) {
        margin: var(--o-spacing-h5) 0;
      }
    }

    &-content {
      display: flex;
      flex-flow: row;
      // justify-content: space-between;
      // align-items: center;
    }

    &-img {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &-title {
      cursor: pointer;
      font-size: var(--o-font-size-h5);
      font-weight: 500;
      color: var(--o-color-text1);
      line-height: var(--o-line-height-h5);
      @media (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }

    &-icon {
      font-size: var(--o-font-size-h8);
      color: var(--o-color-text4);
    }
  }
  &-pc {
    margin-top: var(--o-spacing-h2);
    display: block;
    @media screen and (max-width: 1100px) {
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
      padding-bottom: var(--o-spacing-h2);
      border-bottom: 1px solid var(--o-color-division1);
    }

    &-list {
      display: flex;
      flex-flow: column;
      margin-right: var(--o-spacing-h1);
      height: 300px;
      align-items: center;

      :nth-child(3) {
        border-bottom: 0px !important;
        padding-bottom: 0px !important;
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
      cursor: pointer;
      font-size: var(--o-font-size-h5);
      font-weight: 400;
      text-align: center;
      color: var(--o-color-text1);
      line-height: var(--o-line-height-h4);
      border-bottom: 1px solid var(--o-color-division1);
      padding: var(--o-spacing-h4) 0;
      @media screen and (min-width: 1100px) {
        &:hover {
          color: var(--o-color-brand1);
        }
      }
    }
    &-en-title {
      width: 266px;
    }
    &-title:first-child {
      padding-top: 0;
    }
    &-button {
      display: flex;
      padding-top: var(--o-spacing-h2);
      justify-content: center;
      align-items: center;
      @media screen and (max-width: 1080px) {
        padding: 20px 0;
        font-size: var(--o-font-size-tip);
      }

      :deep(.o-button) {
        padding: 0;
      }

      &-icon {
        color: var(--o-color-brand1);
        width: var(--o-font-size-h8);
        height: var(--o-font-size-h8);
      }
    }
  }
}
:deep(.o-collapse) {
  .el-icon-arrow-right {
    font-weight: 700;
    transform: rotate(90deg);
    &::before {
      color: #000;
    }
  }
  .el-icon-arrow-right.is-active {
    transform: rotate(270deg);
  }
  .el-collapse-item__header {
    position: relative;
    border-left: none;
    border-bottom: 1px solid var(--o-color-division1);
  }
}

.active {
  color: var(--o-color-brand1);
}
</style>
