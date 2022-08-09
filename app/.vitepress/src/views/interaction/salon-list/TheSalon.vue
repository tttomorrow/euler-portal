<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import BannerImg1 from '@/assets/banner-secondary.png';
import BannerImg2 from '@/assets/illustrations/search.png';

const salonData = computed(() => i18n.value.interaction.MEETUPSLIST);
const activeName = ref('first');

const i18n = useI18n();
</script>

<template>
  <div class="salon">
    <BannerLevel2
      :background-image="BannerImg1"
      background-text="CONNECT"
      :title="salonData.MEETUPS"
      :illustration="BannerImg2"
    />
    <OTabs v-model="activeName" class="salon-tabs">
      <OTabPane :label="salonData.DETAIL_NEWS" name="first"></OTabPane>
      <OTabPane :label="salonData.DETAIL_REVIEW" name="second"></OTabPane>
    </OTabs>
    <div></div>
  </div>
</template>

<style lang="scss" scoped>
.salon {
  &-tabs {
    background-color: var(--o-color-bg);
    text-align: center;
  }
}
</style>
