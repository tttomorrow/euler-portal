<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue';
import { useData, useRouter } from 'vitepress';

import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import { getSalon } from '@/api/api-sig';

import IconCalendar from '~icons/app/icon-calendar.svg';
import IconHome from '~icons/app/icon-home.svg';
import banner from '@/assets/banner/banner-interaction.png';

import illustration from '@/assets/illustrations/salon.png';
import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations_dark/404_dark.png';

const commonStore = useCommon();
const salonData = computed(() => i18n.value.interaction.MEETUPSLIST);

const activeName = ref('first');

const router = useRouter();

// const date: Ref<string> = ref(
//   new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
// );

const dateNews: Ref<string> = ref(
  new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
);

const screenWidth = useWindowResize();

// const allMeetsList: Ref<any[]> = ref([]);

const allNewsList: Ref<any[]> = ref([]);

const showNewsList: Ref<any> = ref([]);

// const meetsList = computed(() => {
//   if (screenWidth.value > 768) {
//     return showNewsList.value[dateNews.value.split('-')[0] + 'year']
//       ? showNewsList.value[dateNews.value.split('-')[0] + 'year'][
//           mapping[parseInt(dateNews.value.split('-')[1]) - 1]
//         ]
//       : [];
//   } else {
//     return allNewsList.value;
//   }
// });
const meetsList = ref<any>([]);

const newsList = computed(() => {
  if (screenWidth.value > 768) {
    return showNewsList.value[dateNews.value.split('-')[0] + 'year']
      ? showNewsList.value[dateNews.value.split('-')[0] + 'year'][
          mapping[parseInt(dateNews.value.split('-')[1]) - 1]
        ]
      : [];
  } else {
    return allNewsList.value;
  }
});

const { lang } = useData();

const i18n = useI18n();

const mapping = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月',
];

const sortMeetsList = (array: any) => {
  const temp = array;
  temp.forEach(
    (item: {
      number: any;
      MEETUPS_DATE: string;
      fullYear: string;
      fullMonth: any;
      MEETUPS_MONTH: any;
    }) => {
      item.number =
        item.MEETUPS_DATE.slice(0, 4) +
        item.MEETUPS_DATE.slice(5, 7) +
        item.MEETUPS_DATE.slice(8);
      item.fullYear = item.MEETUPS_DATE.slice(0, 4) + 'year';
      item.fullMonth = item.MEETUPS_MONTH;
    }
  );
  temp.sort((a: { number: number }, b: { number: number }) => {
    return b.number - a.number;
  });

  return temp;
};

// const initData = (res: any[]) => {
//   const tempArr: {
//     MEETUPS_IMG: string;
//     MEETUPS_DATE: any;
//     MEETUPS_TITLE: any;
//     MEETUPS_DESC: any[];
//     IS_MINI: number;
//     ID: any;
//     ADDRESS_UP: string;
//     MEETUPS_MONTH: string;
//   }[] = [];
//   res.forEach((item) => {
//     if (item.state === 5) {
//       tempArr.push({
//         MEETUPS_IMG: `https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/website-meetup/website${item.poster}.png`,
//         MEETUPS_DATE: item.date,
//         MEETUPS_TITLE: item.title,
//         MEETUPS_DESC: [item.synopsis],
//         IS_MINI: 1,
//         ID: item.id,
//         ADDRESS_UP: item.address ? item.address : '线上',
//         MEETUPS_MONTH: mapping[parseInt(item.date.split('-')[1]) - 1],
//       });
//     }
//   });

//   const allList = salonData.value.MEETUPS_DATA.concat(tempArr);

//   allMeetsList.value = sortMeetsList(allList);

//   date.value =
//     allMeetsList.value[0].MEETUPS_DATE.slice(0, 4) +
//     '-' +
//     allMeetsList.value[0].MEETUPS_DATE.slice(5, 7);

//   const listObj: any = {};
//   allMeetsList.value.forEach((item) => {
//     if (!listObj[item.fullYear]) {
//       listObj[item.fullYear] = {};
//     }
//     if (!listObj[item.fullYear][item.fullMonth]) {
//       listObj[item.fullYear][item.fullMonth] = [];
//     }
//     listObj[item.fullYear][item.fullMonth].push(item);
//   });
//   return listObj;
// };

