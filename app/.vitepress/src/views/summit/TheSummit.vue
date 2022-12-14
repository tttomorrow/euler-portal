<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useCommon } from '@/stores/common';
import AOS from 'aos';

import AppContext from '@/components/AppContent.vue';
import SummitSchedule from './components/SummitSchedule.vue';
import LinkPanel from '@/components/LinkPanel.vue';

import banner from '@/assets/category/summit/summit2022/banner.jpg';
import bannerMo from '@/assets/category/summit/summit2022/banner-mo.png';
import liveLight from '@/assets/category/summit/summit2022/live.png';
import liveDark from '@/assets/category/summit/summit2022/live-dark.png';
import atom from '@/assets/category/summit/summit2022/logo/atom.png';
import atomDark from '@/assets/category/summit/summit2022/logo/atom-dark.png';
import csia from '@/assets/category/summit/summit2022/logo/csia.png';
import csiaDark from '@/assets/category/summit/summit2022/logo/csia-dark.png';
import euler from '@/assets/category/summit/summit2022/logo/euler.png';
import eulerDark from '@/assets/category/summit/summit2022/logo/euler-dark.png';
import fusion from '@/assets/category/summit/summit2022/logo/fusion.png';
import fusionDark from '@/assets/category/summit/summit2022/logo/fusion-dark.png';
import huawei from '@/assets/category/summit/summit2022/logo/huawei.png';
import huaweiDark from '@/assets/category/summit/summit2022/logo/huawei-dark.png';
import iscas from '@/assets/category/summit/summit2022/logo/iscas.png';
import iscasDark from '@/assets/category/summit/summit2022/logo/iscas-dark.png';
import kylinsec from '@/assets/category/summit/summit2022/logo/kylinsec.png';
import kylinsecDark from '@/assets/category/summit/summit2022/logo/kylinsec-dark.png';
import qilin from '@/assets/category/summit/summit2022/logo/qilin.png';
import qilinDark from '@/assets/category/summit/summit2022/logo/qilin-dark.png';
import runhe from '@/assets/category/summit/summit2022/logo/runhe.png';
import runheDark from '@/assets/category/summit/summit2022/logo/runhe-dark.png';
import stone from '@/assets/category/summit/summit2022/logo/stone.png';
import stoneDark from '@/assets/category/summit/summit2022/logo/stone-dark.png';
import tongxin from '@/assets/category/summit/summit2022/logo/tongxin.png';
import tongxinDark from '@/assets/category/summit/summit2022/logo/tongxin-dark.png';
import zhongguan from '@/assets/category/summit/summit2022/logo/zhongguan.png';
import zhongguanDark from '@/assets/category/summit/summit2022/logo/zhongguan-dark.png';
import intel from '@/assets/category/summit/summit2022/logo/intel.png';
import intelDark from '@/assets/category/summit/summit2022/logo/intel-dark.png';

