<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { ref, watch, computed } from 'vue';

import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';

import tocInfo from '@/data/migration/migration-toc';

import DocSideBar from '@/components/DocSideBar.vue';
import DocSideBarMenu from '@/components/DocSideBarMenu.vue';

import IconChevronDown from '~icons/app/icon-chevron-down.svg';
import IconCancel from '~icons/app/icon-cancel.svg';
import IconCatalog from '~icons/mooc/catalog.svg';

import logo_light from '@/assets/logo.png';
import logo_dark from '@/assets/logo_dark.png';

const { lang, frontmatter } = useData();
const commonStore = useCommon();

const router = useRouter();
const routeList = router.route.path.split('/');
const activeId = ref(routeList[routeList.length - 2]);

const screenWidth = useWindowResize();

const defaultProps = ref({
  children: 'children',
  label: 'label',
});

const isCustomLayout = computed(() => {
  return frontmatter.value['custom-layout'];
});

const isGuidance = computed(() => {
  return frontmatter.value.title === '迁移方案';
});

watch(
  () => {
    const routeList = router.route.path.split('/');
    return routeList[routeList.length - 2];
  },
  (val) => {
    activeId.value = val;
  }
);

const logo = computed(() => {
  return commonStore.theme === 'light' ? logo_light : logo_dark;
});

// 控制移动端二级导航展开收起
const isShowMenu = ref(false);
// 移动端点击控制目录的显示或隐藏
const toggleMenu = (flag: boolean) => {
  isShowMenu.value = flag;
};
const IconMenuShow = computed(() => {
  return commonStore.iconMenuShow;
});
// 返回首页
const goHome = () => {
  router.go(`/${lang.value}/`);
};

const handleItemClick = (link: string) => {
  router.go(`/${lang.value}/migration/guidance/${link}/`);
};

const handleTitleClick = (link: string) => {
  router.go(`/${lang.value}/migration/${link}/`);
};

const handleNodeClick = (node: any) => {
  router.go(`/${lang.value}/migration/${node.link}/`);
  toggleMenu(false);
};
</script>

<template>
  <DocSideBar v-if="screenWidth > 1100">
    <p class="migration-title">迁移专区</p>
    <div class="migration-sidebar-toc">
      <template v-for="item in tocInfo" :key="item.label">
        <DocSideBarMenu
          v-if="item && item.children && item.children.length"
          :info="item"
          :active-id="activeId"
          @item-click="handleItemClick"
        ></DocSideBarMenu>
        <p
          v-else
          class="sidebar-title"
          :class="{ active: item.link === activeId }"
          @click="handleTitleClick(item.link)"
        >
          {{ item.label }}
        </p>
      </template>
    </div>
  </DocSideBar>

  <div v-else class="detail-mobile">
    <OIcon v-show="IconMenuShow" class="catalog" @click="toggleMenu(true)"
      ><IconCatalog
    /></OIcon>
    <ClientOnly>
      <ODrawer
        v-model="isShowMenu"
        direction="ltr"
        size="268px"
        :show-close="false"
      >
        <div class="nav-tree">
          <div class="nav-top">
            <img
              class="logo"
              :src="logo"
              alt="openEuler logo"
              @click="goHome"
            />
            <OIcon @click="toggleMenu(false)"><IconCancel /></OIcon>
          </div>
          <OTree
            ref="tree"
            node-key="migration"
            :data="tocInfo"
            accordion
            :props="defaultProps"
            :highlight-current="true"
            :icon="IconChevronDown"
            :current-node-key="activeId"
            @node-click="handleNodeClick"
          >
          </OTree>
        </div>
      </ODrawer>
    </ClientOnly>
  </div>
  <div class="migration-wrapper migration-markdown">
    <Content
      class="migration-content"
      :class="{ 'custom-layout': isCustomLayout, guidance: isGuidance }"
    />
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tree-node__content:hover) {
  background-color: var(--o-color-bg4);
}

.migration-content {
  max-width: 1380px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    background-color: var(--o-color-bg2);
    padding: 24px 16px 16px 16px;
    box-shadow: var(--o-shadow-l1);
  }
}

.custom-layout {
  @media screen and (max-width: 768px) {
    background-color: var(--o-color-bg1);
    box-shadow: var(--o-shadow-sl1);
    padding: 0;
    box-shadow: none;
  }
}

.guidance {
  max-width: 1132px;
}
.migration-title {
  font-size: var(--o-font-size-h5);
  line-height: var(--o-line-height-h5);
  position: fixed;
  left: 40px;
  margin-bottom: var(--o-spacing-h8);
  margin-top: 0;
  color: var(--o-color-white);
}

.migration-sidebar-toc {
  height: 100%;
  margin-top: 40px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: var(--o-color-division);
    background-clip: content-box;
  }

  &::-webkit-scrollbar-track {
    border-radius: 0;
    box-shadow: none;
    background: var(--o-color-bg1);
  }

  .sidebar-title:first-child {
    &::before {
      display: none;
    }
  }
}

.sidebar-title {
  position: relative;
  padding: 0 40px;
  font-size: var(--o-font-size-text);
  height: 70px;
  line-height: 70px;
  color: var(--o-color-white);
  cursor: pointer;

  &::before {
    position: absolute;
    top: 0;
    width: calc(100% - 80px);
    height: 1px;
    background-color: var(--o-color-neutral11);
    content: '';
    background-color: #ffffff;
    opacity: 0.1;
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
.catalog {
  position: fixed;
  top: 12px;
  left: 48px;
  z-index: 99;
  font-size: 24px;
  color: var(--o-color-text1);
  cursor: pointer;
}
.nav-tree {
  position: fixed;
  left: 0;
  top: 0;
  width: 268px;
  height: 100vh;
  background: var(--o-color-bg2);
  box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 999;
  .nav-top {
    width: 100%;
    background: var(--o-color-bg2);
    font-size: 14px;
    line-height: 22px;
    color: var(--o-color-text1);
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
    background-color: var(--o-color-bg2);
  }

  :deep(.el-icon.el-tree-node__expand-icon.is-leaf) {
    display: none;
  }
  :deep(.el-tree-node__content > .el-tree-node__expand-icon) {
    order: 2;
    padding: 12px;
    font-size: var(--o-font-size-h8);
    color: var(--o-color-text1);
  }
  :deep(.el-tree-node__expand-icon.expanded) {
    transform: rotate(180deg);
  }
  :deep(.el-tree--highlight-current
      .el-tree-node.is-current
      > .el-tree-node__content) {
    background-color: var(--o-color-bg4);
  }
  // :deep(.el-tree-node:nth-of-type(1)
  //     > .el-tree-node__content
  //     > .el-tree-node__expand-icon) {
  //   display: none;
  // }
  :deep(.el-tree-node__children .el-tree-node__expand-icon) {
    display: none;
  }
  :deep(.el-tree-node__children .is-current .el-tree-node__label) {
    color: var(--o-color-brand1);
  }
  :deep(.el-tree--highlight-current
      .el-tree-node.is-current
      > .el-tree-node__content) {
    background-color: transparent;
  }
  :deep(.el-tree-node__children) {
    background-color: var(--o-color-bg1);
  }
  :deep(.el-tree .el-tree-node__label) {
    font-size: 14px;
    line-height: 16px;
    color: var(--o-color-text1);
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
