<script setup lang="ts">
import { computed } from 'vue';
import { useCommon } from '@/stores/common';

import AppContext from '@/components/AppContent.vue';
// import SummitSchedule from './components/SummitSchedule.vue';

import banner from '@/assets/category/summit/summit2022/banner.jpg';
import bannerMo from '@/assets/category/summit/summit2022/banner-mo.png';
import liveLight from '@/assets/category/summit/summit2022/live.png';
import liveDark from '@/assets/category/summit/summit2022/live-dark.png';
import show from '@/assets/category/summit/summit2022/show.png';
import sponsor from '@/assets/category/summit/summit2022/sponsor.png';
import topic from '@/assets/category/summit/summit2022/topic.png';

// import IconTime from '~icons/app/icon-time.svg';

const commonStore = useCommon();
const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLight : liveDark
);
const bannerInfo = {
  pc_banner: banner,
  mo_banner: bannerMo,
};
const summitData: any = {
  detail:
    'openEuler Summit 是由欧拉开源社区发起并举办的年度开源操作系统峰会。openEuler专注核心技术和全场景能力创新，构建多样性计算支持最佳的基础软件能力。充分释放开源协作的创新活力，通过开源开放，不断探索科技创新的边界，驱动物理世界与数字世界的深度融合。openEuler与社区伙伴持续构建自循环、自发展的上下游产业链。通过商业验证，提升市场占有率，成为数字基础设施的坚实底座。社区贡献者、行业用户、合作伙伴在 openEuler Summit 汇聚，驱动无止境的创新与拓展，闪耀数字时代星辰大海。',
  contentList: [
    {
      name: '议题征集',
      img: topic,
      link: 'https://shimo.im/forms/uIUX7mRmooIOrGqz/fill',
    },
    {
      name: '赞助征集',
      img: sponsor,
      link: 'https://shimo.im/forms/5EPLjgVMwpMZqAmL/fill',
    },
    {
      name: '展示征集',
      img: show,
      link: 'https://shimo.im/forms/bczTg4tGRAAqYdJD/fill',
    },
  ],
  agenda: {
    title: '会议日程',
    meetingList: [
      {
        daytime: '12月28日 操作系统产业峰会 2022',
        list: [
          {
            type: '上午：主论坛',
            id: 'main',
            children: [
              {
                time: '10:00 - 10:10',
                desc: '开场致辞',
              },
              {
                time: '10:10 - 10:20',
                desc: 'openEuler十大领先商业实践颁奖',
              },
              {
                time: '10:20 - 10:28',
                desc: '院士发言：引领多样性计算的未来',
              },
              {
                time: '10:28 - 10:36',
                desc: '院士发言：未来操作系统发展之路',
              },
              {
                time: '10:36 - 10:44',
                desc: '院士主题报告：基础软件根技术的创新与发展',
              },
              {
                time: '10:44 - 10:52',
                desc: '院士主题报告：中国开源的崛起',
              },
              {
                time: '10:52 - 11:05',
                desc: 'openEuler主题演讲：共创开源新模式 ，共启欧拉新征程',
              },
              {
                time: '11:05 - 11:25',
                desc: '操作系统实践案例分享',
              },
              {
                time: '11:25 - 11:30',
                desc: '操作系统人才发展加速计划发布',
              },
            ],
          },
          {
            type: '下午：分论坛',
            id: 'other',
            duration: '14:00 - 17:00',
            children: [
              {
                id: 0,
                name: '麒麟软件',
                desc: 'openEuler Summit 2022',
              },
              {
                id: 1,
                name: '麒麟信安',
                desc: 'openEuler Summit 2022',
              },
              {
                id: 2,
                name: '统信软件',
                desc: 'openEuler Summit 2022',
              },
              {
                id: 3,
                name: '软通动力',
                desc: 'openEuler Summit 2022',
              },
              {
                id: 4,
                name: '中科创达',
                desc: 'openEuler Summit 2022',
              },
            ],
          },
        ],
      },
      {
        daytime: '12月29日 openEuler Summit 2022',
        list: [
          {
            type: '上午：主论坛',
            id: 'main',
            // time: '上午',
            children: [
              {
                time: '09:30 - 09:35',
                desc: '基金会领导致辞',
              },
              {
                time: '09:35 - 09:45',
                desc: ' openEuler社区进展主题演讲',
              },
              {
                time: '09:45 - 09:50',
                desc: 'openEuler社区理事会换届升级仪式',
              },
              {
                time: '09:50 - 10:40',
                desc: '技术创新、重磅发布、场景演示',
              },
              {
                time: '10 :40-11 :25',
                desc: 'openEuler商用案例实践分享',
              },
              {
                time: '11:25 - 11:30',
                desc: 'openEuler2022年度开源贡献之星颁奖',
              },
            ],
          },
          {
            type: '下午：分论坛',
            id: 'other',
            // time: '下午',
            duration: '14:00 - 17:00',
            children: [
              {
                id: 0,
                name: '内核',
                desc: 'openEuler Summit 2022',
              },
              {
                id: 1,
                name: '多样性计算&编译器',
                desc: 'openEuler Summit 2022',
              },
              {
                id: 2,
                name: '虚拟化&云原生',
                desc: 'openEuler Summit 2022',
              },
              {
                id: 3,
                name: '嵌入式&ROS',
                desc: 'openEuler Summit 2022',
              },
              {
                id: 4,
                name: 'RISC-V',
                desc: 'openEuler Summit 2022',
              },
              {
                id: 5,
                name: '迁移&运维',
                desc: 'openEuler Summit 2022',
              },
              {
                id: 6,
                name: '用户&开发者体验',
                desc: 'openEuler Summit 2022',
              },
            ],
          },
        ],
      },
      // {
      //   daytime: '12月29日 (openGauss Summit 2022)',
      //   list: [
      //     {
      //       type: '主论坛',
      //       id: 'main',
      //       time: '上午',
      //       children: [
      //         {
      //           time: '09:30 - 09:35',
      //           desc: '院士致辞',
      //         },
      //         {
      //           time: '09:35 - 09:45',
      //           desc: 'openGauss社区进展主题演讲',
      //         },
      //         {
      //           time: '09:45 - 09:50',
      //           desc: 'openGauss社区理事会升级仪式',
      //         },
      //         {
      //           time: '09:50 - 10:10',
      //           desc: 'openGauss技术创新主题演讲',
      //         },
      //         {
      //           time: '10:10 - 10:25',
      //           desc: '中国移动移动创新实践及成果发布仪式',
      //         },
      //         {
      //           time: '10:25 - 10:55',
      //           desc: '产学研联合创新、openGauss创新孵化成果分享',
      //         },
      //         {
      //           time: '10:55 - 11:55',
      //           desc: '伙伴与用户应用实践联合演讲',
      //         },
      //         {
      //           time: '11:55 - 12:00',
      //           desc: 'openGauss社区活动发布仪式',
      //         },
      //       ],
      //     },
      //     {
      //       type: '分论坛',
      //       id: 'other',
      //       time: '下午',
      //       duration: '14:00 - 16:00',
      //       children: [
      //         {
      //           id: 0,
      //           name: '海量数据',
      //           desc: 'openEuler Summit 2022',
      //         },
      //         {
      //           id: 1,
      //           name: '云和恩墨',
      //           desc: 'openEuler Summit 2022',
      //         },
      //         {
      //           id: 2,
      //           name: '南大通用',
      //           desc: 'openEuler Summit 2022',
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  },
  previous: {
    title: '精彩回顾',
    list: [
      {
        name: '湖南欧拉操作系统生态大会',
        link: '/zh/interaction/summit-list/summit2022-changsha/',
        target: '_blank',
      },
      {
        name: 'openEuler Developer Day 2022',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/devday2022/',
        target: '_blank',
      },
      {
        name: 'openEuler Summit 2021',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/summit2021/',
        target: '_blank',
      },
      {
        name: 'openEuler Developer Day 2021',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/devday2021/',
        target: '_blank',
      },
      {
        name: 'openEuler Summit 2020',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/',
        target: '_blank',
      },
      {
        name: 'openEuler Virtual Summit 2020',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/list/',
        target: '_blank',
      },
    ],
  },
};
// const tabType = ref(['main', 'main', 'main']);
// const otherTabType = ref([0, 0, 0]);
// const timeContent = ref(0);
</script>
<template>
  <div class="banner">
    <div
      class="summit-banner-pc"
      :style="`background-image:url(${bannerInfo.pc_banner}) ;`"
    ></div>
    <div class="summit-banner-mo">
      <img :src="bannerInfo.mo_banner" alt="" />
    </div>
  </div>

  <AppContext>
    <div class="detail">{{ summitData.detail }}</div>
    <div class="call-content">
      <a
        v-for="item in summitData.contentList"
        :key="item.link"
        class="content-item"
        :href="item.link"
        target="_blank"
      >
        <img :src="item.img" :alt="item.name" />
      </a>
    </div>
    <!-- <div class="agenda">
      <h3>{{ summitData.agenda.title }}</h3>
      <div
        v-for="(item, index) in summitData.agenda.meetingList"
        :key="item.daytime"
        class="agenda-item"
      >
        <h4 class="meetingtitle">
          {{ item.daytime }}
        </h4>
        <OTabs v-model="tabType[index]" class="schedule-tabs">
          <el-tab-pane
            v-for="itemList in summitData.agenda.meetingList[0].list"
            :key="itemList.id"
            :name="itemList.id"
          >
            <template #label>
              <div class="timeTabs">
                {{ itemList.type }}
              </div>
            </template>
          </el-tab-pane>
        </OTabs>
        <OContainer :level-index="1">
          <div
            class="schedule-item"
            :class="{ isShow: tabType[index] === 'main' }"
          >
            <SummitSchedule
              :options="summitData.agenda.meetingList[index].list[0].children"
            />
          </div>
          <div
            class="schedule-item other"
            :class="{ isShow: tabType[index] === 'other' }"
          >
            <OTabs v-model="otherTabType[index]" class="other-tabs">
              <OTabPane
                v-for="itemList in summitData.agenda.meetingList[index].list[1]
                  .children"
                :key="itemList.id"
                :label="itemList.name"
                :name="itemList.id"
              >
                <p class="other-text">
                  <IconTime />{{
                    summitData.agenda.meetingList[index].list[1].duration
                  }}
                </p>
              </OTabPane>
            </OTabs>
          </div>
        </OContainer>
      </div>
    </div> -->
    <div class="previous">
      <div class="previous-title">
        <h3>{{ summitData.previous.title }}</h3>
        <img :src="liveImg" alt="live" />
      </div>
      <div class="link-box">
        <a
          v-for="item in summitData.previous.list"
          :key="item.link"
          :href="item.link"
          :target="item.target"
          >{{ item.name }}</a
        >
      </div>
    </div>
  </AppContext>
</template>
<style scoped lang="scss">
.dark img,
.dark .banner {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.banner {
  width: 100%;
  .summit-banner-pc {
    height: 380px;
    margin: 0 auto;
    background: no-repeat center/cover;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .summit-banner-mo {
    display: none;

    @media screen and (max-width: 768px) {
      width: 100%;
      display: block;
      img {
        width: 100%;
      }
    }
  }
}
.detail {
  font-size: var(--o-font-size-h6);
  line-height: var(--o-line-height-h6);
  color: var(--o-color-text1);
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
}
.call-content {
  margin: var(--o-spacing-h2) auto 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--o-spacing-h4);
  @media screen and (max-width: 968px) {
    grid-template-columns: repeat(1, 1fr);
    max-width: 474px;
    gap: var(--o-spacing-h5);
  }
  .content-item {
    width: 100%;
    display: block;
    width: 100%;
    box-shadow: var(--o-shadow-l2);
    &:hover {
      box-shadow: var(--o-shadow-l2_hover);
      @media screen and (max-width: 1100px) {
        box-shadow: var(--o-shadow-l2);
      }
    }
    img {
      width: 100%;
    }
  }
}
.agenda {
  margin-top: var(--o-spacing-h1);
  @media (max-width: 767px) {
    margin-top: var(--o-spacing-h2);
  }
  h3 {
    text-align: center;
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    color: var(--o-color-text1);
    font-weight: 300;
    @media (max-width: 767px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }
  .agenda-item {
    margin-top: var(--o-spacing-h2);
    @media (max-width: 767px) {
      margin-top: var(--o-spacing-h4);
    }
    .meetingtitle {
      font-weight: 400;
      color: var(--o-color-text1);
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h6);
      text-align: center;
      margin-bottom: 24px;
      @media (max-width: 767px) {
        margin-bottom: 12px;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
    .schedule-tabs {
      text-align: center;
      margin-top: 24px;
      :deep(.el-tabs__nav) {
        float: none;
        display: inline-block;
        .el-tabs__active-bar {
          display: none;
        }
        .el-tabs__item {
          padding: 0;
        }
      }
      .timeTabs {
        display: inline-block;
        margin: 0 0 24px;
        cursor: pointer;
        border: 1px solid var(--o-color-border2);
        color: var(--o-color-text1);
        width: 120px;
        text-align: center;
        background: var(--o-color-bg2);
        font-size: var(--o-font-size-text);
        line-height: 38px;
        padding: 0 var(--o-spacing-h5);
        @media (max-width: 1100px) {
          font-size: var(--o-font-size-tip);
          padding: 0 var(--o-spacing-h6);
        }
      }

      .is-active .timeTabs {
        color: #fff;
        background: var(--o-color-brand1);
        border-color: var(--o-color-brand2);
      }
      .other-tabs {
        margin-bottom: 24px;
        :deep(.el-tabs__nav) {
          float: none;
          display: inline-block;
          @media (max-width: 1100px) {
            line-height: 44px;
          }
        }
        :deep(.el-tabs__header) {
          text-align: center;
          .el-tabs__item {
            @media (max-width: 1100px) {
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
            }
          }
        }
      }
    }
    .schedule-item {
      display: none;
      padding: 24px;
      @media (max-width: 1100px) {
        padding: 16px;
      }
      &.isShow {
        display: block;
      }
      &.other {
        :deep(.el-tabs__nav-scroll) {
          text-align: center;
        }
        :deep(.el-tabs__nav) {
          float: none;
          display: inline-block;
          @media (max-width: 1100px) {
            line-height: 44px;
          }
        }
        .other-text {
          margin: 24px auto 0 auto;
          color: var(--o-color-text1);
          font-size: var(--o-font-size-h7);
          line-height: var(--o-line-height-h7);
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          @media (max-width: 1100px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            margin: 16px 0;
          }
          svg {
            margin-right: var(--o-spacing-h8);
          }
        }
        // 消除分论坛分类的选中状态 start
        :deep(.o-tabs) {
          &.el-tabs .el-tabs__nav-wrap .el-tabs__item {
            &.is-active {
              color: var(--o-color-text1);
            }
            &.is-top {
              &:hover {
                color: var(--o-color-text1);
                cursor: default;
              }
            }
          }
          .el-tabs__active-bar {
            display: none;
          }
        }
        // 消除分论坛分类的选中状态 end
      }
    }
  }
}
.previous {
  margin-top: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h4);
  }
  .previous-title {
    display: flex;
    h3 {
      font-size: 26px;
      line-height: 30px;
      color: var(--o-color-text1);
      margin-right: var(--o-spacing-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        margin-right: var(--o-spacing-h7);
      }
    }
    img {
      @media screen and (max-width: 768px) {
        width: 22px;
      }
    }
  }

  .link-box {
    margin-top: var(--o-spacing-h3);
    display: flex;
    width: 318px;
    flex-wrap: wrap;
    @media screen and (max-width: 768px) {
      width: 172px;
      margin-top: var(--o-spacing-h6);
    }
    a {
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
      & + a {
        margin-top: var(--o-spacing-h4);
        @media screen and (max-width: 768px) {
          margin-top: var(--o-spacing-h8);
        }
      }
    }
  }
}
</style>
