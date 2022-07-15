<script setup lang="ts">
import Img404 from '@/assets/404.svg';
</script>

<template>
  <div class="nofound">
    <img class="img" :src="Img404" alt="404" />
    <p>暂无数据！</p>
  </div>
</template>

<style lang="scss" scoped>
.nofound {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: var(--o-font-size-h6);
  color: var(--o-color-text2);
  padding: var(--o-spacing-h2) 0;
  height: 100%;
  .img {
    max-width: 500px;
    object-fit: cover;
  }
}
</style>
