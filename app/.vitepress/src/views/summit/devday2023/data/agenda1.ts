export default {
  title: '',
  content: {
    title: '4月21日',
    content: [
      {
        lable: 'openEuler开发者峰会主论坛（10:00-12:05）',
        id: 'id1',
        content: [
          {
            id: 'id2',
            name: '',
            content: [
              {
                id: 'id3',
                time: ['10:00', '10:05'],
                desc: '院士致辞',
                person: [
                  {
                    id: 'id4',
                    name: '',
                    post: '',
                  },
                ],
                detail: '',
              },
              {
                id: 'id5',
                time: ['10:05', '10:10'],
                desc: 'openEuler社区捐赠人领导致辞',
                person: [
                  {
                    id: 'id6',
                    name: '',
                    post: '',
                  },
                ],
                detail: '',
              },
              {
                id: 'id6',
                time: ['10:10', '10:15'],
                desc: '基金会致辞',
                person: [
                  {
                    id: 'id6',
                    name: '',
                    post: '',
                  },
                ],
                detail: '',
              },
              {
                id: 'id7',
                time: ['10:15', '10:30'],
                desc: '主题演讲：海纳百川 奔涌向前',
                person: [
                  {
                    id: 'id8',
                    name: '',
                    post: '',
                  },
                ],
                detail: '',
              },
              {
                id: 'id11',
                time: ['10:30', '10:45'],
                desc: 'openEuler社区成果展示\n-创新项目加入openEuler项目群成果发布\n-北航-华为关键软件联合实验室揭牌暨成果发布',
                person: [
                  {
                    id: 'id12',
                    name: '',
                    post: '',
                  },
                ],
                detail: '',
              },
              {
                id: 'id13',
                time: ['10:45', '11:00'],
                desc: '主题演讲：谋势而动 蓄势待发-openEuler技术前沿展望',
                person: [
                  {
                    id: 'id14',
                    name: '',
                    post: '',
                  },
                ],
                detail: '',
              },
              {
                id: 'id15',
                time: ['11:00', '11:20'],
                desc: '联创成果：openEuler全场景联合创新方案发布',
                person: [
                  {
                    id: 'id16',
                    name: '',
                    post: '',
                  },
                ],
                detail: '',
              },
              {
                id: 'id17',
                time: ['11:20', '12:00'],
                desc: '主题演讲：openEuler行业应用实践分享',
                person: [
                  {
                    id: 'id18',
                    name: '',
                    post: '',
                  },
                ],
                detail: '',
              },
              {
                id: 'id19',
                time: ['12:00', '12:05'],
                desc: '开放原子校源行@openEuler活动启动仪式',
                person: [
                  {
                    id: 'id20',
                    name: '',
                    post: '',
                  },
                ],
                detail: '',
              },
            ],
          },
        ],
      },
      {
        lable: '六大技术分论坛（13:30-15:10）',
        id: 'id21',
        content: [
          {
            id: 'id22',
            name: 'Linux 内核',
            content: [
              {
                id: 'id23',
                time: ['13:30', '13:50'],
                desc: '维护openEuler内核：基于patch更加有效',
                person: [
                  {
                    id: 'id24',
                    name: 'Coly Li',
                    post: 'SUSE软件工程师',
                  },
                ],
                detail:
                  '目前openEuler内核是基于完整内核代码树来维护的，这种形式在分布式开发维护epenEuler内核时有诸多不便和限制。通过介绍基于patch文件的形式来维护企业级内核的方法，展示如何克服当前内核维护流程中的不足，以及如何更加高效的实施内核维护的分布式协作实践。',
              },
              {
                id: 'id25',
                time: ['13:50', '14:10'],
                desc: 'openEuler性能调优实践分享',
                person: [
                  {
                    id: 'id26',
                    name: '赵磊',
                    post: '江苏润和软件股份有限公司专家级工程师',
                  },
                ],
                detail: `演讲介绍对Linux进行性能调优的方法论、入手点、以及openEuler的若干项性能提升特性，
                \n分享对在内核、系统、应用框架等方面的调优心得，分为以下部分：
                \n1：影响应用性能的操作系统要点分析
                \n2：操作系统调优的突破口和方法
                \n3: openEuler引入的性能提升特性
                \n4: 对基于openEuler业务的性能调优案例`,
              },
              {
                id: 'id27',
                time: ['14:10', '14:30'],
                desc: '高性能网络之DPDK技术演进',
                person: [
                  {
                    id: 'id28',
                    name: '冯成文',
                    post: '华为技术有限公司资深工程师',
                  },
                ],
                detail:
                  'DPDK(Data Palane Development Kit)提供多平台上高性能数据包处理解决方案，其采用ByPass内核+Polling来达成零拷贝+高性能，广泛应用于用户态协议栈/Switch&Router/负载均衡器/发包仪等应用场景中；本议题主要介绍DPDK社区相关技术演进。',
              },
              {
                id: 'id29',
                time: ['14:30', '14:50'],
                desc: 'virtio-gpu视频编解码加速框架介绍',
                person: [
                  {
                    id: 'id30',
                    name: '谢明',
                    post: '麒麟软件有限公司研发中心虚拟化技术总监',
                  },
                ],
                detail:
                  'virtio-gpu是当前gpu虚拟化中半虚拟化的一种技术，利用后端GPU加速，大幅提升了3D性能。我们针对3D渲染做了大量优化大幅提升了性能。但是当前框架并不支持硬件视频加速功能，为此我们开发了支持硬件编码的框架，来达到虚拟机中播放高清视频加速目的。目前virtio-gpu硬件编解码加速框架已经被上游社区mesa、virglrenderer社区接受，已经支持H264/H265格式、VP9格式我们正在开发中。',
              },
              {
                id: 'id31',
                time: ['14:50', '15:10'],
                desc: 'NFS协议增强',
                person: [
                  {
                    id: 'id32',
                    name: '郭洋',
                    post: '华为技术有限公司PLM',
                  },
                ],
                detail:
                  '在金融、制造、运营商、医疗、教育等多个行业中，面向生产业务的企业NAS存储应用越来越广，针对NAS的性能诉求、可靠性要求逐渐增高，目前原生的操作系统NFS 客户端是不具备多路径功能，当链路中断，底层存储故障，无法进行路径切换，造成上层应用的业务中断或归零。针对此问题，在openEuler 提供NFS+ client，具备链路聚合以及链路切换功能，大幅提升业务的性能及可靠性',
              },
            ],
          },
          {
            id: 'id33',
            name: '安全',
            content: [
              {
                id: 'id34',
                time: ['13:30', '13:50'],
                desc: '麒麟服务器操作系统商用密码的应用实践',
                person: [
                  {
                    id: 'id35',
                    name: '史俊',
                    post: '麒麟软件有限公司产品总监',
                  },
                ],
                detail:
                  '阐述麒麟服务器操作系统整体安全架构和策略，密码作为安全架构的基础设施，相关应用场景的描述，介绍符合0028标准的基于国产芯片的软件商用密码模块的技术研究，将商用密码模块在安全启动、安全传输、安全存储方面的应用实践，并对未来的工作进行展望。',
              },
              {
                id: 'id36',
                time: ['13:50', '14:10'],
                desc: '基于openEuler机密计算探索',
                person: [
                  {
                    id: 'id37',
                    name: '胡科开',
                    post: '华为技术有限公司资深安全专家',
                  },
                  {
                    id: 'id38',
                    name: '周广伟',
                    post: '华为技术有限公司安全技术专家',
                  },
                ],
                detail:
                  '随着以ChatGPT为代表的AI大模型爆火，AI时代已经到来。如何在AI时代保护用户的数据、模型和隐私信息，是当前业界的热点课题与关键挑战。机密计算技术也面临着应用场景边界的大规模拓展，从传统的高安应用场景迅速扩展到大数据、AI大模型等大规模通用应用场景。本议题分享对AI时代机密计算技术发展趋势的思考，提出openEuler in TEE开源项目，期待与更多业界同行共同探索AI时代的机密计算技术。',
              },
              {
                id: 'id39',
                time: ['14:10', '14:30'],
                desc: 'cve-ease项目介绍及后续规划',
                person: [
                  {
                    id: 'id40',
                    name: '游益锋',
                    post: '天翼云科技有限公司后台开发工程师',
                  },
                ],
                detail: `cve-ease 是一个专注于CVE信息的平台，它搜集了社区发布的各种CVE信息，并通过邮件、微信、钉钉等多种渠道及时通知用户。用户可以通过cve-ease平台查看CVE信息的详细内容，包括漏洞描述、影响范围、修复建议等，并根据系统情况选择合适的修复方案。
                  \ncve-ease 平台旨在帮助用户快速了解和应对系统中存在的漏洞，提高系统安全性和稳定性。
                  \ncve-ease 是天翼云自主创新项目，它已经在欧拉社区开放源码，期待社区的朋友们加入项目开发，共同打造一个安全、稳定、可靠的国产操作系统生态。`,
              },
              {
                id: 'id41',
                time: ['14:30', '14:50'],
                desc: 'openBrain开源漏洞感知系统',
                person: [
                  {
                    id: 'id42',
                    name: '杨牧天',
                    post: '北京中科微澜科技有限公司CEO',
                  },
                ],
                detail:
                  'openBrain开源漏洞感知系统，依托底层认知安全技术能力，采用业界前沿的漏洞图谱理念，从海量漏洞数据中智能提炼知识，覆盖国内外多个安全漏洞情报源，并实时与项目环境进行关联，将漏洞感知时效性缩短至24小时内，同时能够在代码托管平台自动提交ISSUE，辅助安全人员快速识别漏洞威胁，高效实现漏洞处置，实现创新性人机协同新模式。',
              },
              {
                id: 'id43',
                time: ['14:50', '15:10'],
                desc: 'SBOM服务及统一漏洞平台在openEuler社区的应用',
                person: [
                  {
                    id: 'id44',
                    name: '王泽俊',
                    post: '华为技术有限公司高级工程师',
                  },
                ],
                detail:
                  '介绍SBOM服务在openEuler社区中如何精准识别软件成分，并实现软件依赖的正反向追溯。以及依托统一漏洞平台，在openEuler安全、合规方向上的应用，最终为openEuler社区的开源软件供应链安全保驾护航。',
              },
            ],
          },
          {
            id: 'id45',
            name: '多样性计算',
            content: [
              {
                id: 'id46',
                time: ['13:30', '13:50'],
                desc: '龙芯新架构LoongArch与Linux内核',
                person: [
                  {
                    id: 'id47',
                    name: '陈华才',
                    post: '龙芯中科内核开发工程师',
                  },
                ],
                detail:
                  '介绍龙芯处理器的发展简史，引出龙芯新架构LoongArch，概述其功能特征。围绕两年来将LoongArch做进Linux内核上游的不懈努力，回顾此过程中发生的各种故事（如中断控制器的故事和EFISTUB的故事）。介绍V5.19时新架构终于进入上游后的现状及迭代（V6.0、V6.1、V6.2等），最后展望未来的发展计划。',
              },
              {
                id: 'id48',
                time: ['13:50', '14:10'],
                desc: '异构算力框架UADK在软硬协同方面的设计演进',
                person: [
                  {
                    id: 'id49',
                    name: '钱伟丽',
                    post: '华为技术有限公司软件开发工程师',
                  },
                  {
                    id: 'id50',
                    name: '庄浩坚',
                    post: 'Linaro Senior Software Engineer',
                  },
                ],
                detail:
                  'UADK作为异构算力加速的通用框架，在UADK框架中增加对CPU/加速器等多样性算力之间协同调度的能力，并在UADK中支持国密加速指令，在硬件负载高时，可动态切换利用CPU加速指令进行计算。同时UADK支持其他厂家驱动注册，支持模块级动态加载等特性演进。并且介绍在使用SVE指令进行优化时的一些经验。',
              },
              {
                id: 'id51',
                time: ['14:10', '14:30'],
                desc: '打造易用DPU OS，夯实算力网络IaaS底座',
                person: [
                  {
                    id: 'id52',
                    name: '班有容',
                    post: '中国移动研究院项目经理',
                  },
                  {
                    id: 'id53',
                    name: '王伟',
                    post: '大禹智芯软件研发负责人',
                  },
                ],
                detail: `DPU作为算力基础设施的核心部件，是算力网络关键技术之一，而操作系统作为算力网络上层应用与底层设备的重要桥梁起着关键作用。\n
                本议题将从DPU厂商和算力网络IaaS底座的视角分享DPU OS应具备能力的思考。同时也分享了在OpenInfra基金会算力网络工作组，来自移动，大禹，九州云，openEuler的开发者们，围绕着DPU OS定制以及通过无感卸载提升易用性等方向上的尝试与探索。`,
              },
              {
                id: 'id54',
                time: ['14:30', '14:50'],
                desc: 'openEuler RISC-V 2023-2025: 领先并超越',
                person: [
                  {
                    id: 'id55',
                    name: '吴伟',
                    post: '中科院软件所PLCT实验室项目总监',
                  },
                ],
                detail:
                  '经过过去几年的发展， openEuler 已经成为 RISC-V 架构上世界领先的 Linux 发行版之一，率先集成并验证了多项来自中科院软件所等RISC-V基础软件研发团队的最新成果，并已经在 RISC-V Lab 等开源基础设施中部署、运行了超过一年以上。本次报告将会介绍 RISC-V SIG 最新的路线图，包括 RISC-V 架构在 2309 版本合并进入 openEuler 主线的努力、LLVM 平行宇宙计划、 为 RISC-V 架构进入世界高性能计算TOP500名单进行的准备等。',
              },
              {
                id: 'id56',
                time: ['14:50', '15:10'],
                desc: '英特尔服务器平台新特性探讨与展望',
                person: [
                  {
                    id: 'id57',
                    name: '李崇',
                    post: '英特尔系统软件架构师',
                  },
                ],
                detail:
                  '英特尔Sapphire Rapids和后续下一代服务器架构将在体系结构，高性能指令集，加速器，虚拟化和安全等领域持续创新和引入更多业界领先的技术。本议题英特尔架构师将综合介绍英特尔现有服务器平台的主要特性和后续平台上的新技术演进和引入，以及借此机会和大家展开探讨上述新特性和技术在上游社区正在积极开发的各类相关话题。',
              },
            ],
          },
          {
            id: 'id58',
            name: 'openEuler开发者服务',
            content: [
              {
                id: 'id59',
                time: ['13:30', '13:50'],
                desc: 'EulerMaker实现软件包及镜像定制',
                person: [
                  {
                    id: 'id60',
                    name: '段鹏杰',
                    post: '华为技术有限公司系统工程师',
                  },
                ],
                detail: '介绍如何使用EulerMaker服务实现软件包及镜像定制。',
              },
              {
                id: 'id61',
                time: ['13:50', '14:10'],
                desc: 'OEPKGS 社区开放软件包服务',
                person: [
                  {
                    id: 'id62',
                    name: '纪涛',
                    post: '中国科学院软件研究所 OEPKGS 产品经理',
                  },
                ],
                detail: `OEPKGS 平台汇聚 openEuler 官方软件仓与 OEPKGS 社区第三方软件仓，面向 openEuler 生态提供兼容性软件包供应服务，为现有操作系统向openEuler 生态迁移提供支撑和保障。
                \nOEPKGS 平台为 openEuler 操作系统提供 11 个版本的近百万兼容性软件包数据服务，包括软件包高级属性分析、源码仓及上游仓的状态标识，SBOM 分析、依赖可视化图谱、软件包风险分析与针对安全、合规及维护性提供信息公告。
                \n本次议题主要介绍平台能力与软件包引入 OEPKGS 仓库流程。`,
              },
              {
                id: 'id63',
                time: ['14:10', '14:30'],
                desc: 'LLVM IR简介及近期演变介绍',
                person: [
                  {
                    id: 'id64',
                    name: '陆旭凡',
                    post: '中科院软件所LLVM编译器工程师',
                  },
                ],
                detail:
                  'LLVM IR是一种基于静态单赋值 (SSA) 的语言中间表示，它提供类型安全、低级操作、灵活性以及拥有干净地表示“所有”高级语言的能力。本次报告将简单介绍LLVM IR以及LLVM IR近期的演变',
              },
              {
                id: 'id65',
                time: ['14:30', '14:50'],
                desc: '中国移动基于openEuler生态体系构建云原生开发环境实践',
                person: [
                  {
                    id: 'id66',
                    name: '魏宝辉',
                    post: '中国移动信息技术中心PaaS架构师',
                  },
                ],
                detail:
                  '随着云原生应用逐渐流行，开发人员面临着新的环境挑战，如何快速便捷地搭建开发环境、提高调试效率、解决环境配置带来的效率问题成为了重要的课题。本议题介绍中国移动如何结合openEuler的虚拟化和容器，以及在容器DevOps方面的优化，形成了一套自动化的全生命周期管理平台，为开发者提供简单易用的CICD环境。该平台提供开发所需的技术服务组件和自动化供给能力，帮助开发人员快速构建、部署和测试应用，提高开发效率和质量',
              },
              {
                id: 'id67',
                time: ['14:50', '15:10'],
                desc: 'OmniVirt:在最习惯的桌面环境上开发openEuler',
                person: [
                  {
                    id: 'id68',
                    name: '郑振宇',
                    post: 'openEuler社区Maintainer',
                  },
                ],
                detail:
                  'OmniVirt是由openEuler社区技术运营团队及基础设施团队孵化的开发者工具集，通过对主流桌面操作系统中的虚拟化技术(LXD、HyperV、Virtualization framework)等技术进行有机整合，使用openEuler社区官方发布的虚拟机、容器镜像，为开发者在Windows、MacOS、Linux上提供统一的开发资源(虚拟机、容器)发放和管理体验，提升主流桌面操作系统上openEuler开发环境使用的便利性和稳定性，有效提升开发者体验。',
              },
            ],
          },
          {
            id: 'id69',
            name: '迁移运维',
            content: [
              {
                id: 'id70',
                time: ['13:30', '13:50'],
                desc: '凝思欧拉操作系统迁移方案介绍',
                person: [
                  {
                    id: 'id71',
                    name: '曾宏安',
                    post: '北京凝思软件股份有限公司北京研发中心总经理',
                  },
                ],
                detail:
                  '国内基础设施行业大量生产系统部署在redhat、centos、suse等国外Linux发行版本上。国外操作系统产品存在的闭源和系统后门等风险已严重影响行业用户的生产安全和信息安全。凝思软件携手欧拉社区，利用操作系统方面的产品能力和技术优势，开发迁移工具软件，可解决系统迁移过程中评估手段匮乏、迁移周期长、无法批量化处理等痛点，帮助用户在核心业务场景下实现系统迁移工作，为用户的信息化建设贡献凝思的力量。',
              },
              {
                id: 'id72',
                time: ['13:50', '14:10'],
                desc: 'Aops在分布式存储ceph中应用研究',
                person: [
                  {
                    id: 'id73',
                    name: '张道龙',
                    post: '软通动力信息技术（集团）股份有限公司云计算开发专家',
                  },
                ],
                detail: `A-Ops是用于提升主机整体安全性的服务，通过资产管理、CVE管理、异常检测、配置溯源等功能，识别并管理主机中的信息资产，监测主机中的软件漏洞、排查主机中遇到的系统故障，使得目标主机能够更加稳定和安全的运行。
                  \n分布式存储ceph是一种为优秀的性能、可靠性和可扩展性而设计的统一的、分布式文件系统。
                  \nCeph运维管理相对复杂，监控参数指标多，当前的一些监控工具只能监控一些指标，缺乏有效问题溯源的监控工具，并且各个指标相互独立，待问题出现后，通常监控工具只能监控一些指标异常，但是很难定位到问题的根因，aops目前有AI分析能力，集合监控数据可以对故障做出诊断，可以给运维管理人员一个问题定位参考。`,
              },
              {
                id: 'id74',
                time: ['14:10', '14:30'],
                desc: '麒麟软件集群治理思考及在openEuler社区中的探索 -- PilotGo与gala-ops的强强联合',
                person: [
                  {
                    id: 'id75',
                    name: '杨昭',
                    post: '麒麟软件有限公司高级软件工程师',
                  },
                ],
                detail:
                  'PilotGo作为一款插件式的运维管理平台，一直致力于打破各类运维管理工具之间的界限，并积极探索新兴运维技术在应用场景中的落地实践。本次演讲介绍gala-ops运维工具在PilotGo平台中的插件式集成，结合PilotGo的平台能力和gala-ops的监控及故障诊断功能，为客户带来便捷、高效、强大的智能运维体验。',
              },
              {
                id: 'id76',
                time: ['14:30', '14:50'],
                desc: '超聚变CentOS迁移介绍',
                person: [
                  {
                    id: 'id77',
                    name: '董贤信',
                    post: '超聚变数字技术有限公司SE',
                  },
                ],
                detail:
                  'CentOS迁移思考，超聚变迁移方案和工具介绍，以及迁移实践分享',
              },
              {
                id: 'id78',
                time: ['14:50', '15:10'],
                desc: '天翼云ctyunos迁移工具实践',
                person: [
                  {
                    id: 'id79',
                    name: '付广哲',
                    post: '天翼云科技有限公司研发专家',
                  },
                ],
                detail:
                  '天翼云基于openeuler20.03sp1自研的ctyunos系统，大规模替换centos系统，基于openeuler社区x2工具，定制开发迁移工具，支持电信集团存量centos系统迁移，大规模测试验证，分批替换。多场景，多业务全量替换。过程中发现并解决大量实际问题，不断完善工具产品化能力，更好的支持迁移工作落地。',
              },
            ],
          },
          {
            id: 'id80',
            name: '嵌入式',
            content: [
              {
                id: 'id81',
                time: ['13:30', '13:50'],
                desc: '国创工软在工业控制场景基于openEuler Embedded的应用实践',
                person: [
                  {
                    id: 'id82',
                    name: '李军',
                    post: '粤港澳大湾区(广东)国创中心工业产业发展中心产品经理',
                  },
                ],
                detail:
                  '装备行业最典型的工业机器人，CNC，注塑机等场景，其业务发展趋势给软件架构带来挑战，而国内的嵌入式OS市场份额很小，竞争力也不够，基于现状和国创工软的定位，如何构建自主可控，开放的，有竞争力的嵌入式os平台，支持国内工业多个场景的应用',
              },
              {
                id: 'id83',
                time: ['13:50', '14:10'],
                desc: 'jailhouse工程化实践与特性优化',
                person: [
                  {
                    id: 'id84',
                    name: '廖元垲',
                    post: '菁蓉联创研发工程师 ',
                  },
                  {
                    id: 'id85',
                    name: '黄磊',
                    post: '麒麟软件有限公司创新院操作系统实验室经理 ',
                  },
                ],
                detail:
                  '完成jailhouse的国产芯片适配，资源图形化分配工具提升客户使用体验。介绍在堆栈、子页优化和中断嵌套等特性优化下jailhouse虚拟化性能提升效果。',
              },
              {
                id: 'id86',
                time: ['14:10', '14:30'],
                desc: '嵌入式实时虚拟机ZVM开源项目',
                person: [
                  {
                    id: 'id87',
                    name: '谢国琪',
                    post: '湖南大学嵌入式省重点实验室主任',
                  },
                ],
                detail:
                  '在安全和非安全应用混合部署的联接设备中，操作系统虚拟化技术可实现安全隔离与管理。现有主流嵌入式实时虚拟机（如QNX Hypervisor）是闭源的，而开源的Linux KVM虚拟机是非实时的。我们基于ARM64架构与Zephyr实时操作系统（RTOS），研发了一款开源嵌入式实时虚拟机ZVM（Zephyr-Based Virtual Machine）,可同时启动Linux与Zephyr 2个Guest OS，从而在同一硬件平台上实现混合内核部署。ZVM主要实现的功能模块包括CPU虚拟化、内存虚拟化、中断虚拟化、时钟虚拟化及I/O虚拟化等。ZVM已在openEuler开源（仓库地址：https://gitee.com/openeuler/zvm/），由Sig-Zephyr进行维护和湖南大学运作。',
              },
              {
                id: 'id88',
                time: ['14:30', '14:50'],
                desc: '基于Rust的嵌入式虚拟机监视器及热更新技术',
                person: [
                  {
                    id: 'id89',
                    name: '王雷',
                    post: '北京航空航天大学教授',
                  },
                ],
                detail:
                  '介绍基于AArch64架构、Rust编写、面向无人车、机器人等嵌入式场景的Type-1型虚拟机监视器（Hypervisor），设计目标是在提高资源利用率的同时，保障虚拟机实时性、隔离性与内存安全。此外，支持虚拟机迁移和监视器动态升级两种热更新机制，动态修复Hypervisor的软件漏洞。该系统可以在NVIDIA Jetson TX2、Raspberry Pi 4和QEMU平台上运行，支持实时和非实时虚拟机，可运行Linux和RTOS。',
              },
              {
                id: 'id90',
                time: ['14:50', '15:10'],
                desc: 'openEuler Embedded最新进展及对ROS2的支持',
                person: [
                  {
                    id: 'id91',
                    name: '方林旭',
                    post: '华为技术有限公司嵌入式高级工程师',
                  },
                ],
                detail: '介绍openEuler嵌入式对ROS2的适配进展和技术路线',
              },
            ],
          },
        ],
      },
      {
        lable: 'TC开放工作会议（13:30-15:30）',
        id: 'id92',
        content: [
          {
            id: 'id93',
            name: '',
            content: [
              {
                id: 'id94',
                time: ['13:30', '15:30'],
                desc: 'TC开放工作会议',
                person: [
                  {
                    id: 'id95',
                    name: '',
                    post: '',
                  },
                ],
                detail: '',
              },
            ],
          },
        ],
      },
      {
        lable: 'SIG组开放工作会议（16:00-17:30）',
        id: 'id96',
        content: [
          {
            id: 'id97',
            name: '',
            content: [
              {
                id: 'id98',
                time: ['16:00', '17:30'],
                desc: 'TC、Docs、G11N、Release、Compatibility-Infra、Security committee、Compliance、QA',
                person: [
                  {
                    id: 'id99',
                    name: '社区公共类',
                    post: '',
                  },
                ],
                detail: '',
              },
              {
                id: 'id100',
                time: ['16:00', '17:30'],
                desc: 'OpenStack、Virt、CloudNative、RFO、iSulad、k8s-distro',
                person: [
                  {
                    id: 'id101',
                    name: '云原生基础设施',
                    post: '',
                  },
                ],
                detail: '',
              },
              {
                id: 'id102',
                time: ['16:00', '17:30'],
                desc: 'Kernel、eBPF、Compiler、AccLib',
                person: [
                  {
                    id: 'id103',
                    name: '内核/编译器',
                    post: '',
                  },
                ],
                detail: '',
              },
              {
                id: 'id104',
                time: ['16:00', '17:30'],
                desc: 'Embedded、Industrial、Yocto、Zephyr、sig-RaspberryPi（待定）、Distributed Middleware',
                person: [
                  {
                    id: 'id105',
                    name: '嵌入式',
                    post: '',
                  },
                ],
                detail: '',
              },
              {
                id: 'id106',
                time: ['16:00', '17:30'],
                desc: 'Intel-Arch、RISC-V、 DPU、SW-Arch',
                person: [
                  {
                    id: 'id107',
                    name: '多样性计算',
                    post: '',
                  },
                ],
                detail: '',
              },
              {
                id: 'id108',
                time: ['16:00', '17:30'],
                desc: 'OPS、Devkit、Migration',
                person: [
                  {
                    id: 'id109',
                    name: '工具',
                    post: '',
                  },
                ],
                detail: '',
              },
              {
                id: 'id110',
                time: ['16:00', '17:30'],
                desc: 'UKUI',
                person: [
                  {
                    id: 'id111',
                    name: '桌面/图形系统',
                    post: '',
                  },
                ],
                detail: '',
              },
              {
                id: 'id114',
                time: ['16:00', '17:30'],
                desc: 'Edge、ROS、AI、BigData、DB、 SDS',
                person: [
                  {
                    id: 'id115',
                    name: '行业解决方案/应用',
                    post: '',
                  },
                ],
                detail: '',
              },
            ],
          },
        ],
      },
      {
        lable: '开发者派对（18:00-20:00）',
        id: 'id118',
        content: [
          {
            id: 'id119',
            name: '',
            content: [
              {
                id: 'id200',
                time: ['18:00', '20:00'],
                desc: '开发者派对',
                person: [
                  {
                    id: 'id201',
                    name: '',
                    post: '',
                  },
                ],
                detail: '',
              },
            ],
          },
        ],
      },
    ],
  },
};