import IconTime from '~icons/app/icon-time.svg';

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
                desc: '2022年度openEuler领先商业实践颁奖',
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
                time: '11:05 - 11:35',
                desc: 'openEuler用户实践案例分享',
              },
              {
                time: '11:35 - 11:40',
                desc: 'openEuler&openGauss人才发展加速计划2022年度颁奖',
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
                time: '09:30 - 09:40',
                desc: '领导致辞',
              },
              {
                time: '09:40 - 09:50',
                desc: ' openEuler社区进展主题演讲',
              },
              {
                time: '09:50 - 09:55',
                desc: 'openEuler社区理事会换届升级仪式',
              },
              {
                time: '09:55 - 10:40',
                desc: '技术创新、重磅发布、场景演示',
              },
              {
                time: '10:40 - 11:40',
                desc: 'openEuler商用案例实践分享',
              },
              {
                time: '11:40 - 11:45',
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
                name: 'Linux 内核',
                desc: 'openEuler Summit 2022',
                children: [
                  {
                    time: '1',
                    desc: '数据中心服务器以太网链路聚合与高可用',
                    name: '胡亚弟、孙守鑫',
                    post: '天翼云科技有限公司 胡亚弟-技术专家，孙守鑫-高级后端开发工程师',
                    detail:
                      '本议题讲述各种linux bonding的基本工作原理，实现。 对于多种bond模式在DC场景下进行比较，分析。同时，介绍工作中遇到的相关问题及针对问题所做的一些优化。其中优化工作分为两部分，一个是开发bond6针对ipv6报文接收方向的负载均衡功能。另一个是修复bond6的vlan子接口加入Linux bridge之后丢包的问题。最后根据bond口的应用经验，提出一些应用建议。',
                  },
                  {
                    time: '2',
                    desc: '移动云高性能远程调用框架eRPC在Gazelle上的最佳实践与应用',
                    name: '薛传宇',
                    post: '中移（苏州）软件技术有限公司 软件开发工程师',
                    detail:
                      'eRPC作为一款高性能远程调用框架，目前主要落地应用于移动云极速云盘产品。在eRPC技术选型阶段，RDMA虽然有更好的时延和iops性能，但是存在的大规模组网难，成本高等难题。故我们选择用户态TCP作为下一步主攻方向。凭借Gazelle提供的用户态TCP传输能力，eRPC已达到TCP翻倍的iops与时延性能。将更好助力移动云算力网络进一步发展。',
                  },
                  {
                    time: '3',
                    desc: '云环境下欧拉开源操作系统的无缝内核热升级',
                    name: '曾昭荣',
                    post: 'Intel Cloud Software Engineer',
                    detail:
                      '云环境中经常因为安全性等原因需要更新或升级系统的内核，目前的一些方案比如热补丁，热迁移等等都有一些局限性。我们这里基于openEuler操作系统提出一套新的技术方案，即利用kexec快速重启内核，同时将虚拟机状态维持在内存中，所有的直通设备也保持活跃的状态，重启后从内存中直接恢复虚拟机，并直接连接活跃的原有直通设备，以期达到更好的服务中断时间以及成功率。',
                  },
                  {
                    time: '4',
                    desc: '《ebpf-linux内核安全的双刃剑》',
                    name: '曹佩庆',
                    post: '统信软件研发经理',
                    detail:
                      '结合当前ebpf技术在linux内核中的应用分析说明不当的ebpf应用会引入的安全风险和危害举例说明合适的ebpf技术给linux平台下内核开发和系统/容器安全带来的益处探讨如何更好的用好ebpf这把“双刃剑”',
                  },
                  {
                    time: '5',
                    desc: 'MPTCP BPF包调度器的实现',
                    name: '唐葛亮',
                    post: 'SUSE Euler OS专家',
                    detail:
                      '本人实现的MPTCP BPF包调度器是今年Linux内核中MPTCP协议栈上的一个新特性，允许用户通过BPF来为MPTCP提供自定义的包调度器。该实现包含20多个内核代码补丁。本议题向大家展示该特性是如何一步一步实现的。',
                  },
                  {
                    time: '6',
                    desc: 'ARM64 内存可靠性增强',
                    name: '王克锋',
                    post: '华为高级软件工程师',
                    detail:
                      '内存容量越来越大，多样化的内存介质引入，单机下内存故障随之增加，同时，arm64服务器广泛在云&数据中心的应用，内存的故障处理在arm64架构下越来越重要，本次Topic介绍arm64 RAS处理及华为在arm64可靠性里面的相关工作，包括arm64 内存镜像，arm64 machine check safe等。内存镜像相当于一份内存中的数据有两份拷贝，如果系统检测到不可恢复的内存错误，那么内存控制器会从镜像区域同步一份，避免数据丢失。Linux内核一般会将内核以及驱动使用的数据做内存镜像，避免因为内存错误导致内核panic，该特性已成功推社区。machine check safe在uaccess等场景下内核态触发不可恢复内存错误时，通过杀死受影响的用户态进程同时隔离错误页面的处理机制，避免内核panic，该特性目前正在推送社区中。',
                  },
                  {
                    time: '8',
                    desc: '探秘 Intel Trust Domain Extensions(TDX) 技术',
                    name: '杜凡',
                    post: 'Intel系统软件架构师',
                    detail:
                      'Intel Trust Domain Extensions(TDX) 作为硬件辅助TEE的技术，提供虚拟机层面的内存及CPU状态的机密性和完整性的保障。Intel TDX 技术巧妙得扩展MKTME和VMX 两大基础技术底座，引入SEAM 模式，以SEAM模式的软件载体TDX Module 作为安全防护的关键支点，同时有增加的方便升级的优势。Intel TDX 作为机密计算领域的主要方向之一，在云环境中，阻断恶意攻击，保护终端用户数据的安全性，对敏感业务向云端迁移提供支撑。本议题阐述Intel TDX整体的架构，探寻其底层技术逻辑。',
                  },
                  {
                    time: '9',
                    desc: '基于eBPF技术的网络会话监控技术与实践',
                    name: '卢刚',
                    post: '湖南麒麟信安科技股份有限公司操作系统架构师',
                    detail: `"简单介绍eBPF技术的背景，并基于openEuler 20.03 LTS版本进行网络会话监控、数据采集、统计和审计。
                            主要分享：
                            1、 简单介绍eBPF技术的背景
                            2、	介绍当前网络监控的一些缺点和不足
                            3、	介绍该监控审计技术的特性，包括：协议类型TCP或UDP、本地IP地址、本地端口、对端IP地址、对端端口、进程和网络会话字节数等。"`,
                  },
                  {
                    time: '10',
                    desc: '数据完整性在openEuler上的实现',
                    name: '赵磊',
                    post: '江苏润和软件股份有限公司专家级工程师',
                    detail: `讲述了Linux内核安全性模块的起源、发展和未来趋势，列举了openEuler在内核安全性上的增强和加固，并以openEuler为对象，介绍了在openEuler实现数据完整性的设计与方法
                            主题包含:
                            1: 介绍Linux内核安全性模块(LSM)的设计、历史和发展
                            2: openEuler在对内核安全性方面的增强与加固
                            3: 在openEuler实现数据完整性的一种实现设计方法`,
                  },
                  {
                    time: '11',
                    desc: '毒酒：跨平台操作系统供应链安全',
                    name: '吴鹤意',
                    post: '深信服安全专家',
                    detail: `linux本身对于软件生态管理并不理想，而目前国内支撑跨平台应用的操作系统越来越多，由此带来了新的软件供应链风险，引入了巨大的安全隐患。本议题通过新的软件供应链攻击路径，对国内常见的几种操作系统进行了实际测试，展示了一定的攻击效果，揭示了对于此领域应该更加重视，补足软件供应链的不足。`,
                  },
                  {
                    time: '12',
                    desc: '银河麒麟操作系统在能源行业实践',
                    name: '陈智明',
                    post: '麒麟软件有限公司产品社区中心总监',
                    detail: `银河麒麟高级服务器操作系统作为底层支撑，为DcS+SIS系统的运营提供了高效、稳定、安全的运行环境，在完美承载业务压力的同时还通过软件自研的安全架构在操作系统层筑下一道坚实壁垒`,
                  },
                ],
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
                children: [
                  {
                    time: '1',
                    desc: 'openEuler RISC-V的进展和展望',
                    name: '张旭舟',
                    post: '华为openEuler RISC-V SIG maintainer',
                    detail:
                      'openEuler 在RISC-V上已经快速持续迭代了两年时间并且已经进行了多次版本发布，随着RISC-V生态的快速发展，openEuler RISC-V 所支持的软件包、特性不断丰富，此次议题对于当前的进展和展望进行介绍。',
                  },
                  {
                    time: '2',
                    desc: 'openEuler的参考发行版',
                    name: '王弈桥',
                    post: '学生',
                    detail:
                      'Eulaceura 是将 RISC-V 架构纳入第一级支持范围的 openEuler 发行版。在这里我将分享因何原因而产生了这样一个新的发行，介绍 RISC-V 架构下的运作状况，和开发过程中的一些经验和思考。',
                  },
                  {
                    time: '3',
                    desc: 'RISC-V计算软件栈介绍',
                    name: '张先轶',
                    post: '澎峰科技CEO',
                    detail:
                      '高性能的异构计算软件栈作为底层硬件和上层应用的桥梁，可以扩展芯片的应用范围，提升计算性能。国际主流芯片公司都投入大量资源建设异构计算软件栈，例如Intel oneAPI，NVIDIA CUDA等。本报告将介绍澎峰的PerfXAPI异构计算软件栈在RISC-V的适配和优化工作，特别是底层计算库RVCL项目。',
                  },
                  {
                    time: '4',
                    desc: 'Backporting for OpenJDK8',
                    name: '章翔',
                    post: '中科院软件所工程师',
                    detail:
                      '此次分享主要介绍OpenJDK8移植RISC64的过程，包括移植的进展和产出，对于接触移植工作的新人来说，更为实际的是分享移植工作所带来的经验，希望能为新人做移植工作带来一些帮助。',
                  },
                  {
                    time: '5',
                    desc: '移植SpiderMonkey到RISC64',
                    name: '陆亚涵',
                    post: '软件所智能软件研究中心工程师',
                    detail: '关于移植SpiderMonkey到RISC64上的心得',
                  },
                  // {
                  //   time: '6',
                  //   desc: '即时开展 RISC-V openEuler Linux 内核开发',
                  //   name: '',
                  //   post: '',
                  //   detail:
                  //     '泰晓社区近期为 Linux Lab 开源项目新增了 openEuler Linux 内核开发支持，可以极速开展这块的开发，本次分享对此进行介绍。',
                  // },
                  // {
                  //   time: '1',
                  //   desc: '',
                  //   name: '',
                  //   post: '',
                  //   detail: '',
                  // },
                  // {
                  //   time: '1',
                  //   desc: '',
                  //   name: '',
                  //   post: '',
                  //   detail: '',
                  // },
                ],
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
  partner: {
    title: '共建单位',
    partnerList: [
      {
        subTitle: '操作系统产业峰会 2022 主办单位',
        logoList: [
          {
            IMG: atom,
            IMG_DARK: atomDark,
          },
          {
            IMG: csia,
            IMG_DARK: csiaDark,
          },
          {
            IMG: zhongguan,
            IMG_DARK: zhongguanDark,
          },
        ],
      },
      {
        subTitle: 'openEuler Summit 2022 主办单位',
        logoList: [
          {
            IMG: atom,
            IMG_DARK: atomDark,
          },
          {
            IMG: euler,
            IMG_DARK: eulerDark,
          },
        ],
      },
      {
        subTitle: 'openEuler Summit 2022 战略合作单位',
        logoList: [
          {
            IMG: huawei,
            IMG_DARK: huaweiDark,
          },
        ],
      },
      {
        subTitle: 'openEuler Summit 2022 联合主办单位',
        logoList: [
          {
            IMG: qilin,
            IMG_DARK: qilinDark,
          },
          {
            IMG: tongxin,
            IMG_DARK: tongxinDark,
          },
          {
            IMG: kylinsec,
            IMG_DARK: kylinsecDark,
          },
          {
            IMG: fusion,
            IMG_DARK: fusionDark,
          },
        ],
      },
      {
        subTitle: 'openEuler Summit 2022 协办单位',
        logoList: [
          {
            IMG: iscas,
            IMG_DARK: iscasDark,
          },
          {
            IMG: stone,
            IMG_DARK: stoneDark,
          },
          {
            IMG: runhe,
            IMG_DARK: runheDark,
          },
          {
            IMG: intel,
            IMG_DARK: intelDark,
          },
        ],
      },
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
const tabType = ref(['main', 'main', 'main']);
const otherTabType = ref([0, 0, 0]);
// const timeContent = ref(0);
onMounted(() => {
  AOS.init({
    offset: 50,
    duration: 800,
    delay: 100,
    once: true,
  });
});
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
    <div class="agenda">
      <h3>{{ summitData.agenda.title }}</h3>
      <div
        v-for="(item, index) in summitData.agenda.meetingList"
        :key="item.daytime"
        class="agenda-item"
        data-aos="fade-up"
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
    </div>
    <div class="partner">
      <h3 class="partner-title">
        {{ summitData.partner.title }}
      </h3>
      <div
        v-for="item in summitData.partner.partnerList"
        :key="item.subTitle"
        class="partner-item"
      >
        <h4>{{ item.subTitle }}</h4>
        <LinkPanel
          :link-list="item.logoList"
          :theme="commonStore.theme === 'light' ? 'light' : 'dark'"
        ></LinkPanel>
      </div>
    </div>
    <div class="previous" data-aos="fade-up">
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
.partner {
  margin-top: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h4);
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
  .partner-item {
    margin-top: var(--o-spacing-h2);
    @media screen and (max-width: 768px) {
      margin-top: var(--o-spacing-h4);
    }
    &:nth-of-type(1) {
      margin-top: 20px;
      @media screen and (max-width: 768px) {
        margin-top: var(--o-spacing-h5);
      }
      .picture-panel {
        max-width: 1053px;
        grid-template-columns: repeat(3, minmax(82px, 1fr));
        @media screen and (max-width: 768px) {
          grid-template-columns: repeat(2, minmax(82px, 1fr));
        }
      }
    }
    &:nth-of-type(2) {
      .picture-panel {
        max-width: 702px;
        grid-template-columns: repeat(2, minmax(82px, 1fr));
      }
    }
    &:nth-of-type(3) {
      .picture-panel {
        max-width: 351px;
        grid-template-columns: repeat(1, minmax(82px, 1fr));
        @media screen and (max-width: 650px) {
          max-width: 100%;
        }
        :deep(a) {
          @media screen and (max-width: 650px) {
            width: 50%;
            margin: 0 auto;
          }
        }
      }
    }
    &:nth-of-type(4),
    &:nth-of-type(5) {
      .picture-panel {
        @media screen and (max-width: 1416px) {
          max-width: 1053px;
          grid-template-columns: repeat(3, minmax(82px, 1fr));
        }
        @media screen and (max-width: 768px) {
          grid-template-columns: repeat(2, minmax(82px, 1fr));
        }
      }
    }
    h4 {
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      color: var(--o-color-text1);
      font-weight: 400;
      text-align: center;
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
    .picture-panel {
      margin-top: var(--o-spacing-h4);
      margin-left: auto;
      margin-right: auto;
      @media screen and (max-width: 768px) {
        margin-top: var(--o-spacing-h5);
      }
      :deep(a) {
        cursor: default;
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
