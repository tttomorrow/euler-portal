<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

import InternshipBanner from './InternshipBanner.vue';
import InternshipStep from './InternshipStep.vue';
import InternshipTask from './InternshipTask.vue';
import InternshipRank from './InternshipRank.vue';
import InternshipTitleNav from './InternshipTitleNav.vue';

import StepTitle from '@/assets/category/internship/step-title.png';
import TaskTitle from '@/assets/category/internship/task-title.png';
import IntegralTitle from '@/assets/category/internship/integral-title.png';
import PartnerTitle from '@/assets/category/internship/partner-title.png';
import HelpTitle from '@/assets/category/internship/help-title.png';
import iscas from '@/assets/category/internship/iscas.png';
import qilinsoft from '@/assets/category/internship/qilinsoft.png';
import tongxin from '@/assets/category/internship/tongxin.png';
import kylinsec from '@/assets/category/internship/kylinsec.png';
import gitee from '@/assets/category/internship/gitee.png';
import mindSpore from '@/assets/category/internship/mindSpore.png';
import openEuler from '@/assets/category/internship/openEuler.png';
import openGauss from '@/assets/category/internship/openGauss.png';
import openLooKeng from '@/assets/category/internship/openLooKeng.png';
import qrCode from '@/assets/category/internship/qrCode.png';

import IconArrowRight from '~icons/app/arrow-right.svg';

const INTEGRAL_DATA = [
  {
    HEAD: '1、实习工资、',
    TEXT: [
      '实习有效期6个月内满20分以上，可获得不同级别的实习工资。具体见以上“申请步骤4”里的工资说明。',
    ],
    SUPPLEMENT: '',
  },
  {
    HEAD: '2、实习证明',
    TEXT: [
      '实习有效期6个月内积分满60分',
      '至少找一位导师写',
      '实习评语',
      '提交实习报告',
    ],
    SUPPLEMENT: '满足以上3条，实习评语与实习报告经评审合格后发放实习证明。',
  },
  {
    HEAD: '3、优秀实习生证书',
    TEXT: [
      '实习有效期6个月内积分满100分。（需包含有20及以上分值的任务）',
      '至少找一位导师写优秀推荐评语。',
      '完成优秀实习生线上公开答辩（直播形式）。',
    ],
    SUPPLEMENT:
      '满足以上3条，公开答辩获得评委打分80分以上后，发放优秀实习生证书。',
  },
  {
    HEAD: '4、开源之星（仅针对openEuler与openGauss社区）',
    TEXT: [
      '2022年内独在openEuler社区（或openGauss社区）积分满150分。 ',
      '2022年内独在openEuler社区（或openGauss社区）满120分并在openEuler（或openGauss）公众号发布3篇以上实习项目相关文章及参与过一次实习直播主讲。',
    ],
    SUPPLEMENT:
      '满足以上一条可获得“开源之星”荣誉徽章，在openEuler（openGauss）官网展示，并获得参与2022年度实习优秀贡献者评选资格，评选上将获得奖金10000元。',
  },
];
const RULE = {
  RULE_DATA: [
    {
      QUESTION: '1、哪些人可以报名？',
      ANSWER:
        'A：开源实习面向全国范围内年满18周岁的全日制/非全日制在校学生招募，无专业年级限制，欢迎感兴趣的同学踊跃报名。',
    },
    {
      QUESTION: '2、实习有效期6个月是如何计算的？',
      ANSWER:
        'A：在申请实习时需签署实习劳务合同，实习有效期即劳务合同上填写的实习有效期，为6个月期限，6个月期限内未满60积分则不能获得实习证明。线上实习时间管理相对自由，可根据自身情况安排时间，可提前结束实习。',
    },
    {
      QUESTION: '3、超过了6个月或者完成了100积分还能继续在社区做任务吗？',
      ANSWER:
        'A：可以，但积分不能再用于领取证明和奖金，一年内累计到150积分可获得openEuler社区高校“开源之星”荣誉。',
    },
  ],
  MORE: ['更多问题，请移步', '本帖', '评论区提问。'],
};

