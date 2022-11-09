<script setup lang="ts">
import { ref, shallowRef, onMounted, computed, onUnmounted, watch } from 'vue';
import { useData } from 'vitepress';

import AMapLoader from '@amap/amap-jsapi-loader';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import AppContent from '@/components/AppContent.vue';

import logo_light from '@/assets/logo.png';
import logo_dark from '@/assets/logo_dark.png';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import IconTime from '~icons/app/icon-time.svg';

import { getActivityDetail } from '@/api/api-calendar';
import { useCommon } from '@/stores/common';
import { useI18n } from '@/i18n';
import useWindowResize from '@/components/hooks/useWindowResize';

const windowWidth = ref(useWindowResize());

const screenWidth = ref(1080);

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

const anchor = ref(['synopsis', 'agenda', 'meet-message']);
const dayTabIndex = ref(0);
const tabShow = ref(0);
const dayTabShow = ref(0);
const tabIndex = ref(0);
const betweenDate = ref<any>([]);
const commonStore = useCommon();
const activityId = ref('');

const handleScroll = (index: number) => {
  const element = document.getElementById(anchor.value[index]) as HTMLElement;

  if (element) {
    // element.scrollIntoView(false);
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

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
  activityId.value = GetUrlParam('id');
  try {
    getActivityDetail(activityId.value).then((res: detailDate) => {
      //  线上活动不加载地图，不显示tab
      res.activity_type === 2
        ? (tabTitle.value = tabTitle.value.splice(0, 2))
        : initMap(res.longitude, res.latitude);
      res[
        'posterImg'
      ] = `https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/website-meetup/website${res.poster}.png`;
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
  handleScroll(e.index - 0);
}

// const handleGo = (path: string | undefined) => {
//   if (path) window.open(path, '_blank');
// };

const scroll = () => {
  if (document.getElementById('tab') && document.getElementById('tab2')) {
    const targetScrollTop =
      screenWidth.value > 768
        ? (
            document.getElementById('tab') as HTMLElement
          ).getBoundingClientRect().top
        : (
            document.getElementById('tab2') as HTMLElement
          ).getBoundingClientRect().top;
    const synopsisScrollTop = (
      document.getElementById('synopsis') as HTMLElement
    ).getBoundingClientRect().top;
    if (targetScrollTop < 0) {
      (document.getElementById('tab') as HTMLElement).style.position = 'fixed';
      (document.getElementById('tab') as HTMLElement).style.maxWidth = '1416px';
      (document.getElementById('tab2') as HTMLElement).style.position = 'fixed';
    }
    if (synopsisScrollTop >= 0) {
      (document.getElementById('tab') as HTMLElement).style.position = 'static';
      (document.getElementById('tab') as HTMLElement).style.width = '100%';
      (document.getElementById('tab2') as HTMLElement).style.position =
        'static';
    }
  }
};

onMounted(() => {
  getActivitiesData();
  const body = window;
  body?.addEventListener('scroll', scroll);
});

onUnmounted(() => {
  const body = window;
  body?.removeEventListener('scroll', scroll);
});

watch(windowWidth, () => {
  screenWidth.value = windowWidth.value;
});
</script>
<template>
  <div v-if="detailObj">
    <div v-if="detailObj && detailObj.posterImg" class="top-img-mobile">
      <img :src="detailObj.posterImg" alt="" />
      <h2 class="title" :class="{ 'poster-3': detailObj.poster === 3 }">
        {{ detailObj.title }}
      </h2>
    </div>
    <div id="tab2" class="tab-box-mobile">
      <OTabs v-model="tabShow" @tab-click="TabClick">
        <OTabPane
          v-for="(item, index) in tabTitle"
          :key="index"
          :label="item"
          :name="index"
          @click="handleScroll(index)"
        ></OTabPane>
      </OTabs>
    </div>
    <AppContent :pc-top="40" :mobile-top="12"
      ><div class="calendar-detail">
        <BreadCrumbs
          :bread1="i18n.interaction.MEETUPSLIST.MEETUPS"
          :bread2="detailObj?.title"
          :link1="'/' + lang + '/interaction/salon-list/'"
          class="bread"
        />

        <div class="top-content">
          <div
            v-if="detailObj?.posterImg"
            class="top-left"
            :style="{ backgroundImage: `url(${detailObj.posterImg})` }"
          >
            <h2 class="title" :class="{ 'poster-3': detailObj.poster === 3 }">
              {{ detailObj.title }}
            </h2>
          </div>
          <div class="top-right">
            <div class="top-right-head">
              <h2 class="title">{{ detailObj?.title }}</h2>
              <p class="category">{{ detailObj?.enterprise }}</p>
              <p
                v-if="
                  (!detailObj?.start && !detailObj?.end) ||
                  detailObj?.start === detailObj?.end
                "
                class="time"
              >
                {{ detailObj?.date }}
              </p>
              <p v-else class="time">
                {{ detailObj.start }}-{{ detailObj.end }}
              </p>
            </div>
            <OButton
              type="primary"
              animation
              target="_blank"
              class="btn-detail"
              @click="TabClick({ index: 2 })"
            >
              {{ i18n.interaction.MEETUPSLIST.LEARN_MORE }}
              <template #suffixIcon>
                <IconArrowRight class="icon"></IconArrowRight>
              </template>
            </OButton>
          </div>
        </div>

        <div id="tab" class="tab-box">
          <OTabs v-model="tabShow" @tab-click="TabClick">
            <OTabPane
              v-for="(item, index) in tabTitle"
              :key="index"
              :label="item"
              :name="index"
            ></OTabPane>
          </OTabs>
        </div>
        <div class="synopsis detail-card">
          <h1 id="synopsis" class="detail-title">{{ tabTitle[0] }}</h1>
          <p class="synopsis-body">{{ detailObj?.synopsis }}</p>
        </div>
        <div class="agenda detail-card">
          <h1 id="agenda" class="detail-title">{{ tabTitle[1] }}</h1>
          <div v-if="betweenDate.length" class="tab-box-time">
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
            <OTable :data="flowPathList[dayTabShow]" :show-header="false">
              <el-table-column prop="TIME" width="220">
                <template #default="scope">
                  <div class="time-box">
                    <icon-time class="icon-time"></icon-time>
                    <span class="agenda-time">{{ scope.row.duration }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="title"> </el-table-column>
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
          <div class="time-line">
            <div
              v-for="(item, index) in flowPathList[dayTabShow]"
              :key="item.title"
              class="time-line-content"
            >
              <div class="time-line-left">
                <div class="ponit"></div>
                <div
                  v-if="index !== flowPathList[dayTabShow].length - 1"
                  class="line"
                ></div>
              </div>
              <div class="time-line-right">
                <div class="time-line-duration">
                  {{ item.duration }}
                </div>
                <div class="time-line-title">{{ item.title }}</div>
                <div class="time-line-name">
                  <div
                    v-for="(item2, index2) in item.speakerList"
                    :key="item2.name"
                  >
                    {{
                      item2.name +
                      (index2 === item.speakerList.length - 1 ? '' : ',')
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-show="detailObj?.activity_type !== 2"
          class="meet-message detail-card"
        >
          <h1 id="meet-message" class="detail-title">{{ tabTitle[2] }}</h1>
          <div :class="['meet-address']">
            <div class="address-message">
              <img :src="logo" />
            </div>
            <div class="address-text">
              <p>{{ i18n.interaction.MEETUPSLIST.ADDRESS }}</p>
              <p>
                {{ detailObj?.address }}
              </p>
              <p v-if="detailObj?.detail_address.includes('http')">
                {{ i18n.interaction.MEETUPSLIST.LIVE_ADDRESS }}
              </p>
              <p v-else>
                {{ i18n.interaction.MEETUPSLIST.DETAIL_ADDRESS }}
              </p>
              <p>
                {{ detailObj?.detail_address }}
              </p>
            </div>
            <div class="scan-qrcode">
              <span>{{ i18n.interaction.MEETUPSLIST.DETAIL_QRCODE_TEXT }}</span>
              <img v-if="detailObj?.wx_code" :src="detailObj?.wx_code" />
            </div>
          </div>
          <div class="map">
            <div id="container"></div>
          </div>
        </div></div
    ></AppContent>
  </div>
  <!-- <div v-else>
    <div class="nofound">
      <img class="img" :src="Img404" alt="404" />
      <p>{{ lang === 'zh' ? '暂无数据！' : 'NotFound !' }}</p>
    </div>
  </div> -->
</template>
<style lang="scss" scoped>
.nofound {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: var(--o-font-size-h6);
  color: var(--o-color-text1);
  padding: var(--o-spacing-h2) 0;
  height: 100%;
  .img {
    max-width: 500px;
    object-fit: cover;
  }
}

.time-line {
  display: none;
  @media (max-width: 768px) {
    margin-top: var(--o-spacing-h7);
    display: flex;
    flex-flow: column;
  }
  &-left {
    display: flex;
    flex-flow: column;
    justify-content: start;
    align-items: center;
    margin-right: var(--o-spacing-h8);
  }
  .ponit {
    background-color: var(--o-color-brand1);
    width: 9px;
    height: 9px;
    border-radius: 9px;
    margin-top: var(--o-spacing-h10);
  }

  .line {
    flex: 1;
    width: 1px;
    border-left: 2px var(--o-color-brand1) dashed;
  }

  &-content {
    display: flex;
    flex-flow: row;
  }

  &-right {
    padding-bottom: var(--o-spacing-h5);
  }

  &-duration {
    font-size: 10px;
    color: var(--o-color-brand1);
    line-height: 16px;
    margin-bottom: var(--o-spacing-h8);
  }

  &-title {
    font-size: var(--o-font-size-tip);
    color: var(--o-color-text1);
    line-height: var(--o-line-height-tip);
    margin-bottom: var(--o-spacing-h8);
  }

  &-name {
    font-size: 10px;
    color: var(--o-color-text4);
    line-height: 16px;
    display: flex;
    flex-flow: row;
  }
}
.tab-box-mobile {
  background-color: var(--o-color-bg2);
  display: none;
  z-index: 2;
  width: 100%;
  align-items: flex-end;
  justify-content: center;
  position: static;
  top: 48px;
  @media (max-width: 768px) {
    display: flex;
  }

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
      padding-bottom: var(--o-spacing-h9);
      padding-top: var(--o-spacing-h9);
    }
  }

  :deep(.is-active) {
    color: var(--o-color-brand1);
  }
}

.top-img-mobile {
  display: none;
  align-items: center;
  justify-content: center;
  text-align: center;
  @media screen and (max-width: 768px) {
    display: flex;
  }
  img {
    width: 100%;
  }
  h2 {
    position: absolute;
    padding: 0 var(--o-spacing-h2);
    font-size: var(--o-font-size-h6);
    text-align: center;
    color: #ffffff;
  }
}
.bread {
  display: flex;
  padding: 0;
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.calendar-detail {
  background-color: var(--o-color-bg1);
  .top-content {
    display: flex;
    margin: var(--o-spacing-h2) 0;
    padding: 80px;
    background-color: var(--o-color-bg2);
    @media screen and (max-width: 1100px) {
      padding: var(--o-spacing-h1);
      margin-top: var(--o-spacing-h6);
    }
    @media screen and (max-width: 768px) {
      display: none;
    }
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
        padding: 0 var(--o-spacing-h2);
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
      flex: 1;
      .top-right-head {
        width: 100%;
      }
      .title {
        margin-bottom: var(--o-spacing-h4);
        font-weight: 400;
        font-size: var(--o-font-size-h3);
        line-height: var(--o-line-height-h3);
        color: var(--o-color-text1);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
      }

      .time {
        margin-top: var(--o-spacing-h8);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        word-break: break-all;
        color: var(--o-color-text1);
      }

      .category {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        word-break: break-all;
        color: var(--o-color-text1);
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
        color: #ffffff;
        .icon {
          margin-left: var(--o-spacing-h8);
          width: 12px;
          height: 12px;
          color: #ffffff;
        }
      }
    }
    .poster-3 {
      color: #000000;
    }
  }

  .detail-card {
    background-color: var(--o-color-bg2);
    padding: var(--o-spacing-h2) 80px;
    @media screen and (max-width: 768px) {
      margin-top: var(--o-spacing-h5);
      padding: var(--o-spacing-h5);
    }
  }
  .detail-title {
    &::before {
      content: '';
      display: block;
      height: 200px;
      margin-top: -200px;
      visibility: hidden;
      @media screen and (max-width: 768px) {
        height: 120px;
        margin-top: -120px;
      }
    }
    margin-bottom: var(--o-spacing-h4);
    font-size: var(--o-font-size-h5);
    line-height: var(--o-line-height-h5);
    color: var(--o-color-text1);
    font-weight: 400;
    @media screen and (max-width: 768px) {
      margin: 0;
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }
  .synopsis {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: var(--o-color-text4);
    margin-bottom: var(--o-spacing-h2);

    .synopsis-body {
      word-break: break-all;
      @media screen and (max-width: 768px) {
        margin-top: var(--o-spacing-h8);
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
    }
  }
  .tab-box {
    background-color: var(--o-color-bg2);
    display: flex;
    top: 80px;
    width: 100%;
    z-index: 2;
    position: static;
    align-items: flex-end;
    justify-content: center;
    border-bottom: 1px solid var(--o-color-division1);
    @media (max-width: 1100px) {
      top: 48px;
    }
    @media (max-width: 768px) {
      display: none;
    }
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
      color: var(--o-color-brand1);
    }
  }
  .agenda {
    margin-bottom: var(--o-spacing-h2);
    .tab-box-time {
      background-color: var(--o-color-bg2);
      display: flex;
      align-items: flex-end;
      margin-top: var(--o-spacing-h4);
      @media (max-width: 768px) {
        margin: var(--o-spacing-h5) 0;
      }
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
          padding-bottom: var(--o-spacing-h9);
          padding-top: var(--o-spacing-h9);
        }
      }

      :deep(.is-active) {
        color: var(--o-color-brand1);
      }
    }
    .table {
      @media (max-width: 768px) {
        display: none;
      }

      :deep(.o-table) {
        box-shadow: none;
      }

      :deep(.el-table) .cell {
        padding: 0px;
      }

      :deep(.el-table__cell) {
        border-bottom: 0px;
        padding: var(--o-spacing-h4) 0;
      }

      :deep(.el-table__inner-wrapper::before) {
        height: 0px;
      }

      :deep(.el-table_1_column_2) .cell {
        display: flex;
        flex-flow: row;
        justify-content: flex-start;
        align-items: flex-start;
        color: var(--o-color-text1);
        font-weight: normal;
      }

      :deep(tr) {
        height: 76px;
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
        &:hover {
          background-color: var(--o-color-bg2);
        }
        --el-table-row-hover-bg-color: var(--o-color-bg2);
        &:last-child {
          .el-table__cell {
            border-bottom: none;
          }
        }
        .el-table__cell {
          border-bottom: 1px solid var(--o-color-division1);
        }

        .speark-item {
          display: flex;
          .name {
            display: flex;
            align-items: center;
            padding: 0 var(--o-spacing-h6);
            color: var(--o-color-text1);
            min-width: 100px;
          }
          .position {
            font-size: var(--o-font-size-h8);
            text-align: left;
          }
        }
      }
      .icon-time {
        margin-right: var(--o-spacing-h8);
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
      background: var(--o-color-bg2);
      box-shadow: var(--o-shadow-l1);
      border-bottom: 3px solid var(--o-color-brand1);
      z-index: 1;
      @media (max-width: 1080px) {
        flex-flow: column;
        justify-content: center;
        align-items: center;
        border-bottom: none;
        box-shadow: none;
        padding: 0px;
        margin: 0;
      }
      .address-message {
        display: flex;
        flex-flow: row;
        justify-content: center;
        align-items: center;
        img {
          height: 46px;
          @media (max-width: 768px) {
            margin-top: var(--o-spacing-h4);
            height: 32px;
          }
        }
      }
      .address-text {
        margin-left: 80px;
        position: relative;
        @media (max-width: 1080px) {
          margin-top: var(--o-spacing-h4);
          margin-left: 0px;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
        }
        p {
          font-size: var(--o-font-size-h8);
          max-width: 350px;
          color: var(--o-color-text1);
          line-height: var(--o-line-height-h8);
          margin-bottom: var(--o-spacing-h4);
          @media (max-width: 1080px) {
            margin-bottom: var(--o-spacing-h5);
            text-align: center;
            max-width: 100%;
          }
          @media (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
          }
          &:nth-of-type(odd) {
            color: var(--o-color-brand1);
            font-size: var(--o-font-size-h6);
            line-height: var(--o-line-height-h6);
            margin-bottom: var(--o-spacing-h5);
            @media (max-width: 1080px) {
              margin-bottom: var(--o-spacing-h8);
            }
            @media (max-width: 768px) {
              font-size: var(--o-font-size-h8);
              line-height: var(--o-line-height-h8);
            }
          }
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
      .scan-qrcode {
        position: relative;
        span {
          margin-top: var(--o-spacing-h9);
          width: 100px;
          display: flex;
          flex-flow: row;
          justify-content: center;
          align-items: center;
          font-size: var(--o-font-size-h6);
          color: var(--o-color-brand1);
          line-height: var(--o-line-height-h6);
          @media (max-width: 1080px) {
            margin-top: var(--o-spacing-h5);
          }
          @media (max-width: 768px) {
            font-size: var(--o-font-size-h8);
            line-height: var(--o-line-height-h8);
          }
        }
        img {
          display: block;
          width: 100px;
          height: 100px;
          margin-top: var(--o-spacing-h5);
          @media (max-width: 1080px) {
            margin-bottom: var(--o-spacing-h5);
          }
          @media (max-width: 768px) {
            margin-bottom: var(--o-spacing-h8);
          }
        }
      }
    }
    .map {
      width: 100%;
      margin: -50px auto 0 auto;
      height: 100%;
      @media (max-width: 768px) {
        display: none;
      }
      #container {
        width: 100%;
        height: 500px;
      }
    }
  }
}
</style>
