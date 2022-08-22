<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from '@/i18n';
import AOS from 'aos';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

import UserCase from './UserCase.vue';
import CommunityActivity from './CommunityActivity.vue';
import HomeBanner from './HomeBanner.vue';
import HomeCarousel from './HomeCarousel.vue';
import HomePlayground from './HomePlayground.vue';
import HomeNav from './HomeNav.vue';
import PublishLink from './PublishLink.vue';
import SourceLink from './SourceLink.vue';
import HomeNews from './HomeNews.vue';
import AppCalendar from '@/components/AppCalendar.vue';

import { getMeetingData } from '@/api/api-calendar';
import { TableData } from '@/shared/@types/type-calendar';
import { useData } from 'vitepress';
import { getSortData } from '@/api/api-search';

const { lang } = useData();

const calendarData = ref<TableData[]>([
  {
    date: '',
    timeData: [
      {
        creator: '',
        duration_time: '',
        join_url: '',
        startTime: '',
        start_date: '',
        endTiem: '',
        url: '',
        id: '',
      },
    ],
  },
]);
const i18n = useI18n();

const caseData = ref(undefined);
const newsData = ref(undefined);
const blogData = ref(undefined);
onMounted(async () => {
  AOS.init({
    offset: 200,
    duration: 800,
    delay: 100,
  });
  const paramsCase = {
    category: 'showcase',
    lang: lang.value,
    page: 1,
    pageSize: 100,
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
  try {
    const responeData = await getSortData(paramsCase);
    caseData.value = responeData;
  } catch (e: any) {
    throw new Error(e);
  }
  try {
    const responeData = await getSortData(paramsNews);
    newsData.value = responeData;
  } catch (e: any) {
    throw new Error(e);
  }
  try {
    const responeData = await getSortData(paramsBlog);
    blogData.value = responeData;
  } catch (e: any) {
    throw new Error(e);
  }
  try {
    //TODO:添加活动数据
    Promise.all([getMeetingData()]).then((res) => {
      calendarData.value = [...res[0].tableData];
    });
  } catch (e: any) {
    throw new Error(e);
  }
});
</script>

<template>
  <HomeBanner />
  <div class="wraper">
    <OContainer :level-index="2"><HomeNav /></OContainer>
    <HomeCarousel />
    <UserCase v-if="caseData" :case-data="caseData" />
    <CommunityActivity />
    <HomeNews
      v-if="blogData && newsData"
      :blog-data="blogData"
      :news-data="newsData"
    />
    <el-config-provider :locale="zhCn">
      <div v-if="lang === 'zh'" class="home-calendar">
        <h3>{{ i18n.home.HOME_CALENDAR }}</h3>
        <AppCalendar
          v-if="calendarData.length > 1"
          :table-data="calendarData"
          data-aos="fade-up"
        />
      </div>
    </el-config-provider>
    <HomePlayground />
    <PublishLink />
    <SourceLink />
  </div>
</template>

<style lang="scss" scoped>
.wraper {
  margin: 0 auto;
  padding: 0 var(--o-spacing-h2);
  max-width: 1504px;
  @media screen and (max-width: 1080px) {
    padding: 0 var(--o-spacing-h5);
  }
  h3 {
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--e-color-text1);
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
</style>
