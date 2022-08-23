<script setup lang="ts">
import { computed, onMounted, ref, onUnmounted, watch, nextTick } from 'vue';
import { useRouter, useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { useI18n } from '@/i18n';
import HeaderNav from './HeaderNav.vue';
import AppTheme from './AppTheme.vue';
import AppLanguage from './AppLanguage.vue';

import logo_light from '@/assets/logo.svg';
import logo_dark from '@/assets/logo_dark.svg';

import IconSearch from '~icons/app/search.svg';
import IconX from '~icons/app/x.svg';
import IconMenu from '~icons/app/menu.svg';

const router = useRouter();
const { lang } = useData();
const i18n = useI18n();
const commonStore = useCommon();

interface NavItem {
  NAME: string;
  PATH: string;
  ID: string;
  CHILDREN: NavItem;
  IS_OPEN_WINDOW?: number;
  IS_OPEN_MINISITE_WINDOW?: string;
}

const navRouter = computed(() => {
  return i18n.value?.common.NAV_ROUTER_CONFIG;
});

const activeNav = ref<string>();
const handleNavClick = (item: NavItem) => {
  activeNav.value = item.PATH;
};
const logo = computed(() => {
  return commonStore.theme === 'light' ? logo_light : logo_dark;
});
// 移动端
const mobileMenuIcon = ref(false);
const handleLanguageChange = () => {
  mobileMenuIcon.value = false;
};
const documentElement = document.documentElement;
//移动端菜单事件
const mobileMenuPanel = () => {
  mobileChildMenu.value = [];
  setTimeout(() => {
    mobileMenuIcon.value = !mobileMenuIcon.value;
    documentElement.classList.toggle('overflow');
    activeNav.value = '';
  }, 200);
};

const mobileChildMenu = ref<NavItem | any>([]);
const handleMenuLayer = (e: any) => {
  if (e.target.className !== 'mobile-menu-side') {
    if (mobileChildMenu.value.length === 0) {
      mobileMenuIcon.value = false;
      documentElement.classList.remove('overflow');
    }
  }
};

const goMobile = (item: NavItem) => {
  mobileChildMenu.value = [];
  if (Object.prototype.hasOwnProperty.call(item, 'CHILDREN')) {
    mobileChildMenu.value = item.CHILDREN;
  } else {
    mobileMenuIcon.value = false;
    router.go('/' + lang.value + item.PATH);
    documentElement.classList.remove('overflow');
  }
  activeNav.value = item.ID;
};

const goMobileList = (item: NavItem) => {
  mobileChildMenu.value = [];

  if (item.IS_OPEN_WINDOW) {
    window.open(i18n.value.docsUrl + item.PATH);
    return;
  }
  if (item.IS_OPEN_MINISITE_WINDOW) {
    window.open(item.PATH);
    return;
  }

  if (item.PATH) {
    setTimeout(() => {
      mobileMenuIcon.value = false;
      documentElement.classList.remove('overflow');
    }, 200);
    nextTick(() => {
      router.go('/' + lang.value + item.PATH);
    });
  }
};

const toBody = ref(false);
onMounted(() => {
  toBody.value = true;
});
onUnmounted(() => {
  toBody.value = false;
});

// 返回首页
const goHome = () => {
  router.go(`/${lang.value}/`);
};

const searchValue = computed(() => {
  return i18n.value.common.SEARCH;
});
// 显示/移除搜索框
const isShowBox = ref(false);
const showSearchBox = () => {
  isShowBox.value = true;
};
const donShowSearchBox = () => {
  isShowBox.value = false;
  searchInput.value = '';
};
// 搜索内容
const searchInput = ref<string>('');
// 搜索事件
function search() {
  router.go(`/${lang.value}/other/search/?search=${searchInput.value}`);
  donShowSearchBox();
}
const activeItem = ref(router.route.path);
watch(
  () => router.route.path,
  (val: string) => {
    activeItem.value = val;
  }
);
// 导航默认选中
const menuActiveFn = (item: any) => {
  return item.some((el: string) => activeItem.value.includes(el));
};
</script>

<template>
  <header class="app-header">
    <div class="app-header-body">
      <!-- 移动端菜单图标 -->
      <div class="mobile-menu-icon" @click="mobileMenuPanel">
        <OIcon v-if="!mobileMenuIcon" class="icon">
          <IconMenu />
        </OIcon>
        <OIcon v-else class="icon"><IconX /></OIcon>
      </div>
      <img class="logo" alt="openEuler logo" :src="logo" @click="goHome" />
      <div v-if="isShowBox" class="header-search">
        <div class="header-search-box">
          <OSearch
            v-model="searchInput"
            :placeholder="searchValue.PLEACHOLDER"
            @change="search"
          >
            <template #suffix>
              <OIcon class="close" @click="donShowSearchBox"><IconX /></OIcon>
            </template>
          </OSearch>
        </div>
      </div>
      <!-- 移动端搜索按钮 -->
      <div v-if="!isShowBox" class="mobile-search">
        <OIcon class="icon" @click="showSearchBox"><IconSearch /></OIcon>
      </div>
      <div v-show="!isShowBox" class="header-content">
        <div class="header-nav">
          <HeaderNav :nav-items="navRouter" @nav-click="handleNavClick" />
        </div>
        <div class="header-tool">
          <div class="header-tool-search">
            <OIcon class="icon" @click="showSearchBox"><IconSearch /></OIcon>
          </div>
          <!-- 中英文切换 -->
          <AppLanguage />
          <AppTheme />
        </div>
      </div>
      <!-- 移动端菜单 -->
      <teleport v-if="toBody" to="body">
        <div
          class="mobile-menu"
          :class="{ active: mobileMenuIcon }"
          @click="handleMenuLayer($event)"
        >
          <div class="mobile-menu-side">
            <div class="mobile-nav">
              <a
                v-for="item in navRouter"
                :key="item.ID"
                class="link"
                :class="{
                  selected: menuActiveFn(item.CLASS),
                  active: activeNav === item.ID,
                }"
                @click.stop="goMobile(item)"
                >{{ item.NAME }}</a
              >
            </div>
            <div class="mobile-tools">
              <AppTheme />
              <AppLanguage @language-click="handleLanguageChange" />
            </div>
          </div>
          <transition name="menu">
            <div
              v-if="mobileChildMenu.length > 0"
              class="mobile-menu-content"
              :class="{ active: mobileChildMenu.length > 0 }"
            >
              <div class="mobile-menu-list">
                <a
                  v-for="item in mobileChildMenu"
                  :key="item.ID"
                  class="link"
                  @click="goMobileList(item)"
                  >{{ item.NAME }}</a
                >
              </div>
            </div>
          </transition>
        </div>
      </teleport>
    </div>
  </header>
