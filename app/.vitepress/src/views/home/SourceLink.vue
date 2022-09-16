<script setup lang="ts">
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';

const commonStore = useCommon();
const { lang } = useData();
const i18n = useI18n();
</script>

<template>
  <div class="source-publish-link">
    <h3 :class="lang == 'en' ? 'en-h3' : ''">
      {{ i18n.home.HOME_SOURCE.SOURCE_LINK_TITLE }}
    </h3>
    <div class="publish-edition">
      <a
        v-for="item in i18n.home.FRIENDSHIP_LINK_LIST"
        :key="item.LINK"
        :href="item.LINK"
        data-aos="fade-up"
        target="_blank"
      >
        <img
          :src="commonStore.theme === 'light' ? item.IMG : item.IMG_DARK"
          alt=""
        />
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
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    margin-top: var(--o-spacing-h1);
    margin-bottom: var(--o-spacing-h2);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      margin-top: var(--o-spacing-h2);
      margin-bottom: var(--o-spacing-h5);
    }
  }
}

.publish-edition {
  display: grid;
  grid-template-columns: repeat(4, minmax(82px, 1fr));
  column-gap: 0;
  row-gap: 0;
  a {
    display: flex;
    margin: 0px -2px -2px 0px;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--o-color-division1);
    background-color: var(--o-color-bg2);
    max-height: 120px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  @media screen and (max-width: 1416px) {
    margin-top: var(--o-spacing-h5);
    grid-template-columns: repeat(3, minmax(82px, 270px));
    justify-content: center;
    a {
      min-height: 40px;
      img {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(82px, 270px));
  }
}
</style>
