<script setup lang="ts">
import useWindowResize from '@/components/hooks/useWindowResize';
import { useData } from 'vitepress';

const { lang, theme: i18n } = useData();

const screenWidth = useWindowResize();
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
        <img v-if="screenWidth > 1080" class="pc-img" :src="item.PC" alt="" />
        <img v-else class="mobile-img" :src="item.MOBILE" alt="" />
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
    color: var(--o-color-text2);
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
  grid-template-columns: repeat(4, minmax(82px, 1fr));
  column-gap: 0;
  row-gap: 0;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px -1px -1px 0px;
    padding: var(--o-spacing-h4);
    border: 1px solid var(--o-color-division);
    background-color: var(--o-color-bg);
    max-height: 120px;
    img {
      display: block;
      width: 100%;
      object-fit: fill;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h5);
    grid-template-columns: repeat(2, minmax(82px, 270px));
    justify-content: center;
    a {
      padding: 10px 0;
      min-height: 40px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
