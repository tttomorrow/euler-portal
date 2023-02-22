<script lang="ts" setup>
import AppContent from '@/components/AppContent.vue';

import yearPlanImg_light from '@/assets/category/salon/year-plan_light.png';
import yearPlanImg_dark from '@/assets/category/salon/year-plan_dark.png';
import { useCommon } from '@/stores/common';

import planLink from '@/data/salon/plan';

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
        <a
          v-for="plan in planLink"
          :key="plan.url"
          :href="plan.url"
          :class="plan.className"
          :target="plan.target || '_blank'"
        ></a>
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
    a {
      display: inline-block;
      position: absolute;
    }
    .events {
      right: 0;
      bottom: 75px;
      height: 20px;
      width: 140px;
    }
    .marketing {
      top: 258px;
      right: 0;
      width: 170px;
      height: 20px;
    }
    .beijin-dpu {
      width: 65px;
      height: 70px;
      top: 295px;
      left: 170px;
    }
    .fosdem {
      width: 85px;
      height: 50px;
      top: 190px;
      left: 260px;
    }
    .internship {
      width: 80px;
      height: 20px;
      bottom: 180px;
      left: 755px;
    }
  }
}
</style>
