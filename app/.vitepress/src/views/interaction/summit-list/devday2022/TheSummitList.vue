<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '@/i18n';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import TheSummitGuests from './TheSummitGuests.vue';
import TheSummitScheduler from './TheSummitScheduler.vue';
import TheSummitVideo from './TheSummitVideo.vue';

import banner from '@/assets/banner-secondary.png';
import summit from '@/assets/interaction/summit.png';
import NiGuangNan from '@/assets/summit-guests/niguangnan.png';
import SunWenLong from '@/assets/summit-guests/sunwenlong.png';
import JiangDaYong from '@/assets/summit-guests/jiangdayong.png';
import WuYanJun from '@/assets/summit-guests/wuyanjun.png';
import HanNaiPing from '@/assets/summit-guests/hannaiping.png';
import HuXinWei from '@/assets/summit-guests/huxinwei.png';
import QiuChengFeng from '@/assets/summit-guests/qiuchengfeng.png';
import GuangXiaoMing from '@/assets/summit-guests/guangxiaoming.png';
import huawei from '@/assets/interaction/huawei.png';
import qilin from '@/assets/interaction/qilin.png';
import suse from '@/assets/interaction/suse.png';
import tongxin from '@/assets/interaction/tongxin.png';
import xinan from '@/assets/interaction/xinan.png';
import puhua from '@/assets/interaction/puhua.png';
import intel from '@/assets/interaction/intel.png';
import isoft from '@/assets/interaction/isoft.png';
import turbolinux from '@/assets/interaction/turbolinux.png';
import zhongke from '@/assets/interaction/zhongke.png';
import iscas from '@/assets/interaction/iscas.png';
import phytium from '@/assets/interaction/phytium.png';
import tongtech from '@/assets/interaction/tongtech.png';
import fusion from '@/assets/interaction/fusion.png';
import yunhe from '@/assets/interaction/yunhe.png';

const i18n = computed(() => useI18n());

const lecturerList = [
  {
    img: NiGuangNan,
    name: '倪光南',
    position: ['中国工程院院士'],
  },
  {
    img: SunWenLong,
    name: '孙文龙',
    position: ['开放原子开源基金会秘书长'],
  },
  {
    img: JiangDaYong,
    name: '江大勇',
    position: ['openEuler社区理事长'],
  },
  {
    img: WuYanJun,
    name: '武延军',
    position: ['openEuler社区副理事长'],
  },
  {
    img: HanNaiPing,
    name: '韩乃平',
    position: ['openEuler社区副理事长'],
  },
  {
    img: HuXinWei,
    name: '胡欣蔚',
    position: ['openEuler社区', '技术委员会主席'],
  },
  {
    img: QiuChengFeng,
    name: '邱成锋',
    position: ['openEuler社区秘书长'],
  },
  {
    img: GuangXiaoMing,
    name: '广小明',
    position: ['天翼云科技有限公司', '副总经理兼首席技术官'],
  },
];
const cooperateList = [
  {
    img: huawei,
  },
  {
    img: qilin,
  },
  {
    img: suse,
  },
  {
    img: tongxin,
  },
  {
    img: xinan,
  },
  {
    img: puhua,
  },
  {
    img: intel,
  },
];
const sponsorList = [
  {
    img: isoft,
  },
  {
    img: turbolinux,
  },
  {
    img: zhongke,
  },
  {
    img: iscas,
  },
  {
    img: phytium,
  },
  {
    img: tongtech,
  },
  {
    img: fusion,
  },
  {
    img: yunhe,
  },
];
const reviewList = [
  {
    title: 'openEuler Summit 2021',
  },
  {
    title: 'openEuler Developer Day 2021',
  },
  {
    title: 'openEuler Summit 2020',
  },
  {
    title: 'openEuler Developer Day 2020',
  },
];
</script>

