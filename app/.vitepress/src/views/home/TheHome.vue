<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useData } from 'vitepress';
import AOS from 'aos';

import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import seoConfig from '@/data/common/seo';

import UserCase from './UserCase.vue';
import CommunityActivity from './CommunityActivity.vue';
import HomeBanner from './HomeBanner.vue';
import HomeCarousel from './HomeCarousel.vue';
import HomePlayground from './HomePlayground.vue';
import HomeNav from './HomeNav.vue';
import HomeMedia from './HomeMedia.vue';
import AppCalendar from '@/components/AppCalendar.vue';
import AppContent from '@/components/AppContent.vue';
import LinkPanel from '@/components/LinkPanel.vue';

import { getMeetingData, getActivityData } from '@/api/api-calendar';
import { getSortData } from '@/api/api-search';

import type { TableData } from '@/shared/@types/type-calendar';
import type { SortResponse } from '@/shared/@types/type-search';

import yearEnImg from '@/assets/category/home/euler-year-en.png';
import yearZhImg from '@/assets/category/home/euler-year-zh.png';

const { lang } = useData();
const commonStore = useCommon();

const calendarData = ref<TableData[]>([]);
const i18n = useI18n();

const caseData = ref<SortResponse>();
const newsData = ref<SortResponse>();
const blogData = ref<SortResponse>();
const paramsCase = {
  category: 'showcase',
  lang: lang.value,
  page: 1,
  pageSize: 20,
};
const paramsNews = {
  category: 'news',
  lang: lang.value,
  page: 1,
  pageSize: 4,
};
const paramsBlog = {
  category: 'blog',
  lang: lang.value,
  page: 1,
  pageSize: 4,
};
const yearImg: any = computed(() => {
  return lang.value === 'zh' ? yearZhImg : yearEnImg;
});
const isSummaryShow = ref(false);
const yearLink = computed(() => {
  return lang.value === 'zh'
    ? 'https://summary.openeuler.org/zh/2022/'
    : 'https://summary-en.openeuler.org/en/2022/';
});
function closeSummaryTips() {
  isSummaryShow.value = false;
  sessionStorage.setItem('summary-tips', 'false');
}
onMounted(async () => {
  AOS.init({
    offset: 50,
    duration: 800,
    delay: 100,
    once: true,
  });
  try {
    // 获取日历，会议、活动数据并合并
    Promise.all([getActivityData(), getMeetingData()]).then((res) => {
      res[0].tableData.forEach((item: any) => {
        item.timeData.map((item2: any) => {
          item2['startTime'] = item2.start_date;
        });
      });
      calendarData.value = [...res[0].tableData, ...res[1].tableData];
      calendarData.value.reduce((prev: any, current: any) => {
        const item: any = prev.find(
          (sameDate: any) => sameDate.start_date === current.date
        );
        item
          ? (item.timeData = item.timeData.concat(current.timeData))
          : prev.push(current);
        return prev;
      }, []);
    });
  } catch (e: any) {
    throw new Error(e);
  }
  try {
    Promise.all([
      getSortData(paramsCase),
      getSortData(paramsNews),
      getSortData(paramsBlog),
    ]).then((res) => {
      caseData.value = res[0];
      newsData.value = res[1];
      blogData.value = res[2];
    });
  } catch (e: any) {
    throw new Error(e);
  }
  const summaryShow = sessionStorage.getItem('summary-tips');
  isSummaryShow.value = summaryShow ? false : true;
});
</script>

<template>
  <SeoBox :seo-data="seoConfig[lang]?.home" />
  <HomeBanner />
  <AppContent>
    <HomeNav />
    <HomeCarousel />
    <UserCase v-if="caseData?.obj" :case-data="caseData" />
    <CommunityActivity />
    <HomeMedia
      v-if="blogData?.obj && newsData?.obj"
      :blog-data="blogData"
      :news-data="newsData"
    />
    <ClientOnly>
      <div v-if="lang === 'zh' && calendarData?.length" class="home-calendar">
        <h3>{{ i18n.home.HOME_CALENDAR }}</h3>
        <AppCalendar
          id="meeting"
          :table-data="calendarData"
          data-aos="fade-up"
        />
      </div>
    </ClientOnly>
    <HomePlayground />
    <div class="home-source-publish">
      <h3 class="partner">
        {{ i18n.home.HOME_SOURCE.SOURCE_PUBLISH_TITLE }}
      </h3>
      <p class="rank-tip">{{ i18n.home.RANK_TIP }}</p>
      <LinkPanel
        :link-list="i18n.home.HOME_SOURCE_EDITION"
        :theme="commonStore.theme === 'light' ? 'light' : 'dark'"
      ></LinkPanel>
    </div>
    <div class="home-friendship">
      <h3>{{ i18n.home.HOME_SOURCE.SOURCE_LINK_TITLE }}</h3>
      <LinkPanel
        :link-list="i18n.home.FRIENDSHIP_LINK_LIST"
        :theme="commonStore.theme === 'light' ? 'light' : 'dark'"
      ></LinkPanel>
    </div>
  </AppContent>
  <div v-if="isSummaryShow && lang !== 'ru'" class="smmary-code">
    <a :href="yearLink" target="_blank">
      <img class="code" :src="yearImg" alt="扫描二维码" />
    </a>
    <a
      class="close"
      :class="lang === 'en' ? 'close-en' : ''"
      @click="closeSummaryTips()"
    ></a>
  </div>
</template>

<style lang="scss" scoped>
.smmary-code {
  position: fixed;
  left: 1vw;
  top: 70vh;
  z-index: 99;

  .code {
    width: 141px;
    cursor: pointer;
    @media screen and (max-width: 1100px) {
      width: 85px;
    }
  }
  .close {
    position: absolute;
    display: inline-block;
    right: 20px;
    top: 15px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    cursor: pointer;
    @media screen and (max-width: 1100px) {
      right: 13px;
      top: 10px;
      width: 8px;
      height: 8px;
    }
  }
  .close-en {
    right: 4px;
    @media screen and (max-width: 1100px) {
      right: 0px;
    }
  }
}
.home-nav {
  position: relative;
  z-index: 10;
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

html[lang='zh'] .partner {
  margin-bottom: 0;
}
.rank-tip {
  margin: var(--o-spacing-h5) 0 var(--o-spacing-h4);
  text-align: center;
  font-size: var(--o-font-size-tip);
  font-weight: 400;
  color: var(--o-color-text1);
  @media screen and (max-width: 768px) {
    margin: var(--o-spacing-h7) 0 var(--o-spacing-h6);
  }
}
</style>
