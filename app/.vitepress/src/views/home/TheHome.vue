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
import AppContent from '@/components/AppContent.vue';

import { getMeetingData, getActivityData } from '@/api/api-calendar';
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
    offset: 100,
    duration: 800,
    delay: 100,
    once: true,
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
    Promise.all([getActivityData(), getMeetingData()]).then((res) => {
      res[0].tableData.forEach((item: any) => {
        item.timeData.map((item2: any) => {
          item2['startTime'] = item2.start_date;
        });
      });
      calendarData.value = [...res[0].tableData, ...res[1].tableData];

      calendarData.value.reduce((re: any, obj: any) => {
        const item: any = re.find((o: any) => o.start_date === obj.date);
        item
          ? (item.timeData = item.timeData.concat(obj.timeData))
          : re.push(obj);
        return re;
      }, []);
    });
  } catch (e: any) {
    throw new Error(e);
  }
});
</script>

<template>
  <HomeBanner />
  <AppContent>
    <OContainer :level-index="1"><HomeNav /></OContainer>
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
  </AppContent>
</template>

<style lang="scss" scoped>
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
</style>
