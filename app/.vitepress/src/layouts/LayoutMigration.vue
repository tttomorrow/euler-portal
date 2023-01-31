<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { ref, watch, computed } from 'vue';

import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';

import tocInfo from '@/data/migration/migration-toc';

import DocSideBar from '@/components/DocSideBar.vue';
import DocSideBarMenu from '@/components/DocSideBarMenu.vue';
import NavTree from '@/components/NavTree.vue';

import IconCancel from '~icons/app/icon-cancel.svg';
import IconCatalog from '~icons/mooc/catalog.svg';

import logo_light from '@/assets/common/header/logo.png';
import logo_dark from '@/assets/common/header/logo_dark.png';

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
  link === 'migration'
    ? router.go(`/${lang.value}/migration/`)
    : router.go(`/${lang.value}/migration/${link}/`);
};

const handleNodeClick = (node: any) => {
  node.link === 'migration'
    ? router.go(`/${lang.value}/migration/`)
    : router.go(`/${lang.value}/migration/${node.link}/`);
  toggleMenu(false);
};
</script>

<template>
  <!-- PC侧边导航栏 -->
  <DocSideBar v-if="screenWidth > 1100">
    <div class="migration-sidebar-toc">
      <template v-for="(item, index) in tocInfo" :key="item.label">
        <DocSideBarMenu
          v-if="item && item.children && item.children.length"
          :info="item"
          :active-id="activeId"
          @item-click="handleItemClick"
        ></DocSideBarMenu>
        <p
          v-else
          class="sidebar-title"
          :class="[
            { active: item.link === activeId },
            index === 0 ? 'migration-title' : '',
          ]"
          @click="handleTitleClick(item.link)"
        >
          {{ item.label }}
        </p>
      </template>
    </div>
  </DocSideBar>

  <!-- 移动端导航栏 -->
  <template v-else>
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
          <NavTree
            ref="tree"
            :node-key="'migration'"
            :data="tocInfo"
            :default-props="defaultProps"
            :current-node-key="activeId"
            @node-click="handleNodeClick"
          />
        </div>
      </ODrawer>
    </ClientOnly>
  </template>

  <!-- 内容区域 -->
  <div class="migration-wrapper migration-markdown">
    <Content
      class="migration-content"
      :class="{ 'custom-layout': isCustomLayout }"
    />
  </div>
</template>

<style lang="scss" scoped>
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

  :deep(.el-icon.el-tree-node__expand-icon.is-leaf) {
    display: none;
  }
  :deep(.el-tree-node .el-tree-node__content) {
    padding: 19px var(--o-spacing-h5) !important;
    justify-content: space-between;
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

.guidance {
  max-width: 1132px;
}

.migration-sidebar-toc {
  height: 100%;
  margin-top: 24px;
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

.migration-title {
  font-size: var(--o-font-size-h5);
  line-height: var(--o-line-height-h5);
}

.migration-wrapper {
  .migration-content {
    max-width: 1380px;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
      background-color: var(--o-color-bg2);
      padding: 24px 16px 16px 16px;
      box-shadow: var(--o-shadow-l1);
    }

    &.custom-layout {
      @media screen and (max-width: 768px) {
        background-color: var(--o-color-bg1);
        box-shadow: var(--o-shadow-l1);
        padding: 0;
        box-shadow: none;
      }
    }
  }

  .migration-markdown {
    margin: 0;
  }
}
</style>
