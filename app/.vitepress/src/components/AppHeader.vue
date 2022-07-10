<script setup lang="ts">
import { computed, onMounted, ref, onUnmounted } from 'vue';
import { useRouter, useData } from 'vitepress';
import HeaderNav from './HeaderNav.vue';
import AppTheme from './AppTheme.vue';
import AppLanguage from './AppLanguage.vue';

import SearchIcon from '~icons/app/search.svg';
import XIcon from '~icons/app/x.svg';
import MenuIcon from '~icons/app/menu.svg';

const router = useRouter();
const configData = useData();
const language = configData.lang;

interface NavItem {
  id: string;
  label: string;
  path: string;
  children?: NavItem;
}

// 导航列表
const navItems = computed(() => {
  return [
    {
      id: 'download',
      label: '下载',
      path: 'download',
      children: [
        {
          id: 'iso',
          label: 'ISO',
          path: 'download',
        },
        { id: 'mirror', label: '镜像仓列表', path: 'mirror' },
      ],
    },
    {
      id: 'learn',
      label: '学习',
      path: 'learn',
      children: [
        {
          id: 'docs',
          label: '文档',
          path: '',
        },
        { id: 'mooc', label: '慕课', path: 'learning/mooc' },
        {
          id: 'internship',
          label: 'internship',
          path: 'learning/internship',
        },
      ],
    },
    {
      id: 'interaction',
      label: '互动',
      path: '',
      children: [
        {
          id: 'news',
          label: '新闻',
          path: 'interaction/news-list/',
        },
        {
          id: 'blog',
          label: '博客',
          path: 'interaction/blog-list/',
        },
        {
          id: 'live',
          label: '直播',
          path: 'interaction/live-list/',
        },
        {
          id: 'salon',
          label: '沙龙',
          path: 'interaction/salon-list/',
        },
        {
          id: 'summit',
          label: '峰会',
          path: 'interaction/summit-list/',
        },
      ],
    },
    {
      id: 'community',
      label: '社区',
      path: '',
      children: [
        {
          id: 'contribution',
          label: '贡献攻略',
          path: 'community/contribution/',
        },
        {
          id: 'conduct',
          label: '行为守则',
          path: 'community/conduct/',
        },
        {
          id: 'events',
          label: '邮件列表',
          path: 'community/mailing-list/',
        },
        {
          id: 'certification',
          label: '个人认证',
          path: 'community/certification-services/',
        },
        {
          id: 'talent',
          label: '人才评测',
          path: 'https://training-assessment.osinfra.cn/login/index?sxz-lang=zh_CN',
        },
        {
          id: 'statistics',
          label: '贡献看板',
          path: 'https://datastat.openeuler.org/en/overview',
        },
      ],
    },
    {
      id: 'sig',
      label: 'SIG',
      path: '',
      children: [
        {
          id: 'siglist',
          label: '查看SIG',
          path: 'sig/sig-list/',
        },
        {
          id: 'guidance',
          label: '申请流程',
          path: 'sig/sig-guidance/',
        },
        {
          id: 'role',
          label: '角色说明',
          path: 'sig/role-description/',
        },
        {
          id: 'guidance',
          label: '申请流程',
          path: 'sig/sig-guidance/',
        },
        {
          id: 'meeting',
          label: '会议指南',
          path: 'sig/meeting-guide/',
        },
      ],
    },
    {
      id: 'projects',
      label: '探索',
      path: 'other/projects',
      children: [
        {
          id: 'atune',
          label: 'A-Tune',
          path: 'other/projects/atune/',
        },
        {
          id: 'bishengjdk',
          label: 'BiSheng JDK',
          path: 'other/projects/bishengjdk/',
        },
        {
          id: 'isula',
          label: 'iSula',
          path: 'other/projects/isula/',
        },
        {
          id: 'secgear',
          label: 'secGear',
          path: 'other/projects/secgear/',
        },
        {
          id: 'compassci',
          label: 'Compass-CI',
          path: 'https://compass-ci.openeuler.org/',
        },
        {
          id: 'compliance',
          label: 'Compliance',
          path: 'https://compliance.openeuler.org/',
        },
        {
          id: 'pkgmanage',
          label: 'Pkgship',
          path: 'https://pkgmanage.openeuler.org/',
        },
      ],
    },
    {
      id: 'security',
      label: '支持',
      path: '',
      children: [
        {
          id: 'vulnerability-reporting',
          label: '漏洞管理',
          path: 'security/vulnerability-reporting/',
        },
        {
          id: 'safety-bulletin',
          label: '安全公告',
          path: 'security/safety-bulletin/',
        },
        {
          id: 'isula',
          label: 'iSula',
          path: 'other/projects/isula/',
        },
        {
          id: 'cve',
          label: 'CVE',
          path: 'security/cve/',
        },
        {
          id: 'approve',
          label: 'OSV技术测评列表',
          path: 'approve/',
        },
        {
          id: 'compliance',
          label: '兼容性技术测评',
          path: '',
        },
        {
          id: 'compatibility',
          label: '兼容性列表',
          path: 'compatibility/',
        },
      ],
    },
  ];
});

