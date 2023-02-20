<script lang="ts" setup>
import AppContent from '@/components/AppContent.vue';

import yearPlanImg_light from '@/assets/category/salon/year-plan_light.png';
import yearPlanImg_dark from '@/assets/category/salon/year-plan_dark.png';
import { useCommon } from '@/stores/common';

const commonStore = useCommon();
</script>
<template>
  <AppContent class="salon-content">
    <div class="year-plan">
      <div class="year-plan-main">
        <img
          :src="
            commonStore.theme === 'light' ? yearPlanImg_light : yearPlanImg_dark
          "
          alt=""
        />
        <a class="marketing" href="mailto:marketing@openeuler.org"></a>
        <a class="events" href="mailto:events@openeuler.sh"></a>
      </div>
    </div>
  </AppContent>
</template>

<style scoped lang="scss">
.year-plan {
  color: var(--o-color-text1);
  overflow: auto;
  .year-plan-main {
    position: relative;
    min-width: 1416px;
    min-height: 500px;

    img {
      width: 100%;
    }
    .marketing,
    .events {
      display: inline-block;
      cursor: pointer;
      position: absolute;
      top: 258px;
      right: 0;
      width: 170px;
      height: 20px;
    }
    .events {
      top: inherit;
      bottom: 70px;
      height: 20px;
      width: 140px;
    }
  }
}
</style>
