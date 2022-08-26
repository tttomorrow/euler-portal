<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import DocSideBar from '@/components/DocSideBar.vue';
import DocSideBarMenu from '@/components/DocSideBarMenu.vue';
import { ref, watch, computed } from 'vue';
import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';
import IconChevronDown from '~icons/app/icon-chevron-down.svg';

const { lang } = useData();
import IconCancel from '~icons/app/icon-cancel.svg';
const commonStore = useCommon();

const router = useRouter();
const routeList = router.route.path.split('/');
const activeId = ref(routeList[routeList.length - 2]);

const screenWidth = useWindowResize();

const handleNodeClick = () => {};

const a = [
  {
    label: '下载',
    link: 'download',
  },
  {
    label: '背景',
    link: 'background',
  },
  {
    label: '方案介绍',
    link: 'guidance',
    children: [
      {
        label: '迁移概述',
        link: '1-summary',
      },
      {
        label: '迁移注意事项',
        link: '2-attention',
      },
      {
        label: '迁移流程',
        link: '3-process',
      },
      {
        label: '迁移评估',
        link: '4-assessment',
      },
      {
        label: '迁移适配',
        link: '5-adaptive',
      },
      {
        label: '迁移实施（存量替换）',
        link: '6-stock-migration',
      },
      {
        label: '迁移实施（新增/扩容）',
        link: '7-increased-migration',
      },
      {
        label: '使用SUT进行升级（原地升级）',
        link: '8-updated',
      },
    ],
  },
  {
    label: '案例指导',
    link: 'background',
  },
];

const handleItemClick = (link: string) => {
  router.go(`/${lang.value}/migration/guidance/${link}/`);
};

const handleTitleClick = (link: string) => {
  router.go(`/${lang.value}/migration/${link}/`);
};

watch(
  () => {
    const routeList = router.route.path.split('/');
    return routeList[routeList.length - 2];
  },
  (val) => {
    activeId.value = val;
  }
);

import logo_light from '@/assets/logo.png';
import logo_dark from '@/assets/logo_dark.png';

const logo = computed(() => {
  return commonStore.theme === 'light' ? logo_light : logo_dark;
});

// 控制移动端二级导航展开收起
const isShowMenu = ref(true);
// 移动端点击控制目录的显示或隐藏
function showMenu(option: string) {
  if (option === 'show') {
    isShowMenu.value = true;
  } else if (option === 'hide') {
    isShowMenu.value = false;
  } else {
    return false;
  }
}
// 返回首页
const goHome = () => {
  router.go(`/${lang.value}/`);
};
</script>

<template>
  <DocSideBar v-if="screenWidth > 1100">
    <p class="migration-title">迁移专区</p>
    <template v-for="item in a" :key="item.label">
      <DocSideBarMenu
        v-if="item.children && item.children.length"
        :info="item"
        :active-id="activeId"
        @item-click="handleItemClick"
      ></DocSideBarMenu>
      <p
        v-else
        class="menu-title"
        :class="{ active: item.link === activeId }"
        @click="handleTitleClick(item.link)"
      >
        {{ item.label }}
      </p>
    </template>
  </DocSideBar>
  <div v-if="screenWidth < 1100" class="migration-head">
    <div class="migration-head">下载</div>
  </div>
  <div class="detail-mobile">
    <OIcon class="catalog" @click="showMenu('show')"><IconCatalog /></OIcon>
    <ODrawer
      v-model="isShowMenu"
      direction="ltr"
      size="268px"
      show-close="false"
    >
      <div class="nav-tree">
        <div class="nav-top">
          <img class="logo" :src="logo" alt="openEuler logo" @click="goHome" />
          <OIcon @click="showMenu('hide')"><IconCancel /></OIcon>
        </div>
        <OTree
          ref="tree"
          node-key="key"
          :data="a"
          :props="defaultProps"
          accordion
          :highlight-current="true"
          :icon="IconChevronDown"
          @node-click="handleNodeClick"
        >
        </OTree>
      </div>
    </ODrawer>
  </div>
  <div class="migration-wrapper migration-markdown">
    <Content />
  </div>
</template>

<style lang="scss" scoped>
.migration-head {
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
}

.migration-title {
  font-size: var(--o-font-size-h5);
  line-height: var(--o-line-height-h5);
  padding: 0 40px;
  margin-bottom: var(--o-spacing-h8);
  margin-top: 0;

  & + .menu-title {
    &::before {
      display: none;
    }
  }

  & + .sidebar-menu {
    &::before {
      display: none;
    }
  }
}

.menu-title {
  position: relative;
  padding: 0 40px;
  font-size: var(--o-font-size-text);
  height: 70px;
  line-height: 70px;
  cursor: pointer;

  &::before {
    position: absolute;
    top: 0;
    width: calc(100% - 80px);
    height: 1px;
    background-color: #e5e5e5;
    content: '';
  }

  &:hover {
    color: #feb32a;
  }

  &.active {
    color: #feb32a;
  }
}

.migration-wrapper {
  .migration-content {
    max-width: 1380px;
    margin: 0 auto;
  }

  .migration-markdown {
    margin: 0;
  }
}

.nav-tree {
  position: fixed;
  left: 0;
  top: 0;
  width: 268px;
  height: 100vh;
  background: var(--e-color-bg2);
  box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 999;
  .nav-top {
    width: 100%;
    background: var(--e-color-bg2);
    font-size: 14px;
    line-height: 22px;
    color: var(--e-color-text1);
    padding: var(--o-spacing-h5);
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      height: 24px;
      cursor: pointer;
    }
    :deep(.o-icon) {
      padding: 12px;
      cursor: pointer;
      font-size: var(--o-font-size-h5);
    }
  }
  :deep(.el-tree) {
    width: 100%;
    overflow: hidden;
    background-color: var(--e-color-bg2);
  }
  :deep(.el-tree-node__content > .el-tree-node__expand-icon) {
    order: 2;
    padding: 12px;
    font-size: var(--o-font-size-h8);
    color: var(--e-color-text1);
  }
  :deep(.el-tree-node__expand-icon.expanded) {
    transform: rotate(180deg);
  }
  :deep(.el-tree--highlight-current
      .el-tree-node.is-current
      > .el-tree-node__content) {
    background-color: var(--e-color-bg4);
  }
  :deep(.el-tree-node:nth-of-type(1)
      > .el-tree-node__content
      > .el-tree-node__expand-icon) {
    display: none;
  }
  :deep(.el-tree-node__children .el-tree-node__expand-icon) {
    display: none;
  }
  :deep(.el-tree-node__children .is-current .el-tree-node__label) {
    color: var(--e-color-brand1);
  }
  :deep(.el-tree--highlight-current
      .el-tree-node.is-current
      > .el-tree-node__content) {
    background-color: transparent;
  }
  :deep(.el-tree-node__children) {
    background-color: var(--e-color-bg1);
  }
  :deep(.el-tree .el-tree-node__label) {
    font-size: 14px;
    line-height: 16px;
    color: var(--e-color-text1);
  }
  :deep(.el-tree .el-tree-node__children .el-tree-node__label) {
    font-size: 14px;
    line-height: 20px;
    white-space: pre-wrap;
  }
  :deep(.el-tree-node .el-tree-node__content) {
    padding: 19px var(--o-spacing-h5) !important;
    justify-content: space-between;
  }
}
</style>
