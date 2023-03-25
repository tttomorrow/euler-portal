<script setup lang="ts">
import { onMounted } from 'vue';
import AOS from 'aos';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

defineProps({
  bannerData: {
    type: Object,
    required: true,
    default: () => null,
  },
});
onMounted(() => {
  AOS.init({
    offset: 50,
    duration: 800,
    delay: 100,
    once: true,
  });
});
</script>
<template>
  <div class="banner">
    <div
      class="summit-banner-pc summit-banner"
      :style="{ backgroundImage: `url(${bannerData.img_pc})` }"
    ></div>
    <div
      class="summit-banner-mo summit-banner"
      :style="{ backgroundImage: `url(${bannerData.img_mo})` }"
    ></div>
    <div data-aos="fade-down" class="banner-text">
      <h2>{{ bannerData.title }}</h2>
      <h3>{{ bannerData.subtitle }}</h3>
      <a href="https://e-campaign.huawei.com/m/N7V3Eb" target="_blank">
        <OButton animation class="banner-btn">
          了解更多
          <template #suffixIcon
            ><OIcon><IconArrowRight /></OIcon
          ></template>
        </OButton>
      </a>
    </div>
  </div>
</template>
<style scoped lang="scss">
.dark .banner {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
.banner {
  width: 100%;
  height: 380px;
  position: relative;
  @media (max-width: 767px) {
    height: 300px;
  }
  .summit-banner {
    height: 100%;
    margin: 0 auto;
    background: no-repeat center/cover;
  }
  .summit-banner-pc {
    @media (max-width: 768px) {
      display: none;
    }
  }
  .summit-banner-mo {
    display: none;
    @media (max-width: 768px) {
      display: block;
    }
  }

  img {
    width: 100%;
    max-height: 300px;
  }
  .banner-text {
    position: absolute;
    top: 126px;
    left: 54%;
    @media (max-width: 767px) {
      top: 40px;
      width: 100%;
      left: 0;
      text-align: center;
    }
    h2 {
      font-size: 40px;
      line-height: var(--o-line-height-h3);
      font-weight: normal;
      @media (max-width: 767px) {
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-height-h7);
      }
    }
    h3 {
      margin-top: 42px;
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      font-weight: normal;
      @media (max-width: 767px) {
        margin-top: 16px;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
    .banner-btn {
      margin-top: 32px;
      color: var(--o-color-black);
      border: 1px solid var(--o-color-black);
      @media (max-width: 768px) {
        padding: 6px 16px;
        margin-top: 21px;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        .o-icon {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
