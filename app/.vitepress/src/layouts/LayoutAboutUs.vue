<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useData, useRouter } from 'vitepress';

import tocInfo from '@/data/about-us/about-us-toc';
import useWindowResize from '@/components/hooks/useWindowResize';

import DocSideBar from '@/components/DocSideBar.vue';
import DocSideBarMenu from '@/components/DocSideBarMenu.vue';
import DocAnchor from '@/components/DocAnchor.vue';

const screenWidth = useWindowResize();
const router = useRouter();
const { lang, frontmatter } = useData();

const routeList = router.route.path.split('/');
const activeId = ref(routeList[routeList.length - 2]);

const handleItemClick = (link: string) => {
  router.go(`/${lang.value}/community/${link}/`);
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

const isCustomLayout = computed(() => {
  return frontmatter.value['custom-layout'];
});
</script>

<template>
  <!-- PC侧边导航栏 -->
  <DocSideBar v-if="screenWidth > 1100">
    <div class="aboout-sidebar-toc">
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
          :class="[{ active: item.link === activeId }]"
        >
          {{ item.label }}
        </p>
      </template>
    </div>
  </DocSideBar>

  <!-- 移动端导航栏 -->

  <!-- 内容区域 -->
  <div
    class="about-wrapper"
    :class="isCustomLayout ? 'components-wrapper' : 'about-markdown'"
  >
    <DocAnchor />
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
  height: 100%;
  padding: 64px 120px;
  margin-left: 300px;
  background-color: var(--o-color-bg1);

  @media screen and (max-width: 1280px) {
    padding: 64px 60px;
  }

  @media screen and (max-width: 1100px) {
    margin-left: 0px;
    padding: 16px 16px 40px 16px;
  }

  @media (max-width: 768px) {
    padding: var(--o-spacing-h5);
    margin-top: var(--o-spacing-h5);
    margin-bottom: var(--o-spacing-h2);
  }

  .about-anchor {
    right: 120px;
  }
  .about-content {
    max-width: calc(100% - 200px);
    @media screen and (max-width: 1100px) {
      max-width: max-content;
    }
    @media screen and (max-width: 768px) {
      background-color: var(--o-color-bg2);
      padding: 24px 16px 16px 16px;
      box-shadow: var(--o-shadow-l1);
    }

    &.custom-layout {
      @media screen and (min-width: 1720px) {
        padding-right: 0;
      }

      @media screen and (max-width: 768px) {
        background-color: var(--o-color-bg1);
        box-shadow: var(--o-shadow-l1);
        padding: 0;
        box-shadow: none;
      }
    }
  }
}
.components-wrapper {
  height: 100%;
  padding: 64px 120px;
  margin-left: 300px;
  background-color: var(--o-color-bg1);
  .about-content {
    max-width: 1380px;
  }
  @media screen and (max-width: 1750px) {
    padding: 40px 40px;
  }
  @media screen and (max-width: 1280px) {
    padding: 24px 24px;
  }

  @media screen and (max-width: 1100px) {
    margin-left: 0px;
    padding: 16px 16px 40px 16px;
  }

  @media (max-width: 768px) {
    padding: var(--o-spacing-h5);
    margin-top: var(--o-spacing-h5);
    margin-bottom: var(--o-spacing-h2);
  }
}
</style>

<style lang="scss">
/**
 *  关于我们---md样式
 **/

.about-markdown {
  --o-color-table: var(--o-color-border2); // 表格边框

  ol,
  ul {
    list-style: inherit;
  }
  a {
    word-break: break-all;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--o-color-text1);
    font-weight: 500;

    a {
      display: none;
    }
  }

  h1 {
    margin-top: 0;
    text-align: center;
  }

  hr {
    margin: var(--o-spacing-h1) 0;
    border: none;
    height: 1px;
    background-color: var(--o-color-division1);
    @media screen and (max-width: 768px) {
      margin: var(--o-spacing-h4) 0;
    }
  }

  h1 {
    margin-bottom: var(--o-spacing-h2);
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    font-weight: 300;
    @media screen and (max-width: 768px) {
      margin: 0 0 var(--o-spacing-h4);
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
    }
  }

  h2 {
    margin-top: var(--o-spacing-h2);
    margin-bottom: var(--o-spacing-h3);
    font-size: var(--o-font-size-h5);
    line-height: var(--o-line-height-h5);
    @media screen and (max-width: 768px) {
      margin: var(--o-spacing-h4) 0 var(--o-spacing-h5);
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }

  h3 {
    margin-top: var(--o-spacing-h3);
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    @media screen and (max-width: 768px) {
      margin: var(--o-spacing-h6) 0;
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }

  h4 {
    margin-top: var(--o-spacing-h4);
    font-size: var(--o-font-size-h8);
    line-height: var(--o-font-size-h8);
    @media screen and (max-width: 768px) {
      margin-top: var(--o-spacing-h6);
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }

  h5 {
    margin-top: var(--o-spacing-h5);
    font-size: var(--o-font-size-text);
    line-height: var(--o-font-size-text);
  }

  p,
  ul,
  ol {
    margin-top: var(--o-spacing-h8);
    margin-bottom: var(--o-spacing-h8);
    font-size: var(--o-font-size-text);
    font-weight: normal;
    color: var(--o-color-text4);
    line-height: var(--o-line-height-text);
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }

  ul,
  ol {
    padding-left: 1em;

    li {
      margin-top: 0.25em;
      &::marker {
        color: var(--o-color-text4);
      }
    }
  }

  table {
    width: 100%;
    font-size: var(--o-font-size-text);
    table-layout: fixed;
    word-break: break-word;
    border-collapse: collapse;
    padding: 0;

    tr {
      height: 36px;
      color: var(--o-color-text4);
      border-bottom: 1px solid var(--o-color-table);

      th {
        font-size: var(--o-font-size-h8);
        background-color: var(--o-color-bg4);
        color: var(--o-color-text1);
      }
    }
  }

  strong {
    color: var(--o-color-text1);
    font-weight: bold;
  }

  img {
    display: inline-block;
    max-width: 100%;
  }

  a[href^='#'] {
    display: none;
  }
  div[class*='language-'] {
    position: relative;
    margin: 8px 0;
    background-color: var(--o-color-bg2);
    box-shadow: var(--o-shadow-l1);
    overflow-x: auto;
    @media screen and (max-width: 768px) {
      background-color: var(--o-color-bg1);
    }
  }
  [class*='language-'] code,
  [class*='language-'] pre {
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    &::-webkit-scrollbar-track {
      border-radius: 4px;
      background-color: var(--o-color-bg2);
    }

    &::-webkit-scrollbar {
      height: 8px;
      background-color: var(--o-color-bg2);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background: var(--o-color-bg4);
    }
  }

  [class*='language-'] pre {
    position: relative;
    z-index: 1;
    margin: 0;
    padding: 24px 32px;
    background: 0 0;
    overflow-x: auto;
    @media screen and (max-width: 768px) {
      padding: 12px 24px;
    }
  }

  [class*='language-'] code {
    padding: 0;
    line-height: var(--o-line-height-text);
    font-size: var(--o-font-size-text);
    color: var(--o-color-text1);
  }
}

.about-content {
  & > *:first-child {
    & > *:first-child {
      margin-top: 0 !important;
    }
  }
}

.dark .about-markdown img {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
</style>
