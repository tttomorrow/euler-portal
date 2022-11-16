<script lang="ts" setup>
import { ref, computed } from 'vue';
import useWindowResize from '@/components/hooks/useWindowResize';
const props = defineProps({
  banner: {
    required: true,
    type: Object,
    default: () => {
      return {};
    },
  },
});

const screenWidth = ref(useWindowResize());

const bannerInfo = computed(() => {
  return {
    banner:
      screenWidth.value > 768 ? props.banner.pc_banner : props.banner.mo_banner,
  };
});
</script>

<template>
  <div
    class="summit-banner-pc"
    :style="`background-image:url(${bannerInfo.banner}) ;`"
  ></div>
  <div class="summit-banner-mo">
    <img :src="bannerInfo.banner" alt="" />
  </div>
</template>

<style lang="scss" scoped>
.dark .summit-banner-pc,.dark .summit-banner-mo {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.summit-banner-pc {
  height: 380px;
  margin: 0 auto;
  background: no-repeat center/cover;
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.summit-banner-mo {
  display: none;

  @media screen and (max-width: 768px) {
    width: 100%;
    display: block;
    img {
      width: 100%;
    }
  }
}
</style>
