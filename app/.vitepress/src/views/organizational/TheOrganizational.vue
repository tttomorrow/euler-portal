<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import OrganizationlGuests from './OrganizationlGuests.vue';

import emailImg from '@/assets/category/organizationl/email.png';
import IconGit from '@/assets/category/organizationl/icon-git.svg';

import caizhimin from '@/assets/category/organizationl/caizhimin.png';
import gaopei from '@/assets/category/organizationl/gaopei.png';
import hannaiping from '@/assets/category/organizationl/hannaiping.png';
import jiangdayong from '@/assets/category/organizationl/jiangdayong.png';
import jiangzhenhua from '@/assets/category/organizationl/jiangzhenhua.png';
import lipeiyuan from '@/assets/category/organizationl/lipeiyuan.png';
import liuwenqing from '@/assets/category/organizationl/liuwenqing.png';
import liuyanfei from '@/assets/category/organizationl/liuyanfei.png';
import qiuchengfeng from '@/assets/category/organizationl/qiuchengfeng.png';
import wuyanjun from '@/assets/category/organizationl/wuyanjun.png';
import zhanglei from '@/assets/category/organizationl/zhanglei.png';
import zhangshenju from '@/assets/category/organizationl/zhangshenju.png';
import zhongxin from '@/assets/category/organizationl/zhongxin.png';

import huxinwei from '@/assets/category/organizationl/huxinwei.png';
import biannaimeng from '@/assets/category/organizationl/biannaimeng.png';
import caozhi from '@/assets/category/organizationl/caozhi.png';
import chenqide from '@/assets/category/organizationl/chenqide.png';
import houjian from '@/assets/category/organizationl/houjian.png';
import hufeng from '@/assets/category/organizationl/hufeng.png';
import huyadi from '@/assets/category/organizationl/huyadi.png';
import liyongqiang from '@/assets/category/organizationl/liyongqiang.png';
import liushouyong from '@/assets/category/organizationl/liushouyong.png';
import renwei from '@/assets/category/organizationl/renwei.png';
import shiyong from '@/assets/category/organizationl/shiyong.png';
import tianjun from '@/assets/category/organizationl/tianjun.png';
import wangjianmin from '@/assets/category/organizationl/wangjianmin.png';
import wanglingzhuo from '@/assets/category/organizationl/wanglingzhuo.png';
import wangzhigang from '@/assets/category/organizationl/wangzhigang.png';
import weigang from '@/assets/category/organizationl/weigang.png';
import wufengguang from '@/assets/category/organizationl/wufengguang.png';
import xiexiuqi from '@/assets/category/organizationl/xiexiuqi.png';
import xiongwei from '@/assets/category/organizationl/xiongwei.png';
import yeqinglong from '@/assets/category/organizationl/yeqinglong.png';

import huotaiwen from '@/assets/category/organizationl/huotaiwen.png';
import liaoxiangke from '@/assets/category/organizationl/liaoxiangke.png';
import lusouqun from '@/assets/category/organizationl/lusouqun.png';
import niguangnan from '@/assets/category/organizationl/niguangnan.png';
import wanghuaimin from '@/assets/category/organizationl/wanghuaimin.png';
import zhouminghui from '@/assets/category/organizationl/zhouminghui.png';

