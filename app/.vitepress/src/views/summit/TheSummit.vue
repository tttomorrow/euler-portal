<script setup lang="ts">
import { computed } from 'vue';
import { useCommon } from '@/stores/common';

import AppContext from '@/components/AppContent.vue';

import banner from '@/assets/category/summit/summit2022/banner.jpg';
import bannerMo from '@/assets/category/summit/summit2022/banner-mo.png';
import liveLight from '@/assets/category/summit/summit2022/live.png';
import liveDark from '@/assets/category/summit/summit2022/live-dark.png';
import show from '@/assets/category/summit/summit2022/show.png';
import sponsor from '@/assets/category/summit/summit2022/sponsor.png';
import topic from '@/assets/category/summit/summit2022/topic.png';

const commonStore = useCommon();
const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLight : liveDark
);
const bannerInfo = {
  pc_banner: banner,
  mo_banner: bannerMo,
};
const summitData = {
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
    <div class="content">
      <div
        v-for="item in summitData.contentList"
        :key="item.link"
        class="content-item"
      >
        <a :href="item.link" target="_blank">
          <img :src="item.img" :alt="item.name" />
        </a>
      </div>
    </div>
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
.content {
  margin: var(--o-spacing-h2) auto 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media screen and (max-width: 1470px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 948px;
  }
  @media screen and (max-width: 968px) {
    grid-template-columns: repeat(1, 1fr);
    max-width: 474px;
  }

  .content-item {
    @media screen and (max-width: 768px) {
      text-align: center;
    }
    a {
      display: inline-block;
      width: 100%;
      img {
        @media screen and (max-width: 490px) {
          width: 100%;
        }
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
