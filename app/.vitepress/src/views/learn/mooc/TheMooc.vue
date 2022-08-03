<script setup lang="ts">
import { useData } from 'vitepress';

import BannerLevel2 from '@/components/BannerLevel2.vue';

import moocBanner from '@/assets/banner-secondary.png';
import searchBanner from '@/assets/illustrations/search.png';

import IconArrowRight1 from '~icons/app/icon-arrow-right1.svg';

const { theme: i18n } = useData();
</script>

<template>
  <div class="mooc">
    <BannerLevel2
      :title="i18n.mooc.MOOC.MOOC"
      :background-image="moocBanner"
      :illustration="searchBanner"
    />
    <div class="mooc-content">
      <div class="left">
        <img :src="i18n.mooc.MOOC.MOOC_COURSE[0].IMG" alt="" />
      </div>
      <div class="right">
        <h3>{{ i18n.mooc.MOOC.MOOC_COURSE[0].TITLE }}</h3>
        <p>{{ i18n.mooc.MOOC.MOOC_COURSE[0].DESC }}</p>
        <div class="btn">
          <a href="/zh/learn/mooc/mooc-detail/" target="_self">
            <OButton type="primary">
              <span>{{ i18n.mooc.MOOC.BTN_LEARN }}</span>
              <OIcon class="icon-more">
                <IconArrowRight1 />
              </OIcon>
            </OButton>
          </a>
          <a :href="i18n.mooc.MOOC.MOOC_COURSE[0].APPLY_LINK" target="_blank">
            <OButton>
              <span>{{ i18n.mooc.MOOC.BTN_APPLY }}</span>
              <OIcon>
                <IconArrowRight1 />
              </OIcon>
            </OButton>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mooc {
  .banner {
    height: 30px;
  }
  .mooc-content {
    display: flex;
    max-width: 1504px;
    margin: var(--o-spacing-h1) auto;
    padding: 0 var(--o-spacing-h2);
    @media (max-width: 975px) {
      display: block;
      padding: 0 var(--o-spacing-h5);
      margin: var(--o-spacing-h2) auto 0 auto;
    }
    .left {
      height: 222px;
      @media (max-width: 975px) {
        width: 100%;
        height: auto;
      }
      img {
        @media (max-width: 975px) {
          width: 100%;
        }
      }
    }
    .right {
      // min-width: 420px;
      padding: var(--o-spacing-h2);
      position: relative;
      background-color: var(--o-color-bg);
      flex-grow: 1;
      @media (max-width: 768px) {
        padding: var(--o-spacing-h5);
      }
      h3 {
        font-size: var(--o-font-size-h5);
        line-height: var(--o-line-height-h5);
        color: var(--o-color-text2);
        @media (max-width: 768px) {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
      }
      p {
        font-size: var(--o-font-size-text);
        line-height: 22px;
        color: var(--o-color-text3);
        margin-top: var(--o-spacing-h5);
        @media (max-width: 768px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          margin-top: var(--o-spacing-h8);
        }
      }
      .btn {
        display: flex;
        position: absolute;
        bottom: 40px;
        @media (max-width: 975px) {
          position: static;
        }
        .o-button {
          width: 104px;
          height: 32px;
          margin-right: 24px;
          margin-top: var(--o-spacing-h2);
          padding: 5px 0 5px 16px;
          font-size: var(--o-font-size-text);
          text-align: left;
          display: flex;
          align-items: center;
          @media (max-width: 768px) {
            height: 28px;
            margin-right: 16px;
            padding: 3px 0 3px 16px;
            margin-top: var(--o-spacing-h8);
          }
          .o-icon {
            font-size: 12px;
            margin-left: 8px;
            position: relative;
            top: 5px;
          }
          &-type-primary {
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>
