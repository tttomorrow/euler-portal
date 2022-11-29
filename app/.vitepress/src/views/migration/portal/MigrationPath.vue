<script setup lang="ts">
import { useCommon } from '@/stores/common';
import { computed } from 'vue';

import portalInfo from '@/data/migration/migration-portal';

const commonStore = useCommon();

const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));
</script>
<template>
  <div class="migration-path">
    <h3>{{ portalInfo.path.title }}</h3>
    <div class="migration-path-content">
      <OCard>
        <div class="content-pc">
          <img
            :src="isDark ? portalInfo.path.img.dark : portalInfo.path.img.light"
          />
        </div>
        <div class="content-mobile">
          <div class="content-mobile-item">
            <p>{{ portalInfo.path.imgMo.top.title }}</p>
            <div
              class="item-dexcription"
              :style="{
                color: isDark ? 'var(--o-color-white)' : '',
              }"
            >
              {{ portalInfo.path.imgMo.top.dexcription }}
            </div>
            <img :src="portalInfo.path.imgMo.top.img" />
          </div>
          <div class="content-mobile-item" :style="{ 'margin-top': '24px' }">
            <p>{{ portalInfo.path.imgMo.bottom.title }}</p>
            <div
              class="item-dexcription"
              :style="{
                color: isDark ? 'var(--o-color-white)' : '',
              }"
            >
              {{ portalInfo.path.imgMo.bottom.dexcription }}
            </div>
            <img :src="portalInfo.path.imgMo.bottom.img" />
          </div>
        </div>
      </OCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-card__body) {
  padding: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    padding: var(--o-spacing-h5) var(--o-spacing-h6);
  }
}
.migration-path {
  margin-top: var(--o-spacing-h1);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h2);
  }
  h3 {
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    margin-top: 0;
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      margin: 0;
    }
  }
  p {
    font-size: var(--o-font-size-h7);
    font-weight: 300;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h8);
    width: 100%;
    text-align: center;
    margin-top: var(--o-spacing-h5);
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin-top: var(--o-spacing-h8);
    }
  }
  &-content {
    text-align: center;
    margin-top: var(--o-spacing-h3);
    @media screen and (max-width: 768px) {
      margin-top: var(--o-spacing-h5);
    }
    .content-pc {
      @media screen and (max-width: 768px) {
        display: none;
      }
      img {
        max-width: 974px;
        @media screen and (max-width: 1410px) {
          max-width: 674px;
        }
        @media screen and (max-width: 1110px) {
          max-width: 774px;
        }
      }
    }
    .content-mobile {
      display: none;
      @media screen and (max-width: 768px) {
        display: block;
        margin: 0;
      }
      &-item {
        p {
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            // color: var(--o-color-text1);
            font-weight: 400;
            margin: 0;
          }
        }
        .item-dexcription {
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
            color: var(--o-color-neutral5);
            font-weight: 400;
            margin-top: 4px;
          }
        }
        img {
          margin-top: 12px;
        }
      }
    }
  }
}
</style>
