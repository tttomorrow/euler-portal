<script setup lang="ts">
import { ref, shallowRef, onMounted, computed } from 'vue';
import { useData } from 'vitepress';

import AMapLoader from '@amap/amap-jsapi-loader';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

import logo_light from '@/assets/logo.png';
import logo_dark from '@/assets/logo_dark.png';

import IconArrowRight from '~icons/app/arrow-right.svg';
import IconTime from '~icons/app/icon-time.svg';
//import IconMapPin from '~icons/app/map-pin.svg';

import { getActivityDetail } from '@/api/api-calendar';
import { useCommon } from '@/stores/common';
import { useI18n } from '@/i18n';

const map: any = shallowRef(null);
const { lang } = useData();
const i18n = useI18n();

interface detailDate {
  title: string;
  register_url: string;
  longitude: number;
  latitude: number;
  start: string;
  end: string;
  poster: number;
  date: string;
  activity_type: number;
  synopsis: string;
  address: string;
  posterImg: string;
  enterprise: string;
  schedules: string | undefined;
  wx_code: string;
  online_url: string;
  detail_address: string;
}

interface flowPathList {
  THEME: string;
  TIME: string;
  SPEAKER: any;
}

const detailObj = ref<detailDate>();
const flowPathList = ref<any[]>([]);
const tabTitle = ref([
  i18n.value.interaction.MEETUPSLIST.DETAIL_DESC,
  i18n.value.interaction.MEETUPSLIST.DETAIL_FLOW,
  i18n.value.interaction.MEETUPSLIST.DETAIL_MEET,
]);
const dayTabIndex = ref(0);
const tabShow = ref(0);
const dayTabShow = ref(0);
const tabIndex = ref(0);
const betweenDate = ref<any>([]);
const commonStore = useCommon();

const logo = computed(() => {
  return commonStore.theme === 'light' ? logo_light : logo_dark;
});

const getBetweenDateStr = (starDay: any, endDay: any) => {
  const arr = [];
  const dates = [];

  // 设置两个日期UTC时间
  const db = new Date(starDay);
  const de = new Date(endDay);

  // 获取两个日期GTM时间
  const s = db.getTime() - 24 * 60 * 60 * 1000;
  const d = de.getTime() - 24 * 60 * 60 * 1000;

  // 获取到两个日期之间的每一天的毫秒数
  for (let i = s; i <= d; ) {
    i = i + 24 * 60 * 60 * 1000;
    arr.push(parseInt(i.toString()));
  }

  // 获取每一天的时间  YY-MM-DD
  for (const j in arr) {
    const time = new Date(arr[j]);
    const mouth =
      time.getMonth() + 1 >= 10
        ? time.getMonth() + 1
        : '0' + (time.getMonth() + 1);
    const day = time.getDate() >= 10 ? time.getDate() : '0' + time.getDate();
    const YYMMDD = mouth + '月' + '-' + day + '日';
    dates.push(YYMMDD);
  }

  return dates;
};

const GetUrlParam = (paraName: string) => {
  const url = document.location.toString();
  const arrObj = url.split('?');
  if (arrObj.length > 1) {
    const arrPara = arrObj[1].split('&');
    let arr;
    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=');
      if (arr !== null && arr[0] === paraName) {
        return arr[1];
      }
    }
    return '';
  } else {
    return '';
  }
};

