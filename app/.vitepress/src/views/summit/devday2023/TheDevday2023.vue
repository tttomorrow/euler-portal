<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCommon } from '@/stores/common';
import AOS from 'aos';

import AppContext from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';

import liveLightImg from './img/live.png';
import liveDarkImg from './img/live-dark.png';

import summitData from './data';

const commonStore = useCommon();
const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLightImg : liveDarkImg
);

function goToLink(link: string, target: string) {
  window.open(link, target);
}
onMounted(() => {
  AOS.init({
    offset: 50,
    duration: 800,
    delay: 100,
    once: true,
  });
});
</script>
<template>
  <SummitBanner :banner-data="summitData.banner" />
  <AppContext>
    <div class="detail">
      <p v-for="item in summitData.detail" :key="item">{{ item }}</p>
    </div>
    <div class="collection">
      <div
        v-for="item in summitData.collection"
        :key="item.title"
        class="collect-item"
        @click="goToLink(item.link, '_blank')"
        :style="{ backgroundImage: `url(${item.img_bg})` }"
      >
        <p>{{ item.title }}</p>
        <p>{{ item.titleEn }}</p>
      </div>
    </div>
    <div class="previous" data-aos="fade-up">
      <div class="previous-title">
        <h3>{{ summitData.previous.title }}</h3>
        <img :src="liveImg" alt="live" />
      </div>
      <div class="link-box">
        <a
          v-for="item in summitData.previous.content"
          :key="item.link"
          :href="item.link"
          target="_blank"
          >{{ item.title }}</a
        >
      </div>
    </div>
  </AppContext>
</template>
<style scoped lang="scss">
.banner {
  width: 100%;
  .summit-banner-pc {
    height: 380px;
    margin: 0 auto;
    background: no-repeat center/cover;
  }
  .summit-banner-mo {
    display: none;
    @media screen and (max-width: 768px) {
      width: 100%;
      display: block;
      img {
        width: 100%;
      }
    }
  }
}
.detail {
  p {
    font-size: var(--o-font-size-h6);
    line-height: var(--o-line-height-h6);
    color: var(--o-color-text1);
    font-weight: 300;
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
    & + p {
      margin-top: var(--o-spacing-h6);
    }
  }
}
.collection {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  @media screen and (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 528px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 0 24px;
  }
  .collect-item {
    width: 100%;
    height: 352px;
    padding: 107px 24px;
    background-size: 100% 100%;
    text-align: center;
    box-shadow: var(--o-shadow-l1);
    @media screen and (max-width: 528px) {
      padding: 67px 0;
      height: 200px;
    }
    cursor: pointer;
    p {
      font-size: 36px;
      line-height: 48px;
      font-weight: 600;
      @media screen and (max-width: 528px) {
        font-size: 24px;
        line-height: 30px;
      }
      & + p {
        font-size: 22px;
        line-height: 48px;
        margin-top: 16px;
        font-weight: normal;
        @media screen and (max-width: 528px) {
          font-size: 16px;
          line-height: 16px;
        }
      }
    }
  }
}
.previous {
  margin-top: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h4);
  }
  .previous-title {
    display: flex;
    h3 {
      font-size: 26px;
      line-height: 30px;
      color: var(--o-color-text1);
      margin-right: var(--o-spacing-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        margin-right: var(--o-spacing-h7);
      }
    }
    img {
      @media screen and (max-width: 768px) {
        width: 22px;
      }
    }
  }

  .link-box {
    margin-top: var(--o-spacing-h3);
    display: flex;
    width: 318px;
    flex-wrap: wrap;
    @media screen and (max-width: 768px) {
      width: 172px;
      margin-top: var(--o-spacing-h6);
    }
    a {
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
      & + a {
        margin-top: var(--o-spacing-h4);
        @media screen and (max-width: 768px) {
          margin-top: var(--o-spacing-h8);
        }
      }
    }
  }
}
.dark .collect-item {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
</style>
