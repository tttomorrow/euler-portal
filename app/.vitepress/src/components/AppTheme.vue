<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useCommon } from '@/stores/common';

import IconSun from '~icons/app/icon-sun-outline.svg';
import IconMoon from '~icons/app/icon-moon-outline.svg';

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

onMounted(() => {
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
        <IconMoon v-if="isLight" />
        <IconSun v-else />
      </OIcon>
    </div>
    <div class="theme-box-mobile">
      <OSwitch
        v-model="mobileTheme"
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
      color: var(--e-color-text1);
    }
    @media screen and (max-width: 1100px) {
      display: none;
    }
  }
  &-mobile {
    display: none;

    @media screen and (max-width: 1100px) {
      display: block;
    }
  }
}
.dark {
  .icon {
    color: var(--e-color-text1);
  }
}
</style>