const initNews = (res: any[]) => {
  const tempArr: {
    MEETUPS_IMG: string;
    MEETUPS_DATE: any;
    MEETUPS_TITLE: any;
    MEETUPS_DESC: any[];
    IS_MINI: number;
    ID: any;
    ADDRESS_UP: string;
    MEETUPS_MONTH: string;
  }[] = [];
  res.forEach((item) => {
    tempArr.push({
      MEETUPS_IMG: `https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/website-meetup/website${item.poster}.png`,
      MEETUPS_DATE: item.date,
      MEETUPS_TITLE: item.title,
      MEETUPS_DESC: [item.synopsis],
      IS_MINI: 1,
      ID: item.id,
      ADDRESS_UP:
        item.activity_type === 2
          ? '线上'
          : item.address
          ? item.address
          : '线上',
      MEETUPS_MONTH: mapping[parseInt(item.date.split('-')[1]) - 1],
    });
  });

  const allList = tempArr;

  allNewsList.value = sortMeetsList(allList);

  dateNews.value =
    allNewsList.value[1].MEETUPS_DATE.slice(0, 4) +
    '-' +
    allNewsList.value[1].MEETUPS_DATE.slice(5, 7);

  const listObj: any = {};
  allNewsList.value.forEach((item) => {
    if (!listObj[item.fullYear]) {
      listObj[item.fullYear] = {};
    }
    if (!listObj[item.fullYear][item.fullMonth]) {
      listObj[item.fullYear][item.fullMonth] = [];
    }
    listObj[item.fullYear][item.fullMonth].push(item);
  });
  return listObj;
};

const goDetail = (item: { IS_MINI: any; ID: any }) => {
  let query = '';
  if (item.IS_MINI) {
    query = 'id=' + item.ID + '&isMini=1';
  } else {
    query = 'id=' + item.ID;
  }
  router.go('/' + lang.value + '/interaction/salon-list/detail/?' + query);
};

onMounted(async () => {
  try {
    const responeData = await getSalon();
    showNewsList.value = JSON.parse(JSON.stringify(initNews(responeData)));
    Reflect.deleteProperty(showNewsList.value['2022year'], '九月');
    meetsList.value = JSON.parse(
      JSON.stringify(initNews(responeData)['2022year']['九月'])
    );
  } catch (e: any) {
    throw new Error(e);
  }
});
</script>

