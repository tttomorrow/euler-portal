<script lang="ts" setup>
import { showGuard, getUserAuth } from '@/shared/login';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContext from '@/components/AppContent.vue';

import banner from '@/assets/category/celebrating/banner.jpg';
import illustration from '@/assets/category/celebrating/illustration.png';
import giftImg from '@/assets/category/celebrating/gift.png';
import downIllImg1 from '@/assets/category/celebrating/down-ill1.png';
import downIllImg2 from '@/assets/category/celebrating/down-ill2.png';

const { token } = getUserAuth();
const data = {
  title: '下载体验openEuler赢开源三周年纪念礼包！',
  detail: [
    'openEuler 于2019年12月31日正式开源，三年来快速成长，吸引上万开发者加入，迭代了6个版本，已有上百万用户，成为国计民生行业首选的开源操作系统。作为一个面向数字基础设施的开源操作系统，openEuler 已支持服务器、 云计算、边缘计算、嵌入式等应用场景，支持多样性计算，致力于提供安全、稳定、易用的操作系统。',
    '值Celebrating 3 years of openEuler 庆典活动之际，邀您来下载体验openEuler，即有机会获得openEuler 开源三周年纪念礼包！',
  ],
  rule: {
    title: '抽奖规则',
    ruleList: [
      '•  点击下载按钮下载体验openEuler，后台将给参与本次活动的用户按照下载顺序排序，排序尾号为3的朋友即为中奖者，例如从参与本次活动的第1位下载用户计算，第xx3位下载的用户即为中奖者。（限前2000位）',
      '•  奖品为Celebrating 3 years of openEuler定制礼包一份，获奖名单将于12月30日在本页面公示，并邮件提示中奖者。',
    ],
  },
  down: {
    title: '即刻体验openEuler',
    btn: '下载赢好礼',
  },
};
function clickDownBtn() {
  if (token) {
  } else {
    showGuard();
  }
}
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    :title="data.title"
    :illustration="illustration"
  ></BannerLevel2>
  <AppContext>
    <div class="celebrating">
      <div class="detail">
        <p v-for="item in data.detail" :key="item">{{ item }}</p>
      </div>
      <div class="rule">
        <h3>{{ data.rule.title }}</h3>
        <div class="rule-list">
          <p v-for="item in data.rule.ruleList" :key="item">{{ item }}</p>
        </div>
      </div>
      <div class="down">
        <div class="left">
          <img :src="downIllImg1" alt="" />
          <p>{{ data.down.title }}</p>
        </div>
        <div class="right">
          <OButton
            class="down-btn"
            type="primary"
            animation
            @click="clickDownBtn"
            >{{ data.down.btn }}</OButton
          >
          <div class="img-box">
            <img :src="downIllImg2" alt="" />
          </div>
        </div>
      </div>
      <div class="gift">
        <img :src="giftImg" alt="" />
      </div>
    </div>
  </AppContext>
</template>

<style lang="scss" scoped>
.celebrating {
  .detail {
    padding: var(--o-spacing-h2);
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: var(--o-color-text1);
    background-color: var(--o-color-bg2);
    box-shadow: var(--o-shadow-l2);
  }
  .rule {
    margin-top: var(--o-spacing-h1);
    h3 {
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
      color: var(--o-color-text1);
      font-weight: 300;
      text-align: center;
    }
    .rule-list {
      margin-top: var(--o-spacing-h2);
      padding: var(--o-spacing-h2);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      color: var(--o-color-text1);
      background-color: var(--o-color-bg2);
      box-shadow: var(--o-shadow-l2);
    }
  }
  .down {
    margin-top: var(--o-spacing-h4);
    box-shadow: var(--o-shadow-l2);
    background-color: var(--o-color-bg2);
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      padding: var(--o-spacing-h4);
      align-items: center;
      img {
        height: 74px;
        margin-right: var(--o-spacing-h4);
      }
      p {
        font-size: var(--o-font-size-h5);
        line-height: var(--o-line-height-h5);
        color: var(--o-color-text1);
        font-weight: 500;
      }
    }
    .right {
      display: flex;
      align-items: center;
      padding-right: var(--o-spacing-h2);
      .down-btn {
        margin-right: 58px;
        padding: 9px 55px;
      }
      .img-box {
        display: flex;
        height: 100%;
        align-items: flex-end;
        img {
          height: 96px;
        }
      }
    }
  }
  .gift {
    width: 100%;
    margin-top: var(--o-spacing-h4);
    box-shadow: var(--o-shadow-l2);
    img {
      width: 100%;
    }
  }
}
</style>
