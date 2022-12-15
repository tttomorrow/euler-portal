<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useCommon } from '@/stores/common';
import AOS from 'aos';

import AppContext from '@/components/AppContent.vue';
import SummitSchedule from './components/SummitSchedule.vue';
import LinkPanel from '@/components/LinkPanel.vue';
// import SummitBanner from './components/SummitBanner.vue';

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
  detail: [
    '数字经济成为全球经济增长的主引擎，数字经济的快速发展，带来数字化、智能化的巨大发展机遇。操作系统作为数字基础设施的底座，已经成为推动产业数字化、智能化发展的核心力量。操作系统产业峰会2022旨在聚集全产业链力量，聚焦基础软件核心能力构建，引领基础软件持续创新，加快实现高水平科技自立自强。',
    'openEuler Summit 是由欧拉开源社区发起并举办的年度开源操作系统峰会。openEuler专注核心技术和全场景能力创新，构建多样性计算支持最佳的基础软件能力。充分释放开源协作的创新活力，通过开源开放，不断探索科技创新的边界，驱动物理世界与数字世界的深度融合。openEuler与社区伙伴持续构建自循环、自发展的上下游产业链。通过商业验证，提升市场占有率，成为数字基础设施的坚实底座。社区贡献者、行业用户、合作伙伴在 openEuler Summit 汇聚，驱动无止境的创新与拓展，闪耀数字时代星辰大海。',
  ],

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
                    detail: ``,
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
                children: [
                  {
                    time: '1',
                    desc: '毕昇JDK新特性分享',
                    name: '周磊',
                    post: '华为技术有限公司毕昇JDK高级技术专家',
                    detail:
                      '毕昇JDK是华为内部OpenJDK定制版Huawei JDK的开源版本，是一款高性能、可用于生产环境的OpenJDK发行版；毕昇JDK团队基于鲲鹏架构持续优化，不断给客户带来更有竞争力的JDK软件竞争力，本期主要介绍两个新特性：Dynamic CDS特性和ZGC TBI优化，在springboot场景收益明显。',
                  },
                  {
                    time: '2',
                    desc: '英特尔第四代至强可扩展处理器赋能openEuler领先技术发展',
                    name: '田俊',
                    post: 'Intel Arch SIG Maintainer',
                    detail:
                      'Intel在下一代Sapphire Rapids平台上引入了众多业界领先的技术和特性，同时Intel也正在参与和大力推进openEuler对多样性计算生态的支持。本话题将总体为大家更新openEuler平台在对Intel下一代平台和新技术支持上的进展，同时也会重点介绍未来平台的一些主要功能和特性，包括AMX，DSA, IAA，Scalable IOV，CXL 1.1等新技术以及应用场景等。',
                  },
                  {
                    time: '3',
                    desc: '全场景全流程的自动反馈优化',
                    name: '李彦成',
                    post: '华为技术有限公司软件工程师',
                    detail:
                      '随着计算继续向云上移动，微小的数据中心应用性能优化也能够带来大量经济效益。通常，单个数据中心计算节点执行的任务类型相对固定，作为底座的操作系统和基础库并未考虑特定应用场景，存在优化空间。通过从业务开发至部署阶段全流程，从用户态应用、内核到运行时库全场景的反馈优化，实现结合具体业务场景，深度释放数据中心算力。同时，提供多种优化特性和工具，实现不同场景下打造极致性能和极简应用的优化能力。帮助开发者了解谷歌、Meta等世界一流云服务企业如何利用反馈编译优化实现场景化优化目标，也为相关开发者系统性介绍openEuler系统上反馈编译优化现状、能力和未来规划。',
                  },
                  {
                    time: '4',
                    desc: '欧拉开源操作系统上LoongArch架构支持',
                    name: '李星',
                    post: '龙芯中科技术股份有限公司软件工程师',
                    detail:
                      '介绍欧拉支持LoongArch架构的工作，主要从底层来介绍，如我们的指令集、ABI、内核、GCC、LLVM等在欧拉开源操作系统上的支持。',
                  },
                  {
                    time: '4',
                    desc: 'openEuler对AMD第四代EPYC平台的支持',
                    name: '谢昊成',
                    post: 'amd工程师',
                    detail: '介绍openEuler对AMD第四代EPYC平台的支持',
                  },
                  {
                    time: '5',
                    desc: '基于LLVM编译openEuler嵌入式软件包的探索与实践',
                    name: '赵川峰',
                    post: '华为技术有限公司主任工程师',
                    detail:
                      'LLVM项目凭借其良好的架构、友好的Licence，近年来社区活跃度增加明显，越来越多的软件项目迁移到LLVM编译器构建。本议题首先简单介绍LLVM编译器项目架构特点和业界OS采用LLVM编译的已有实践，然后介绍编译openEuler嵌入式镜像软件包上的探索及最新进展，最后介绍一下这项工作的后续工作思路。',
                  },
                  {
                    time: '6',
                    desc: '基于 DPU 的异构编程解决方案',
                    name: '袁林思',
                    post: '深圳云豹智能有限公司软件总监',
                    detail:
                      '传统的编程以面向 CPU 通用处理器和主存为主，基于 x86/arm 指令集完成编程；而面向 DPU 编程时，将面对一个全新的硬件架构。DPU 引入更多的硬件加速引擎，甚至集成不同指令集的多个处理器，如何高效利用 DPU 的硬件能力的同时，降低用户的开发门槛及复杂度，本 topic 分享一种解决思路并通过一个实例来做一个演示',
                  },
                  {
                    time: '7',
                    desc: '编译器插件框架',
                    name: '伍明川',
                    post: '华为技术有限公司高级工程师',
                    detail: `作为当前主流的两种编译器框架，GCC使用面广，稳健发展性能较好；LLVM开拓创新，发展迅速。市场上大量的编译工具和编译扩展能力，均是基于这两类编译器完成的。这导致任何编译工具需要选择两种编译框架之一或者重复进行开发，拉高了工具的开发和维护成本。
                            GCC和LLVM各自提供自己的插件式开发能力，但是缺少面向插件工具的维护性和兼容性等公共能力。同时，面对各种不同算力，用户需要一种便捷的面向算力的编译优化配置方法，并为多样算力的优化配置提供除开源之外的第二种选择。本议题帮助开发者了解编译器插件工具开发的行业现状，为基于编译能力的相关工具开发者介绍一种新的便捷开发方法。`,
                  },
                  {
                    time: '8',
                    desc: '开源指令集RISC架构处理器与开源生态共生共荣',
                    name: '刘洋',
                    post: '合芯科技有限公司CTO & 研发副总裁',
                    detail: ``,
                  },
                  {
                    time: '9',
                    desc: '编译器视角的DSA架构可编程性',
                    name: '淡孝强',
                    post: '希姆计算编译工具链团队总监',
                    detail:
                      '从编译器视角展开，从ISA设计，内存，带宽设计，并行并发设计等维度，探讨DSA架构与可编程性，AI编译的紧密关系。',
                  },
                  {
                    time: '10',
                    desc: '基于新一代ARMv9 N2核和欧拉OS的软硬件协同优化',
                    name: '陈争胜',
                    post: '深圳市遇贤微电子有限公司首席架构师',
                    detail:
                      'ARM服务器CPU在数字基础设施中的部署越来越多，新一代ARMv9 N2实现了针对大数据处理的SVE2、I8MM等指令，如何通过编译器和手工优化，发挥这些新指令的计算效能优势是一个值得关注的问题。另外随着工艺与架构持续的演进，单处理器多核芯片（CMP）已经接近200核，未来甚至会达到500~1000核规模，平均系统Cache大小从512K到12MB，如何在这么大规模的CMP和复杂的系统Cache上部署和优化软件，具有非常大的挑战。本议题针对上述问题给出一些分析介绍和实践案例。',
                  },
                ],
              },
              {
                id: 2,
                name: '虚拟化&云原生',
                desc: 'openEuler Summit 2022',
                children: [
                  {
                    time: '1',
                    desc: '移动云天元轻量级Hypervisor与StratoVirt最佳实践',
                    name: '汤中睿',
                    post: '中国移动云能力中心软件开发工程师',
                    detail: `（1）相关产品及平台简介
                                a）移动云BC-EV虚拟化产品简介。
                                b）StratoVirt虚拟化平台简介。
                            （2）基于StratoVirt的移动云天元轻量级Hypervisor内存底噪、启动时间以及其它功能、兼容性等数据展示及情况介绍。
                            （3）StratoVirt支持自由时钟特性开发及功能展示。`,
                  },
                  {
                    time: '2',
                    desc: '推动容器网络发展 创造数据计算价值',
                    name: '李冬',
                    post: '中科驭数HADOS软件开发平台产品总监',
                    detail: ``,
                  },
                  {
                    time: '3',
                    desc: '使用Rancher管理面向openEuler的Kubernetes发行版',
                    name: '张智博',
                    post: 'SUSE',
                    detail: `Rancher是一款专注于Kubernetes多集群管理的开源产品，且一直深耕Kubernetes发行版领域，向业内输出了RKE、RKE2、K3s等产品，并兼容多种操作系统和云环境。openEuler作为一支飞速发展的生态力量，亦在Rancher的产品兼容范围内。同时，基于openEuler打造的一套Kubernetes发行版，也进入了Rancher的产品矩阵。依托Rancher的产品基本能力，结合openEuler的生态，给企业客户提供面向多云部署多样性Kubernetes集群的能力。`,
                  },
                  {
                    time: '4',
                    desc: '基于openEuler的可信虚拟化技术探索和实践',
                    name: '祁浩',
                    post: '中国移动云能力中心软件开发工程师',
                    detail: ``,
                  },
                  {
                    time: '5',
                    desc: '容器云业务与云底座操作系统运维一致性实践',
                    name: '刘阔',
                    post: '麒麟软件有限公司高级研发工程师',
                    detail: `云原生领域主要采用容器技术与容器编排技术实现业务发布、运维，与底层环境高度解耦，但同时带来了运维技术栈不统一，运维平台重复建设等问题。NestOS作为云底座操作系统，实现业务与底座操作系统运维的一致性，本议题将对其进行简要介绍和演示。`,
                  },
                  {
                    time: '6',
                    desc: '基于openEuler的云桌面性能问题定位提升实践',
                    name: '周同庆',
                    post: '湖南麒麟信安科技股份有限公司测试工程师',
                    detail: `简介：针对基于openEuler构建的云桌面的性能问题，通过性能瓶颈检测诊断工具准确定位，解决性能瓶颈，
                            主要分享：
                            1、 真实用户使用性能瓶颈检测
                            2、 云产品版本迭代性能优化验证
                            3、云桌面使用卡顿级别评测`,
                  },
                  {
                    time: '7',
                    desc: '基于openEuler构建全栈云原生中间件服务平台',
                    name: '李志鹏',
                    post: '东方通产品拓展部总经理',
                    detail: `中间件技术和产品随着IT技术和架构的发展而演进。当前云原生技术发展迅速并已被逐渐应用在多个行业领域的生产系统，对于云原生中间件的需求也与日俱增。东方通凭借多年中间件领域的技术积累，以及云原生业务场景下对于中间件的需求，基于openEuler系统打造了面向云原生的中间件服务平台，提供微服务应用运行时支撑、文件传输服务等多类中间件服务能力，助力客户构建云原生模式的业务系统。`,
                  },
                  {
                    time: '8',
                    desc: 'openEuler虚机混部基于移动苏研大云的最佳实践',
                    name: '朱科潜',
                    post: '华为企业通信技术有限公司软件研发工程师',
                    detail: `虚拟化技术作为当前云计算的技术底座，硬件资源利用率低是行业普遍存在的问题。随着云计算规模大幅增长，提高资源利用率是实现降本增效、绿色低碳的重要途径。
                            本议题主要针对通用计算场景CPU利用率提升问题，通过集群调度混部感知、单机协同调度、内核基础资源隔离等全栈技术，实现CPU利用率成倍增加，可大幅降低数据中心硬件成本。
                            相关成果已经联合中移动苏研完成技术验证，包含详细的数据和演示视频，可在大会联合展示。`,
                  },
                  {
                    time: '9',
                    desc: '基于openEuler的ODK移植和应用实践',
                    name: '田利军',
                    post: '统信软件高级研发工程师',
                    detail: `ODK是OpenShift上游和社区版本，在金融，智能制造等行业有较多的使用场景，我们基于openEuler完成了对OKD的移植并提供DevOps实践和CI/CD，构建安全可靠的全栈容器云。`,
                  },
                ],
              },
              {
                id: 3,
                name: '嵌入式&ROS',
                desc: 'openEuler Summit 2022',
                children: [
                  {
                    time: '1',
                    desc: '2022 sig-ROS发展图鉴',
                    name: '安传旭',
                    post: '中科院软件所sig-ROS maintainer',
                    detail: '2022年sig-ROS所做工作的汇报，以及后续的展望。',
                  },
                  {
                    time: '2',
                    desc: 'openEuler ROS 发展的技术展望',
                    name: '张珩',
                    post: '中国科学院软件研究所副研究员',
                    detail:
                      '通过对openEuler ROS的发展历程以及应用领域的梳理，研讨ROS发展的核心技术发展；并围绕各类核心组件技术（含ROS分布式通信、定位导航以及可视化）分析openEuler ROS的技术发展前景，展望openEuler ROS发展。',
                  },
                  {
                    time: '3',
                    desc: '小而美的嵌入式操作系统 RT-Thread',
                    name: '郭占鑫',
                    post: '上海睿赛德电子科技有限公司RT-Thread 社区负责人',
                    detail:
                      '先简单介绍嵌入式操作系统 RT-Thread 的情况，包括基础特性和发展现状，然后分享 RT-Thread 5.0 的最新进展，包括 Arduino 兼容层的支持，以及 RT-Thread 和 openeuler Embedded 混合部署。',
                  },
                  {
                    time: '4',
                    desc: '基于openEuler系统的Jailhouse研究、实践及创新',
                    name: '郭皓',
                    post: '麒麟软件技术专家',
                    detail:
                      '首先介绍jailhouse是什么、优势及适用场景；其次介绍jailhouse虚拟化原理；最后再介绍麒麟软件基于欧拉开源操作系统对Jailhouse软件目前的研究及创新。',
                  },
                  {
                    time: '5',
                    desc: '科东Intewell国产自主嵌入式实时操作系统，助力智能制造',
                    name: '毛响林',
                    post: '科东（广州）软件科技有限公司副总经理',
                    detail: '',
                  },
                  {
                    time: '6',
                    desc: '基于openEuler Embedded的嵌入式系统特性和电网应用',
                    name: '廖卫',
                    post: '湖南麒麟信安科技股份有限公司操作系统产品线版本经理',
                    detail: `"简介： 介绍基于openEuler Embedded 的麒麟信安嵌入式系统的特性,并且在电网安全运维网关项目上的应用。
                            主要分享：
                            1、介绍嵌入式系统的特性,主要包括以openEuer为供应链、支持wayland、支持双系统升级、安全特性等
                            2、介绍嵌入式系统版本定制系统
                            3、介绍在电网安全运维网关项目上的挑战和解决方案"`,
                  },
                ],
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
                    detail: '',
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
                    detail: '',
                  },
                  {
                    time: '6',
                    desc: '即时开展 RISC-V openEuler Linux 内核开发',
                    name: '吴章金',
                    post: '儒码科技CEO',
                    detail:
                      '泰晓社区近期为 Linux Lab 开源项目新增了 openEuler Linux 内核开发支持，可以极速开展这块的开发，本次分享对此进行介绍。',
                  },
                  {
                    time: '7',
                    desc: '2022年QEMU和Spike开源进展',
                    name: '李威威',
                    post: '中科院软件研究所软件工程师',
                    detail:
                      '对2022年RISC-V QEMU和Spike社区的开源进展进行介绍。',
                  },
                  {
                    time: '8',
                    desc: 'RISC-V 如何迈向高性能计算',
                    name: '陆言',
                    post: '同济大学学生',
                    detail:
                      'RISC-V 作为一个新的开源指令集，因其高度可定制的 ISA 和架构设计受到了广泛关注，也向人们揭示了一种潜在的新的高性能计算的可能性。本议题讨论了 RISC-V 如何改造自己适合高性能计算，有什么样的案例，软件栈与工具链的发展情况，以及 openEuler RISC-V port 对此能起到何种帮助。',
                  },
                ],
              },
              {
                id: 5,
                name: '迁移&运维',
                desc: 'openEuler Summit 2022',
                children: [
                  {
                    time: '1',
                    desc: 'openEuler社区安全漏洞治理',
                    name: '颜小兵',
                    post: '华为工程师',
                    detail: 'openEuler社区安全漏洞治理框架、运作方式等',
                  },
                  {
                    time: '2',
                    desc: 'sysMaster：重新定义服务管理，秒级启动、保障系统24小时在线',
                    name: '徐小舟',
                    post: '华为软件工程师',
                    detail:
                      '一套超轻量、高可靠性的服务管理程序集合，旨在改进传统的init守护进程。使用Rust语言编写，引入1+1+N架构和可靠性框架，支持自身故障快速检测和自愈，从而提升OS稳定性和业务可靠性。',
                  },
                  {
                    time: '3',
                    desc: '超聚变知识引擎，为智能运维提供核心动能',
                    name: '吴江涛',
                    post: '超聚变数字技术有限公司操作系统架构师',
                    detail: '',
                  },
                  {
                    time: '4',
                    desc: 'PilotGo 4：openEuler社区原生插件式运维平台',
                    name: '杨昭',
                    post: '麒麟软件有限公司高级软件工程师',
                    detail:
                      'PilotGo是openEuler社区原生孵化的运维管理平台，提供大规模集群的主机监控告警、软件包安装升级管理及批量运维操作等功能，保障业务系统安全、稳定运行。同时提供插件机制，对接多种业务场景集群，提供无感知的运维平台切换。',
                  },
                  {
                    time: '5',
                    desc: '企业场景下操作系统运维思考与实践',
                    name: '张曦',
                    post: '华为场景AI智能决策算法科学家',
                    detail:
                      '随着业务规模增长，企业数字化转型和云化服务化的节奏日益加快。在大数据、云计算、人工智能等高新技术的推动下，IT运维如乘坐火箭一般日新月异，智能运维（AIOps）已经逐渐成为企业高效运营、发展的必备手段。我们从华为内部IT运维稳定、高效、安全场景出发，分享结合机器学习和基于openEuler的运维的挑战和应用。',
                  },
                  {
                    time: '6',
                    desc: '软通动力openEuler迁移实践分享',
                    name: '刘合领',
                    post: '软通动力基础软件服务经理',
                    detail: `软通动力openEuler一站式服务能力介绍
                            软通动力openEuler一站式服务工具介绍
                            案例分享`,
                  },
                  {
                    time: '7',
                    desc: '超聚变操作系统迁移思考及实践介绍',
                    name: '张海亮',
                    post: '超聚变数字技术有限公司操作系统架构师',
                    detail: ``,
                  },
                ],
              },
              {
                id: 6,
                name: '用户&开发者体验',
                desc: 'openEuler Summit 2022',
                children: [
                  {
                    time: '1',
                    desc: 'openEuler社区基础设施新服务及未来展望',
                    name: '李超然',
                    post: '',
                    detail:
                      '介绍openEuler社区技术设施最新上线的众多服务、使用方法以及如何提升开发者效率与体验；展望未来1年openEuler社区基础设施的规划。',
                  },
                  {
                    time: '2',
                    desc: 'openEuler开发体验-开发工具链',
                    name: '杜开田',
                    post: '',
                    detail:
                      '介绍openEuler开发者工具链最新进展和规划，为openEuler开发者提供高效、便捷的开发体验。',
                  },
                  {
                    time: '3',
                    desc: '基础软件人才与服务发展规划',
                    name: '孙虎',
                    post: '华为技术有限公司服务Fellow',
                    detail: `1.	人才发展规划：a)	高校人才播种；b)	社区人才培育和评定
                            2.	服务能力构建规划：a)	服务能力；b)	服务工具；c)社区服务论坛`,
                  },
                  {
                    time: '4',
                    desc: '北京航空航天大学openEuler合作实践',
                    name: '朱玲',
                    post: '',
                    detail:
                      '分享北京航空航天大学与openEuler社区技术合作运作经验，从科研、教学、社区回馈等维度进行介绍，展示openEuler社区与高校、科研院所合作的样板。',
                  },
                  {
                    time: '5',
                    desc: '优秀SIG组运作经验分享',
                    name: '优秀SIG组代表',
                    post: '',
                    detail:
                      'openEuler社区优秀SIG组代表分享社区SIG组运作经验，为社区SIG组提供指导。',
                  },
                  {
                    time: '6',
                    desc: 'openEuler合规风险的治理实践',
                    name: '郑志鹏',
                    post: '华为openEuler合规sig maintainer/开源管理中心高级工程师',
                    detail: 'openEuler合规风险的治理实践。',
                  },
                  {
                    time: '7',
                    desc: 'openEuler社区License准入体系在维信金科开源合规治理中的应用',
                    name: '许渊聪',
                    post: 'openEuler合规sig maintainer/维信金科合规负责人',
                    detail:
                      'openEuler社区License准入体系在维信金科开源合规治理中的应用。',
                  },
                  {
                    time: '8',
                    desc: '欧拉Talk-开发者体验反馈大会',
                    name: '社区开发者/TC',
                    post: '',
                    detail:
                      '开发者体验反馈线上交流会，收集社区开发者对openEuler社区开发体验的意见与建议，改进社区开发流程，提升开发者体验与效率。',
                  },
                ],
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
  <!-- <SummitBanner/> -->
  <AppContext>
    <div v-for="item in summitData.detail" :key="item" class="detail">
      {{ item }}
    </div>
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
                <p v-if="index === 0" class="other-text">
                  <IconTime />{{
                    summitData.agenda.meetingList[index].list[1].duration
                  }}
                </p>
                <SummitSchedule
                  v-if="index === 1"
                  :options="itemList.children"
                />
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
    &:nth-of-type(1) {
      .el-tabs__active-bar {
        display: none;
      }
      // 暂时取消第一天的分会选中状态
      .other {
        :deep(.o-tabs) {
          .el-tabs__active-bar {
            display: none;
          }
          .is-active {
            color: var(--o-color-text1);
          }
          .el-tabs__item:hover {
            color: var(--o-color-text1);
            cursor: default;
          }
        }
      }
    }
    // 暂时隐藏时间
    &:nth-of-type(2) {
      .other {
        :deep(.dataItem) {
          grid-template-columns: 600px 445px;
          padding-left: 192px;
          @media screen and (max-width: 1328px) {
            grid-template-columns: 500px 445px;
          }
          @media screen and (max-width: 1320px) {
            padding-left: 80px;
          }
          @media screen and (max-width: 1100px) {
            padding-left: 100px;
            grid-template-columns: 348px;
            .box {
              grid-column-start: 1;
              grid-column-end: 2;
            }
          }
          @media screen and (max-width: 820px) {
            padding-left: 2vw;
          }
          @media screen and (max-width: 420px) {
            grid-template-columns: auto;
          }
          .show-more {
            color: var(--o-color-brand1);
          }
          .time {
            display: none;
          }
          .desc {
            display: block;
            &:hover {
              color: var(--o-color-brand1);
            }
          }
        }
      }
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
        :deep(.dateList) {
          .detail {
            display: none;
          }
          .show-detail {
            .detail {
              display: block;
            }
          }
        }

        // 消除分论坛分类的选中状态 start
        // :deep(.o-tabs) {
        //   &.el-tabs .el-tabs__nav-wrap .el-tabs__item {
        //     &.is-active {
        //       color: var(--o-color-text1);
        //     }
        //     &.is-top {
        //       &:hover {
        //         color: var(--o-color-text1);
        //         cursor: default;
        //       }
        //     }
        //   }

        // }
        // 消除分论坛分类的选中状态 end
      }
      :deep(.detail) {
        display: none;
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
