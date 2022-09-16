<script lang="ts" setup>
import { useRouter } from 'vitepress';
import IconArrowRight from '~icons/app/icon-arrow-right';

const router = useRouter();

//任务列表
const TASK = {
  INSTRODUCE:
    'SIG（Special Interest Group）是openEuler社区的组织形式，找到你感兴趣的SIG，点击下列“实习任务”到Gitee查看相关SIG的任务（需先保持Gitee在登陆状态）。',
  EULER_TASK_ITEM: [
    {
      NAME: 'Kernel',
      NAME_LINK:
        'https://www.openeuler.org/zh/sig/sig-detail/?id=10&name=Kernel',
      INTRODUCE: 'openEuler社区维护的Linux 内核',
      TASK: 'https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590412&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590412&single_label_text=&sort=&state=open&target_project&skip_mobile=true',
      GITEE: 'https://gitee.com/openeuler/community/tree/master/sig/Kernel',
    },
    {
      NAME: 'sig-QA',
      NAME_LINK:
        'https://www.openeuler.org/zh/sig/sig-detail/?id=41&name=sig-QA',
      INTRODUCE: '致力于持续提升openEuler社区发行版本质量',
      TASK: 'https://gitee.com/organizations/src-openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590164&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590164&single_label_text=&sort=&state=open&target_project&skip_mobile=true',
      GITEE: 'https://gitee.com/openeuler/community/tree/master/sig/sig-QA',
    },
    {
      NAME: 'sig-openstack',
      NAME_LINK:
        'https://www.openeuler.org/zh/sig/sig-detail/?id=59&name=sig-openstack',
      INTRODUCE:
        '在openEuler之上提供原生的OpenStack，构建开放可靠的云计算技术栈',
      TASK: 'https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590186&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590186&single_label_text=&sort=&state=open&target_project&skip_mobile=true',
      GITEE: 'https://gitee.com/openeuler/openstack',
    },
    {
      NAME: 'A-tune',
      NAME_LINK:
        'https://www.openeuler.org/zh/sig/sig-detail/?id=1&name=A-Tune',
      INTRODUCE: '基于openEuler开发的自动化、智能化性能调优引擎',
      TASK: 'https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590388&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590194&single_label_text=&sort=&state=open&target_project&skip_mobile=true',
      GITEE: 'https://gitee.com/openeuler/community/tree/master/sig/A-Tune',
    },
    {
      NAME: 'sig-KIRAN-DESKTOP',
      NAME_LINK:
        'https://www.openeuler.org/zh/sig/sig-detail/?id=37&name=sig-KIRAN-DESKTOP&mail=dev%40openeuler.org',
      INTRODUCE:
        '麒麟信安自主研发，致力于为用户提供更加美观，高效和易用的Linux桌面操作系统',
      TASK: 'https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590352&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590528&single_label_text=&sort=&state=open&target_project=',
      GITEE:
        'https://gitee.com/openeuler/community/tree/master/sig/sig-KIRAN-DESKTOP',
    },
    {
      NAME: 'sig-ops',
      NAME_LINK:
        'https://www.openeuler.org/zh/sig/sig-detail/?id=83&name=sig-ops',
      INTRODUCE: '致力于运维工具的移植与开发，提升openEuler操作系统的运维能力',
      TASK: 'https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590388&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590323&single_label_text=&sort=&state=open&target_project&skip_mobile=true',
      GITEE: 'https://gitee.com/openeuler/community/tree/master/sig/sig-ops',
    },
    {
      NAME: 'Cloud Native',
      NAME_LINK:
        'https://www.openeuler.org/zh/sig/sig-detail/?id=85&name=sig-CloudNative',
      INTRODUCE:
        '提供便捷、易用的云原生基础设施，提供简单、高效的云原生应用开发托管环境，共建云原生生态',
      TASK: 'https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590352&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590352&single_label_text=&sort=&state=open&target_project&skip_mobile=true',
      GITEE:
        'https://gitee.com/openeuler/community/tree/master/sig/sig-CloudNative',
    },
    {
      NAME: 'G11N',
      NAME_LINK: 'https://www.openeuler.org/zh/sig/sig-detail/?id=98&name=G11N',
      INTRODUCE: '致力于openEuler的国际化和本地化',
      TASK: 'https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590352&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590388&single_label_text=&sort=&state=open&target_project&skip_mobile=true',
      GITEE: 'https://gitee.com/openeuler/community/tree/master/sig/G11N',
    },
    {
      NAME: 'sig-UKUI',
      NAME_LINK:
        'https://www.openeuler.org/zh/sig/sig-detail/?id=46&name=sig-UKUI',
      INTRODUCE:
        '负责在openEuler上提供UKUI桌面环境，及相关软件包的规划、维护和升级',
      TASK: 'https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590230&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=&state=open&target_project&skip_mobile=true',
      GITEE: 'https://gitee.com/openeuler/community/tree/master/sig/sig-UKUI',
    },
    {
      NAME: 'sig-OSCourse',
      NAME_LINK:
        'https://www.openeuler.org/zh/sig/sig-detail/?id=95&name=sig-OSCourse',
      INTRODUCE: '社区探索性项目开发，如用Rust开发相关社区服务等',
      TASK: 'https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590352&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=141433910&single_label_text=&sort=&state=open&target_project&skip_mobile=true',
      GITEE:
        'https://gitee.com/openeuler/community/tree/master/sig/sig-OSCourse',
    },
    {
      NAME: 'sig-DDE',
      NAME_LINK:
        'https://www.openeuler.org/zh/sig/sig-detail/?id=95&name=sig-DDE',
      INTRODUCE: '深度科技自主开发的美观易用、极简操作的桌面环境',
      TASK: 'https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590403&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=&state=open&target_project&skip_mobile=true',
      GITEE: 'https://gitee.com/openeuler/community/tree/master/sig/sig-DDE',
    },
    {
      NAME: 'Infrastructure',
      NAME_LINK:
        'https://www.openeuler.org/zh/sig/sig-detail/?id=95&name=Infrastructure',
      INTRODUCE: '主要负责openEuler社区的基础设施功能开发、维护',
      TASK: 'https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=124590142&single_label_text=&sort=&state=open&target_project&skip_mobile=true',
      GITEE:
        'https://gitee.com/openeuler/community/tree/master/sig/Infrastructure',
    },
    {
      NAME: 'sig-OS-Builder',
      NAME_LINK:
        'https://www.openeuler.org/zh/sig/sig-detail/?id=95&name=sig-OS-Builder',
      INTRODUCE:
        '维护openEuler业务软件包,提供更加方便的ISO构建/换标方案,提供更好的安装与升级方案',
      TASK: 'https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=145511845&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&single_label_id=&single_label_text=&sort=&state=open&target_project&skip_mobile=true',
      GITEE:
        'https://gitee.com/openeuler/community/tree/master/sig/sig-OS-Builder',
    },
    {
      NAME: 'sig-CICD',
      NAME_LINK:
        'https://www.openeuler.org/zh/sig/sig-detail/?id=95&name=sig-OS-Builder',
      INTRODUCE:
        '致力于为开发者提供针对上游开源软件（来自Github、Gitee、Gitlab等托管平台）的测试服务、登录服务、故障辅助定界服务和基于历史数据的分析服务于一体的测试系统',
      TASK: 'https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=124590412&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=146173410&single_label_text=&sort=&state=open&target_project&skip_mobile=true',
      GITEE: 'https://gitee.com/openeuler/community/tree/master/sig/sig-CICD',
    },
    {
      NAME: 'sig-HPC',
      NAME_LINK:
        'https://www.openeuler.org/zh/sig/sig-detail/?id=95&name=sig-HPC',
      INTRODUCE:
        '建立HPC领域的高校、企业与工程师的交流圈，打造HPC快速部署调优平台，让HPC流行起来！',
      TASK: 'https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=151994810&single_label_text=&sort=&state=open&target_project&skip_mobile=true',
      GITEE: 'https://gitee.com/openeuler/community/tree/master/sig/sig-HPC',
    },
    {
      NAME: 'sig-Virt',
      NAME_LINK:
        'https://www.openeuler.org/zh/sig/sig-detail/?id=95&name=Sig-Virt',
      INTRODUCE:
        '致力于打造面向全场景、支撑多样性算力的虚拟化解决方案，提供高性能、高可靠和高安全的虚拟化组件。',
      TASK: 'https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=162794355&single_label_text=&sort=&state=&target_project&skip_mobile=true',
      GITEE: 'https://gitee.com/openeuler/community/tree/master/sig/Virt',
    },
    {
      NAME: 'sig-Compatibility-Infra',
      NAME_LINK:
        'https://www.openeuler.org/zh/sig/sig-detail/?id=95&name=Sig-Compatibility-Infra',
      INTRODUCE: '探索操作系统与服务器、应用程序等方面的兼容性。',
      TASK: 'https://gitee.com/organizations/openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=163702716&single_label_text=&sort=&state=&target_project&skip_mobile=true',
      GITEE:
        'https://gitee.com/openeuler/community/tree/master/sig/sig-Compatibility-Infra',
    },
    {
      NAME: 'Compiler',
      NAME_LINK:
        'https://www.openeuler.org/zh/sig/sig-detail/?id=95&name=Compiler',
      INTRODUCE:
        '致力于打造编译器根技术，为用户提供高性能、高可靠编译器工具链。',
      TASK: 'https://gitee.com/organizations/src-openeuler/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=&project_type=&scope=&single_label_id=164549691&single_label_text=&sort=&state=&target_project&skip_mobile=true',
      GITEE: 'https://gitee.com/openeuler/community/tree/master/sig/Compiler',
    },
    // {
    //   NAME: '其他',
    //   NAME_LINK: '',
    //   INTRODUCE: '一些暂不属于任何SIG的任务，如Rust、存储等等',
    //   TASK: 'https://gitee.com/openeuler-competition/opensource-internship/issues?assignee_id=&author_id=&branch=&collaborator_ids=&issue_search=&label_ids=125884711&label_text=&milestone_id=&priority=&private_issue=&program_id=&project_id=openeuler-competition%2Fopensource-internship&project_type=&scope=&sort=&state=open&target_project&skip_mobile=true',
    //   GITEE: '',
    // },
    {
      NAME_LINK: '',
      INTRODUCE: '更多SIG任务，敬请期待',
      GITEE: '',
      more: true,
    },
  ],
  INTERNSHIP_TASK: '实习任务',
  SIG_DETAIL: 'SIG详情',
};

