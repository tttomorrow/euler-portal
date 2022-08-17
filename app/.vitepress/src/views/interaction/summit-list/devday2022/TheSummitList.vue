<script setup lang="ts">
import { useI18n } from '@/i18n';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import TheSummitGuests from './TheSummitGuests.vue';
import TheSummitScheduler from './TheSummitScheduler.vue';
import TheSummitVideo from './TheSummitVideo.vue';

import banner from '@/assets/banner-secondary.png';
import summit from '@/assets/category/summit/header.png';

const i18n = useI18n();
</script>

<template>
  <div class="main">
    <div class="banner">
      <BannerLevel2
        :background-image="banner"
        background-text="INTERACTION"
        title="峰会"
        :illustration="summit"
      />
    </div>
    <div class="middle">
      <div class="middle-text">
        <p>
          openEuler Developer Day 2022 （简称 ODD 2022）是开放原子开源基金会的
          openEuler 社区发起的开发者大会。旨在推动 openEuler
          在服务器、云计算、边缘计算和嵌入式四大场景的技术探索和创新。本次 ODD
          2022 正式发布 openEuler 22.03
          全场景长周期版本，展示社区伙伴联合创新成果，分享多行业使用 openEuler
          规模部署的商业案例，举办社区治理机构的线上工作会议。openEuler
          始终与开发者在一起，开创新境，共创未来。
        </p>
      </div>
      <div class="middle-review">
        <p class="headline">REVIEW</p>
        <p class="subtitle">精彩回顾</p>
        <TheSummitVideo :live-data="i18n.summit.LIVEDATA" />
      </div>
      <div class="middle-schedule">
        <p class="headline">ACENDA</p>
        <p class="subtitle">峰会日程</p>
        <TheSummitScheduler :agenda-data="i18n.summit.AGENDA" />
      </div>
      <div class="middle-guests">
        <p class="headline">ACENDA</p>
        <p class="subtitle">演讲嘉宾</p>
        <TheSummitGuests
          :lecturer-list="i18n.summit.LECTURER_LIST"
          shape="circle"
          :web-columns-num="4"
          :mobile-columns-num="2"
        />
      </div>
    </div>
    <div class="foot">
      <div class="foot-construction">
        <p class="headline">RARTNERS</p>
        <p class="subtitle">共建单位</p>
        <div class="foot-construction-guidance">
          <p>主办方</p>
        </div>
        <div class="foot-construction-imglist">
          <a><img src="@/assets/category/summit/cooperate/openatom.png" /></a>
          <a
            ><img src="@/assets/category/summit/cooperate/openEulerlogo.png"
          /></a>
        </div>
        <div class="foot-construction-company">
          <p>联办单位</p>
          <div class="foot-construction-company-list">
            <div v-for="item in i18n.summit.COOPERATE_LIST" :key="item.IMG">
              <a :href="item.WEBSITE" target="_blank"
                ><img :src="item.IMG"
              /></a>
            </div>
          </div>
        </div>
        <div class="foot-construction-company">
          <p>协办单位</p>
          <div class="foot-construction-company-list">
            <div v-for="item in i18n.summit.SPONSOR_LIST" :key="item.IMG">
              <a><img :src="item.IMG" /></a>
            </div>
          </div>
        </div>
        <div class="foot-construction-review">
          <p class="headline">RARTNERS</p>
          <p class="subtitle">精彩回顾</p>
          <div class="foot-construction-review-list">
            <a
              v-for="item in i18n.summit.REVIEWLIST"
              :key="item.TITLE"
              :href="item.ADDRESS"
              target="_blank"
              class="foot-construction-review-list-item"
            >
              <img src="@/assets/category/summit/icon-live.png" />
              <p>{{ item.TITLE }}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.banner {
  margin-bottom: var(--o-spacing-h1);
}
.headline {
  color: var(--e-color-text1);
  margin-top: var(--o-spacing-h1);
  font-size: 40px;
  opacity: 0.1;
}
.subtitle {
  color: var(--e-color-text1);
  font-size: var(--o-font-size-h3);
  margin-bottom: var(--o-spacing-h2);
  transform: translateY(-24px);
}
.middle {
  max-width: 1504px;
  margin: 0 auto;
  padding: 0 44px;
  @media (max-width: 780px) {
    padding: 0 var(--o-spacing-h7);
    width: 100%;
  }
  &-text {
    color: var(--e-color-text1);
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    @media (max-width: 780px) {
      padding: 0 var(--o-spacing-h4);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-h7);
    }
  }
  &-review {
    text-align: center;
  }
  &-schedule {
    text-align: center;
  }
  &-guests {
    text-align: center;
  }
}
.foot {
  padding: 0 44px;
  &-construction {
    text-align: center;
    &-guidance {
      color: var(--e-color-text1);
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h3);
      margin-bottom: var(--o-spacing-h2);
    }
    &-imglist {
      margin: 0 auto;
      max-width: 1120px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      justify-content: center;
      img {
        cursor: pointer;
        width: 354px;
        height: 120px;
        @media (max-width: 780px) {
          margin-bottom: var(--o-spacing-h4);
        }
      }
    }
    &-company {
      color: var(--e-color-text1);
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h3);
      p {
        margin: var(--o-spacing-h2) 0px;
      }
      &-list {
        display: grid;
        grid-template-columns: 354px 354px 354px 354px;
        align-items: center;
        justify-content: center;
        @media (max-width: 780px) {
          grid-template-columns: 1fr;
        }
      }
    }
    &-review {
      max-width: 1400px;
      margin: 0 auto;
      &-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-row-gap: var(--o-spacing-h4);
        align-items: center;
        justify-content: center;
        @media (max-width: 1080px) {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 780px) {
          grid-template-columns: 1fr;
          width: 320px;
          margin: 0 auto;
        }
        &-item {
          cursor: pointer;
          width: 456px;
          background-color: var(--e-color-bg2);
          display: flex;
          color: var(--e-color-brand1);
          font-size: var(--o-font-size-h7);
          img {
            margin: var(--o-spacing-h4);
          }
          p {
            margin-top: var(--o-spacing-h4);
          }
          @media (max-width: 1280px) {
            width: 350px;
          }
          @media (max-width: 780px) {
            width: 354px;
          }
        }
      }
    }
  }
}
</style>