const PARTNER_DATA = [
  {
    IMG: iscas,
    LINK: '',
  },
  {
    IMG: qilinsoft,
    LINK: '',
  },
  {
    IMG: tongxin,
    LINK: '',
  },
  {
    IMG: kylinsec,
    LINK: '',
  },
  {
    IMG: gitee,
    LINK: '',
  },
  {
    IMG: mindSpore,
    LINK: '',
  },
  {
    IMG: openEuler,
    LINK: '',
  },
  {
    IMG: openGauss,
    LINK: '',
  },
  {
    IMG: openLooKeng,
    LINK: '',
  },
];

const HELP = {
  INFO: [
    '联系邮箱:',
    'intern@openeuler.sh',
    '扫码加入“开源实习”学生QQ群，更多问题群内咨询。',
    '群号：526089131',
  ],
  ITEM: {
    IMG: qrCode,
  },
};
const openLooKengTask = {
  title: 'openLooKeng',
  intriduce: '一款超强易用的数据虚拟化引擎，让大数据更简单',
};
const openGaussTask = {
  title: 'openGauss',
  intriduce: '一款高性能、高安全、高可靠的企业级开源关系型数据库',
};
const mindSporeTask = {
  title: 'MindSpore开源实习招聘要求（公开）',
  intriduce: [
    '1、全日制大三大四本科生或在读研究生，计算机、软件、人工智能、电子信息、数学、计算物理、计算生物、计算化学等相关专业；',
    '2、熟悉C++/Python编程，编码能力优秀，具有扎实的计算机基础；',
    '3、至少熟悉一种主流深度学习框架，如MindSpore、Tensorflow、PyTorch等；',
    '4、优选条件',
    ' （1）熟悉以下任一技术方向：分布式系统、并行计算、异构计算、深度学习编译优化、模型压缩、推理部署、算子开发、模型开发等；',
    ' （2）在高水平国际会议和学术期刊发表过相关论文或有高水平竞赛获奖经历；',
    ' （3）MindSpore社区优秀开发者、资深开发者、优秀布道师、资深布道师。',
    '注：申请MindSpore 社区实习的同学，在申请材料初选通过后，需参加机考，择优录取。',
  ],
};
// 右侧导航
const isShowNav = ref(false);
const activeIndex = ref(0);
const NAV_LIST = [
  {
    key: '#introduce',
    name: '活动介绍',
  },
  {
    key: '#step',
    name: '申请步骤',
  },
  {
    key: '#task',
    name: '实习任务',
  },
  {
    key: '#integral ',
    name: '激励规则',
  },
  {
    key: '#rule',
    name: '实习规则',
  },
  {
    key: '#partner',
    name: '合作伙伴',
  },
  {
    key: '#help',
    name: '帮助咨询',
  },
];
const tabList = ['openEuler', 'openLooKeng', 'openGauss', '昇思 MindSpore'];
const tabIndex = ref(0);
function changeTabIndex(index: number) {
  tabIndex.value = index;
}
const scroTop = () => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;

  if (scrollTop < 270 || scrollTop > 7200) {
    isShowNav.value = false;
  } else {
    isShowNav.value = true;
  }

  if (scrollTop > 200 && scrollTop < 520) {
    activeIndex.value = 0;
  } else if (scrollTop > 550 && scrollTop < 1300) {
    activeIndex.value = 1;
  } else if (scrollTop > 1350 && scrollTop < 2800) {
    activeIndex.value = 2;
  } else if (scrollTop > 2800 && scrollTop < 3500) {
    activeIndex.value = 3;
  } else if (scrollTop > 3500 && scrollTop < 4500) {
    activeIndex.value = 4;
  } else if (scrollTop > 4500 && scrollTop < 4900) {
    //4170
    activeIndex.value = 5;
  } else if (scrollTop > 4600) {
    activeIndex.value = 6;
  } else {
    return false;
  }
  // console.log('object :>> ', activeIndex.value);
};

onMounted(() => {
  window.addEventListener('scroll', scroTop);
});
onUnmounted(() => {
  window.removeEventListener('scroll', scroTop);
});
</script>

