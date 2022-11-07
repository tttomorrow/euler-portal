<script setup lang="ts">
import AppContent from '@/components/AppContent.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';

import banner from '@/assets/banner/banner-learning.png';
import illustration from '@/assets/illustrations/mooc.png';

import IconArrowRight1 from '~icons/app/icon-arrow-right.svg';
import { useI18n } from '@/i18n';

const i18n = useI18n();
</script>

<template>
  <div class="mooc">
    <BannerLevel2
      background-text="MOOC"
      :title="i18n.mooc.MOOC.MOOC"
      :background-image="banner"
      :illustration="illustration"
    />
    <AppContent>
      <div class="mooc-content">
        <OContainer class="mooc-item">
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
              <a
                :href="i18n.mooc.MOOC.MOOC_COURSE[0].APPLY_LINK"
                target="_blank"
              >
                <OButton size="mini">
                  <span>{{ i18n.mooc.MOOC.BTN_APPLY }}</span>
                  <OIcon>
                    <IconArrowRight1 />
                  </OIcon>
                </OButton>
              </a>
            </div>
          </div>
        </OContainer>
      </div>
    </AppContent>
  </div>
</template>

<style lang="scss" scoped>
.mooc {
  .banner {
    height: 30px;
  }
  .mooc-content {
    .mooc-item {
      display: flex;

      @media (max-width: 975px) {
        display: block;
      }
      .left {
        max-height: 222px;
        box-shadow: var(--o-shadow1);
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
        padding: var(--o-spacing-h2);
        position: relative;
        flex-grow: 1;
        @media (max-width: 768px) {
          padding: var(--o-spacing-h5);
        }
        h3 {
          font-size: var(--o-font-size-h5);
          line-height: var(--o-line-height-h5);
          color: var(--o-color-text1);
          @media (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
          }
        }
        p {
          font-size: var(--o-font-size-text);
          line-height: 22px;
          color: var(--o-color-text4);
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
}
</style>