</template>

<style lang="scss" scoped>
// transition 动画
.menu-enter-active,
.menu-leave-active {
  transition: 0.2s linear;
}
.menu-enter {
  opacity: 0;
  transform: translateX(-100%);
}
.menu-enter-to {
  opacity: 1;
  transform: translateX(0px);
}
.menu-leave {
  opacity: 1;
  transform: transslateX(0);
}
.menu-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

:deep(.o-search) {
  --o-search-color-bg: var(--o-color-secondary);
  background-color: var(--e-color-bg4);
}
:deep(.el-input__suffix) {
  font-size: var(--o-font-size-h7);
}
:deep(.el-input__clear) {
  font-size: var(--o-font-size-h7);
}
:deep(.el-icon-circle-inner) {
  font-size: var(--o-font-size-h1);
}
.app-header {
  background-color: var(--e-color-bg2);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
  &-body {
    display: flex;
    align-items: center;
    max-width: 1504px;
    padding: 0 44px;
    margin: 0 auto;
    height: 80px;
    @media (max-width: 1100px) {
      padding: 0 16px;
      height: 48px;
      justify-content: space-between;
    }
  }
}
.logo {
  height: 32px;
  cursor: pointer;
  @media (max-width: 1100px) {
    height: 24px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 12px;
  }
}
.mobile-menu-icon {
  display: none;
  margin-right: var(--o-spacing-h5);
  @media (max-width: 1100px) {
    display: block;
  }
  .icon {
    font-size: var(--o-font-size-h6);
    color: var(--e-color-text1);
    cursor: pointer;
  }
}
.mobile-search {
  font-size: var(--o-font-size-h6);
  display: none;
  color: var(--e-color-text1);
  @media (max-width: 1100px) {
    display: block;
  }
}
.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  @media screen and (max-width: 1100px) {
    display: none;
  }
  .header-nav {
    height: 100%;
    display: flex;
    flex: 1;
  }

  .header-tool {
    display: grid;
    gap: 20px;
    grid-template-columns: auto auto auto;
    align-items: center;
    height: 100%;
    .lang {
      color: var(--e-color-text1);
      letter-spacing: 0.08em;
      font-size: 16px;
    }
    &-search {
      cursor: pointer;
    }
    &-theme {
      cursor: pointer;
    }
  }
  .icon {
    font-size: 22px;
    color: var(--e-color-text1);
  }
}
.header-search {
  position: relative;
  width: 900px;
  margin-left: var(--o-spacing-h2);
  @media (max-width: 1100px) {
    :deep(.o-search) {
      --o-search-height: 28px;
    }
  }
  &-box {
    .close {
      cursor: pointer;
      color: var(--e-color-text1);
    }
  }
}