function getActivitiesData() {
  const id = GetUrlParam('id');
  try {
    getActivityDetail(id).then((res: detailDate) => {
      //  线上活动不加载地图，不显示tab
      res.activity_type === 2
        ? (tabTitle.value = tabTitle.value.splice(0, 2))
        : initMap(res.longitude, res.latitude);
      res[
        'posterImg'
      ] = `https://community-meeting-minutes.obs.cn-north-4.myhuaweicloud.com:443/imgs/event-detail/${res.poster}.png`;
      detailObj.value = res;
      const arr: any = [];
      if (res.start && res.end)
        betweenDate.value = getBetweenDateStr(res.start, res.end);

      if (betweenDate.value.length === 0) {
        arr.push([]);
        JSON.parse(res.schedules as string).forEach((item: any) => {
          arr[0].push({
            duration: `${item.start}-${item.end}`,
            title: item.topic,
            speakerList: item.speakerList,
          });
        });
      } else {
        JSON.parse(res.schedules as string).forEach(
          (dayTime: any, index: number) => {
            arr.push([]);
            dayTime.forEach((item: any) => {
              arr[index].push({
                duration: `${item.start}-${item.end}`,
                title: item.topic,
                speakerList: item.speakerList,
              });
            });
          }
        );
      }
      flowPathList.value = arr;
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

function initMap(lng: number, lat: number) {
  AMapLoader.load({
    key: 'c042a36d28964bd1e1e1785849fb335f', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  })
    .then((AMap) => {
      const marker = new AMap.Marker({
        position: new AMap.LngLat(lng, lat),
        //icon: IconMapPin,
        size: new AMap.Size(30, 35),
        anchor: 'bottom-center',
      });
      map.value = new AMap.Map('container', {
        zoom: 16, //  初始化地图级别
        lang: 'en',
        center: [lng, lat], //  初始化地图中心点位置
      });
      map.value.add(marker);
    })
    .catch((e: any) => {
      throw new Error(e);
    });
}

function dayTabClick(e: any) {
  dayTabIndex.value = e.index;
}

function TabClick(e: any) {
  tabIndex.value = e.index - 0;
}

const handleGo = (path: string | undefined) => {
  if (path) window.open(path, '_blank');
};

onMounted(() => {
  getActivitiesData();
});
</script>
<template>
  <div class="calendar-detail">
    <BreadCrumbs
      :bread1="i18n.interaction.MEETUPSLIST.MEETUPS"
      :bread2="detailObj?.title"
      :link1="'/' + lang + '/interaction/salon-list/'"
    />
    <div v-if="detailObj" class="warper">
      <div class="top-content">
        <div
          v-if="detailObj.posterImg"
          class="top-left"
          :style="{ backgroundImage: `url(${detailObj.posterImg})` }"
        >
          <h2 class="title" :class="{ 'poster-3': detailObj.poster === 3 }">
            {{ detailObj.title }}
          </h2>
        </div>
        <div class="top-right">
          <div class="top-right-head">
            <h2 class="title">{{ detailObj.title }}</h2>
            <p class="category">{{ detailObj.enterprise }}</p>
            <p
              v-if="
                (!detailObj.start && !detailObj.end) ||
                detailObj.start === detailObj.end
              "
              class="time"
            >
              {{ detailObj.date }}
            </p>
            <p v-else class="time">{{ detailObj.start }}-{{ detailObj.end }}</p>
          </div>
          <OButton
            type="primary"
            animation
            target="_blank"
            class="btn-detail"
            @click="handleGo(detailObj && detailObj.detail_address)"
          >
            了解详情
            <template #suffixIcon>
              <IconArrowRight class="icon"></IconArrowRight>
            </template>
          </OButton>
        </div>
      </div>
      <div class="detail-body">
        <div class="tab-box">
          <OTabs v-model="tabShow" @tab-click="TabClick">
            <OTabPane
              v-for="(item, index) in tabTitle"
              :key="index"
              :label="item"
              :name="index"
            ></OTabPane>
          </OTabs>
        </div>
        <div v-show="tabIndex === 0" class="synopsis">
          <h1 class="detail-title">{{ tabTitle[tabIndex] }}</h1>
          <p class="synopsis-body">{{ detailObj.synopsis }}</p>
        </div>
        <div v-show="tabIndex === 1" class="agenda">
          <h1 class="detail-title">{{ tabTitle[tabIndex] }}</h1>
          <div v-if="betweenDate.length" class="tab-box">
            <OTabs v-model="dayTabShow" @tab-click="dayTabClick">
              <OTabPane
                v-for="(item, index) in betweenDate"
                :key="index"
                :label="item"
                :name="index"
              ></OTabPane>
            </OTabs>
          </div>
          <div class="table">
            <OTable
              :data="flowPathList[dayTabShow]"
              :show-header="false"
              style="width: 100%"
            >
              <el-table-column prop="TIME" width="200">
                <template #default="scope">
                  <div class="time-box">
                    <icon-time class="icon-time"></icon-time>
                    <span class="agenda-time">{{ scope.row.duration }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="title" width="540"> </el-table-column>
              <el-table-column width="500">
                <template #default="scope">
                  <div
                    v-for="item in scope.row.speakerList"
                    :key="item.name"
                    class="speark-item"
                  >
                    <div class="name">{{ item.name }}</div>
                    <div class="position">{{ item.title }}</div>
                  </div>
                </template>
              </el-table-column>
            </OTable>
          </div>
        </div>
        <div
          v-show="tabIndex === 2 && detailObj.activity_type !== 2"
          class="meet-message"
        >
          <h1 class="detail-title">{{ tabTitle[tabIndex] }}</h1>
          <div :class="['meet-address']">
            <div class="address-message">
              <img :src="logo" />
            </div>
            <div class="address-text">
              <p>地址</p>
              <p v-if="detailObj.address">
                {{ detailObj.address }}
              </p>
              <p>直播链接</p>
              <p v-if="detailObj.detail_address">
                {{ detailObj.detail_address }}
              </p>
            </div>
            <div class="scan-qrcode">
              <span>{{ i18n.interaction.MEETUPSLIST.DETAIL_QRCODE_TEXT }}</span>
              <img v-if="detailObj.wx_code" :src="detailObj.wx_code" />
            </div>
          </div>
          <div class="map">
            <div id="container"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.calendar-detail {
  background-color: var(--o-color-bg2);
  margin: 0 auto;
  padding: 0 var(--o-spacing-h2);
  max-width: 1504px;
  @media screen and (max-width: 1100px) {
    padding: 0 var(--o-spacing-h5);
  }
  .warper {
    .top-content {
      display: flex;
      margin: var(--o-spacing-h2) 0;
      padding: 80px;
      background-color: var(--o-color-bg);
      .top-left {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        margin-right: var(--o-spacing-h2);
        text-align: center;
        width: 415px;
        height: 210px;
        background-size: cover;
        background-repeat: no-repeat;
        h2 {
          color: #ffffff;
          font-size: var(--o-font-size-h5);
          line-height: var(--o-line-height-h5);
          font-weight: normal;
        }
        .poster-3 {
          color: #000000;
        }
      }
      .top-right {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .title {
          margin-bottom: var(--o-spacing-h4);
          font-weight: 400;
          font-size: var(--o-font-size-h3);
          line-height: var(--o-line-height-h3);
          color: var(--o-color-text2);
        }

        .time {
          margin-top: var(--o-spacing-h8);
        }

        .btn-detail {
          cursor: pointer;
          display: flex;
          padding: var(--o-spacing-h10) var(--o-spacing-h5);
          justify-content: center;
          align-items: center;
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          width: fit-content;
          .icon {
            margin-left: var(--o-spacing-h8);
            width: 12px;
            height: 12px;
          }
        }
      }
      .poster-3 {
        color: #000000;
      }
    }
    .detail-body {
      background-color: var(--o-color-bg);
      padding: 0 80px var(--o-spacing-h2);
      .detail-title {
        margin: var(--o-spacing-h2) 0 var(--o-spacing-h4);
        font-size: var(--o-font-size-h5);
        line-height: var(--o-line-height-h5);
        color: var(--o-color-text2);
        font-weight: 400;
      }
      .synopsis {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        color: var(--o-color-text3);

        .synopsis-body {
          word-break: break-all;
        }
      }
      .tab-box {
        background-color: var(--o-color-bg);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        border-bottom: 1px solid var(--o-color-division);
        :deep(.el-tabs__header) {
          margin: 0px;
        }

        :deep(.el-tabs) {
          --el-tabs-header-height: var(--o-line-height-h3);
          @media (max-width: 768px) {
            --el-tabs-header-height: 34px;
          }
        }

        :deep(.el-tabs__item) {
          font-size: var(--o-font-size-h8);
          line-height: var(--o-line-height-h8);
          padding-bottom: var(--o-spacing-h6);
          padding-top: var(--o-spacing-h6);
          @media (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            padding-bottom: var(--o-spacing-h10);
            padding-top: var(--o-spacing-h10);
          }
        }

        :deep(.is-active) {
          color: var(--o-color-brand);
        }
      }
      .agenda {
        .tab-box {
          margin: 50px 0 30px;

          .el-tabs__nav-scroll {
            display: flex;
            justify-content: flex-start;
          }
        }
        .table {
          :deep(.el-table) .cell {
            padding: 0px;
          }

          :deep(.el-table_1_column_2) .cell {
            color: var(--o-color-text2);
            font-family: 'FZLTHJW--GB1-0, FZLTHJW--GB1';
            font-weight: normal;
          }

          :deep(.el-table__cell) {
            border-bottom: 1px solid var(--o-color-division);
          }

          :deep(tr) {
            height: 76px;
            font-size: var(--o-font-size-h6);
            line-height: var(--o-line-height-h6);

            .speark-item {
              display: flex;
              padding: var(--o-spacing-h9) 0;
              .name {
                color: var(--o-color-text2);
                min-width: 150px;
              }
              .position {
                font-size: var(--o-font-size-h8);
              }
            }
          }
          .icon-time {
            margin-right: 8px;
            width: 24px;
            height: 24px;
          }
          .time-box {
            display: flex;
            align-items: center;
          }
        }
      }
      .meet-message {
        .meet-address {
          position: relative;
          padding: var(--o-spacing-h2) 80px;
          margin: 0 auto;
          max-width: 920px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          background: var(--o-color-bg);
          box-shadow: var(--o-shadow-base);
          border-bottom: 3px solid var(--o-color-brand);
          z-index: 10;
          .address-message {
            display: flex;
            flex-flow: row;
            justify-content: center;
            align-items: center;
            img {
              height: 46px;
            }
          }
          .address-text {
            margin-left: 80px;
            position: relative;
            p {
              font-size: var(--o-font-size-h8);
              max-width: 350px;
              color: var(--o-color-text2);
              line-height: var(--o-line-height-h8);
              margin-bottom: var(--o-spacing-h4);
              &:nth-of-type(odd) {
                color: var(--o-color-brand);
                font-size: var(--o-font-size-h6);
                line-height: var(--o-line-height-h6);
                margin-bottom: var(--o-spacing-h5);
              }
              &:last-of-type {
                margin-bottom: 0;
              }
            }
          }
          .scan-qrcode {
            position: relative;
            span {
              margin-top: 6px;
              width: 100px;
              display: flex;
              flex-flow: row;
              justify-content: center;
              align-items: center;
              font-size: var(--o-font-size-h6);
              color: var(--o-color-brand);
              line-height: var(--o-line-height-h6);
            }
            img {
              display: block;
              width: 100px;
              height: 100px;
              margin-top: var(--o-spacing-h5);
            }
          }
        }
        .map {
          width: 100%;
          margin: -50px auto 0 auto;
          height: 100%;
          #container {
            width: 100%;
            height: 500px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1416px) {
    .warper {
      .top-content {
        align-items: center;
        flex-direction: column;
        .top-left {
          margin: 0 0 20px 0;
        }
        .top-right {
          text-align: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