const organizationalData = {
  memberList: [
    {
      title: '2023-2024 年 openEuler 委员会',
      list: [
        {
          title: '委员',
          personalList: [
            {
              img: jiangdayong,
              name: '江大勇',
              position: ['华为技术有限公司'],
            },
          ],
        },
        {
          title: '委员',
          personalList: [
            {
              img: jiangdayong,
              name: '江大勇',
              position: ['华为技术有限公司'],
            },
          ],
        },
        {
          title: '常务委员会委员',
          personalList: [
            {
              img: hannaiping,
              name: '韩乃平',
              position: ['麒麟软件有限公司'],
            },
            {
              img: liuwenqing,
              name: '刘文清',
              position: ['湖南麒麟信安科技股份有限公司'],
            },
            {
              img: wuyanjun,
              name: '武延军',
              position: ['中国科学院软件研究所'],
            },
            {
              img: zhanglei,
              name: '张磊',
              position: ['统信软件技术有限公司'],
            },
          ],
        },
        {
          title: '委员',
          personalList: [
            {
              img: caizhimin,
              name: '蔡志旻',
              position: ['江苏润和软件股份有限公司'],
            },
            {
              img: gaopei,
              name: '高培',
              position: ['软通动力信息技术（集团）股份有限公司'],
            },
            {
              img: jiangzhenhua,
              name: '姜振华',
              position: ['超聚变数字技术有限公司'],
            },
            {
              img: lipeiyuan,
              name: '李培源',
              position: ['中国电信股份有限公司云计算分公司'],
            },
            {
              img: zhangshenju,
              name: '张胜举',
              position: ['中国移动云能力中心'],
            },
            {
              img: zhongxin,
              name: '钟忻',
              position: ['联通数字科技有限公司'],
            },
          ],
        },
        {
          title: '执行总监',
          personalList: [
            {
              img: qiuchengfeng,
              name: '邱成锋',
              position: ['华为技术有限公司'],
            },
          ],
        },
        {
          title: '执行秘书',
          personalList: [
            {
              img: liuyanfei,
              name: '刘彦飞',
              position: ['开放原子开源基金会'],
            },
          ],
        },
      ],
    },
    {
      title: 'openEuler技术委员会',
      list: [
        {
          img: huxinwei,
          name: '胡欣蔚',
          post: '主席',
          email: 'huxinwei@huawei.com',
          gitee: 'shinwell_hu',
        },
        {
          img: biannaimeng,
          name: '卞乃猛',
          post: '委员',
          email: 'bian_naimeng@hoperun.com ',
          gitee: 'biannm',
        },
        {
          img: caozhi,
          name: '曹志',
          post: '委员',
          email: 'george.cao@huawei.com',
          gitee: 'georgecao',
        },
        {
          img: chenqide,
          name: '陈棋德',
          post: '委员',
          email: 'dillon.chen@gmail.com ',
          gitee: 'dillon_chen',
        },
        {
          img: houjian,
          name: '侯健',
          post: '委员',
          email: 'houjian@kylinos.cn',
          gitee: 'hjimmy',
        },
        {
          img: hufeng,
          name: '胡峰',
          post: '委员',
          email: 'solar.hu@huawei.com',
          gitee: 'solarhu',
        },
        {
          img: huyadi,
          name: '胡亚弟',
          post: '委员',
          email: 'huyd12@chinatelecom.cn',
          gitee: 'huyd12',
        },
        {
          img: liyongqiang,
          name: '李永强',
          post: '委员',
          email: 'liyongqiang@xfusion.com',
          gitee: 'charlie_li',
        },
        {
          img: liushouyong,
          name: '刘寿永',
          post: '委员',
          email: 'pangbanme@163.com',
          gitee: 'pangbanme',
        },
        {
          img: renwei,
          name: '任慰',
          post: '委员',
          email: 'renwei41@huawei.com',
          gitee: 'vonhust',
        },
        {
          img: shiyong,
          name: '石勇',
          post: '委员',
          email: 'shiyong@kylinsec.com.cn',
          gitee: 'stonefly128',
        },
        {
          img: tianjun,
          name: '田俊',
          post: '委员',
          email: 'jun.j.tian@intel.com',
          gitee: 'juntianlinux',
        },
        {
          img: wangjianmin,
          name: '王建民',
          post: '委员',
          email: 'jianmin@iscas.ac.cn',
          gitee: 'cellfaint',
        },
        {
          img: wanglingzhuo,
          name: '王伶卓',
          post: '委员',
          email: 'relue0z@outlook.com',
          gitee: 'relue0z',
        },
        {
          img: wangzhigang,
          name: '王志钢',
          post: '委员',
          email: 'wangzhigang17@huawei.com',
          gitee: 'jianminw',
        },
        {
          img: weigang,
          name: '魏刚',
          post: '委员',
          email: '11015100@qq.com',
          gitee: 'gwei3',
        },
        {
          img: wufengguang,
          name: '吴峰光',
          post: '委员',
          email: 'wfg@mail.ustc.edu.cn',
          gitee: 'wu_fengguang',
        },
        {
          img: xiexiuqi,
          name: '谢秀奇',
          post: '委员',
          email: 'xiexiuqi@huawei.com',
          gitee: 'xiexiuqi',
        },
        {
          img: xiongwei,
          name: '熊伟',
          post: '委员',
          email: 'xiongwei888@huawei.com',
          gitee: 'myeuler',
        },
        {
          img: yeqinglong,
          name: '叶青龙',
          post: '委员',
          email: 'yeqinglong@uniontech.com',
          gitee: 'yeqinglong01',
        },
      ],
    },
    {
      title: 'openEuler 委员会顾问专家委员会',
      list: [
        {
          img: huotaiwen,
          name: '霍太稳',
          position: ['极客邦科技创始人兼CEO'],
        },
        {
          img: liaoxiangke,
          name: '廖湘科',
          position: ['中国工程院院士'],
        },
        {
          img: lusouqun,
          name: '陆首群',
          position: ['中国开源软件联盟名誉主席', '原国务院信息办常务副主任'],
        },
        {
          img: niguangnan,
          name: '倪光南',
          position: ['中国工程院院士'],
        },
        {
          img: wanghuaimin,
          name: '王怀民',
          position: ['中国科学院院士'],
        },
        {
          img: zhouminghui,
          name: '周明辉',
          position: ['北京大学计算机系教授', '北大博雅特聘教授'],
        },
      ],
    },
  ],
  idList: ['委员会', '技术委员会', '顾问专家委员会'],
  notice: '注：按照姓名汉语拼音排序',
};
const activeIndex = ref(0);
// 滚动激活导航
const navRef: any = ref([]);
const scroTop = () => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  const activeList: Array<number> = [];
  navRef.value.forEach((item: any, index: number) => {
    if (scrollTop + 100 > item.offsetTop) {
      activeList.push(index);
    }
  });
  activeIndex.value = activeList[activeList.length - 1];
};