.mobile-menu {
  width: 100%;
  position: fixed;
  left: 0;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  display: flex;
  opacity: 0;
  visibility: hidden;
  border-top: 1px solid var(--o-color-division);
  background: rgba(0, 0, 0, 0.4);
  top: 48px;
  height: calc(100% - 48px);
  z-index: 999;
  @media screen and (min-width: 1100px) {
    display: none;
  }

  &.active {
    opacity: 1;
    z-index: 1101;
    display: flex;
    visibility: visible;
    @media screen and (min-width: 1100px) {
      opacity: 0;
    }

    .mobile-menu-side {
      left: 0;
      opacity: 1;
      z-index: 9;
    }
  }
  &-side {
    left: -100%;
    background: var(--e-color-bg1);
    display: inline-flex;
    height: 100%;
    flex-direction: column;
    color: var(--e-color-text1);
    min-width: 164px;
    opacity: 0;
    position: relative;
    transition: all 0.4s linear;
    overflow-y: auto;
    justify-content: space-between;
    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: #f1f1f1;
    }
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #afbfe8;
    }

    .mobile-nav {
      .link {
        display: block;
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-h3);
        color: var(--e-color-text1);
        padding: 0 var(--o-spacing-h5);
        position: relative;
        cursor: pointer;
        &::after {
          width: 0;
          height: 2px;
          background: transparent;
          content: '';
          position: absolute;
          left: 16px;
          display: block;
          transition: all 0.3s;
          bottom: 0;
        }
        &.active,
        &.selected {
          background: var(--e-color-bg2);
          color: var(--e-color-brand1);
          &::after {
            width: 24px;
            background: var(--e-color-brand1);
          }
        }
      }
    }
    .mobile-tools {
      padding: 0 var(--o-spacing-h5);
      margin-bottom: 24px;
    }
  }
  &-content {
    flex: 1;
    background: var(--e-color-bg2);
    left: -100%;
    position: relative;
    transition: all 0.5s ease-in-out;
    opacity: 0;
    .mobile-menu-list {
      display: grid;
      padding: 0 16px;

      .link {
        line-height: var(--o-line-height-h3);
        font-size: var(--o-font-size-tip);
        font-weight: normal;
        color: var(--e-color-text4);
        cursor: pointer;
        &:last-child {
          border-bottom: 1px solid var(--o-color-division);
        }
      }
    }
    &.active {
      left: 0;
      opacity: 1;
      z-index: 8;
    }
  }
}
</style>