<template>
  <div class="salon">
    <BannerLevel2
      :background-image="banner"
      background-text="INTERACTION"
      :title="salonData.MEETUPS"
      :illustration="illustration"
    />
    <div class="salon-tabs">
      <OTabs v-model="activeName">
        <OTabPane :label="salonData.DETAIL_NEWS" name="first"></OTabPane>
        <OTabPane :label="salonData.DETAIL_REVIEW" name="second"></OTabPane>
      </OTabs>
    </div>
    <AppContent class="salon-content">
      <div v-if="activeName === 'first'">
        <h3 class="salon-title">{{ salonData.DETAIL_NEWS }}</h3>
        <div v-if="meetsList && meetsList.length != 0" class="salon-new">
          <OCard
            v-for="(item, index) in meetsList"
            :key="item.ID"
            class="salon-new-card"
            :style="{ padding: '0px' }"
            shadow="hover"
            @click="goDetail(item)"
          >
            <div v-if="index === 0" class="salon-new-card-img">
              <img :src="item.MEETUPS_IMG" alt="" />
              <span v-if="item.IS_MINI">{{ item.MEETUPS_TITLE }}</span>
            </div>
            <div
              :class="
                index === 0 ? 'salon-new-card-bottom' : 'salon-new-card-mobile'
              "
            >
              <div class="salon-new-card-left">
                <div class="salon-new-card-left-title">
                  {{ item.MEETUPS_TITLE }}
                </div>
                <div v-if="index === 0" class="salon-new-card-left-logo">
                  openEulur
                </div>
                <div
                  class="salon-new-card-left-desc"
                  :title="item.MEETUPS_DESC ? item.MEETUPS_DESC[0] : ''"
                >
                  {{ item.MEETUPS_DESC ? item.MEETUPS_DESC[0] : '' }}
                </div>
              </div>
              <div class="salon-new-card-info">
                <div class="salon-new-card-info-group">
                  <IconCalendar class="salon-new-card-icon"></IconCalendar>
                  <span>{{ item.MEETUPS_DATE }}</span>
                </div>
                <div class="salon-new-card-info-group">
                  <IconHome class="home salon-new-card-icon"></IconHome>
                  <span
                    class="address"
                    :title="
                      item.MEETINGS_INFO
                        ? item.MEETINGS_INFO.ADDRESS_UP
                        : item.ADDRESS_UP
                    "
                  >
                    {{
                      item.MEETINGS_INFO
                        ? item.MEETINGS_INFO.ADDRESS_UP
                        : item.ADDRESS_UP
                    }}</span
                  >
                </div>
                <div class="salon-new-card-info-mobile">
                  <IconCalendar class="salon-new-card-icon"></IconCalendar>
                  <span>{{ item.MEETUPS_DATE }}</span>

                  <IconHome class="home salon-new-card-icon"></IconHome>
                  <span
                    class="address"
                    :title="
                      item.MEETINGS_INFO
                        ? item.MEETINGS_INFO.ADDRESS_UP
                        : item.ADDRESS_UP
                    "
                  >
                    {{
                      item.MEETINGS_INFO
                        ? item.MEETINGS_INFO.ADDRESS_UP
                        : item.ADDRESS_UP
                    }}</span
                  >
                </div>
              </div>
              <div class="salon-new-card-left-logo-mobile">openEulur</div>
            </div>
          </OCard>
        </div>
        <div v-else>
          <div class="nofound">
            <img
              class="empty-img"
              :src="
                commonStore.theme === 'light'
                  ? notFoundImg_light
                  : notFoundImg_dark
              "
              alt="404"
            />
            <p class="empty-text">
              {{ lang === 'zh' ? '暂无活动！' : 'NotFound !' }}
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <h3 class="salon-title review-title">
          {{ salonData.DETAIL_REVIEW }}
        </h3>
        <OTimeline
          v-model="dateNews"
          class="salon-time"
          :right-arrow="true"
          :left-arrow="true"
        ></OTimeline>
        <div v-if="newsList && newsList.length != 0" class="salon-review">
          <OCard
            v-for="item in newsList"
            :key="item.ID"
            class="salon-review-card"
            :style="{ padding: '0px' }"
            shadow="hover"
            @click="goDetail(item)"
          >
            <div class="salon-review-card-title">
              {{ item.MEETUPS_TITLE }}
            </div>
            <div v-if="item.MEETUPS_IMG" class="salon-review-card-img">
              <img :src="item.MEETUPS_IMG" alt="" />
              <span v-if="item.IS_MINI">{{ item.MEETUPS_TITLE }}</span>
            </div>
            <div
              v-else
              class="salon-review-card-desc"
              :title="item.MEETUPS_DESC ? item.MEETUPS_DESC[0] : ''"
            >
              {{ item.MEETUPS_DESC ? item.MEETUPS_DESC[0] : '' }}
            </div>
            <div class="salon-review-card-bottom">
              <div class="salon-review-card-mobile">
                <div class="salon-review-card-mobile-title">
                  {{ item.MEETUPS_TITLE }}
                </div>
                <div
                  class="salon-review-card-mobile-desc"
                  :title="item.MEETUPS_DESC ? item.MEETUPS_DESC[0] : ''"
                >
                  {{ item.MEETUPS_DESC ? item.MEETUPS_DESC[0] : '' }}
                </div>
              </div>
              <div class="salon-review-card-info">
                <IconCalendar class="salon-review-card-icon"></IconCalendar>
                <span>{{ item.MEETUPS_DATE }}</span>
                <IconHome class="home salon-review-card-icon"></IconHome>
                <span
                  class="address"
                  :title="
                    item.MEETINGS_INFO
                      ? item.MEETINGS_INFO.ADDRESS_UP
                      : item.ADDRESS_UP
                  "
                >
                  {{
                    item.MEETINGS_INFO
                      ? item.MEETINGS_INFO.ADDRESS_UP
                      : item.ADDRESS_UP
                  }}</span
                >
              </div>
            </div>
          </OCard>
        </div>
        <div v-else>
          <div class="nofound">
            <img
              class="empty-img"
              :src="
                commonStore.theme === 'light'
                  ? notFoundImg_light
                  : notFoundImg_dark
              "
              alt="404"
            />
            <p class="empty-text">
              {{ lang === 'zh' ? '暂无数据！' : 'NotFound !' }}
            </p>
          </div>
        </div>
      </div>
    </AppContent>
  </div>
</template>

