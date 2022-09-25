<script setup lang="ts">
import { computed } from 'vue';
import AppContext from '@/components/AppContent.vue';
import useWindowResize from '@/components/hooks/useWindowResize';
import SummitBanner from '@/assets/category/summit/summit2022-changsha/summit-banner.png';
import cooperation from '@/assets/category/summit/summit2022-changsha/cooperation.png';
import schedule from '@/assets/category/summit/summit2022-changsha/schedule.png';
import IconTime from '~icons/app/icon-time.svg';

const screenWidth = useWindowResize();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));

const location: any = 'top';
const scheduleList = [
  {
    time: '10:00-10:10',
    agenda: '领导致辞',
  },
  {
    time: '10:10-10:15',
    agenda: '基金会理事长致辞',
    guests: '孙文龙（待确认）',
  },
  {
    time: '10:15-10:20',
    agenda: '领导致辞',
  },
  {
    time: '10:20-10:30',
    agenda: '湖南欧拉生态创新中心成立签约暨揭牌仪式',
  },
  {
    time: '10:30-10:45',
    agenda: '院士演讲',
    guests: '王怀民',
    title: '中国科学院院士',
  },
  {
    time: '10:45-10:55',
    agenda: 'openEuler志高远 开源汇智创未来',
    guests: '江大勇',
    title: 'opeEuler社区理事长',
  },
  {
    time: '10:55-11:05',
    agenda: 'openEuler走进行业，走向世界',
    guests: '熊伟',
    title: 'openEuler社区技术委员会委员',
  },
  {
    time: '11:05-11:20',
    agenda: '携手openEuler ，共推操作系统产业新发展',
    guests: '刘文清',
    title: '麒麟信安总裁',
  },
  {
    time: '11:20-11:30',
    agenda: '欧拉行业用户实践分享',
  },
  {
    time: '11:30-11:35',
    agenda: '湖南欧拉商业企业意向签约仪式',
  },
  {
    time: '11:35-11:40',
    agenda: '欧拉技术创新与产业发展联盟发起仪式',
  },
  {
    time: '11:40-11:50',
    agenda: 'openEuler-开源雨林可信认证项目',
    guests: '高琨',
    title: '华为2012实验室专家',
  },
];
</script>