<template>
  <InternshipTitleNav
    v-show="isShowNav"
    class="titlenav"
    :current-index="activeIndex"
    :data-list="NAV_LIST"
    :internship="true"
  ></InternshipTitleNav>
  <InternshipBanner />
  <div class="intership-wrap">
    <div class="wrapper">
      <section id="introduce" class="panel introduce-card">
        <p class="text">
          openEuler开源实习是openEuler社区和社区合作单位共同发起的线上实习项目，旨在鼓励在校学生积极参与开源社区，在实际的开源环境中提升实践能力。由openEuler社区提供实习任务，并提供导师辅导，学生通过实习申请后，可在社区领取任务，每完成一个任务可获得相应积分，积分累计达规定量后，可获得实习证明和实习工资。
        </p>
      </section>
      <section id="step" class="panel">
        <div class="step-title title">
          <img :src="StepTitle" alt="" />
        </div>
        <InternshipStep />
      </section>
      <section id="task" class="panel">
        <div class="task-title title">
          <img :src="TaskTitle" alt="" />
          <ul class="tab-list">
            <li
              v-for="(item, index) in tabList"
              :key="item"
              :class="{ active: tabIndex === index }"
              @click="changeTabIndex(index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
        <InternshipTask v-show="tabIndex === 0" />
        <div v-show="tabIndex === 1" class="openlookeng-task task-wrap">
          <p class="title">
            <a href="https://openlookeng.io/" target="_blank">{{
              openLooKengTask.title
            }}</a>
          </p>
          <p class="intriduce">{{ openLooKengTask.intriduce }}</p>
          <div class="btn">
            <a
              href="https://gitee.com/openlookeng-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openlookeng-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=newest&state=open&target_project&skip_mobile=true"
              target="_blank"
            >
              <OButton class="task-bth"> 实习任务 </OButton>
            </a>
            <a href="https://openlookeng.io/" target="_blank">
              <OButton class="detail-btn">
                <span>官网详情</span>
                <OIcon><IconArrowRight /></OIcon>
              </OButton>
            </a>
          </div>
        </div>
        <div v-show="tabIndex === 2" class="opengauss-task task-wrap">
          <p class="title">
            <a href="https://opengauss.org/" target="_blank">{{
              openGaussTask.title
            }}</a>
          </p>
          <p class="intriduce">{{ openGaussTask.intriduce }}</p>
          <div class="btn">
            <a
              href="https://gitee.com/opengauss/opensource-intership/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openlookeng-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=newest&state=open&target_project&skip_mobile=true"
              target="_blank"
            >
              <OButton class="task-bth"> 实习任务 </OButton>
            </a>
            <a href="https://opengauss.org" target="_blank">
              <OButton class="detail-btn">
                <span>官网详情</span>
                <OIcon><IconArrowRight /></OIcon>
              </OButton>
            </a>
          </div>
        </div>
        <div v-show="tabIndex === 3" class="mindspore-task task-wrap">
          <p class="title">
            <a href="https://www.mindspore.cn/" target="_blank">{{
              mindSporeTask.title
            }}</a>
          </p>
          <div>
            <p
              v-for="item in mindSporeTask.intriduce"
              :key="item"
              class="intriduce"
            >
              {{ item }}
            </p>
          </div>

          <div class="btn">
            <a
              href="https://gitee.com/mindspore/community/issues/I55QGD?from=project-issue&skip_mobile=true"
              target="_blank"
            >
              <OButton class="task-bth"> 实习任务 </OButton>
            </a>
            <a href="https://www.mindspore.cn/" target="_blank">
              <OButton class="detail-btn">
                <span>官网详情</span>
                <OIcon><IconArrowRight /></OIcon>
              </OButton>
            </a>
          </div>
        </div>
      </section>
      <section id="integral" class="panel">
        <div class="integral-title title">
          <img :src="IntegralTitle" alt="" />
        </div>
        <div class="integral-border">
          <div class="integral-content">
            <div
              v-for="(item, index) in INTEGRAL_DATA"
              :key="item.HEAD"
              class="integral-item circular"
            >
              <h3>{{ item.HEAD }}</h3>
              <div v-if="index === 1">
                <p>
                  <span>{{ item.TEXT[0] }}</span>
                </p>
                <p>
                  <span>{{ item.TEXT[1] }}</span>
                  <a
                    href="/doc/导师实习评语.txt"
                    download
                    title="下载实习评语"
                    >{{ item.TEXT[2] }}</a
                  >
                </p>
                <p>
                  <a
                    href="/doc/实习报告模板.docx"
                    download
                    title="下载报告模板"
                    >{{ item.TEXT[3] }}</a
                  >
                </p>
              </div>
              <div v-else>
                <p
                  v-for="(item1, index1) in item.TEXT"
                  :key="item1"
                  class="star"
                >
                  <slot v-if="index === 1 && index1 === 3">
                    <a
                      href="/doc/实习报告模板.docx"
                      download
                      title="下载报告模板"
                      >{{ item1 }}</a
                    >
                  </slot>
                  <span v-else>{{ item1 }}</span>
                </p>
              </div>
              <div class="supplement">{{ item.SUPPLEMENT }}</div>
            </div>
          </div>
        </div>
      </section>
      <section id="rank" class="panel">
        <div class="rank-title">
          <img
            class="web"
            src="@/assets/category/internship/rank-title.png"
            alt=""
          />
          <img
            class="mobile"
            src="@/assets/category/internship/rank-title-mo.png"
            alt=""
          />
        </div>
        <InternshipRank />
      </section>
    </div>
    <section id="rule" class="panel">
      <div class="rule-title title">
        <img src="@/assets/category/internship/rule-title.png" alt="" />
      </div>
      <div class="rule-border">
        <div class="rule-content">
          <div class="wrapper">
            <div
              v-for="(item, index) in RULE.RULE_DATA"
              :key="index"
              class="rule-item"
            >
              <div class="question">{{ item.QUESTION }}</div>
              <div class="answer">{{ item.ANSWER }}</div>
            </div>
            <div class="more-question orange">
              {{ RULE.MORE[0] }}
              <a
                class="this-post"
                href="https://gitee.com/openeuler-competition/opensource-internship/issues/I4AJIR?from=project-issue"
                target="_blank"
                >{{ RULE.MORE[1] }}</a
              >
              {{ RULE.MORE[2] }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="wrapper">
      <section id="partner" class="panel">
        <div class="warper">
          <div class="partner-title title">
            <img :src="PartnerTitle" alt="" />
          </div>
          <div class="img-list">
            <div
              v-for="(item, index) in PARTNER_DATA"
              :key="index"
              class="img-cover"
            >
              <img alt="" :src="item.IMG" />
            </div>
          </div>
        </div>
      </section>
    </div>
    <div id="help" class="help-title title">
      <img :src="HelpTitle" alt="" />
    </div>
    <div class="help-wrap">
      <section class="panel">
        <div class="wrapper help-content">
          <div class="help-left">
            <p>
              {{ HELP.INFO[0] }}
              <a href="mailto:intern@openeuler.sh">{{ HELP.INFO[1] }}</a>
            </p>
            <p>{{ HELP.INFO[2] }}</p>
            <p>{{ HELP.INFO[3] }}</p>
          </div>
          <div class="help-right">
            <img :src="HELP.ITEM.IMG" alt="" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.intership-wrap {
  max-width: 1504px;
  padding: 0 44px;
  margin: 0 auto;
  @media (max-width: 1000px) {
    padding: 0 16px;
  }
}
.panel {
  margin-top: 64px;
  @media (max-width: 1000px) {
    margin-top: 40px;
    .text {
      font-size: 14px;
      line-height: 22px;
      margin-top: 16px;
    }
    .title {
      margin-bottom: 16px;
      img {
        width: auto !important;
        height: 24px;
      }
    }
  }
  .text {
    font-size: 20px;
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: 40px;
    @media (max-width: 1000px) {
      font-size: 14px;
      line-height: 22px;
    }
  }
  .title {
    text-align: center;
    margin-bottom: 60px;
    @media (max-width: 1000px) {
      margin-bottom: 40px;
    }
    img {
      width: 180px;
    }
    .tab-list {
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 28px;
      font-weight: 400;
      line-height: 60px;
      overflow-x: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      @media (max-width: 1000px) {
        font-size: 14px;
        line-height: 22px;
      }
      li {
        cursor: pointer;
        white-space: nowrap;
        color: var(--e-color-text1);
        &:nth-of-type(1) {
          @media (max-width: 1000px) {
            margin-left: 24px;
          }
        }

        & ~ li {
          margin-left: 20px;
        }
      }
      .active {
        color: var(--e-color-brand1);
        &::after {
          content: '';
          display: block;
          width: 100%;
          height: 1px;
          background-color: var(--e-color-brand1);
        }
      }
    }
  }
  .task-wrap {
    background-image: url('@/assets/category/internship/other-community-bg.png');
    background-repeat: no-repeat;
    background-size: 120%;
    background-position: 50%;
    margin: 0 0 25px;
    padding: 24px;
    height: 312px;
    @media (max-width: 1100px) {
      background-image: none;
      height: auto;
    }
  }
  .openlookeng-task,
  .opengauss-task {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    box-shadow: 0 6px 30px 0 rgb(0 0 0 / 10%);
    .title {
      a {
        font-size: 20px;
        line-height: 20px;
        color: var(--e-color-brand1);
        text-align: center;
        @media (max-width: 1000px) {
          font-size: 16px;
        }
      }
    }
    .intriduce {
      color: rgba(0, 0, 0, 0.5);
      font-size: 18px;
      line-height: 22px;
      height: 88px;
      padding-top: 10px;
      @media (max-width: 1000px) {
        font-size: 14px;
      }
    }
    .btn {
      .task-bth {
        margin-right: 24px;
        border: none;
        color: #fff;
        background-color: var(--e-color-brand1);
        &:hover {
          background-color: var(--e-color-brand2);
        }
      }
      .detail-btn {
        color: var(--e-color-brand1);
        border: 1px solid transparent;
        &:hover {
          border: 1px solid var(--e-color-brand2);
          color: var(--e-color-brand2);
          :deep(.o-icon) {
            transform: translateX(5px);
          }
        }
        :deep(.o-icon) {
          transition: all 0.2s;
          margin-left: 6px;
        }
      }
    }
  }
  .mindspore-task {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 6px 30px 0 rgb(0 0 0 / 10%);
    text-align: left;
    .title {
      margin-bottom: 0;
      text-align: left;
      font-size: 20px;
      @media (max-width: 1000px) {
        font-size: 16px;
      }
    }
    .intriduce {
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.5);
    }
    .btn {
      text-align: center;
      margin-top: 5px;
      .task-bth {
        margin-right: 24px;
        border: none;
        color: #fff;
        background-color: var(--e-color-brand1);
        &:hover {
          background-color: var(--e-color-brand2);
        }
      }
      .detail-btn {
        color: var(--e-color-brand1);
        border: 1px solid transparent;
        &:hover {
          border: 1px solid var(--e-color-brand2);
          color: var(--e-color-brand2);
          :deep(.o-icon) {
            transform: translateX(5px);
          }
        }
        :deep(.o-icon) {
          transition: all 0.2s;
          margin-left: 6px;
        }
      }
    }
  }
}
#task {
  .task-title {
    img {
      margin-bottom: 40px;
    }
  }
}
#integral {
  .integral-title {
    img {
      width: 270px;
      @media (max-width: 1000px) {
        width: 155px;
        height: 34px;
      }
    }
  }
  .integral-border {
    border: 5px solid #5877ff;
    border-top: 16px solid #5877ff;
    background-color: #5877ff;
    .integral-content {
      padding: 5px 15px 10px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      border-radius: 8px;
      background: #eef1ff url(@/assets/category/internship/integral-bg.png)
        no-repeat right bottom;
      line-height: 24px;
      h3,
      h4 {
        margin: 10px 0;
        font-size: 18px;
        color: #000000;
      }
      h4 {
        margin-top: 10px;
        font-size: 14px;
      }
      p {
        position: relative;
        padding-left: 12px;
      }
      .circular {
        p::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: #2e9afe;
        }
      }
      .star {
        position: relative;
        img {
          position: absolute;
          left: 0;
          top: 8px;
          height: 8px;
        }
      }
      .download-color {
        cursor: pointer;
        color: #002fa7;
      }
    }
  }
  @media (max-width: 1000px) {
    .integral-border {
      border: 5px solid #5877ff;
      border-top: 16px solid #5877ff;
      border-radius: 8px;
      background-color: #5877ff;
    }
    .integral-content {
      padding-bottom: 41px;
      height: 100%;
      background: none;
      border-radius: 8px;
      background-color: #eef1ff;
      h3,
      h4 {
        margin-bottom: 6px;
        font-size: 16px;
        color: #000000;
      }
      h4 {
        margin-top: 8px;
        margin-bottom: 0;
        font-size: 12px;
      }
    }
  }
}