const activeNav = ref<string>();
const handleNavClick = (item: NavItem) => {
  activeNav.value = item.path;
};

// 移动端
const isPC = ref(true);
const mobileMenuIcon = ref(false);
const handleLanguageChange = () => {
  mobileMenuIcon.value = false;
};

//移动端菜单事件
const mobileMenuPanel = () => {
  const documentElement = document.documentElement;
  documentElement.classList.toggle('overflow');
  mobileMenuIcon.value = !mobileMenuIcon.value;
  mobileChildMenu.value = [];
  activeNav.value = '';
  isPC.value = false;
};

const mobileChildMenu = ref<NavItem | any>([]);
const handleMenuLayer = (e: any) => {
  const documentElement = document.documentElement;
  if (e.target.className !== 'mobile-menu-side') {
    if (mobileChildMenu.value.length === 0) {
      mobileMenuIcon.value = false;
      documentElement.classList.remove('overflow');
    }
  }
};

const goMobile = (item: NavItem) => {
  if (item.hasOwnProperty('children')) {
    mobileChildMenu.value = item.children;
  } else {
    mobileChildMenu.value = [];
    mobileMenuIcon.value = false;
    router.go(`/${language.value}/${item.path}/`);
    document.documentElement.classList.remove('overflow');
  }
  activeNav.value = item.id;
};

const goMobileList = (item: NavItem) => {
  mobileMenuIcon.value = false;
  document.documentElement.classList.remove('overflow');
  if (item.path.startsWith('https:')) {
    window.open(item.path, '_blank');
  } else {
    router.go(`/${language.value}/${item.path}/`);
  }
};

const toBody = ref(false);
onMounted(() => {
  toBody.value = true;
});
onUnmounted(() => {
  toBody.value = false;
});
</script>

<template>
  <header class="app-header">
    <div class="app-header-body">
      <!-- 移动端菜单图标 -->
      <div class="mobile-menu-icon" @click="mobileMenuPanel">
        <OIcon v-if="!mobileMenuIcon" class="icon">
          <MenuIcon />
        </OIcon>
        <OIcon v-else class="icon"><XIcon /></OIcon>
      </div>
      <img class="logo" alt="openEuler logo" src="../assets/logo.png" />
      <div class="header-content">
        <div class="header-nav">
          <HeaderNav :nav-items="navItems" @nav-click="handleNavClick" />
        </div>
        <div class="header-tool">
          <div class="header-tool-search">
            <OIcon class="icon"><SearchIcon /></OIcon>
          </div>
          <!-- 中英文切换 -->
          <AppLanguage :device="isPC" />
          <AppTheme :device="isPC" />
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
                v-for="item in navItems"
                :key="item.id"
                class="link"
                :class="[activeNav === item.id ? 'active' : '']"
                @click.stop="goMobile(item)"
                >{{ item.label }}</a
              >
            </div>
            <div class="mobile-tools">
              <AppTheme :device="isPC" />
              <AppLanguage
                :device="isPC"
                @language-click="handleLanguageChange"
              />
            </div>
          </div>
          <div
            class="mobile-menu-content"
            :class="{ active: mobileChildMenu.length > 0 }"
          >
            <div class="mobile-menu-list">
              <a
                v-for="item in mobileChildMenu"
                :key="item.id"
                class="link"
                @click="goMobileList(item)"
                >{{ item.label }}</a
              >
            </div>
          </div>
        </div>
      </teleport>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background-color: var(--o-color-bg);
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
    }
  }
}
.logo {
  height: 32px;
  @media (max-width: 1100px) {
    height: 24px;
  }
}
.mobile-menu-icon {
  display: none;
  margin-right: var(--o-spacing-s2);
  @media (max-width: 1100px) {
    display: block;
  }
  .icon {
    font-size: var(--o-font-size-h5);
    color: var(--o-color-text2);
    cursor: pointer;
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
      color: var(--o-color-text2);
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
    color: var(--o-color-text2);
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

  @media screen and (min-width: 1100px) {
    display: none;
  }

  &.active {
    opacity: 1;
    z-index: 111;
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
    background: var(--o-color-bg2);
    display: inline-flex;
    height: 100%;
    flex-direction: column;
    color: var(--o-color-text2);
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
        color: var(--o-color-text2);
        padding: 0 var(--o-spacing-s2);
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
        &.active {
          background: var(--o-color-bg);
          color: var(--o-color-brand);
          &::after {
            width: 24px;
            background: var(--o-color-text2);
          }
        }
      }
    }
    .mobile-tools {
      padding: 0 var(--o-spacing-s2);
      margin-bottom: 24px;
    }
    .el-switch {
      &__label {
        color: var(--o-color-text3) !important;
      }
      &__label.is-active {
        color: var(--o-color-text2) !important;
        font-weight: 600;
      }
    }
  }
  &-content {
    flex: 1;
    background: var(--o-color-bg);
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
        color: var(--o-color-text3);
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
