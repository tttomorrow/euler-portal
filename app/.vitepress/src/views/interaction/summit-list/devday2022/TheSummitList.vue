<script setup lang="ts">
import { useI18n } from '@/i18n';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import TheSummitGuests from './TheSummitGuests.vue';
import TheSummitScheduler from './TheSummitScheduler.vue';
import TheSummitVideo from './TheSummitVideo.vue';

import banner from '@/assets/banner-secondary.png';
import summit from '@/assets/category/summit/header.png';
import NiGuangNan from '@/assets/category/summit/guests/niguangnan.png';
import SunWenLong from '@/assets/category/summit/guests/sunwenlong.png';
import JiangDaYong from '@/assets/category/summit/guests/jiangdayong.png';
import WuYanJun from '@/assets/category/summit/guests/wuyanjun.png';
import HanNaiPing from '@/assets/category/summit/guests/hannaiping.png';
import HuXinWei from '@/assets/category/summit/guests/huxinwei.png';
import QiuChengFeng from '@/assets/category/summit/guests/qiuchengfeng.png';
import GuangXiaoMing from '@/assets/category/summit/guests/guangxiaoming.png';
import LiKang from '@/assets/category/summit/guests/likang.png';
import ZhongXin from '@/assets/category/summit/guests/zhongxin.png';
import ZhouHaiPeng from '@/assets/category/summit/guests/zhouhaipeng.png';
import LiuKai from '@/assets/category/summit/guests/liukai.png';
import XiongWei from '@/assets/category/summit/guests/xiongwei.png';
import CaoWenYuan from '@/assets/category/summit/guests/caowenyuan.png';
import ChenHui from '@/assets/category/summit/guests/chenhui.png';
import ChenQiang from '@/assets/category/summit/guests/chenqiang.png';
import huawei from '@/assets/category/summit/cooperate/huawei.png';
import qilin from '@/assets/category/summit/cooperate/qilin.png';
import suse from '@/assets/category/summit/cooperate/suse.png';
import tongxin from '@/assets/category/summit/cooperate/tongxin.png';
import xinan from '@/assets/category/summit/cooperate/xinan.png';
import puhua from '@/assets/category/summit/cooperate/puhua.png';
import intel from '@/assets/category/summit/cooperate/intel.png';
import isoft from '@/assets/category/summit/cooperate/isoft.png';
import turbolinux from '@/assets/category/summit/cooperate/turbolinux.png';
import zhongke from '@/assets/category/summit/cooperate/zhongke.png';
import iscas from '@/assets/category/summit/cooperate/iscas.png';
import phytium from '@/assets/category/summit/cooperate/phytium.png';
import tongtech from '@/assets/category/summit/cooperate/tongtech.png';
import fusion from '@/assets/category/summit/cooperate/fusion.png';
import yunhe from '@/assets/category/summit/cooperate/yunhe.png';

const i18n = useI18n();

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
  {
    img: LiKang,
    name: '李康',
    position: ['中国移动', '在线营销服务中心副总经理'],
  },
  {
    img: ZhongXin,
    name: '钟忻',
    position: ['联通云CTO'],
  },
  {
    img: ZhouHaiPeng,
    name: '周海鹏',
    position: ['中信IT资深架构师'],
  },
  {
    img: LiuKai,
    name: '刘凯',
    position: ['上交所技术公司', '下一代交易研发部副总经理'],
  },
  {
    img: XiongWei,
    name: '熊伟',
    position: ['openEuler社区技术委员会委员'],
  },
  {
    img: CaoWenYuan,
    name: '曹文渊',
    position: ['统信软件研发工程师'],
  },
  {
    img: ChenHui,
    name: '陈辉',
    position: ['华为调度架构师'],
  },
  {
    img: ChenQiang,
    name: '陈强',
    position: ['华为大数据技术专家'],
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
        <TheSummitScheduler :agenda-data="i18n.summit.AGENDA" />
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
            <a><img src="@/assets/category/summit/cooperate/openatom.png" /></a>
            <a
              ><img src="@/assets/category/summit/cooperate/openEulerlogo.png"
            /></a>
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
              <a
                v-for="item in i18n.summit.REVIEWLIST"
                :key="item.TITLE"
                :href="item.ADDRESS"
                target="_blank"
                class="foot-construction-review-list-item"
              >
                <img src="@/assets/category/summit/icon-live.png" />
                <p>{{ item.TITLE }}</p>
              </a>
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
      max-width: 1400px;
      margin: 0 auto;
      &-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-row-gap: var(--o-spacing-h4);
        align-items: center;
        justify-content: center;
        @media (max-width: 1080px) {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 780px) {
          grid-template-columns: 1fr;
          width: 320px;
          margin: 0 auto;
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
          @media (max-width: 1280px) {
            width: 350px;
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
