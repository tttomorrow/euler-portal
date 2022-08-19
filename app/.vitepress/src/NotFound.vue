<script setup lang="ts">
import { useData } from 'vitepress';
import Img404 from '@/assets/404.svg';
const { lang } = useData();
</script>

<template>
  <div class="nofound">
    <img class="img" :src="Img404" alt="404" />
    <p>{{ lang === 'zh' ? '暂无数据！' : 'NotFound !' }}</p>
  </div>
</template>

<style lang="scss" scoped>
.nofound {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: var(--o-font-size-h6);
  color: var(--e-color-text1);
  padding: var(--o-spacing-h2) 0;
  height: 100%;
  .img {
    max-width: 500px;
    object-fit: cover;
  }
}
</style>