const go = (path: string) => {
  if (path && !path.includes('http')) {
    router.go(path);
  } else if (path.includes('http')) {
    window.open(path);
  } else {
    return false;
  }
};
</script>

<template>
  <div class="openeuler-task">
    <p class="task-introduce">{{ TASK.INSTRODUCE }}</p>
    <div class="item-box">
      <div
        v-for="(item, index) in TASK.EULER_TASK_ITEM"
        :key="index"
        class="item"
      >
        <p class="item-name" @click="go(item.NAME_LINK)">
          {{ item.NAME }}
        </p>
        <div class="item-intriduce" :class="{ more: item.more }">
          {{ item.INTRODUCE }}
        </div>
        <div class="button-box">
          <OButton
            v-if="item.TASK"
            type="primary"
            class="task-link"
            @click="go(item.TASK)"
            >{{ TASK.INTERNSHIP_TASK }}
            <OIcon><IconArrowRight /></OIcon>
          </OButton>
          <OButton
            v-if="item.GITEE"
            type="text"
            placement="right"
            class="sig-detail"
            @click="go(item.GITEE)"
          >
            <span>{{ TASK.SIG_DETAIL }}</span>
            <OIcon><IconArrowRight /></OIcon>
          </OButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.openeuler-task {
  .task-introduce {
    font-size: 20px;
    line-height: 40px;
    color: var(--o-color-text4);
    @media (max-width: 1000px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  .item-box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-top: 30px;
    @media (max-width: 1440px) {
      grid-template-columns: repeat(2, 1fr);
      margin-top: 16px;
    }
    @media (max-width: 780px) {
      grid-template-columns: repeat(1, 1fr);
      gap: 16px;
    }
    .item {
      padding: 40px;
      background-color: var(--o-color-bg2);
      box-shadow: var(--o-shadow-l2);
      transition: box-shadow 0.1s;
      min-height: 180px;
      .item-name {
        color: var(--o-color-brand1);
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
        @media (max-width: 1000px) {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
      }
      .item-intriduce {
        padding-top: 8px;
        margin-bottom: 20px;
        height: 70px;
        font-size: 14px;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        color: var(--o-color-text4);
      }
      .more {
        font-size: 20px;
        height: 100%;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .button-box {
        display: flex;
        align-items: center;
        white-space: nowrap;
        .o-button {
          padding: 8px 12px;
          height: auto;
          margin-right: 24px;
          white-space: nowrap span {
            color: var(--o-color-brand1);
          }
          &:nth-of-type(2) {
            margin-right: 0;
          }
          @media (max-width: 1000px) {
            padding: 3px 16px;
            font-size: var(--o-font-size-tip);
            margin-right: 0;
          }
          .o-icon {
            color: var(--o-color-brand1);
            margin-left: 8px;
            transition: all 0.3s;
          }
          &:hover .o-icon {
            @media screen and (min-width: 1100px) {
              transform: translateX(3px);
            }
          }
          &:nth-of-type(1) {
            color: #fff;
          }
        }
        .task-link {
          .o-icon {
            color: #fff;
          }
        }
        .sig-detail {
          &:hover {
            @media screen and (min-width: 1100px) {
              border: 1px solid var(--o-color-brand1);
              span {
                color: var(--o-color-brand1);
              }
            }
          }
        }
        .o-button--text {
          color: var(--o-color-text1);
          padding: 8px 12px !important;
          height: auto;
          &:hover {
            @media screen and (min-width: 1100px) {
              .o-icon {
                color: var(--o-color-brand2);
              }
            }
          }
          .o-icon {
            color: var(--o-color-brand1);
          }
        }
      }
    }

    .item:hover {
      @media screen and (min-width: 1100px) {
        box-shadow: var(--o-shadow-l2_hover);
        transform: translateY(-2px);
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1440px) {
  .item-box {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}
@media (max-width: 760px) {
  .item-box {
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
  }
}
@media (max-width: 1000px) {
  .task-introduce {
    text-align: left;
    font-size: 16px;
  }
  .item-box {
    .item:nth-child(n) {
      width: 100%;
      padding: 16px;
      position: relative;
      min-height: 160px;
      .item-intriduce {
        width: 100%;
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        margin-bottom: 0;
      }
      .button-box {
        justify-content: inherit;
        gap: 16px;
        position: absolute;
        bottom: var(--o-spacing-h5);
        left: var(--o-spacing-h5);
      }
    }
  }
}
</style>
