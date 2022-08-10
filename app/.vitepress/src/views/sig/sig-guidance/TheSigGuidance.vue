<script setup lang="ts">
import { useI18n } from '@/i18n';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import banner from '@/assets/banner-secondary.png';
import illustration from '@/assets/illustrations/search.png';
import sig1 from '@/assets/sig-application/sig1.png';
import sig2 from '@/assets/sig-application/sig2.png';
import sig3 from '@/assets/sig-application/sig3.png';
import sig4 from '@/assets/sig-application/sig4.png';
import sig5 from '@/assets/sig-application/sig5.png';
import sig6 from '@/assets/sig-application/sig6.png';

const LEFT_IMG = [sig1, sig2, sig3];
const RIGHT_IMG = [sig4, sig5, sig6];

const i18n = useI18n();
</script>

<template>
  <div class="application">
    <BannerLevel2
      :background-image="banner"
      background-text="SIG"
      :title="i18n.sig.GUIDANCE_LIST.GUIDE.TITLE"
      :illustration="illustration"
    />
    <div class="middle">
      <div
        v-for="(item, index) in i18n.sig.GUIDANCE_LIST.GUIDE.LINE_CONTENT"
        :key="item.LEFT.LEFT_CIRCLE"
        class="middle-item"
      >
        <div class="middle-item-left">
          <div class="middle-item-bgdconfig">
            <img :src="LEFT_IMG[index]" />
          </div>
          <div class="middle-item-infoconfig">
            <div class="middle-item-infoconfig-circle">
              <span>{{ item.LEFT.LEFT_CIRCLE }}</span>
            </div>
            <div>
              <span v-if="item.LEFT.LEFT_DESC">
                {{ item.LEFT.LEFT_DESC }}
              </span>
              <span>{{ item.LEFT.LEFT_INFO }}</span>
            </div>
          </div>
        </div>
        <div
          class="middle-item-right"
          :class="index === 0 ? 'middle-item-right-1' : 'other'"
        >
          <div class="middle-item-bgdconfig">
            <img :src="RIGHT_IMG[index]" />
          </div>
          <div class="middle-item-infoconfig">
            <div class="middle-item-infoconfig-circle">
              <span>{{ item.RIGHT.RIGHT_CIRCLE }}</span>
            </div>
            <div>
              <span v-if="item.RIGHT.RIGHT_DESC">
                {{ item.RIGHT.RIGHT_DESC }}
              </span>
              <!-- eslint-disable -->
              <span v-html="item.RIGHT.RIGHT_INFO"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.application {
  .middle {
    max-width: 1504px;
    margin: var(--o-spacing-h1) auto;
    padding: 0 44px;
    &-item {
      min-height: 154px;
      display: flex;
      align-items: flex-start;
      margin-top: var(--o-spacing-h4);
      @media (max-width: 780px) {
        display: block;
      }
      &-left {
        display: flex;
        margin-right: var(--o-spacing-h4);
        @media (max-width: 780px) {
          margin-right: 0px;
          margin-bottom: var(--o-spacing-h4);
        }
      }
      &-right {
        margin-top: 80px;
        display: flex;
        margin-right: var(--o-spacing-h4);
        @media (max-width: 780px) {
          margin-right: 0px;
          margin-top: var(--o-spacing-h5);
        }
      }
      &-right-1 {
        margin-top: 102px;
        @media (max-width: 780px) {
          margin-top: 0px;
        }
      }
      &-bgdconfig {
        width: 216px;
        background-color: var(--o-color-brand_hover);
        @media (max-width: 1280px) {
          width: 180px;
        }
        @media (max-width: 1080px) {
          width: 150px;
        }
        img {
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 90px;
          object-fit: contain;
          @media (max-width: 1080px) {
            height: 80px;
          }
          @media (max-width: 780px) {
            width: 60px;
          }
        }
      }
      &-infoconfig {
        width: 456px;
        background-color: var(--o-color-bg);
        @media (max-width: 1280px) {
          width: 350px;
        }
        @media (max-width: 1080px) {
          width: 300px;
        }
        span {
          color: var(--o-color-text2);
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-h8);
          float: left;
          margin: 0 var(--o-spacing-h4) var(--o-spacing-h4) var(--o-spacing-h1);
          position: relative;
          bottom: var(--o-spacing-h4);
          @media (max-width: 780px) {
            margin: 0 var(--o-spacing-h10) 0 var(--o-spacing-h3);
            line-height: var(--o-line-height-text);
          }
        }
        &-circle {
          height: 78px;
          width: 78px;
          border: 4px solid var(--o-color-base);
          border-radius: 50%;
          background-color: var(--o-color-brand);
          position: relative;
          top: 50%;
          transform: translate(-50%, -50%);
          @media (max-width: 780px) {
            height: 60px;
            width: 60px;
          }
          span {
            white-space: nowrap;
            font-size: var(--o-font-size-h5);
            color: var(--o-color-text);
            line-height: var(--o-line-height-h5);
            position: relative;
            right: 53px;
            top: var(--o-spacing-h5);
            @media (max-width: 780px) {
              font-size: var(--o-font-size-h7);
              right: var(--o-spacing-h4);
              top: var(--o-spacing-h6);
            }
          }
        }
      }
    }
  }
}
</style>
