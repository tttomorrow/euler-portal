<script setup lang="ts">
import { ref, nextTick, onMounted, reactive, PropType } from 'vue';

import IconLeft from '~icons/app/icon-left.svg';
import IconRight from '~icons/app/icon-right.svg';
import IconArrowRight from '~icons/app/arrow-right.svg';
import IconDown from '~icons/app/down.svg';

import { isValidKey } from '@/shared/utils';

import { TableData, Item } from '@/shared/@types/type-calendar';

import { useRouter } from 'vitepress';

const router = useRouter();

const props = defineProps({
  tableData: {
    type: Array as PropType<TableData[]>,
    default: () => {
      return {};
    },
  },
});

let currentMeet = reactive<TableData>({
  date: '',
  timeData: [
    {
      creator: '',
      duration_time: '',
      join_url: '',
      etherpad: '',
      startTime: '',
      endTiem: '',
      url: '',
      id: '',
    },
  ],
});

const renderData = ref<TableData>({
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
});

const isMeeting = ref(false);
const currentDay = ref('');
const activeName = ref('');
const monthDate = ref('');
const activeIndex = ref(0);
const isCollapse = ref(false);

const detailItem = [
  { text: '会议详情', key: 'detail', isLink: false },
  { text: '发起人', key: 'creator', isLink: false },
  { text: '会议日期', key: 'date', isLink: false },
  { text: '会议时间', key: 'duration_time', isLink: false },
  { text: '会议ID', key: 'meeting_id', isLink: false },
  { text: '会议链接', key: 'join_url', isLink: true },
  { text: 'Etherpad链接', key: 'etherpad', isLink: true },
  { text: '活动介绍', key: 'synopsis', isLink: false },
  { text: '起始日期', key: 'start_date', isLink: false },
  { text: '结束日期', key: 'end_date', isLink: false },
  { text: '活动形式', key: 'activity_type', isLink: false },
  { text: '线上链接', key: 'online_url', isLink: true },
  { text: '报名链接', key: 'register_url', isLink: true },
  { text: '回放链接', key: 'replay_url', isLink: true },
];
const activityType = ['线下', '线上', '线上 + 线下'];
const titleList = ['全部', '会议', '活动', '峰会'];

const calendar = ref(null);

const calendarHeight = ref(335);

// 活动会议筛选
function changeTab(index: number) {
  activeIndex.value = index;
  try {
    // 0、全部 1、会议 其他活动
    if (index === 0) {
      renderData.value.timeData = currentMeet.timeData;
    } else if (index === 1) {
      renderData.value.timeData = currentMeet.timeData.filter((item: Item) => {
        return item.etherpad;
      });
    } else {
      renderData.value.timeData = currentMeet.timeData.filter((item: Item) => {
        return item.activity_category === index - 1;
      });
    }
  } catch (error: any) {
    throw Error(error);
  }
}

function meetClick(day: string) {
  currentDay.value = day;
  activeIndex.value = 0;
  try {
    props.tableData.forEach((item: TableData) => {
      isCollapse.value = false;
      if (item.date === day || item.start_date === day) {
        isMeeting.value = true;
        // 深拷贝
        currentMeet = JSON.parse(JSON.stringify(item));
        renderData.value = JSON.parse(JSON.stringify(item));
        // 只有一个会议默认展开
        if (item.timeData.length === 1) {
          activeName.value = '0';
          nextTick(() => {
            (document.querySelector('.meet-item') as HTMLElement).click();
          });
        } else {
          // 会议时间排序
          activeName.value = '';
          item.timeData.sort((a: Item, b: Item) => {
            return (
              parseInt(a.startTime.replace(':', '')) -
              parseInt(b.startTime.replace(':', ''))
            );
          });
        }
        throw Error();
      } else {
        isMeeting.value = false;
      }
    });
  } catch (e) {
    throw Error();
  }
}

// 为日历单元格绑定会议次数 (弃用)
function getMeetTimes(day: string): number {
  let times = 0;
  props.tableData.forEach((item) => {
    if (item.date === day || item.start_date === day) {
      times = item.timeData.length;
      return;
    }
  });
  return times;
}