onMounted(() => {
  navRef.value = document.querySelectorAll('h2');
  window.addEventListener('scroll', scroTop);
});
onUnmounted(() => {
  window.removeEventListener('scroll', scroTop);
});
</script>

<template>
  <ul class="nav-right">
    <li
      v-for="(item, index) in organizationalData.memberList"
      :key="item.title"
    >
      <a
        :href="'#' + organizationalData.idList[index]"
        :class="activeIndex === index ? 'active' : ''"
        >{{ item.title }}</a
      >
    </li>
  </ul>
  <div class="council">
    <h2 :id="organizationalData.idList[0]">
      {{ organizationalData.memberList[0].title }}
    </h2>
    <div class="council-list">
      <div
        v-for="item in organizationalData.memberList[0].list"
        :key="item.title"
        class="council-item"
      >
        <h4>{{ item.title }}</h4>
        <OrganizationlGuests
          :lecturer-list="item.personalList"
          shape="circle"
          :web-columns-num="6"
          :mobile-columns-num="2"
        ></OrganizationlGuests>
      </div>
    </div>
    <h2 :id="organizationalData.idList[1]" class="council-technology">
      {{ organizationalData.memberList[1].title }}
    </h2>
    <ul class="council-list list-technology">
      <li
        v-for="(item, index) in organizationalData.memberList[1].list"
        :key="index"
        data-aos="fade-up"
      >
        <img class="avatar" :src="item.img" :alt="item.name" />
        <p class="personal-name">{{ item.name }}</p>
        <p class="personal-post">{{ item.post }}</p>
        <p class="links">
          <a :href="'mailto:' + item.email" class="mail"
            ><img :src="emailImg"
          /></a>
          <a
            v-if="item.gitee"
            :href="'https://gitee.com/' + item.gitee"
            class="gitee"
            target="_blank"
            ><img :src="IconGit"
          /></a>
        </p>
      </li>
    </ul>
    <h2 :id="organizationalData.idList[2]" class="council-counselor">
      {{ organizationalData.memberList[2].title }}
    </h2>
    <div class="council-list">
      <OrganizationlGuests
        :lecturer-list="organizationalData.memberList[2].list"
        shape="circle"
        :web-columns-num="6"
        :mobile-columns-num="2"
      ></OrganizationlGuests>
    </div>
    <p class="notice">{{ organizationalData.notice }}</p>
  </div>
