<script lang="ts" setup>
import { watch, ref, onMounted } from 'vue';
// import { useI18n } from 'vue-i18n';
import { useRouter, useData } from 'vitepress';

import IconDown from '~icons/app/icon-down.svg';

// device是否是pc、mobile
defineProps({
  device: {
    type: Boolean,
    default: true,
  },
});

const router = useRouter();
// const { locale } = useI18n();
const { lang } = useData();

// 选择语言;
const langOptions = [
  { id: 'zh', label: '中文' },
  { id: 'en', label: 'English' },
  { id: 'ru', label: '俄文' },
];

// 选择语言
const emits = defineEmits(['language-click']);
const mobileChaneLanguage = (id: string) => {
  chaneLanguage(id);
  emits('language-click');
};

function chaneLanguage(id: string) {
  if (lang.value === id) return;
  const pathname = router.route.path;
  const newHref = pathname.replace(`/${lang.value}/`, `/${id}/`);
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
onMounted(() => {
  // locale.value = lang.value;
});
watch(
  () => lang.value,
  (val) => {
    if (val) {
      // locale.value = val;
    }
  }
);
</script>

<template>
  <div
    v-if="device"
    class="lang-menu"
    @mouseenter="showSub()"
    @mouseleave="hideSub()"
  >
    <span class="lang-menu-link">
      {{ lang === 'zh' ? '中文' : 'English' }}
      <OIcon><icon-down></icon-down></OIcon>
    </span>
    <ul v-if="isMenu" class="lang-menu-list">
      <li
        v-for="item in langOptions"
        :key="item.id"
        class="lang-item"
        :class="{ active: lang === item.id }"
        @click="chaneLanguage(item.id)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
  <div v-else class="mobile-change-language">
    <span
      v-for="item in langOptions"
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
    color: var(--o-color-text2);
    cursor: pointer;
    height: 100%;
  }
  &-list {
    position: absolute;
    top: 60px;
    left: -24px;
    background: var(--o-color-bg);
    padding: 0 var(--o-spacing-s2);
    cursor: pointer;
    z-index: 80;
    .lang-item {
      line-height: var(--o-line-height-h3);
      text-align: center;
      font-size: var(--o-font-size-text);
      color: var(--o-color-text2);
      &:first-child {
        border-bottom: 1px solid var(--o-color-division);
      }
      &.active {
        color: var(--theme-active);
      }
    }
  }
}
.mobile-change-language {
  display: flex;
  line-height: var(--o-line-height-h3);

  span {
    font-size: var(--o-font-size-tip);
    color: var(--o-color-text3);
    margin-right: 12px;
    &.active {
      color: var(--o-color-brand);
      font-weight: 600;
    }
    &:first-child {
      &:after {
        content: '|';
        margin-left: 12px;
        color: var(--o-color-text3);
      }
    }
  }
}
</style>