<template>
  <div class="main">
    <header>
      <div class="banner">
        <BannerLevel2
          :background-image="banner"
          background-text="INTERACTION"
          title="峰会"
          :illustration="summit"
        />
      </div>
    </header>
    <main class="middle">
      <div class="middle-text">
        <p>
          openEuler Developer Day 2022 （简称 ODD 2022）是开放原子开源基金会的
          openEuler 社区发起的开发者大会。旨在推动 openEuler
          在服务器、云计算、边缘计算和嵌入式四大场景的技术探索和创新。本次 ODD
          2022 正式发布 openEuler 22.03
          全场景长周期版本，展示社区伙伴联合创新成果，分享多行业使用 openEuler
          规模部署的商业案例，举办社区治理机构的线上工作会议。openEuler
          始终与开发者在一起，开创新境，共创未来。
        </p>
      </div>
      <div class="middle-review">
        <p class="headline">REVIEW</p>
        <p class="subtitle">精彩回顾</p>
        <TheSummitVideo :live-data="i18n.summit.LIVEDATA" />
      </div>
      <div class="middle-schedule">
        <p class="headline">ACENDA</p>
        <p class="subtitle">峰会日程</p>
        <TheSummitScheduler />
      </div>
      <div class="middle-guests">
        <p class="headline">ACENDA</p>
        <p class="subtitle">演讲嘉宾</p>
        <TheSummitGuests
          :lecturer-list="lecturerList"
          shape="circle"
          :web-columns-num="4"
          :mobile-columns-num="2"
        />
      </div>
    </main>
    <footer>
      <div class="foot">
        <div class="foot-construction">
          <p class="headline">RARTNERS</p>
          <p class="subtitle">共建单位</p>
          <div class="foot-construction-guidance">
            <p>主办方</p>
          </div>
          <div class="foot-construction-imglist">
            <a><img src="@/assets/interaction/openatom.png" /></a>
            <a><img src="@/assets/interaction/openEulerlogo.png" /></a>
          </div>
          <div class="foot-construction-company">
            <p>联办单位</p>
            <div class="foot-construction-company-list">
              <div v-for="item in cooperateList" :key="item.img">
                <a><img :src="item.img" /></a>
              </div>
            </div>
          </div>
          <div class="foot-construction-company">
            <p>协办单位</p>
            <div class="foot-construction-company-list">
              <div v-for="item in sponsorList" :key="item.img">
                <a><img :src="item.img" /></a>
              </div>
            </div>
          </div>
          <div class="foot-construction-review">
            <p class="headline">RARTNERS</p>
            <p class="subtitle">精彩回顾</p>
            <div class="foot-construction-review-list">
              <div
                v-for="item in reviewList"
                :key="item.title"
                class="foot-construction-review-list-item"
              >
                <img src="@/assets/interaction/icon-live.png" />
                <p>{{ item.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.banner {
  margin-bottom: var(--o-spacing-h1);
}
.headline {
  color: var(--o-color-text2);
  margin-top: var(--o-spacing-h1);
  font-size: 40px;
  opacity: 0.1;
}
.subtitle {
  color: var(--o-color-text2);
  font-size: var(--o-font-size-h3);
  margin-bottom: var(--o-spacing-h2);
  transform: translateY(-24px);
}
.middle {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 44px;
  @media (max-width: 780px) {
    padding: 0 var(--o-spacing-h7);
    width: 100%;
  }
  &-text {
    color: var(--o-color-text2);
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    @media (max-width: 780px) {
      padding: 0 var(--o-spacing-h4);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-h7);
    }
  }
  &-review {
    text-align: center;
  }
  &-schedule {
    text-align: center;
  }
  &-guests {
    text-align: center;
  }
}
.foot {
  padding: 0 44px;
  &-construction {
    text-align: center;
    &-guidance {
      color: var(--o-color-text2);
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h3);
      margin-bottom: var(--o-spacing-h2);
    }
    &-imglist {
      margin: 0 auto;
      max-width: 1120px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      justify-content: center;
      img {
        cursor: pointer;
        width: 354px;
        height: 120px;
        @media (max-width: 780px) {
          margin-bottom: var(--o-spacing-h4);
        }
      }
    }
    &-company {
      color: var(--o-color-text2);
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h3);
      p {
        margin: var(--o-spacing-h2) 0px;
      }
      &-list {
        display: grid;
        grid-template-columns: 354px 354px 354px 354px;
        align-items: center;
        justify-content: center;
        @media (max-width: 780px) {
          grid-template-columns: 1fr;
        }
      }
    }
    &-review {
      &-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-row-gap: var(--o-spacing-h4);
        align-items: center;
        justify-content: center;
        @media (max-width: 780px) {
          grid-template-columns: 1fr;
        }
        &-item {
          cursor: pointer;
          width: 456px;
          background-color: var(--o-color-bg);
          display: flex;
          color: var(--o-color-brand);
          font-size: var(--o-font-size-h7);
          img {
            margin: var(--o-spacing-h4);
          }
          p {
            margin-top: var(--o-spacing-h4);
          }
          @media (max-width: 780px) {
            width: 354px;
          }
        }
      }
    }
  }
}
</style>