</template>

<style lang="scss" scoped>
.nav-right {
  position: fixed;
  top: calc(10% + 80px);
  right: 0;
  width: 200px;
  z-index: 999;
  &::after {
    position: absolute;
    content: '';
    width: 1px;
    height: 100%;
    left: 0;
    bottom: -50%;
    background-color: var(--o-color-bg4);
    z-index: 0;
  }
  @media screen and (max-width: 1100px) {
    display: none;
  }
  a {
    position: relative;
    cursor: pointer;
    display: block !important;
    color: var(--o-color-text4);
    line-height: var(--o-line-height-text);
    font-size: var(--o-font-size-text);
    border-left: 1px solid var(--o-color-bg4);
    z-index: 1;
    padding: 8px 12px;
  }
  .active {
    color: var(--o-color-brand1);
    border-left: 1px solid var(--o-color-brand1);
  }
}
.council {
  max-width: 1380px;
  padding-right: 200px;
  margin: 0 auto;
  @media screen and (max-width: 1720px) {
    padding-right: 0px;
  }
  h2 {
    font-size: var(--o-font-size-h5);
    line-height: var(--o-line-height-h5);
    color: var(--o-color-text1);
    text-align: center;
    font-weight: normal;
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }
  .council-technology,
  .council-counselor {
    margin-top: var(--o-spacing-h2);
    @media screen and (max-width: 768px) {
      margin-top: var(--o-spacing-h3);
    }
  }
  .council-list {
    margin-top: var(--o-spacing-h3);
    padding: var(--o-spacing-h2) 50px;
    background-color: var(--o-color-bg2);
    box-shadow: var(--o-shadow-l2);
    @media screen and (max-width: 768px) {
      margin-top: var(--o-spacing-h5);
      padding: var(--o-spacing-h5);
    }
    .council-item {
      & + .council-item {
        margin-top: var(--o-spacing-h2);
      }
      h4 {
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-height-h7);
        color: var(--o-color-text1);
        font-weight: 500;
      }
      .lecturer-list {
        margin: 0 auto;
        margin-top: var(--o-spacing-h5);
      }
    }
    li {
      text-align: center;
      img {
        width: 100px;
      }
      .personal-name {
        margin-top: 8px;
        font-size: var(--o-font-size-h8);
        color: var(--o-color-text1);
        text-align: center;
      }
      .personal-post {
        margin-top: 4px;
        font-size: var(--o-font-size-tip);
        color: var(--o-color-text4);
        text-align: center;
      }
      .links {
        margin-top: 8px;
        display: flex;
        justify-content: center;
        .mail {
          margin-right: 18px;
          img {
            width: 24px;
          }
        }
        .gitee {
          display: flex;
          align-items: center;
          height: 24px;
          img {
            width: 18px;
          }
        }
      }
    }
  }
  .list-technology {
    margin: 0 auto;
    margin-top: var(--o-spacing-h2);
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 76px;
    @media (max-width: 1796px) {
      grid-template-columns: repeat(5, 1fr);
    }
    @media (max-width: 1645px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 1465px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 1175px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 1068px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 780px) {
      margin-top: var(--o-spacing-h5);
      display: grid;
      width: 100%;
      gap: 16px;
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .notice {
    margin-top: 54px;
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    color: var(--o-color-text1);
    @media (max-width: 780px) {
      margin-top: 16px;
    }
  }
}
</style>