#rank {
  padding-top: 30px;
  .rank-title {
    position: relative;
    height: 80px;
    text-align: center;
    img {
      border-radius: 8px 8px 0 0;
      width: 374px;
    }
    .mobile {
      display: none;
    }
  }
  .rank-title::before {
    position: absolute;
    content: '积分排行';
    width: 374px;
    color: #fff;
    text-align: center;
    font-size: 28px;
    line-height: 80px;
  }
  @media (max-width: 1000px) {
    .rank-title {
      height: 48px;
      img {
        width: 109px;
      }
      .web {
        display: none;
      }
      .mobile {
        display: inline-block;
      }
    }
    .rank-title::before {
      content: '';
    }
  }
}

#rule {
  .rule-title {
    img {
      width: 250px;
    }
  }
  .rule-border {
    border-radius: 8px;
    border: 5px solid #5dc8ff;
    border-top: 16px solid #5dc8ff;
    background-color: #5dc8ff;
  }
  .rule-content {
    padding: 32px 0 20px 0;
    background: rgba(255, 255, 255, 0.9);
    .question {
      margin-bottom: 10px;
      font-size: 18px;
      color: #000000;
      line-height: 24px;
    }
    .answer {
      margin-bottom: 10px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      line-height: 24px;
    }
    .more-question {
      padding-top: 25px;
      font-size: 14px;
      color: #ff7c56;
      .this-post {
        font-size: 16px;
      }
    }
  }
  @media (max-width: 1000px) {
    .rule-title {
      img {
        width: 155px;
      }
    }

    .rule-content {
      border-radius: 8px;
      padding: 16px 0;
      height: 100%;
      background: none;
      background-color: #eff9ff;
      .warper {
        padding: 0;
      }
      .question {
        margin-bottom: 6px;
        font-size: 16px;
        line-height: 22px;
      }
      .answer {
        margin-bottom: 6px;
        font-size: 12px;
        line-height: 22px;
      }
      .more-question {
        padding-top: 6px;
        font-size: 12px;
        .this-post {
          font-size: 14px;
        }
      }
    }
  }
}

