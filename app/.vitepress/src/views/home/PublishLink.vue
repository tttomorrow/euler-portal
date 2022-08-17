<script setup lang="ts">
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';

const { lang } = useData();
const i18n = useI18n();
</script>

<template>
  <div class="source-publish-link">
    <h3 :class="lang === 'en' ? 'en-h3' : ''">
      {{ i18n.home.HOME_SOURCE.SOURCE_PUBLISH_TITLE }}
    </h3>
    <div class="publish-edition">
      <a
        v-for="item in i18n.home.HOME_SOURCE_EDITION"
        :key="item.LINK"
        :href="item.LINK"
        target="_blank"
      >
        <img :src="item.PC" alt="" />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.source-publish-link {
  .en-h3 {
    line-height: 34px !important;
    font-weight: 400 !important;
  }
  h3 {
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--e-color-text1);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    margin-top: var(--o-spacing-h1);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      margin-top: var(--o-spacing-h2);
    }
  }
}

.publish-edition {
  display: grid;
  margin-top: var(--o-spacing-h2);
  margin-top: 21px;
  grid-template-columns: repeat(4, minmax(82px, 1fr));
  column-gap: 0;
  row-gap: 0;
  a {
    display: flex;
    margin: 0px -1px -1px 0px;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--e-color-neutral11);
    background-color: var(--e-color-bg2);
    max-height: 120px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  @media screen and (max-width: 1416px) {
    margin-top: var(--o-spacing-h5);
    grid-template-columns: repeat(2, minmax(82px, 270px));
    justify-content: center;
    a {
      min-height: 40px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