<template>
  <img :src="SummitBanner" class="banner" />
  <AppContext :mobile-top="16">
    <div class="middle">
      <div class="middle-top">
        <img :src="schedule" class="headline" />
        <div v-show="!isMobile" class="middle-top-context">
          <OTable :data="scheduleList">
            <el-table-column width="200">
              <template #default="scope">
                <div class="active-time">
                  <IconTime class="clock" />
                  <p>{{ scope.row.time }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="600">
              <template #default="scope">
                <p class="agenda">{{ scope.row.agenda }}</p>
              </template>
            </el-table-column>
            <el-table-column width="200">
              <template #default="scope">
                <p class="guests">{{ scope.row.guests }}</p>
              </template>
            </el-table-column>
            <el-table-column width="300">
              <template #default="scope">
                <p class="title">{{ scope.row.title }}</p>
              </template>
            </el-table-column>
          </OTable>
        </div>
        <div v-show="isMobile" class="mo-context">
          <el-timeline>
            <el-timeline-item
              v-for="item in scheduleList"
              :key="item.time"
              :timestamp="item.time"
              :placement="location"
            >
              <div class="mo-context-item">
                <p class="agenda">{{ item.agenda }}</p>
                <div class="context-box">
                  <p class="guests">{{ item.guests }}</p>
                  <p class="title">{{ item.title }}</p>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <div class="middle-bottom">
        <img :src="cooperation" class="headline" />
        <div class="middle-bottom-context">
          <p class="title">指导单位</p>
          <p class="details">
            中共湖南省委网络安全和信息化委员会办公室、湖南省工业和信息化厅、湖南省人民政府国有资产监督管理委员会、湖南湘江新区管委会、开放原子开源基金会
          </p>
          <p class="title">支持单位</p>
          <p class="details">中国软件行业协会、中国计算机学会开源发展委员会</p>
          <p class="title">主办单位</p>
          <p class="details">
            长沙市工业和信息化局、长沙信息产业园管理委员会、openEuler社区
          </p>
          <p class="title">承办单位</p>
          <p class="details">湖南麒麟信安科技股份有限公司、华为技术有限公司</p>
          <p class="title">协办单位</p>
          <p class="details last-details">
            湖南省软件行业协会、湖南省鲲鹏生态创新中心、长沙市移动互联网及应用软件产业链推进办公室、长沙市先进计算及信息安全产业链推进办公室
          </p>
        </div>
      </div>
    </div>
  </AppContext>
</template>

<style scoped lang="scss">
.headline {
  height: 80px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: var(--o-spacing-h2);
  @media (max-width: 768px) {
    height: 38px;
  }
}
.banner {
  width: 100%;
  height: 380px;
  @media (max-width: 1550px) {
    height: 300px;
  }
  @media (max-width: 1080px) {
    height: 200px;
  }
  @media (max-width: 768px) {
    height: 126px;
  }
}
.middle {
  &-top {
    margin: 0 auto;
    background-color: var(--o-color-bg2);
    margin-bottom: var(--o-spacing-h2);
    padding-bottom: var(--o-spacing-h1);
    @media (max-width: 768px) {
      padding-bottom: var(--o-spacing-h5);
    }
    &-context {
      margin-top: var(--o-spacing-h2);
      padding: 0px 80px;
      @media (max-width: 1080px) {
        padding: 0px var(--o-spacing-h3);
      }
      :deep(.el-table__header-wrapper) {
        display: none;
      }
      :deep(.el-table--fit) {
        box-shadow: none;
      }
      .active-time {
        display: flex;
        .clock {
          height: 24px;
          width: 24px;
          margin-right: var(--o-spacing-h8);
        }
        p {
          font-weight: normal;
          color: var(--o-color-neutral5);
          font-size: var(--o-font-size-h6);
          line-height: var(--o-line-height-h6);
        }
      }
      .agenda {
        font-size: var(--o-font-size-h6);
        font-weight: normal;
        color: var(--o-color-text1);
        line-height: var(--o-line-height-text);
      }
      .guests {
        font-size: var(--o-font-size-h6);
        font-weight: normal;
        color: var(--o-color-text1);
        line-height: var(--o-line-height-text);
      }
      .title {
        font-size: var(--o-font-size-h8);
        font-weight: normal;
        color: var(--o-color-neutral5);
        line-height: var(--o-line-height-h8);
      }
    }
    .mo-context {
      margin-top: var(--o-spacing-h6);
      padding: 0 var(--o-spacing-h5);
      :deep(.el-timeline-item__timestamp) {
        color: var(--o-color-brand1);
        font-size: 10px;
        font-weight: 400;
        line-height: 16px;
      }
      :deep(.el-timeline-item__node) {
        background-color: var(--o-color-brand1);
      }
      :deep(.el-timeline-item__tail) {
        border-left: 2px dashed var(--o-color-brand1);
      }
      &-item {
        .agenda {
          padding-top: var(--o-spacing-h8);
          font-size: var(--o-font-size-tip);
          font-weight: 400;
          color: var(--o-color-text1);
          line-height: var(--o-line-height-tip);
        }
        .context-box {
          margin-top: var(--o-spacing-h8);
          display: flex;
          font-size: 10px;
          font-weight: 400;
          color: var(--o-color-neutral5);
          line-height: 16px;
          .guests {
            width: 100px;
          }
        }
      }
    }
  }
  &-bottom {
    margin: 0 auto;
    background-color: var(--o-color-bg2);
    &-context {
      padding: 0px 80px;
      margin-top: var(--o-spacing-h2);
      padding-bottom: var(--o-spacing-h2);
      @media (max-width: 1080px) {
        padding: 0px var(--o-spacing-h3);
      }
      @media (max-width: 768px) {
        padding: 0px var(--o-spacing-h5);
        margin-top: var(--o-spacing-h6);
      }
      .title {
        color: var(--o-color-text1);
        font-size: var(--o-font-size-h5);
        line-height: var(--o-line-height-h5);
        margin-bottom: var(--o-spacing-h4);
        font-weight: 500;
        @media (max-width: 768px) {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          margin-bottom: var(--o-spacing-h8);
        }
      }
      .details {
        color: var(--o-color-neutral5);
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        margin-bottom: var(--o-spacing-h3);
        font-weight: normal;
        @media (max-width: 768px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          margin-bottom: var(--o-spacing-h6);
        }
      }
      .last-details {
        margin-bottom: 0px;
        padding-bottom: 0px;
        @media (max-width: 768px) {
          padding-bottom: var(--o-spacing-h5);
        }
      }
    }
  }
}
</style>
