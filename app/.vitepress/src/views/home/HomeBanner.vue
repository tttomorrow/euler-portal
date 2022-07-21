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

const homeBanner = computed(() =>
  lang.value === 'zh' ? HomeConfig.HOMEBANNER.zh : HomeConfig.HOMEBANNER.en
);
function jump(item: any) {
  if (flag.value) {
    if (item.targetTap === 1) {
      window.open(item.link, '_blank');
    } else {
      window.open(item.link, '_self');
    }
  }
}
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
          class="banner-panel-cover isPCshow"
          :style="{ backgroundImage: 'url(' + item.pcBanner + ')' }"
        >
          <div
            v-if="item.title !== ''"
            class="banner-panel-content flex-column"
          >
            <p class="title">{{ item.title }}</p>
            <p class="desc">{{ item.desc }}</p>
            <div class="action">
              <OButton class="home-banner-btn">
                {{ item.btn }}
                <template #suffixIcon
                  ><OIcon><IconArrowRight /></OIcon
                ></template>
              </OButton>
            </div>
          </div>
        </div>
        <img class="isH5show" :src="item.moBanner" alt="" />
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
}

.home-banner {
  height: 480px;
  position: relative;

  .banner-panel {
    position: absolute;
    background-color: var(--o-color-bg);
    display: flex;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: all 0.33s;
    &-content {
      width: 1416px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      .title {
        font-size: var(--o-font-size-h1);
        font-weight: normal;
        color: var(--o-color-text);
        line-height: var(--o-line-height-h1);
      }
      .desc {
        font-size: var(--o-font-size-h5);
        font-weight: normal;
        color: var(--o-color-text);
        line-height: var(--o-line-height-h5);
        margin-top: var(--o-spacing-h6);
      }
      .action {
        margin-top: var(--o-spacing-h3);
        .o-icon {
          color: var(--o-color-text);
        }
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
    }
    .isPCshow {
      display: block;
    }
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
    background: var(--o-color-auxiliary);
    opacity: 1;
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
@media screen and (min-width: 1921px) {
  .block {
    display: -webkit-inline-box !important;
    display: -ms-inline-flexbox !important;
    display: inline-flex !important;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .center-img {
    -webkit-box-flex: 222;
    -ms-flex: 222;
    flex: 222;
  }
  .banner-panel {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
}
@media screen and (min-width: 768px) and (max-width: 1440px) {
  .home-banner {
    .banner-panel-content {
      width: 1080px;
      padding: 0 16px;
      .title {
        font-size: 48px;
        line-height: 60px;
      }
      .desc {
        font-size: 16px;
      }
    }
  }
  :deep(.swiper-pagination) {
    width: 1080px !important;
    padding: 0 16px;
  }
}

@media screen and (max-width: 1100px) {
  .home-banner {
    height: 400px;
  }
  :deep(.swiper-pagination) {
    width: 100% !important;
    text-align: center;

    .swiper-pagination-bullet {
      width: 20px !important;
    }
  }
}
@media screen and (min-width: 640px) and (max-width: 824px) {
  .home-banner {
    height: 320px;
  }
}
@media screen and (max-width: 639px) {
  .isPCshow,
  .block {
    display: none !important;
  }
  .banner-panel {
    position: static !important;
  }
  .home-banner {
    height: auto !important;
  }
  .isH5show {
    display: block !important;
    width: 100%;
  }
}
</style>