<style lang="scss" scoped>
.nofound {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: var(--o-font-size-h6);
  color: var(--e-color-text1);
  padding-top: var(--o-spacing-h1);
  height: 100%;
  .empty-img {
    height: 300px;
  }
  .empty-text {
    margin-top: var(--o-spacing-h5);
  }
}
.salon {
  &-new {
    display: grid;
    width: 100%;
    margin-top: var(--o-spacing-h2);
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: var(--o-spacing-h4);
    @media (max-width: 768px) {
      grid-gap: var(--o-spacing-h5);
      margin-top: 0;
    }

    &-card {
      cursor: pointer;
      width: 100%;
      :deep(.el-card__body) {
        padding: 0;
        width: 100%;
        display: flex;
        flex-flow: row;

        @media (max-width: 768px) {
          flex-flow: column;
        }
      }

      &-left {
        display: flex;
        flex-flow: column;
        &-title {
          font-size: var(--o-font-size-h5);
          line-height: var(--o-line-height-h5);
          color: var(--e-color-text1);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
          @media (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
          }
        }

        &-logo {
          width: 80px;
          height: 24px;
          background: linear-gradient(
            225deg,
            var(--e-color-yellow5) 0%,
            #f6d365 100%
          );
          display: flex;
          flex-flow: row;
          color: #000000;
          justify-content: center;
          align-items: center;
          font-size: var(--o-font-size-tip);
          margin-top: var(--o-spacing-h5);
          @media (max-width: 768px) {
            display: none;
          }

          &-mobile {
            width: 80px;
            height: 24px;
            background: linear-gradient(
              225deg,
              var(--e-color-yellow5) 0%,
              #f6d365 100%
            );
            display: none;
            flex-flow: row;
            justify-content: center;
            align-items: center;
            color: #000000;
            font-size: var(--o-font-size-tip);
            margin-top: var(--o-spacing-h5);
            @media (max-width: 768px) {
              display: flex;
            }
          }
        }
        &-desc {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          color: var(--e-color-text);
          margin-top: var(--o-spacing-h5);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          word-break: break-all;
          @media (max-width: 768px) {
            color: var(--e-color-text4);
            margin-top: var(--o-spacing-h9);
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
          }
        }
      }

      &-icon {
        height: 24px;
        width: 24px;
        color: var(--e-color-text4);
        margin-right: var(--o-spacing-h9);
        @media (max-width: 768px) {
          height: 16px;
          width: 16px;
          color: var(--e-color-neutral8);
          margin-right: var(--o-spacing-h10);
        }
      }

      &-img {
        width: 67%;
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        @media (max-width: 768px) {
          width: 100%;
        }

        img {
          object-fit: cover;
          height: 100%;
          width: 100%;
          @media (max-width: 768px) {
            height: 120px;
          }
        }
        span {
          position: absolute;
          text-align: center;
          font-size: var(--o-font-size-h6);
          line-height: var(--o-line-height-h6);
          color: #ffffff;
          @media (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
          }
        }
      }

      &-info {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        margin-top: var(--o-spacing-h5);
        @media (max-width: 768px) {
          margin-top: var(--o-spacing-h8);
          flex-flow: row;
          justify-content: flex-start;
        }

        &-mobile {
          display: none;
          width: 100%;
          margin-top: var(--o-spacing-h8);
          @media (max-width: 768px) {
            display: flex;
          }
        }

        &-group {
          margin-top: var(--o-spacing-h7);
          display: flex;
          flex-flow: row;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          @media (max-width: 768px) {
            display: none;
          }
        }
      }

      &-mobile {
        @media (max-width: 768px) {
          padding: var(--o-spacing-h5) var(--o-spacing-h6);
          width: 100%;
        }

        .home {
          margin-left: 0px;
          @media (max-width: 768px) {
            margin-left: var(--o-spacing-h5);
          }
        }
        .address {
          flex: 1;
          overflow: hidden;
          /* 限制一行显示 */
          white-space: nowrap;
          /* 显示不下省略号显示 */
          text-overflow: ellipsis;
        }

        span {
          color: var(--e-color-text4);
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          white-space: nowrap;
          @media (max-width: 768px) {
            color: var(--e-color-neutral8);
          }
        }

        @media (min-width: 768px) {
          width: 100%;
          display: flex;
          flex-flow: row;
          .salon-new-card-left {
            width: 85%;
            padding: var(--o-spacing-h2);

            .salon-new-card-left-desc {
              overflow: hidden;
              /* 限制一行显示 */
              white-space: nowrap;
              /* 显示不下省略号显示 */
              text-overflow: ellipsis;
            }
          }
          .salon-new-card-info {
            width: 13%;
          }
        }
      }

      &-bottom {
        @media (min-width: 768px) {
          height: 584px;
        }
        padding: var(--o-spacing-h2);
        width: 33%;
        @media (max-width: 768px) {
          padding: var(--o-spacing-h5) var(--o-spacing-h6);
          width: 100%;
        }

        .home {
          margin-left: 0px;
          @media (max-width: 768px) {
            margin-left: var(--o-spacing-h5);
          }
        }
        .address {
          flex: 1;
          overflow: hidden;
          /* 限制一行显示 */
          white-space: nowrap;
          /* 显示不下省略号显示 */
          text-overflow: ellipsis;
        }

        span {
          color: var(--e-color-text4);
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          white-space: nowrap;
          @media (max-width: 768px) {
            color: var(--e-color-neutral8);
          }
        }
      }
    }
  }

  &-review {
    display: grid;
    width: 100%;
    margin-top: var(--o-spacing-h2);
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--o-spacing-h2) var(--o-spacing-h4);
    @media (max-width: 1080px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
      grid-gap: var(--o-spacing-h5);
      margin-top: 0;
    }

    &-card {
      cursor: pointer;
      width: 100%;
      :deep(.el-card__body) {
        padding: var(--o-spacing-h4);
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: flex-start;
        height: 100%;
        @media (max-width: 768px) {
          padding: 0;
        }
      }

      &-mobile {
        display: none;
        @media (max-width: 768px) {
          display: flex;
          flex-flow: column;
        }

        &-title {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          color: var(--e-color-text1);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          word-break: break-all;
        }
        &-desc {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          color: var(--e-color-text4);
          margin-top: var(--o-spacing-h9);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          word-break: break-all;
        }
      }

      &-icon {
        height: 24px;
        width: 24px;
        color: var(--e-color-text4);
        margin-right: var(--o-spacing-h9);
        @media (max-width: 768px) {
          height: 16px;
          width: 16px;
          color: var(--e-color-neutral8);
          margin-right: var(--o-spacing-h10);
        }
      }

      &-title {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        color: var(--e-color-text1);
        overflow: hidden;
        text-overflow: ellipsis;
        height: 52px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
        @media (max-width: 768px) {
          display: none;
        }
      }

      &-desc {
        width: 100%;
        height: 172px;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        color: var(--e-color-text1);
        overflow: hidden;
        margin-top: var(--o-spacing-h4);
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        word-break: break-all;
        @media (max-width: 768px) {
          display: none;
        }
      }

      &-img {
        width: 100%;
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        margin-top: var(--o-spacing-h4);
        @media (max-width: 768px) {
          margin-top: 0px;
        }
        img {
          object-fit: cover;
          height: 172px;
          width: 100%;
          @media (max-width: 768px) {
            height: 120px;
          }
        }
        span {
          position: absolute;
          text-align: center;
          font-size: var(--o-font-size-h6);
          line-height: var(--o-line-height-h6);
          color: var(--e-color-text2);
          @media (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
          }
        }
      }

      &-info {
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-top: var(--o-spacing-h4);
        @media (max-width: 768px) {
          margin-top: var(--o-spacing-h5);
        }
      }

      &-bottom {
        padding: 0;
        width: 100%;
        @media (max-width: 768px) {
          padding: var(--o-spacing-h5) var(--o-spacing-h6);
        }

        .home {
          margin-left: var(--o-spacing-h2);
          @media (max-width: 768px) {
            margin-left: var(--o-spacing-h5);
          }
        }
        .address {
          flex: 1;
          overflow: hidden;
          /* 限制一行显示 */
          white-space: nowrap;
          /* 显示不下省略号显示 */
          text-overflow: ellipsis;
        }

        span {
          color: var(--e-color-text4);
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          white-space: nowrap;
          @media (max-width: 768px) {
            color: var(--e-color-neutral8);
          }
        }
      }
    }
  }

  &-time {
    margin-top: var(--o-spacing-h2);
    display: block;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &-title {
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--e-color-text1);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      display: none;
    }
  }
  &-tabs {
    background-color: var(--e-color-bg2);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    :deep(.el-tabs__header) {
      margin: 0px;
    }
  }
}
</style>
