<script lang="ts" setup>
import { ref, Ref, watch } from 'vue';
import { useRouter, useData } from 'vitepress';

import IconDown from '~icons/app/icon-down.svg';

const props = defineProps({
  show: {
    type: Object,
    default() {
      return [];
    },
  },
});

const router = useRouter();
const { lang } = useData();

// 选择语言;
const langOptions = [
  { id: 'zh', label: '中文' },
  { id: 'en', label: 'English' },
  { id: 'ru', label: 'Русский' },
];

// 选择语言
const emits = defineEmits(['language-click']);
const mobileChaneLanguage = (newlang: string) => {
  chaneLanguage(newlang);
  emits('language-click');
};

function chaneLanguage(newlang: string) {
  if (lang.value === newlang) return;
  const pathname = location.href;
  const newHref = pathname.replace(`/${lang.value}/`, `/${newlang}/`);
  isMenu.value = false;
  router.go(newHref);
}

const isMenu = ref(false);
const showSub = () => {
  isMenu.value = true;
};
const hideSub = () => {
  isMenu.value = false;
};

interface LangType {
  id: string;
  label: string;
}
const langList: Ref<LangType[]> = ref([]);
const filterLang = () => {
  langList.value = [];
  props.show.forEach((item: string) => {
    langOptions.filter((el: LangType) => {
      if (el.id === item) {
        langList.value.push(el);
      }
    });
  });
};

watch(
  () => props.show,
  () => {
    filterLang();
  },
  { immediate: true }
);
</script>

<template>
  <div class="lang-menu" @mouseenter="showSub()" @mouseleave="hideSub()">
    <span class="lang-menu-link">
      {{ lang === 'zh' ? '中文' : lang === 'ru' ? 'Русский' : 'English' }}
      <OIcon><icon-down></icon-down></OIcon>
    </span>
    <ul v-if="isMenu" class="lang-menu-list">
      <li
        v-for="item in langList"
        :key="item.id"
        class="lang-item"
        :class="{ active: lang === item.id }"
        @click="chaneLanguage(item.id)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
  <div class="mobile-change-language">
    <span
      v-for="item in langList"
      :key="item.id"
      :class="{ active: lang === item.id }"
      @click.stop="mobileChaneLanguage(item.id)"
      >{{ item.label }}</span
    >
  </div>
</template>

<style lang="scss" scoped>
.lang-menu {
  position: relative;
  height: 100%;
  &-link {
    display: flex;
    align-items: center;
    font-size: var(--o-font-size-text);
    color: var(--e-color-text1);
    cursor: pointer;
    height: 100%;
  }
  &-list {
    position: absolute;
    top: 60px;
    left: -24px;
    background: var(--e-color-bg2);
    padding: 0 var(--o-spacing-h5);
    cursor: pointer;
    z-index: 80;
    box-shadow: var(--e-shadow-l1);
    min-width: 78px;
    .lang-item {
      line-height: var(--o-line-height-h3);
      text-align: center;
      font-size: var(--o-font-size-text);
      color: var(--e-color-text1);
      border-bottom: 1px solid var(--e-color-division1);
      &:last-child {
        border-bottom: 0 none;
      }
      &.active,
      &:hover {
        color: var(--e-color-brand1);
      }
    }
  }
  @media screen and (max-width: 1100px) {
    display: none;
  }
}
.mobile-change-language {
  display: none;
  line-height: var(--o-line-height-h3);
  span {
    font-size: var(--o-font-size-tip);
    color: var(--e-color-text4);
    margin-right: 12px;
    &.active {
      color: var(--e-color-brand1);
      font-weight: 600;
    }
    &:not(:last-child) {
      &:after {
        content: '|';
        margin-left: 12px;
        color: var(--e-color-text4);
      }
    }
  }
  @media screen and (max-width: 1100px) {
    display: flex;
  }
}
</style>