function changeMonth(index: number) {
  (
    document.querySelectorAll('.el-button-group button')[index] as HTMLElement
  ).click();
}

function watchChange(element: Element) {
  const observe = new MutationObserver(function () {
    monthDate.value = element.innerHTML;
    nextTick(() => {
      const tbody = document.querySelector('.main-body tbody') as HTMLElement;
      if (tbody) {
        calendarHeight.value = tbody.offsetHeight;
      }
    });
  });
  observe.observe(element, { childList: true });
}

function goDetail(index: number) {
  router.go(`/zh/calendar/detail/?id=${renderData.value.timeData[index].id}`);
}

function changeCollapse() {
  isCollapse.value = !isCollapse.value;
}

onMounted(() => {
  setTimeout(() => {
    const activeBoxs = document.querySelectorAll('.be-active')[
      document.querySelectorAll('.be-active').length - 1
    ] as HTMLElement;
    if (activeBoxs) {
      activeBoxs.click();
    }
  }, 300);
  const tbody = document.querySelector('.main-body tbody') as HTMLElement;
  if (tbody) {
    calendarHeight.value = tbody.offsetHeight;
  }
  const element = document.querySelector('.el-calendar__title') as HTMLElement;
  monthDate.value = element.innerHTML;
  watchChange(element);
});
</script>
<template>
  <div class="wrapper">
    <div class="head-title">
      <div class="left-title">
        <o-icon @click="changeMonth(0)"> <icon-left></icon-left> </o-icon>
        <span class="month-date">{{ monthDate }}</span>
        <o-icon @click="changeMonth(2)">
          <icon-right></icon-right>
        </o-icon>
      </div>
      <div class="right-title">
        <div class="title-list">
          <div
            v-for="(item, index) in titleList"
            :key="item"
            :class="{ active: index === activeIndex }"
            class="title-item"
            @click="changeTab(index)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div class="main-body">
      <el-calendar ref="calendar" class="calender">
        <template #dateCell="{ data }">
          <div
            class="out-box"
            :class="{ 'be-active': getMeetTimes(data.day) }"
            @click="meetClick(data.day)"
          >
            <div class="day-box">
              <p
                :class="data.isSelected ? 'is-selected' : ''"
                class="date-calender"
              >
                {{ data.day.split('-').slice(2)[0] }}
              </p>
              <!-- TODO: 添加节日提醒 -->
              <!-- <div class="holiday" v-if="data.day === '2022-04-20'">春节快乐</div>
              <div class="holiday" v-if="data.day === '2022-05-20'">程序员节</div> -->
            </div>
          </div>
        </template>
      </el-calendar>
      <div class="detailList">
        <div class="detailHead">
          最新日程：
          <span>{{ currentDay }}</span>
        </div>
        <div class="meetList" :style="{ height: calendarHeight - 1 + 'px' }">
          <div v-if="isMeeting" class="demo-collapse">
            <el-collapse
              v-model="activeName"
              accordion
              @change="changeCollapse()"
            >
              <div
                v-for="(item, index) in renderData.timeData"
                :key="item.id"
                class="collapse-box"
              >
                <el-collapse-item :name="index">
                  <template #title>
                    <div class="meet-item">
                      <div class="meet-left">
                        <div class="left-top">
                          <p class="meet-name">{{ item.name || item.title }}</p>
                          <p v-if="item.activity_category" class="introduce">
                            {{ titleList[item.activity_category + 1] }}
                          </p>
                          <p v-else class="introduce">会议</p>
                        </div>
                        <div
                          v-if="item.schedules"
                          class="more-detail"
                          @click.stop="goDetail(index)"
                        >
                          了解更多
                          <o-icon @click="changeMonth(2)">
                            <icon-arrow-right></icon-arrow-right>
                          </o-icon>
                        </div>
                        <div
                          v-if="item.group_name"
                          class="group-name more-detail"
                        >
                          SIG组: {{ item.group_name }}
                        </div>
                      </div>
                      <div class="item-right">
                        <div class="detail-time">
                          <span class="start-time">{{
                            item.startTime || item.start_date
                          }}</span>
                          <span class="end-time">{{
                            item.endTime || item.end_date
                          }}</span>
                        </div>
                        <div class="extend">
                          <o-icon
                            :class="{
                              reversal:
                                isCollapse && activeName == index.toString(),
                            }"
                          >
                            <icon-down></icon-down>
                          </o-icon>
                        </div>
                      </div>
                    </div>
                  </template>
                  <div class="meet-detail">
                    <template v-for="keys in detailItem" :key="keys.key">
                      <div
                        v-if="isValidKey(keys.key, item) && item[keys.key]"
                        class="meeting-item"
                      >
                        <div class="item-title">{{ keys.text }}:</div>
                        <p
                          v-if="
                            !keys.isLink &&
                            keys.key !== 'activity_type' &&
                            keys.key !== 'date'
                          "
                        >
                          {{ item[keys.key] }}
                        </p>
                        <p
                          v-else-if="
                            keys.isLink &&
                            item[keys.key] &&
                            !(item[keys.key] as string).startsWith('http')
                          "
                        >
                          {{ item[keys.key] }}
                        </p>
                        <a
                          v-else-if="keys.isLink"
                          :href="item[keys.key]"
                          target="_blank"
                          >{{ item[keys.key] }}</a
                        >
                        <p
                          v-else-if="
                            keys.key === 'activity_type' && item.activity_type
                          "
                        >
                          {{ activityType[item.activity_type - 1] }}
                        </p>
                        <p v-else>{{ currentDay }}</p>
                      </div>
                    </template>
                  </div>
                </el-collapse-item>
              </div>
            </el-collapse>
          </div>
          <div v-else class="empty">今日暂无日程安排</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
