export default {
  GUIDANCE_LIST: {
    GUIDE: {
      MOBILE_TITLE: 'SIG申请流程',
      TITLE: '申请流程',
      LINE_CONTENT: [
        {
          LEFT: {
            LEFT_INFO:
              '个人或公司在openEuler社区中寻找2 - 3个具有共同目标的人讨论决定成立SIG组，维护openEuler社区中的某一个技术方向软件包或发起孵化项目。',
            LEFT_CIRCLE: '寻人',
            LEFT_IMG: '/img/sig/sig1.png',
          },
          RIGHT: {
            RIGHT_INFO:
              "按照成立 SIG 组的<a target='_blank' href='https://gitee.com/openeuler/community/blob/master/zh/technical-committee/governance/README.md'>成立流程</a>，在 Gitee 上创建申请文件，发起 Pull Request ；预约技术委员会会议的时间。",
            RIGHT_CIRCLE: '申请',
            LEFT_IMG: '/img/sig/sig2.png',
          },
        },
        {
          LEFT: {
            LEFT_INFO:
              '在技术委员会的例会上就技术范围、维护的目标等和与会成员沟通，在 SIG 目标范围及维护上达成一致。',
            LEFT_CIRCLE: '沟通',
            LEFT_IMG: '/img/sig/sig3.png',
          },
          RIGHT: {
            RIGHT_INFO:
              '技术委员会批准成立，对应的 Pull Request 合入代码仓库，基础设施会自动建立对应的仓库。',
            RIGHT_CIRCLE: '获批',
            LEFT_IMG: '/img/sig/sig4.png',
          },
        },
        {
          LEFT: {
            LEFT_INFO:
              'SIG 开始正式运作，通过邮件列表/例行会议等进行沟通运作。',
            LEFT_CIRCLE: '运作',
            LEFT_IMG: '/img/sig/sig5.png',
          },
          RIGHT: {
            RIGHT_INFO: '技术委员会周期 Review SIG 的运作情况，给出指导意见。',
            RIGHT_CIRCLE: '改进',
            LEFT_IMG: '/img/sig/sig6.png',
          },
        },
      ],
    },
  },
  SIG_LIST: {
    HOME_PAGE: '前往gitee首页',
    MAIL: '邮件',
    IRC: 'IRC频道',
    MANAGER: '管理员',
    NAME: 'SIG名称',
    GITEE_PAGE: 'Gitee主页',
  },
  SIG_DESCRIPTION: {
    MEANING: 'SIG 就是 Special Interest Group 的缩写，openEuler 社区按照不同的 SIG 来组织，以便于更好的管理和改善工作流程。SIG 组均是开放的，欢迎任何人来参与。',
    LI1: '每一个SIG在Gitee上都会拥有一个或多个项目，这些项目会拥有一个或多个Repository，SIG的交付成果会保存在这些Repository内。您可以在SIG对应的Repository内提交Issue、针对特定问题参与讨论，提交和解决问题，参与评审等。',
    LI2: 'SIG都是针对特定的一个或多个技术主题而成立的。SIG的核心成员主导SIG的治理，SIG内的成员推动交付成果输出，并争取让交付成果成为openEuler社区发行的一部分。',
    LI3: '在SIG团队项目的gitee首页README.md文件中，可以找到该项目所属的SIG信息、交流方式、成员和联系方式等，欢迎通过邮件列表、公开例会及对应的README.md 文件中提到的联系方式积极参与进SIG内的交流。'
  }
};
