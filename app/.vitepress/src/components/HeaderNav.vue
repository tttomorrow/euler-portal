<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useData } from 'vitepress';

defineProps({
  navItems: {
    type: Object,
    default() {
      return {};
    },
  },
});

interface NavItem {
  NAME: string;
  PATH: string;
  ID: string;
  IS_OPEN_WINDOW?: number;
  IS_OPEN_MINISITE_WINDOW?: string;
}

const router = useRouter();
const { lang, theme } = useData();
const activeItem = ref(router.route.path.split('/')[2]);
watch(
  () => router.route.path,
  (val: string) => {
    const p = val.split('/')[2];
    activeItem.value = p;
  }
);
// 点击子导航事件
const goPath = (item: NavItem) => {
  if (item.IS_OPEN_WINDOW) {
    window.open(theme.value.docsUrl + item.PATH);
    return;
  }
  if (item.IS_OPEN_MINISITE_WINDOW) {
    window.open(item.PATH);
    return;
  }
  if (item.PATH) {
    router.go(lang.value + item.PATH);
  }
  isShow.value = false;
};

const isShow = ref(true);
const navActive = ref('');
const showSub = (item: NavItem) => {
  navActive.value = item.ID;
  isShow.value = true;
};

const hideSub = () => {
  navActive.value = '';
};
</script>

<template>
  <nav class="o-nav">
    <ul class="o-nav-list" :class="{ 'lang-en': lang == 'en' }">
      <li
        v-for="item in navItems"
        :key="item.ID"
        :class="{
          active: activeItem === item.ID,
          hover: navActive === item.ID,
        }"
        @mouseenter="showSub(item)"
        @mouseleave="hideSub()"
      >
        <span @click="goPath(item)">{{ item.NAME }} </span>

        <div v-if="isShow" class="sub-menu">
          <ul class="sub-menu-content">
            <li
              v-for="(subItem, subItemIndex) in item.CHILDREN"
              :key="subItemIndex"
              class="sub-menu-item"
              @click="goPath(subItem)"
            >
              {{ subItem.NAME }}
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.o-nav {
  height: 100%;
  .o-nav-list {
    height: 100%;
    padding: 0;
    margin: 0;
    > li {
      position: relative;
      display: inline-flex;
      align-items: center;
      height: 100%;
      margin: 0 var(--o-spacing-h4);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-h8);
      color: var(--o-color-text2);
      cursor: pointer;

      &.active {
        color: var(--o-color-brand);
        &::after {
          background: var(--o-color-brand);
        }
      }
      &.hover {
        color: var(--o-color-brand);
        .sub-menu {
          transform: translate(-50%) scaleY(1);
        }
        &::after {
          background: var(--o-color-brand);
        }
      }

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 2px;
        border-radius: 1px;
        transition: all 0.3s ease-in-out;
      }

      .sub-menu {
        position: absolute;
        top: 80px;
        left: 50%;
        right: 0;
        background-color: var(--o-color-bg);
        transform: translate(-50%) scaleY(0);
        transform-origin: top;
        transition: all 0.3s ease-in-out;
        display: table;
        z-index: 99;
        &-content {
          margin: 0;
          padding: 0;
        }
        &-item {
          line-height: var(--o-line-height-h3);
          text-align: center;
          font-size: var(--o-font-size-text);
          color: var(--o-color-text2);
          display: block;
          white-space: nowrap;
          padding: 0 var(--o-spacing-h8);
          min-width: 106px;
          &.active {
            background-color: var(--o-color-brand);
            color: var(--theme-card-bg);
          }
          &:hover {
            background-color: var(--o-color-brand);
            color: var(--o-color-text);
          }
        }
      }
    }
  }
}
</style>
