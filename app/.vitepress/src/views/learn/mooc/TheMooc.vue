<script setup lang="ts">
import BannerLevel2 from '@/components/BannerLevel2.vue';

import moocBanner from '@/assets/banner-secondary.png';
import searchBanner from '@/assets/illustrations/search.png';

import IconArrowRight1 from '~icons/app/icon-arrow-right1.svg';
import { useI18n } from '@/i18n';

// const i18n=computed(()=>useI18n());
const i18n = useI18n();
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
          <a href="/zh/learn/mooc/detail/" target="_self">
            <OButton type="primary" size="mini">
              <span>{{ i18n.mooc.MOOC.BTN_LEARN }}</span>
              <OIcon class="icon-more">
                <IconArrowRight1 />
              </OIcon>
            </OButton>
          </a>
          <a :href="i18n.mooc.MOOC.MOOC_COURSE[0].APPLY_LINK" target="_blank">
            <OButton size="mini">
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
      max-height: 222px;
      @media (max-width: 975px) {
        width: 100%;
      }
      img {
        width: 100%;
        max-height: 222px;
        object-fit: cover;
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
          margin-right: 24px;
          margin-top: var(--o-spacing-h2);
          font-size: var(--o-font-size-text);
          text-align: left;

          @media (max-width: 768px) {
            margin-right: 16px;
            margin-top: var(--o-spacing-h8);
          }
          > :deep(span) {
            display: flex;
            align-items: center;
          }
          .o-icon {
            font-size: 12px;
            margin-left: 8px;
            transition: all 0.3s;
          }
          &:hover .o-icon {
            transform: translateX(3px);
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
