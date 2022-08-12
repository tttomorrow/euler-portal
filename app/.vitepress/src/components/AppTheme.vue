<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useCommon } from '@/stores/common';

import IconMoonLight from '~icons/app/sun.svg';
import IconMoonDark from '~icons/app/moon.svg';

// 风格切换
const APPEARANCE_KEY = 'vitepress-theme-appearance';

const commonStore = useCommon();

const isLight = computed(() => (commonStore.theme === 'light' ? true : false));
const mobileTheme = ref(!isLight.value);

const changeTheme = () => {
  const theme = commonStore.theme === 'dark' ? 'light' : 'dark';
  commonStore.theme = theme;
  localStorage.setItem(APPEARANCE_KEY, theme);
};

onBeforeMount(() => {
  const theme = localStorage.getItem(APPEARANCE_KEY);
  commonStore.theme = theme === 'dark' ? 'dark' : 'light';
});

watch(
  () => {
    return commonStore.theme;
  },
  (val) => {
    const documentElement = document.documentElement;
    val === 'light' && documentElement.classList.remove('dark');
    val === 'dark' && documentElement.classList.add(val);
    localStorage.setItem(APPEARANCE_KEY, val);
  }
);
</script>

<template>
  <div class="theme-box">
    <div class="theme-box-pc" @click="changeTheme">
      <OIcon class="icon">
        <IconMoonDark v-if="isLight" />
        <IconMoonLight v-else />
      </OIcon>
    </div>
    <div class="theme-box-mobile">
      <OSwitch
        v-model="mobileTheme"
        size="large"
        active-text="dark"
        inactive-text="light"
        active-color="#002fa7"
        @click.stop="changeTheme"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.theme-box {
  &-pc {
    cursor: pointer;
    .icon {
      font-size: var(--o-font-size-h5);
      color: var(--o-color-text2);
    }
    @media screen and (max-width: 1100px) {
      display: none;
    }
  }
  &-mobile {
    display: none;
    :deep(.el-switch) {
      .el-switch__label {
        color: var(--o-color-text3) !important;
      }
      .el-switch__label.is-active {
        color: var(--o-color-brand) !important;
        font-weight: 600;
      }
    }
    @media screen and (max-width: 1100px) {
      display: block;
    }
  }
}
.dark {
  .icon {
    color: var(--o-color-text2);
  }
}
</style>
