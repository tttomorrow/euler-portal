<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { useData, useRouter } from 'vitepress';

import _ from 'lodash';

import { useCommon } from '@/stores/common';

import AppContent from '@/components/AppContent.vue';

import { getSalon } from '@/api/api-sig';

import SALON_CONFIG from '@/data/salon/salon';

import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404_dark.png';

import IconCalendar from '~icons/app/icon-calendar.svg';

interface LatestActivity {
  isMiniProgram: number;
  id: number;
  date: string;
  posterImg: string;
  title: string;
  synopsis: string;
  address: string;
  [propName: string]: any;
}
// system variable
const commonStore = useCommon();
const { lang } = useData();
const router = useRouter();

const configData = _.cloneDeep(SALON_CONFIG.cn.MEETUPS_LIST);

const routeArr = router.route.path.split('/');

// 所需日期
const nowDate = new Date();

// 本月及以后最新活动列表
const latestList: Ref<Array<LatestActivity>> = ref([]);
// 精彩回顾中所有的数据
const allReviewList: Ref<Array<LatestActivity>> = ref([]);

// 精彩回顾下展示列表
const goDetail = (item: { isMiniProgram: number; id: number }) => {
  let query = '';
  if (item.isMiniProgram) {
    query = 'id=' + item.id + '&isMini=1';
  } else {
    query = 'id=' + item.id;
  }
  router.go(
    '/' +
      lang.value +
      `/interaction/event-list/${routeArr[routeArr.length - 2]}/detail/?` +
      query
  );
};
// 精彩回顾页码

onMounted(async () => {
  configData.forEach((item: any) => {
    item.synopsis = item.synopsis[0];
    item.address = item.MEETINGS_INFO.ADDRESS_UP;
    if (new Date(item.date).getTime() >= nowDate.getTime()) {
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
      if (new Date(item.date).getTime() >= nowDate.getTime()) {
        latestList.value.push(item);
      } else {
        allReviewList.value.unshift(item);
      }
    });
  } catch (e: any) {
    throw new Error(e);
  }
});
</script>
<template>
  <AppContent class="salon-content">
    <main>
      <div v-if="latestList && latestList.length" class="salon-latest">
        <OCard
          v-for="item in latestList"
          :key="item.id"
          class="salon-card"
          shadow="hover"
          @click="goDetail(item)"
        >
          <div v-if="item.posterImg" class="salon-card-img">
            <img :src="item.posterImg" alt="" />
            <span>{{ item.title }}</span>
          </div>
          <div v-else class="salon-card-img">
            <p class="salon-card-img-span">{{ item.title }}</p>
          </div>
          <span class="salon-card-synopsis">{{ item.synopsis }}</span>
          <div class="salon-card-info">
            <IconCalendar class="salon-card-icon"></IconCalendar>
            <span>{{ item.date }}</span>
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
    </main>
  </AppContent>
</template>

<style scoped lang="scss">
.o-pagination {
  margin-top: var(--o-spacing-h2);
}
.pagination-h5 {
  margin-top: var(--o-spacing-h4);
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
.salon-latest {
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
  .salon-card {
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
    .salon-card-img {
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
    .salon-card-synopsis {
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
        padding: var(--o-spacing-h6) var(--o-spacing-h6) 0px var(--o-spacing-h6);
        margin-bottom: var(--o-spacing-h6);
      }
    }
    .salon-card-info {
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
    .salon-card-icon {
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
