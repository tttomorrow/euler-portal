<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue';
import { useData, useRouter } from 'vitepress';

import _ from 'lodash';
import { getNowFormatDate } from '@/shared/utils';

import { useCommon } from '@/stores/common';

import AppContent from '@/components/AppContent.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';

import { getSalon } from '@/api/api-sig';
import SALON_CONFIG from '@/data/salon/salon';

import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404_dark.png';

import IconCalendar from '~icons/app/icon-calendar.svg';
import IconHome from '~icons/app/icon-home.svg';

interface LatestActivity {
  isMiniProgram: number;
  id: number;
  date: string;
  posterImg: string;
  title: string;
  synopsis: string;
  address: string;
  windowOpen: string;
  [propName: string]: any;
}
// system variable
const commonStore = useCommon();
const { lang } = useData();
const router = useRouter();

const configData = _.cloneDeep(SALON_CONFIG.cn.MEETUPS_LIST);

// 所需日期
const nowDate = getNowFormatDate();

// 本月及以后最新活动列表
const latestList: Ref<Array<LatestActivity>> = ref([]);
// 精彩回顾中所有的数据
const allReviewList: Ref<Array<LatestActivity>> = ref([]);

// 精彩回顾下展示列表
const goDetail = (item: {
  isMiniProgram: number;
  id: number;
  windowOpen: string;
}) => {
  if (item.windowOpen) {
    window.open(item.windowOpen);
  } else {
    let query = '';
    if (item.isMiniProgram) {
      query = 'id=' + item.id + '&isMini=1';
    } else {
      query = 'id=' + item.id;
    }
    router.go('/' + lang.value + `/interaction/event-list/detail/?` + query);
  }
};
// 精彩回顾页码
const currentPage = ref(1);
const pageSize = ref(6);
const newsList = computed(() => {
  return allReviewList.value.slice(
    pageSize.value * (currentPage.value - 1),
    pageSize.value * currentPage.value
  );
});
// 移动端翻页
const changeCurrentPageMoblie = (val: string) => {
  if (val === 'prev' && currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
  } else if (val === 'next' && currentPage.value < allReviewList.value.length) {
    currentPage.value = currentPage.value + 1;
  }
};

onMounted(async () => {
  configData.forEach((item: any) => {
    item.synopsis = item.synopsis[0];
    item.address = item.MEETINGS_INFO.ADDRESS_UP;
    if (new Date(item.date).getTime() >= new Date(nowDate).getTime()) {
      latestList.value.push(item);
    } else {
      allReviewList.value.unshift(item);
    }
  });
  try {
    const responeData = await getSalon();
    responeData.reverse();
    responeData.forEach((item: LatestActivity) => {
      item.isMiniProgram = 1;
      item.posterImg = `https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/website-meetup/website${item.poster}.png`;
      if (new Date(item.date).getTime() >= new Date(nowDate).getTime()) {
        latestList.value.push(item);
      } else {
        allReviewList.value.unshift(item);
      }
    });
    allReviewList.value = allReviewList.value.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (e: any) {
    throw new Error(e);
  }
});
</script>

<template>
  <AppContent class="salon-content">
    <div class="salon-review-mian">
      <template v-if="newsList && newsList.length != 0">
        <div class="salon-review">
          <OCard
            v-for="item in newsList"
            :key="item.id"
            class="salon-review-card"
            shadow="hover"
            @click="goDetail(item)"
          >
            <div class="salon-review-card-title">
              {{ item.title }}
            </div>
            <div v-if="item.posterImg" class="salon-review-card-img">
              <img :src="item.posterImg" alt="" />
              <span v-if="item.isMiniProgram || item.visibleText">{{
                item.title
              }}</span>
            </div>
            <div
              v-else
              class="salon-review-card-desc"
              :title="item.synopsis ? item.synopsis : ''"
            >
              {{ item.synopsis ? item.synopsis : '' }}
            </div>
            <div class="salon-review-card-bottom">
              <div class="salon-review-card-mobile">
                <div class="salon-review-card-title-mobile">
                  {{ item.title }}
                </div>
                <div
                  class="salon-review-card-desc-mobile"
                  :title="item.synopsis ? item.synopsis : ''"
                >
                  {{ item.synopsis ? item.synopsis : '' }}
                </div>
              </div>
              <div class="salon-review-card-info">
                <IconCalendar class="salon-review-card-icon"></IconCalendar>
                <span>{{ item.date }}</span>
                <IconHome class="home salon-review-card-icon"></IconHome>
                <span class="address" :title="item.address">
                  {{ item.address }}</span
                >
              </div>
            </div>
          </OCard>
        </div>
        <OPagination
          v-if="newsList.length"
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          class="pagination"
          :page-sizes="[3, 6, 9, 12]"
          :background="true"
          layout="sizes, prev, pager, next, slot, jumper"
          :total="allReviewList.length"
        >
          <span class="pagination-slot"
            >{{
              pageSize * currentPage < allReviewList.length
                ? pageSize * currentPage
                : allReviewList.length
            }}
            / {{ allReviewList.length }}</span
          >
        </OPagination>
        <AppPaginationMo
          :current-page="currentPage"
          :total-page="allReviewList.length"
          @turn-page="changeCurrentPageMoblie"
        >
        </AppPaginationMo>
      </template>
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
</template>

<style lang="scss" scoped>
.salon-tabs {
  :deep(.el-tabs__active-bar) {
    transition: none;
  }
}

.nofound {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: var(--o-font-size-h6);
  color: var(--o-color-text1);
  height: 100%;
  .empty-img {
    height: 300px;
  }
  .empty-text {
    margin-top: var(--o-spacing-h5);
  }
}
.o-pagination {
  margin-top: var(--o-spacing-h2);
}
.pagination-h5 {
  margin-top: var(--o-spacing-h4);
}

.split-line {
  height: 1px;
  border: none;
  background-color: var(--o-color-division1);
  margin-top: var(--o-spacing-h1);
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.salon-review {
  display: grid;
  width: 100%;
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
  }

  .salon-review-card {
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

    .salon-review-card-mobile {
      display: none;
      @media (max-width: 768px) {
        display: flex;
        flex-flow: column;
      }

      .salon-review-card-title-mobile {
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
      .salon-review-card-desc-mobile {
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

    .salon-review-card-icon {
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

    .salon-review-card-title {
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

    .salon-review-card-desc {
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

    .salon-review-card-img {
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

    .salon-review-card-info {
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

    .salon-review-card-bottom {
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
        white-space: nowrap;
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

.salon-time {
  margin-top: var(--o-spacing-h2);
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
}
.salon-tabs {
  background-color: var(--o-color-bg2);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  :deep(.el-tabs__header) {
    margin: 0px;
  }
}
</style>
