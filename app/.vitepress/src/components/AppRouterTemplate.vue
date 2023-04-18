<script lang="ts" setup>
import { computed, } from 'vue';
import { useRouter } from 'vitepress';

import BannerLevel2 from '@/components/BannerLevel2.vue';

const props = defineProps({
  bannerData: {
    type: Object,
    default: () => {
      return {};
    },
  },
  tabsData: {
    type: Object,
    default: () => {
      return {};
    },
  },
  activeTab: {
    type: String,
    default: '',
  },
});
const router = useRouter();

const active = router.route.path.split('/');

const activeRoute = computed(() => {
  if (props.activeTab) {
    return props.activeTab;
  } else {
    return active[active.length - 2];
  }
});

const emits = defineEmits(['click-tab']);

function handleTabClick(val: any) {
  emits('click-tab', val?.props.name);
}
</script>
<template>
  <div>
    <BannerLevel2
      :background-image="bannerData.bannerImg"
      :background-text="bannerData.bannerText"
      :title="bannerData.bannerTitle"
      :illustration="bannerData.bannerIllustration"
    />
    <div class="router-tabs">
      <OTabs v-model="activeRoute" @tab-click="handleTabClick">
        <OTabPane
          v-for="item in tabsData.tabPane"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        ></OTabPane>
      </OTabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
.router-tabs {
  margin: 0 auto;
  background-color: var(--o-color-bg2);
  :deep(.el-tabs__nav-scroll) {
    display: flex;
    justify-content: center;
  }
}
</style>
