---
title: '会议指南'
---

<script setup lang="ts">
import { computed } from 'vue';
import BannerLevel2 from '@/components/BannerLevel2.vue'
import useWindowResize from '@/components/hooks/useWindowResize';

import banner from '@/assets/banner/banner-sig.png';
import illustration from '@/assets/illustrations/sig-meeting.png';

  const screenWidth = useWindowResize();
  const isMobile = computed(() => {
    return screenWidth.value <= 768 ? true : false;
  });
</script>

<ClientOnly>
  <BannerLevel2
    :background-image="banner"
    background-text="SIG"
    title="会议指南"
    :illustration="illustration"
  />
</ClientOnly>

<div :class="['markdown', isMobile ? 'markdown-mo' : '']">

# openEuler Developer Day 2022 SIG 组版本工作会议指南

## 介绍

openEuler 开源社区按照不同的 SIG(Special Interests Group) 来组织开发及版本发布工作，openEuler 开源社区的主要技术产品通过 openEuler 开源操作系统承载，它在每年的 3 月和 9 月发布两个版本。当一个版本发布完成后，openEuler 开源社区将召开下一个版本的开发规划会议，会议以 SIG 组为单位，时长为 0.5~1 天，用于集中讨各 SIG 组未来 6 个月的规划、工作事项、任务分工、优先级等相关内容。openEuler 开源社区将为各 SIG 组的规划会议提供场地和技术支持。

SIG 版本规划工作会议遵循开源、开放原则，议题收集、技术讨论、会议纪要等各讨论过程均对外开放。

## 会议类型

**单 SIG 组工作会议：** 单一 SIG 组内的工作会议，由该 SIG 组 Maintainer 进行组织，包括议题收集、议程安排、主持讨论、会议纪要输出等。

**跨 SIG 组工作会议：** 跨 SIG 组之间的协作工作会议，需要各相关 SIG 组 Maintainer 提前通过邮件或其他方式与版本规划会议组织者联系并沟通场地安排并由各相关 SIG 组 Maintainer 负责进行组织，包括议题收集、议程安排、主持讨论、会议纪要输出等。

## 需求收集

各 SIG 应择时启动针对后续版本的需求收集，各 SIG 组 Maintainer 在 openEuler Etherpad 平台
<a href="https://etherpad.openeuler.org/" class="link">https://etherpad.openeuler.org/</a>
创建相应的会议收集目录(建议命名方式为: sig 名-版本名(例如 22.09)-Planning)用于收集该版本规划工作会议的需求收集及计划，并将该会议目录反馈至 openEuler 开源社区 SIG 版本规划会议组织者。(参考模板：
<a href="https://etherpad.openeuler.org/p/planning-template" class="link">https://etherpad.openeuler.org/p/planning-template</a>
)

任何人均可以在 SIG 版本工作会议中提出需求，通过在各 SIG 版本工作会议指定的 Etherpad 共享文件中的 Topics 环节根据要求进行填写，通常需要包含以下内容：

<div class="space">

- 需求发起人
- 需求的具体描述
- Issue 反馈的在线地址
- 已有的技术方案或 PR
- 已有的讨论纪要

</div>

需求收集完成后由 SIG 组 Maintainers 按照所有收集到的需求的具体情况(类型、技术难度、工作量等)，根据会议时间安排指定会议议程，会议安排在工作会议召开前 3 天在 Etherpad 共享文件及社区邮件列表 Maillist 中公开发布，方便与会者了解会议议程。

## 召开会议

会议由各 SIG 组版本规划负责人主持召开，按照预先制定的会议议程进行会议，会议过程中需要注意时间控制，确保所有已经在会议议程中的需求都能得到相应的讨论时间。各与会者需要在 Etherpad 的 Attendees 环节根据要求填写自己的名字和 Gitee_ID，若未到场且未指定代参加人员则该需求视为自动放弃。

各议题讨论可以分为下面几个阶段：

<div class="space">

1.需求陈述：由需求发起人对需求进行陈述，包括需求目标、需求来源、提议的技术方案及既往的讨论及结果等，需求陈述阶段其余听众不允许打断。

2.讨论：由各参会者针对该需求进行相应的讨论，所有与会者均可参与讨论，主持人负责记录各方观点及重点意见。

3.总结：在达成共识后，由主持人根据共识输出该议题的结论。若现场没有达成共识，则应商议再次讨论的具体时间。

所有议题讨论完成后，由 SIG Maintainer 团队根 据各议题讨论情况及 SIG 组实际情况对各需求进行优先级排序及分工，“任务分工”靠贡献者“认领任务”的方式完成。

</div>

## 会议纪要

各 SIG 组版本规划负责人在工作会议结束后一周内整理完成会议纪要，并在 Etherpad 及 SIG 组、dev, tc, release sig 邮件列表 Maillist 上公开发布该会议纪要，以便开发者、用户了解未来版本各 SIG 的工作计划，会议纪要需要包含以下内容：

<div class="space">

- 所有参与讨论的议题及该议题的结论
- 下一版本各工作的负责人
- 下一版本的工作优先级 会议纪要内容参考链接：

<a href="https://mailweb.openeuler.org/hyperkitty/list/openstack@openeuler.org/thread/NR3O2ZUUNE46XFBTV4CND4HEYDCBPW33/" class="link">https://mailweb.openeuler.org/hyperkitty/list/openstack@openeuler.org/thread/NR3O2ZUUNE46XFBTV4CND4HEYDCBPW33/</a>

</div>

</div>

<style scoped>
  .markdown-mo {
    padding: var(--o-spacing-h5);
  }
  .link {
    word-break: break-all;
    color: var(--o-color-brand1);
  }
  .space {
    margin-left: var(--o-spacing-h4);
  }
</style>
