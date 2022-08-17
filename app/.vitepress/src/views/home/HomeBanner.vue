<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { useData } from 'vitepress';
import HomeConfig from './config';

import IconArrowRight from '~icons/app/icon-arrow-right1.svg';

SwiperCore.use([Autoplay, Pagination, Navigation]);

const { lang } = useData();
const flag = ref();
const onSwiper = (swiper: any) => {
  swiper.el.onmouseout = function () {
    swiper.navigation.$nextEl.removeClass('show');
    swiper.navigation.$prevEl.removeClass('show');
  };
  swiper.el.onmouseover = function () {
    swiper.navigation.$nextEl.addClass('show');
    swiper.navigation.$prevEl.addClass('show');
  };
  flag.value = computed(() => swiper.animating);
};

// 判断语言 banner
const homeBanner = computed(() => {
  if (lang.value === 'en') {
    return HomeConfig.HOMEBANNER.en;
  } else if (lang.value === 'ru') {
    return HomeConfig.HOMEBANNER.ru;
  } else {
    return HomeConfig.HOMEBANNER.zh;
  }
});

// banner跳转事件
const jump = (item: any) => {
  if (flag.value) {
    if (item.targetTap === 1) {
      window.open(item.link, '_blank');
    } else {
      window.open(item.link, '_self');
    }
  }
};
</script>

<template>
  <swiper
    class="home-banner"
    :loop="true"
    :pagination="{
      clickable: true,
    }"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
    :navigation="true"
    @swiper="onSwiper"
  >
    <swiper-slide v-for="item in homeBanner" :key="item.link">
      <a class="banner-panel" @click="jump(item)">
        <div
          class="banner-panel-cover"
          :style="{ backgroundImage: 'url(' + item.pcBanner + ')' }"
        >
          <div
            v-if="item.title !== ''"
            class="banner-panel-content flex-column"
          >
            <div class="box">
              <p class="title">{{ item.title }}</p>
              <p class="desc">{{ item.desc }}</p>
            </div>
            <div class="action">
              <OButton class="home-banner-btn">
                {{ item.btn }}
                <template #suffixIcon
                  ><OIcon><IconArrowRight /></OIcon
                ></template>
              </OButton>
            </div>
          </div>
          <img v-else class="isH5show" :src="item.moBanner" alt="" />
        </div>
      </a>
    </swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
$banner-color: #fff;
.dark .banner-panel-cover {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
.home-banner-btn {
  border-color: $banner-color;
  color: $banner-color;
  @media screen and (max-width: 824px) {
    padding: 5px 12px 5px 16px;
    line-height: 22px;
    font-size: 14px;
  }
}

.home-banner {
  height: 480px;
  position: relative;

  .banner-panel {
    position: absolute;
    background-color: var(--e-color-bg2);
    display: flex;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: all 0.33s;
    &-content {
      max-width: 1416px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      .title {
        font-size: var(--o-font-size-h1);
        line-height: var(--o-line-height-h1);
        // color: var(--e-color-text2);
        filter: invert(1);
        font-weight: 600;
        @media screen and (max-width: 1439px) {
          font-size: var(--o-font-size-h2);
          line-height: var(--o-line-height-h2);
        }
        @media screen and (max-width: 824px) {
          font-size: var(--o-font-size-h4);
          line-height: var(--o-line-height-h4);
        }
      }
      .desc {
        font-size: var(--o-font-size-h5);
        font-weight: normal;
        // color: var(--e-color-text2);
        line-height: var(--o-line-height-h5);
        margin-top: var(--o-spacing-h6);
        filter: invert(1);
        @media screen and (max-width: 1439px) {
          font-size: var(--o-font-size-h6);
          line-height: var(--o-line-height-h6);
        }
        @media screen and (max-width: 824px) {
          margin-top: var(--o-spacing-h9);
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
      }
      .action {
        margin-top: var(--o-spacing-h3);
        .o-icon {
          color: $banner-color;
        }
        @media screen and (max-width: 824px) {
          margin-top: 0;
        }
      }
      @media screen and (max-width: 1439px) {
        padding: 0 16px;
      }
      @media screen and (max-width: 824px) {
        padding: 72px 16px 50px;
        justify-content: space-between;
        box-sizing: border-box;
        text-align: center;
      }
    }
    &-cover {
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
      height: 100%;
    }
    .isH5show {
      display: none;
      object-fit: cover;
      width: 100%;
      @media screen and (max-width: 824px) {
        display: block;
        height: 300px;
      }
    }

    @media screen and (max-width: 767px) {
      position: static !important;
    }
  }
  @media screen and (max-width: 1100px) {
    height: 400px;
  }
  @media screen and (max-width: 824px) {
    height: 300px;
  }
}

:deep(.swiper-pagination) {
  width: 1416px !important;
  bottom: 84px;
  left: 50% !important;
  transform: translateX(-50%);
  text-align: left;
  .swiper-pagination-bullet {
    width: 40px;
    height: 2px;
    opacity: 1;
    background: rgba(207, 211, 215, 0.6);
    border-radius: 0;
    margin: 0 4px;
  }
  .swiper-pagination-bullet-active {
    background: var(--e-color-yellow5);
    opacity: 1;
  }
  @media screen and (max-width: 1439px) {
    width: 1080px !important;
    padding: 0 16px;
    left: 0 !important;
    transform: translateX(0);
  }
  @media screen and (max-width: 1100px) {
    width: 100% !important;
    bottom: 72px;
    .swiper-pagination-bullet {
      width: 20px !important;
      margin: 0 4px 0 0;
    }
  }
  @media screen and (max-width: 824px) {
    left: 50% !important;
    transform: translateX(-50%);
    text-align: center;
    bottom: 24px;
  }
}
:deep(.swiper-button-prev) {
  width: 32px;
  height: 32px;
  background: rgba(56, 56, 56, 0.5);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s;
  &:after {
    font-size: 20px;
    color: #fff;
  }
  &.show {
    opacity: 1;
  }
}
:deep(.swiper-button-next) {
  width: 32px;
  height: 32px;
  background: rgba(56, 56, 56, 0.5);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s;
  &:after {
    font-size: 20px;
    color: #fff;
  }
  &.show {
    opacity: 1;
  }
}
</style>
