<script setup lang="ts">
import { ref,onMounted } from 'vue';
import useWindowResize from '@/components/hooks/useWindowResize';
import AOS from 'aos';
const windowWidth = ref(useWindowResize());
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
      v-if="windowWidth > 767"
      class="summit-banner-pc"
      :style="{ backgroundImage: `url(${bannerData.img_pc})` }"
    ></div>
    <div
      v-else
      class="summit-banner-pc"
      :style="{ backgroundImage: `url(${bannerData.img_mo})` }"
    ></div>
    <div data-aos="fade-down" class="banner-text">
      <h2>{{ bannerData.title }}</h2>
      <h3>{{ bannerData.subtitle }}</h3>
    </div>
  </div>
</template>
<style scoped lang="scss">
.dark .banner{
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
.banner {
  width: 100%;
  height: 380px;
  position: relative;
  @media (max-width: 767px) {
    height: 300px;
  }
  .summit-banner-pc {
    height: 100%;
    margin: 0 auto;
    background: no-repeat center/cover;
  }
  img {
    width: 100%;
    max-height: 300px;
  }
  .banner-text {
    position: absolute;
    top: 165px;
    left: 50%;
    @media (max-width: 767px) {
      top: 70px;
      width: 100%;
      left: 0;
      text-align: center;
    }
    h2 {
      font-size: 40px;
      line-height: var(--o-line-hight-h3);
      font-weight: normal;
      @media (max-width: 767px) {
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-hight-h7);
      }
    }
    h3 {
      margin-top: 42px;
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-hight-h5);
      font-weight: normal;
      @media (max-width: 767px) {
        margin-top: 16px;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-hight-text);
      }
    }
  }
}
</style>
