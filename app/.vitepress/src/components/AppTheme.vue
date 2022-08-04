<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useCommon } from '@/stores/common';
import { isBrowser } from '@/shared/utils';
import useWindowResize from '@/components/hooks/useWindowResize';

import IconMoonLight from '~icons/app/sun.svg';
import IconMoonDark from '~icons/app/moon.svg';

const commonStore = useCommon();
const screenWidth = useWindowResize();

if (isBrowser()) {
  const theme = localStorage.getItem('euler-theme');
  if (theme) {
    commonStore.theme = theme;
    document.documentElement.classList.add(theme);
  } else {
    const isDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const theme = isDark ? 'dark' : 'light';
    commonStore.theme = theme;
    document.documentElement.classList.add(theme);
    localStorage.setItem('euler-theme', theme);
  }
}

const isLight = computed(() => (commonStore.theme === 'light' ? true : false));
const mobileTheme = ref(!isLight.value);

const changeTheme = () => {
  const theme = commonStore.theme === 'dark' ? 'light' : 'dark';
  commonStore.theme = theme;
  localStorage.setItem('euler-theme', theme);
};

watch(
  () => {
    return commonStore.theme;
  },
  (val) => {
    const documentElement = document.documentElement;
    if (val === 'dark') {
      documentElement.classList.remove('light');
    } else if (val === 'light') {
      documentElement.classList.remove('dark');
    }
    documentElement.classList.add(val);
    localStorage.setItem('euler-theme', val);
  }
);
</script>

<template>
  <div class="theme-box">
    <div v-if="screenWidth >= 1100" class="theme-box-pc" @click="changeTheme">
      <OIcon class="icon">
        <IconMoonDark v-if="isLight" />
        <IconMoonLight v-else />
      </OIcon>
    </div>
    <div v-else class="theme-box-mobile">
      <el-switch
        v-model="mobileTheme"
        size="large"
        active-text="dark"
        inactive-text="light"
        active-color="#00685a"
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
  }
  &-mobile {
    :deep(.el-switch) {
      .el-switch__label {
        color: var(--o-color-text3) !important;
      }
      .el-switch__label.is-active {
        color: var(--o-color-brand) !important;
        font-weight: 600;
      }
    }
  }
}
.dark {
  .icon {
    color: var(--o-color-text2);
  }
}
</style>
