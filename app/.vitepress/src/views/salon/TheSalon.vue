<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue';
import { useData, useRouter } from 'vitepress';

import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import { getSalon } from '@/api/api-sig';
import SALON_CONFIG from '@/data/salon/salon';

import banner from '@/assets/banner/banner-interaction.png';
import illustration from '@/assets/illustrations/salon.png';
import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404_dark.png';

import IconCalendar from '~icons/app/icon-calendar.svg';
import IconHome from '~icons/app/icon-home.svg';

interface LATEST_ACTIVITY {
  IS_MINI: number;
  ID: number | string;
  MEETUPS_DATE: string;
  MEETUPS_IMG: string;
  MEETUPS_TITLE: string;
  MEETUPS_DES: string;
  ADDRESS: string;
  [propName: string]: any;
}
// system variable
const commonStore = useCommon();
const { lang } = useData();
const i18n = useI18n();
const salonData = computed(() => i18n.value.interaction.MEETUPSLIST);
const router = useRouter();
const screenWidth = useWindowResize();
const configData = computed(() => SALON_CONFIG.cn.MEETUPS_LIST);

// define variable

// 所需日期
const nowDate = new Date();
const thisYear: number = nowDate.getFullYear();
const thisMonth: number | string =
  nowDate.getMonth() + 1 >= 10
    ? nowDate.getMonth() + 1
    : '0' + (nowDate.getMonth() + 1);
