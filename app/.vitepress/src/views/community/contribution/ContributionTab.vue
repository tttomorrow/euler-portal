<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vitepress';
import type { TabsPaneContext } from 'element-plus';

const router = useRouter();
const activeName = ref('');
// init:
if (router.route.path.includes('detail')) {
  activeName.value = 'second';
} else {
  activeName.value = 'first';
}
const handleClick = (tab: TabsPaneContext) => {
  if (tab.props.name === activeName.value) return;
  if (tab.props.name === 'first') {
    router.go('/zh/community/contribution/');
  } else {
    router.go('/zh/community/contribution/detail');
  }
};
</script>
<template>
  <div class="tab-wrapper">
    <OTabs v-model="activeName" @tab-click="handleClick">
      <OTabPane label="贡献攻略地图" name="first"></OTabPane>
      <OTabPane label="纯文字版攻略" name="second"></OTabPane>
    </OTabs>
  </div>
</template>

<style lang="scss" scoped>
.tab-wrapper {
  .el-tabs {
    background-color: var(--o-color-bg);
    :deep(.el-tabs__header) {
      margin-bottom: 0;
    }
    :deep(.el-tabs__nav) {
      left: 50%;
      transform: translate(-50%) !important;
      .is-active {
        color: var(--o-color-brand);
      }
    }
  }
}
</style>