#partner {
  .img-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    .img-cover {
      width: 100%;
      height: 100px;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    @media (min-width: 768px) and (max-width: 1440px) {
      .img-cover {
        width: 100%;
        height: auto;
      }
    }
  }

  @media (max-width: 1000px) {
    .img-list {
      margin-bottom: 0;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
      .img-cover {
        width: auto;
        flex: 1;
        height: auto;
      }
    }
  }
}
.help-wrap {
  background: var(--e-color-bg2);
  padding: 40px 0;
  .panel {
    margin-top: 0;
  }
}
.help-title {
  text-align: center;
  margin: 60px 0;
  img {
    width: 180px;
  }
  @media (max-width: 1000px) {
    margin: 40px 0 16px;
    img {
      width: auto;
      height: 24px;
    }
  }
}
.help-content {
  display: flex;
  justify-content: center;
  .help-left {
    padding-right: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      font-size: 20px;
      color: var(--e-color-text1);
      line-height: 40px;
      margin-bottom: 10px;
      @media (max-width: 1000px) {
        font-size: 16px;
        line-height: 32px;
      }
      a {
        font-size: 20px;
        color: var(--e-color-link1);
        @media (max-width: 1000px) {
          font-size: 16px;
          line-height: 32px;
        }
      }
    }
  }
  .help-right {
    width: 172px;
    text-align: center;
    img {
      width: 100%;
      display: block;
    }
  }
}
@media (max-width: 1000px) {
  .help-content {
    padding: 0 16px;
    flex-direction: column;
    .help-left {
      padding-right: 0;
      p {
        line-height: 30px;
        margin-bottom: 10px;
        a {
          font-size: 20px;
        }
      }
    }
    .help-right {
      display: block;
      p {
        margin: 24px auto 0;
      }
    }
  }
}
</style>