// 当前导航栏
const activeName = ref('first');
// 本月及以后最新活动列表
const latestList: Ref<Array<LATEST_ACTIVITY>> = ref([]);
// 精彩回顾中所有的数据
const allReviewList: Ref<Array<LATEST_ACTIVITY>> = ref([]);
// 时间线所选中的日期
const timeLineDate: Ref<string> = ref(thisYear + '-' + thisMonth);
// 精彩回顾下展示列表
const newsList = computed(() => {
  if (screenWidth.value > 768) {
    const showList: Ref<Array<LATEST_ACTIVITY>> = ref([]);
    allReviewList.value.forEach((item: LATEST_ACTIVITY) => {
      if (item.MEETUPS_DATE.slice(0, 7) === timeLineDate.value) {
        showList.value.push(item);
      }
    });
    return showList.value;
  } else {
    return allReviewList.value;
  }
});

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
  configData.value.forEach((item: any) => {
    item.MEETUPS_DES = item.MEETUPS_DESC[0];
    item.ADDRESS = item.MEETINGS_INFO.ADDRESS_UP;
    if (new Date(item.MEETUPS_DATE).getTime() >= nowDate.getTime()) {
      latestList.value.push(item);
    } else {
      allReviewList.value.push(item);
    }
  });
  try {
    const responeData = await getSalon();
    responeData.forEach((item: LATEST_ACTIVITY) => {
      item.IS_MINI = 1;
      item.ID = item.id;
      item.MEETUPS_DATE = item.date;
      item.MEETUPS_TITLE = item.title;
      item.MEETUPS_DES = item.synopsis;
      item.ADDRESS = item.address;
      item.MEETUPS_IMG = `https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/website-meetup/website${item.poster}.png`;
      if (new Date(item.date).getTime() >= nowDate.getTime()) {
        latestList.value.push(item);
      } else {
        allReviewList.value.push(item);
      }
    });
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
        <div v-if="latestList && latestList.length != 0" class="salon-latest">
          <OCard
            v-for="item in latestList"
            :key="item.id"
            class="salon-latest-card"
            :style="{ padding: '0px' }"
            shadow="hover"
            @click="goDetail(item)"
          >
            <div v-if="item.MEETUPS_IMG" class="salon-latest-card-img">
              <img :src="item.MEETUPS_IMG" alt="" />
              <span>{{ item.MEETUPS_TITLE }}</span>
            </div>
            <div v-else class="salon-latest-card-img">
              <p class="salon-latest-card-img-span">{{ item.MEETUPS_TITLE }}</p>
            </div>
            <!-- <div class="openeuler">
                <p>openEuler</p>
              </div> -->
            <span class="salon-latest-card-synopsis">{{
              item.MEETUPS_DES
            }}</span>
            <div class="salon-latest-card-info">
              <IconCalendar class="salon-latest-card-icon"></IconCalendar>
              <span>{{ item.MEETUPS_DATE }}</span>
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
          v-model="timeLineDate"
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
              :title="item.MEETUPS_DES ? item.MEETUPS_DES : ''"
            >
              {{ item.MEETUPS_DES ? item.MEETUPS_DES : '' }}
            </div>
            <div class="salon-review-card-bottom">
              <div class="salon-review-card-mobile">
                <div class="salon-review-card-mobile-title">
                  {{ item.MEETUPS_TITLE }}
                </div>
                <div
                  class="salon-review-card-mobile-desc"
                  :title="item.MEETUPS_DES ? item.MEETUPS_DES : ''"
                >
                  {{ item.MEETUPS_DES ? item.MEETUPS_DES : '' }}
                </div>
              </div>
              <div class="salon-review-card-info">
                <IconCalendar class="salon-review-card-icon"></IconCalendar>
                <span>{{ item.MEETUPS_DATE }}</span>
                <IconHome class="home salon-review-card-icon"></IconHome>
                <span class="address" :title="item.ADDRESS">
                  {{ item.ADDRESS }}</span
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
  color: var(--o-color-text1);
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
  &-latest {
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
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: flex-start;
        height: 100%;
        padding: 0px;
      }
      &-img {
        width: 100%;
        height: 196px;
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        @media (max-width: 768px) {
          height: 120px;
        }
        img {
          object-fit: cover;
          height: 196px;
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
          color: #fff;
          @media (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
          }
        }
        p {
          text-align: center;
          font-size: var(--o-font-size-h6);
          line-height: var(--o-line-height-h6);
        }
      }
      // .openeuler {
      //   background: linear-gradient(
      //     225deg,
      //     var(--o-color-yellow5) 0%,
      //     #f6d365 100%
      //   );
      //   height: 23px;
      //   width: 80px;
      //   p {
      //     color: var(--o-color-black);
      //     font-size: var(--o-font-size-tip);
      //     line-height: var(--o-line-height-tip);
      //     text-align: center;
      //     position: relative;
      //     top: 50%;
      //     transform: translateY(-50%);
      //   }
      // }
      &-synopsis {
        height: 75px;
        color: var(--o-color-text1);
        font-weight: 400;
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-height-h7);
        padding: var(--o-spacing-h4) var(--o-spacing-h4) 0px var(--o-spacing-h4);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin-bottom: var(--o-spacing-h5);
        @media (max-width: 780px) {
          height: 65px;
          padding: var(--o-spacing-h6) var(--o-spacing-h6) 0px
            var(--o-spacing-h6);
          margin-bottom: var(--o-spacing-h6);
        }
      }
      &-info {
        display: flex;
        align-items: center;
        width: 100%;
        margin-left: var(--o-spacing-h4);
        margin-bottom: var(--o-spacing-h4);
        span {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          font-weight: 400;
          color: var(--o-color-text-secondary);
        }
        @media (max-width: 780px) {
          margin-left: var(--o-spacing-h6);
          margin-bottom: var(--o-spacing-h5);
        }
      }
      &-icon {
        height: 24px;
        width: 24px;
        color: var(--o-color-text4);
        margin-right: var(--o-spacing-h9);
        @media (max-width: 780px) {
          height: 16px;
          width: 16px;
          color: var(--o-color-neutral8);
          margin-right: var(--o-spacing-h10);
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
          color: var(--o-color-text1);
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
          color: var(--o-color-text4);
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
        color: var(--o-color-text4);
        margin-right: var(--o-spacing-h9);
        @media (max-width: 768px) {
          height: 16px;
          width: 16px;
          color: var(--o-color-neutral8);
          margin-right: var(--o-spacing-h10);
        }
      }

      &-title {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        color: var(--o-color-text1);
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
        color: var(--o-color-text1);
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
          color: #fff;
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
          color: var(--o-color-text4);
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          white-space: nowrap;
          @media (max-width: 768px) {
            color: var(--o-color-neutral8);
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
    color: var(--o-color-text1);
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
    background-color: var(--o-color-bg2);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    :deep(.el-tabs__header) {
      margin: 0px;
    }
  }
}
</style>
