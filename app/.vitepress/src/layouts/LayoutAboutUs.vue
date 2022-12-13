<script setup lang="ts">
import { ref } from 'vue';
import { useData, useRouter } from 'vitepress';

import tocInfo from '@/data/about-us/about-us-toc';
import useWindowResize from '@/components/hooks/useWindowResize';

import DocSideBar from '@/components/DocSideBar.vue';
import DocSideBarMenu from '@/components/DocSideBarMenu.vue';

const screenWidth = useWindowResize();
const router = useRouter();
const { lang, frontmatter } = useData();

const routeList = router.route.path.split('/');
const activeId = ref(routeList[routeList.length - 2]);

const handleItemClick = (link: string) => {
  router.go(`/${lang.value}/migration/guidance/${link}/`);
};
</script>

<template>
  <!-- PC侧边导航栏 -->
  <DocSideBar>
    <div class="aboout-sidebar-toc">
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
          :class="[{ active: item.link === activeId }]"
        >
          {{ item.label }}
        </p>
      </template>
    </div>
  </DocSideBar>

  <!-- 移动端导航栏 -->

  <!-- 内容区域 -->
  <div class="about-wrapper about-markdown">
    <Content class="about-content" />
  </div>
</template>

<style lang="scss" scoped>
.about-sidebar-toc {
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

.about-title {
  font-size: var(--o-font-size-h5);
  line-height: var(--o-line-height-h5);
}

.about-wrapper {
  .about-content {
    max-width: 1380px;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
      background-color: var(--o-color-bg2);
      padding: 24px 16px 16px 16px;
      box-shadow: var(--o-shadow-l1);
    }
  }

  .about-markdown {
    margin: 0;
  }
}
</style>
