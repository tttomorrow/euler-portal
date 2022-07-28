<script setup lang="ts">
import { Ref, ref } from 'vue';
import banner from '@/assets/banner-secondary.png';
import brand from '@/assets/illustrations/brand.png';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import { useData } from 'vitepress';

const { theme: i18n } = useData();

const list: Ref<any[]> = ref([]);

const initList = () => {
  const result = [];
  const cndata = i18n.value.brand;
  const nameList = [
    'VERTICAL_LEFT_IMAGE',
    'VERTICAL_CENTER_IMAGE',
    'VERTICAL_RIGHT_IMAGE',
    'HORIZONTAL_LEFT_IMAGE',
    'HORIZONTAL_CENTER_IMAGE',
    'HORIZONTAL_RIGHT_IMAGE',
  ];
  const imageList = [
    '/img/other/brand/standard-poster.png',
    '/img/other/brand/mono-poster.png',
    '/img/other/brand/black-poster.png',
    '/img/other/brand/horizontal-poster.png',
    '/img/other/brand/white-poster.png',
    '/img/other/brand/block-hor-poster.png',
  ];

  const imageListMobile = [
    '/img/other/brand/brand-mobile-1.png',
    '/img/other/brand/brand-mobile-2.png',
    '/img/other/brand/brand-mobile-3.png',
    '/img/other/brand/brand-mobile-4.png',
    '/img/other/brand/brand-mobile-5.png',
    '/img/other/brand/brand-mobile-6.png',
  ];

  for (let i = 0; i < imageList.length; i++) {
    const temp = {
      name: cndata.PICTURE_TITLE[i],
      url: imageList[i],
      image: cndata[nameList[i]],
      mobile: imageListMobile[i],
    };
    result.push(temp);
  }
  return result;
};

list.value = initList();
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="CONTENT"
    :title="i18n.brand.BRAND"
    :illustration="brand"
  />
  <div class="brand">
    <div class="brand-all-word">
      <h3 class="brand-title">{{ i18n.brand.MOBILETITLE }}</h3>
      <p class="brand-word">{{ i18n.brand.WORDS }}</p>
    </div>
    <div class="brand-list">
      <OCard v-for="(item, index) in list" :key="index" class="brand-item">
        <div class="brand-item-title">{{ item.name }}</div>
        <div class="brand-item-img">
          <img :src="item.mobile" />
        </div>
        <div class="button">
          <a
            v-for="(item2, index2) in item.image"
            :key="index2"
            :href="item2.URL"
            target="_blank"
            download
          >
            <OButton class="button-item">{{ item2.STYLE }} </OButton>
          </a>
        </div>
      </OCard>
    </div>
    <div class="brand-ppt">
      <h3>{{ i18n.brand.PPT_TEXT }}</h3>
      <div class="ppt-list">
        <OCard
          v-for="(ppt, index) in i18n.brand.PPT_LIST"
          :key="index"
          class="ppt-item"
          :style="{ padding: '0px' }"
        >
          <a :href="ppt.LINK" target="_blank" download>
            <img :src="ppt.URL" alt="" />
          </a>
        </OCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button {
  display: grid;
  width: 100%;
  margin-top: var(--o-spacing-h5);
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--o-spacing-h8);
  a {
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
  }

  &-item {
    padding: var(--o-spacing-h10) 0;
    max-width: 70px;
    width: 100%;
    font-size: var(--o-font-size-text);
    font-weight: 400;
    line-height: var(--o-line-height-text);
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
      max-width: 80px;
    }
  }
  &-item:hover {
    background-color: var(--o-color-brand);
    color: var(--o-color-text);
  }
}
.brand {
  margin: var(--o-spacing-h1) auto;
  padding: 0 var(--o-spacing-h2);
  max-width: 1504px;
  @media (max-width: 1100px) {
    padding: 0 var(--o-spacing-h5);
    margin: var(--o-spacing-h2) auto;
  }
  &-title {
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }

  &-word {
    font-size: var(--o-font-size-h7);
    font-weight: 300;
    color: var(--o-color-text2);
    line-height: var(--o-line-height-h7);
    margin-top: var(--o-spacing-h10);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin-top: var(--o-spacing-h5);
    }
  }

  &-list {
    display: grid;
    width: 100%;
    margin-top: var(--o-spacing-h2);
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: var(--o-spacing-h4);
  }

  &-item {
    width: 100%;
    padding: 0;
    @media (max-width: 768px) {
      max-width: 336px;
    }
    :deep(.el-card__body) {
      padding: var(--o-spacing-h4);
      @media (max-width: 768px) {
        padding: var(--o-spacing-h5) var(--o-spacing-h6);
      }
    }

    &-title {
      font-size: var(--o-font-size-h7);
      font-weight: 400;
      color: var(--o-color-text2);
      line-height: var(--o-line-height-h7);
      margin-top: var(--o-spacing-h10);
      @media (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
    &-img {
      height: 120px;
      width: 100%;
      margin-top: var(--o-spacing-h5);
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        object-fit: contain;
        max-width: 220px;
        height: 100%;
        @media (max-width: 768px) {
          max-width: 240px;
        }
      }
      @media (max-width: 768px) {
        height: 80px;
      }
    }
  }

  &-ppt {
    margin-top: var(--o-spacing-h2);
    width: 100%;

    h3 {
      font-size: var(--o-font-size-h3);
      font-weight: 300;
      color: var(--o-color-text2);
      line-height: var(--o-line-height-h3);
      width: 100%;
      text-align: center;
      @media (max-width: 768px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
      }
    }
  }
}

.ppt {
  &-list {
    display: grid;
    width: 100%;
    margin-top: var(--o-spacing-h2);
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: var(--o-spacing-h4);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }
  &-item {
    width: 100%;
    @media (max-width: 768px) {
      max-width: 336px;
    }
    a {
      width: 100%;
      img {
        width: 100%;
      }
    }
    :deep(.el-card__body) {
      padding: 0;
    }
  }
}

@media (max-width: 1280px) {
  .ppt-list,
  .brand-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 980px) {
  .ppt-list,
  .brand-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .ppt-list,
  .brand-list {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
