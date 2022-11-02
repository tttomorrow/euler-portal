<script setup lang="ts">
import { useData } from 'vitepress';

import advantageInfo from '@/data/migration/migration-advantage';
const { lang } = useData();
</script>

<template>
  <div>
    <div class="advantage-top">{{ advantageInfo.description }}</div>

    <div class="advantage-middle">
      <div v-for="item in advantageInfo.cards" :key="item.text" class="card">
        <img :src="item.url" alt="" />
        <p>{{ item.text }}</p>
      </div>
    </div>

    <div class="advantage-bottom">
      <span>{{ advantageInfo.tips.text_1 }}</span>
      <a :href="'/' + lang + '/migration/implement-guide/'">{{
        advantageInfo.tips.text_2
      }}</a>
      <span>{{ advantageInfo.tips.text_3 }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.advantage-top {
  font-size: var(--o-font-size-text);
  font-weight: 400;
  color: var(--o-color-neutral5);
  line-height: var(--o-line-height-text);
}

.advantage-middle {
  margin-top: var(--o-spacing-h4);
  display: grid;
  grid-template-columns: 32% 32% 32%;
  grid-column-gap: 1.5%;

  .card {
    padding: var(--o-spacing-h4) var(--o-spacing-h3);
    background: var(--o-color-bg2);
    box-shadow: var(--o-shadow-l1);
    display: flex;
    flex-direction: column;
    img {
      width: 142px;
      align-self: center;
    }
    p {
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: var(--o-color-neutral5);
      line-height: var(--o-line-height-text);
      margin-top: var(--o-spacing-h4);
    }
  }
}

.advantage-bottom {
  font-size: var(--o-font-size-text);
  font-weight: 400;
  color: var(--o-color-neutral5);
  line-height: var(--o-line-height-text);
  margin-top: var(--o-spacing-h4);
}
</style>