a {
  text-decoration: none;
  color: var(--o-color-brand);
}
p::before,
p::after {
  display: none;
}
.wrapper {
  .calendar-title {
    text-align: center;
    font-size: 36px;
    font-weight: 400;
  }
  .head-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 23px 0;
    .left-title {
      display: flex;
      align-items: center;
      font-size: 16px;
      .o-icon {
        font-size: 24px;
        color: rgb(206, 206, 206);
      }
    }
    .month-date {
      padding: 0 8px;
    }
    @media screen and (max-width: 1000px) {
      .left-title {
        display: none;
      }
    }
    :deep(.title-list) {
      display: flex;
      .el-tabs__nav-scroll {
        @media screen and (max-width: 1000px) {
          display: flex;
          justify-content: center;
        }
      }
      .el-tabs__item {
        font-size: 16px;
        @media screen and (max-width: 1000px) {
          font-size: 14px;
        }
      }
      .el-tabs__nav-wrap::after {
        display: none;
      }
      .title-item {
        cursor: pointer;
        padding: 12px;
        &:hover {
          color: var(--o-color-brand);
        }
      }
      .active {
        background-color: var(--o-color-brand);
        color: #fff !important;
      }
    }
    .o-icon {
      cursor: pointer;
      font-size: 18px;
      font-weight: 700;
      color: #000;
      transition: color 0.2s;
      &:hover {
        color: var(--o-color-brand);
        svg {
          color: var(--o-color-brand_hover);
          fill: var(--o-color-brand_hover);
        }
      }
    }
  }
  .main-body {
    display: flex;
    :deep(.el-collapse-item__content) {
      padding: 0;
    }
    .collapse-box-mo {
      .left-title {
        display: none;
      }
    }
    @media screen and (max-width: 1000px) {
      .collapse-box-mo {
        .el-collapse-item {
          padding: 0 8px;
          width: 345px;
          .el-collapse-item__content {
            padding: 0;
          }
          .meet-detail {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .left-title {
              display: flex;
              padding: 8px 64px;
              align-items: center;
              justify-content: space-between;
              svg {
                cursor: pointer;
                width: 16px;
              }
            }
          }
        }
        .mo-collapse {
          display: flex;
          align-items: center;
          width: 100%;
          svg {
            width: 16px;
          }
          .month-date {
            padding-left: 8px;
            font-size: 12px;
            color: #000;
            line-height: 16px;
          }
        }
      }
      .el-icon-arrow-right {
        font-weight: 700;
        transform: rotate(90deg);
        &::before {
          color: #000;
        }
      }
      .el-icon-arrow-right.is-active {
        transform: rotate(270deg);
      }
    }
    :deep(.calender) {
      max-width: 500px;
      text-align: center;
      .el-calendar__header {
        display: none;
        .el-button-group {
          display: none;
        }
      }
      thead {
        th {
          text-align: center;
        }
        background-color: var(--o-color-bg3);
      }
      @media screen and (max-width: 1000px) {
        display: none;
      }

      .is-today {
        .el-calendar-day {
          .day-box {
            color: #555555;
            background-color: var(--o-color-bg3);
          }
        }
      }
      .is-selected {
        color: white;
        .el-calendar-day {
          .day-box {
            background-color: var(--o-color-brand);
          }
        }
      }
      .el-calendar__body {
        padding: 0;
        .el-calendar-table__row {
          -moz-user-select: none; /*火狐*/
          -webkit-user-select: none; /*webkit浏览器*/
          -ms-user-select: none; /*IE10*/
          -khtml-user-select: none; /*早期浏览器*/
          user-select: none;
          font-size: 12px;
          .el-calendar-day {
            display: flex;
            justify-content: center;
            padding: 0;
            height: 66px;
            .out-box {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
            }
            .be-active {
              position: relative;
              overflow: hidden;
            }
            .be-active::after {
              position: absolute;
              top: -6px;
              right: -6px;
              content: '';
              width: 20px;
              height: 20px;
              border-radius: 0 0 0 20px;
              background-color: var(--o-color-brand_hover);
              @media screen and (max-width: 1000px) {
                width: 12px;
                height: 12px;
                top: -4px;
                right: -4px;
                border-radius: 0 0 0 12px;
              }
            }
            .day-box {
              display: flex;
              box-sizing: border-box;
              justify-content: center;
              width: 32px;
              height: 32px;
              border-radius: 50%;
              align-items: center;
              .date-calender {
                line-height: 21px;
                font-size: 16px;
              }
            }
          }
          @media screen and (max-width: 1000px) {
            .el-calendar-day {
              // width: 32px;
              height: 47px;
              .day-box {
                .date-calender {
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
    .calender-mo {
      display: none;
      @media screen and (max-width: 1000px) {
        display: flex;
        .calender {
          display: block;
        }
        thead {
          th {
            padding: 7px 0;
            font-size: 12px;
          }
        }
        tbody {
          width: 300px;
        }
        tr {
          td {
            border: none;
            justify-content: center;
          }
        }
        .current {
          flex-direction: column;
          justify-content: center;
        }
      }
    }
    :deep(.detailList) {
      width: 100%;
      .detailHead {
        padding: 12px 0 13px;
        text-align: center;
        color: #555555;
        background-color: var(--o-color-bg3);
        @media screen and (max-width: 1000px) {
          padding: 8px 0;
          font-size: 12px;
        }
      }
      .el-collapse {
        border: none;
        --el-collapse-header-height: 96px;
        .collapse-box:last-child {
          .el-collapse-item {
            margin-bottom: 0;
          }
        }
        .el-collapse-item {
          margin-bottom: 8px;
          .el-collapse-item__header {
            display: block;
            border: none;
            height: 100%;
          }
        }
        .el-collapse-item__wrap {
          border: none;
          padding: 0 24px;
          background-color: #eef0f4;
          @media screen and (max-width: 1000px) {
            background-color: #f5f6f8;
          }
        }
      }
      .meetList {
        padding: 8px 0 0 8px;
        height: 402px;
        background-color: #fff;
        border-right: 1px solid #e5e8f0;
        border-bottom: 1px solid #e5e8f0;
        overflow-y: scroll;
        @media screen and (max-width: 1000px) {
          padding: 8px;
          height: fit-content;
          overflow: auto;
        }
        &::-webkit-scrollbar-track {
          border-radius: 4px;
          background-color: #fff;
        }

        &::-webkit-scrollbar {
          width: 6px;
          background-color: #fff;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background: #ccc;
        }
        .el-collapse-item__arrow {
          display: none;
        }
        .el-collapse-item__content {
          padding-bottom: 0;
          @media screen and (max-width: 1000px) {
            font-size: 12px;
          }
        }
        .meet-item {
          display: flex;
          justify-content: space-between;
          padding: 16px 24px;
          width: 100%;
          height: 100%;
          background-color: #f5f6f8ff;
          border: 1px solid #e5e8f0;
          border-left: 1px solid #406fe7ff;
          .meet-left {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: left;
            .left-top {
              display: flex;
              align-items: center;
              .meet-name {
                margin-right: 16px;
                max-width: 400px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 18px;
                color: #000;
                line-height: 24px;
              }
              .el-collapse-item__content {
                padding: 0 20px;
              }
              p {
                margin: 0;
                height: fit-content;
                justify-content: center;
                align-items: center;
                line-height: normal;
              }
              // .introduce {
              //   padding: 1px 7px;
              //   display: -webkit-box;
              //   -webkit-box-orient: vertical;
              //   -webkit-line-clamp: 1;
              //   overflow: hidden;
              //   color: #fff;
              //   background: linear-gradient(225deg, #feb32a 0%, #f6d365 100%);
              // }
            }
            .more-detail {
              display: flex;
              flex-shrink: 0;
              align-items: center;
              width: fit-content;
              height: 24px;
              font-size: 16px;
              line-height: 24px;
              .o-icon {
                margin: 0 5px;
                color: var(--o-color-brand);
                font-size: 24px;
                transition: all 0.3s;
                svg {
                  color: #0d8dff;
                }
              }
              &:hover {
                .o-icon {
                  transform: translateX(5px);
                }
              }
            }
          }
          .item-right {
            display: flex;
            font-size: 14px;

            .detail-time {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              padding: 0 24px;
              font-weight: normal;
              text-align: center;
              font-size: 16px;
              span {
                line-height: 15px;
              }
            }
            .extend {
              display: flex;
              align-items: center;
              width: 24px;
              .o-icon {
                font-size: 28px;
                color: #555;
                transition: all 0.3s;
              }
              .reversal {
                transform: rotate(180deg);
              }
            }
          }
          @media screen and (max-width: 1000px) {
            background-color: #fff;
            padding: 12px;
            border-left-width: 2px;
            .meet-left {
              max-width: 230px;
              .left-top {
                .meet-name {
                  font-size: 14px;
                  font-weight: 700;
                }
              }
              .group-name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 12px;
                color: #555;
              }
            }
            .item-right {
              .detail-time {
                flex-direction: row;
                align-items: flex-end;
                padding: 0 7px;
                font-size: 12px;
              }
              .extend {
                align-items: flex-end;
                .o-icon {
                  font-size: 16px;
                }
              }
            }
          }
        }
        .meet-detail {
          color: #555555;
          padding-top: 10px;
          .meeting-item {
            display: flex;
            padding-bottom: 8px;
            line-height: 18px;
            word-break: break-all;
            .item-title {
              flex-shrink: 0;
              width: 90px;
            }
            // .meet-title {
            //   width: 90px;
            // }
            .creator {
              display: flex;
              align-items: center;
              .head-logo {
                width: 60px;
                border-radius: 50%;
                overflow: hidden;
              }
              .creator-name {
                padding-left: 15px;
                font-size: 14px;
              }
            }
          }
        }
      }
      .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        img {
          width: 300px;
          min-height: 300px;
        }
        p {
          transform: translateY(-200%);
        }
      }
    }
  }
  @media screen and (max-width: 1000px) {
    .head-title {
      flex-direction: column;
      padding: 0;
    }
    .main-body {
      margin: 0 auto;
      width: 345px;
      align-items: center;
      flex-direction: column;
      background-color: #fff;
    }
  }
}
</style>
