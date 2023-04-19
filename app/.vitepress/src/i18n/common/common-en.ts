export default {
  MEETINGS_TIME: 'Time: ',
  MEETINGS_REPLAY: 'Replay',
  SEARCH_PLACE_HOLDER: 'Input content',
  COOKIE_LEGAL_TEXT:
    'This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies.',
  COOKIE_LEGAL_LINK_TEXT: ' Read our privacy policy.',
  NAV_ROUTER: {
    DOWNLOAD: 'Download',
    ISO: 'Software Packages',
    MIRRORLIST: 'Mirrors',
    LEARNING: 'Learning',
    DOCS: 'Documentation',
    MOOC: 'MOOC',
    INTERNSHIP: 'Internship',
    CONNECT: 'Connect',
    NEWS: 'News',
    BLOG: 'Blog',
    LIVE: 'Live',
    SALON: 'Meetups',
    SUMMIT: 'Summit',
    COMMUNITY: 'Community',
    CONTRIBUTION: 'Contribution',
    CONVENTION: 'Convention',
    MAILINGLIST: 'Mailing Lists',
    CERTIFICATION: 'Certification',
    TALENT: 'Talent',
    STATISTICS: 'Statistics',
    SIG: 'SIG',
    SIGLIST: 'SIG Lists',
    APPLICATION: 'Application',
    ROLES: 'Roles',
    MEETINGGUIDE: 'Meeting-Guide',
    DISCOVERY: 'Discovery',
    ATUNE: 'A-Tune',
    BISHENGJDK: 'BiSheng JDK',
    ISULA: 'iSula',
    SECGEAR: 'secGear',
    STRATOVIRT: 'StratoVirt',
    COMPASSCI: 'Compass-CI',
    COMPLIANCE: 'Compliance',
    PKGSHIP: 'Pkgship',
    SUPPORT: 'Support',
    VULNERABILITY: 'Vulnerability Management',
    SAFETY: 'Security Advisories',
    CVE: 'CVE',
    COMPATIBILITY_EVALUATION: 'Compatibility Technology Evaluation',
    APPROVE: 'Approve',
    COMPATIBILITY: 'Compatibility List',
    MIGRATION: 'Migration',
  },
  NAV_ROUTER_CONFIG: [
    {
      PATH: '',
      NAME: 'Download',
      ID: 'download',
      CHILDREN: [
        {
          NAME: 'Software Packages',
          ID: 'iso',
          PATH: '/download/',
        },
        {
          NAME: 'Mirrors',
          ID: 'mirror-list',
          PATH: '/mirror/list/',
        },
      ],
      CLASS: ['download', 'mirror'],
    },
    {
      NAME: 'Learning',
      ID: 'learning',
      CHILDREN: [
        {
          NAME: 'Documentation',
          ID: 'docs',
          PATH: '/en/',
          IS_OPEN_WINDOW: 1,
        },
        {
          NAME: 'MoocStudio',
          ID: 'MoocStudio',
          PATH: 'https://moocstudio.openeuler.org/en/',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
        // {
        //   NAME: 'MOOC',
        //   ID: 'mooc',
        //   PATH: '/learn/mooc/',
        // },
      ],
      CLASS: ['learning', 'learn'],
    },
    {
      PATH: '',
      NAME: 'Connect',
      ID: 'connect',
      CHILDREN: [
        {
          NAME: 'News',
          ID: 'news',
          PATH: '/interaction/news-list/',
        },
        {
          NAME: 'Blog',
          ID: 'blog',
          PATH: '/interaction/blog-list/',
        },
        {
          NAME: 'QuickIssue',
          ID: 'QuickIssue',
          PATH: 'https://quickissue.openeuler.org/en/issues/',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
      ],
      CLASS: ['news', 'blog'],
    },
    {
      PATH: '',
      NAME: 'Community',
      ID: 'community',
      CHILDREN: [
        {
          NAME: 'About Us',
          ID: 'about-us',
          PATH: '/community/organization/',
        },
        {
          NAME: 'Contribution',
          ID: 'contribution',
          PATH: '/community/contribution/',
        },
        {
          NAME: 'Mailing Lists',
          ID: 'mailing-list',
          PATH: '/community/mailing-list/',
        },
        {
          NAME: 'Certification',
          ID: 'certification',
          PATH: '/community/certification-services/',
          // IS_OPEN_MINISITE_WINDOW: 1,
        },
        {
          NAME: 'Statistics',
          ID: 'statistics',
          PATH: 'https://datastat.openeuler.org/en/overview',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
      ],
      CLASS: [
        'contribution',
        'conduct',
        'mailing-list',
        'certification-services',
      ],
    },
    {
      PATH: '',
      NAME: 'SIG',
      ID: 'sig',
      CHILDREN: [
        {
          NAME: 'SIG Lists',
          ID: 'sig-list',
          PATH: '/sig/sig-list/',
        },
        {
          NAME: 'Set Up',
          ID: 'application',
          PATH: '/sig/sig-guidance/',
        },
        {
          NAME: 'Roles',
          ID: 'roles',
          PATH: '/sig/role-description/',
        },
      ],
      CLASS: ['sig-list', 'sig-guidance', 'role-description'],
    },
    {
      PATH: '',
      NAME: 'Discovery',
      ID: 'discovery',
      CHILDREN: [
        {
          NAME: 'A-Tune',
          ID: 'atune',
          PATH: '/other/projects/atune/',
        },
        {
          NAME: 'BiSheng JDK',
          ID: 'bishengjdk',
          PATH: '/other/projects/bishengjdk/',
        },
        {
          NAME: 'iSula',
          ID: 'isula',
          PATH: '/other/projects/isula/',
        },
        {
          NAME: 'secGear',
          ID: 'secgear',
          PATH: '/other/projects/secgear/',
        },
        {
          NAME: 'StratoVirt',
          ID: 'stratovirt',
          PATH: '/other/projects/stratovirt/',
        },
        {
          NAME: 'Compass-CI',
          ID: 'compass-ci',
          PATH: 'https://compass-ci.openeuler.org/',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
        {
          NAME: 'Compliance',
          ID: 'compliance',
          PATH: 'https://compliance.openeuler.org/',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
        {
          NAME: 'Pkgship',
          ID: 'pkgship',
          PATH: 'https://pkgmanage.openeuler.org/',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
        {
          NAME: 'radiaTest',
          ID: 'radiaTest',
          PATH: 'https://radiatest.openeuler.org',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
        {
          NAME: 'NestOS',
          ID: 'NestOS',
          PATH: 'https://nestos.openeuler.org/',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
      ],
      CLASS: ['atune', 'bishengjdk', 'isula', 'secgear', 'stratovirt'],
    },
    {
      PATH: '',
      NAME: 'Support',
      ID: 'support',
      CHILDREN: [
        {
          NAME: 'Vulnerability Management',
          ID: 'vulnerability-reporting',
          PATH: '/security/vulnerability-reporting/',
        },
        {
          NAME: 'Security Advisories',
          ID: 'security-bulletins',
          PATH: '/security/security-bulletins/',
        },
        {
          NAME: 'CVE',
          ID: 'cve',
          PATH: '/security/cve/',
        },
        {
          NAME: 'Compatibility List',
          ID: 'compatibility',
          PATH: '/compatibility/',
        },
      ],
      CLASS: [
        'vulnerability-reporting',
        'safety-bulletin',
        'cve',
        'compatibility',
      ],
    },
    {
      PATH: '',
      NAME: 'CODE',
      ID: 'code',
      CHILDREN: [
        {
          NAME: 'Code Sources',
          PATH: 'https://gitee.com/openeuler',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
        {
          NAME: 'Package Sources',
          PATH: 'https://gitee.com/src-openeuler',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
        {
          NAME: 'GitHub Mirror',
          PATH: 'https://github.com/openeuler-mirror',
          IS_OPEN_MINISITE_WINDOW: 1,
        },
      ],
      CLASS: ['code'],
    },
  ],
  NAV_ROUTER_CONFIG_NEW: [
    {
      NAME: '用户',
      ID: 'user',
      CHILDREN: [
        {
          NAME: '技术展示',
          TYPE: 1,
          CHILDREN: [
            {
              NAME: '用户案例',
              LABEL: '了解openEuler在各行业的最佳案例',
              PATH: '',
            },
            {
              NAME: '行业白皮书',
              LABEL: '了解openEuler在行业的生态现状、业务场景的应用',
              PATH: '',
            },
            {
              NAME: '技术白皮书',
              LABEL: '了解openEuler各版本的技术详情',
              PATH: '',
            },
          ],
        },
        {
          NAME: '使用指南',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: '文档',
              LABEL: '',
              PATH: '',
            },
            {
              NAME: '课程中心',
              LABEL: '',
              PATH: '',
            },
            {
              NAME: '迁移中心',
              LABEL: '助力企业进行操作系统迁移的指南文档',
              PATH: '',
            },
          ],
        },
        {
          NAME: '支持与服务',
          TYPE: 1,
          CHILDREN: [
            {
              NAME: 'OSV技术测评',
              LABEL: '帮助企业快速申请兼容性技术测评',
              PATH: '',
            },
            {
              NAME: '兼容性技术测评',
              LABEL: '帮助企业快速申请兼容性技术测评',
              PATH: '',
            },
            {
              NAME: '兼容性列表',
              LABEL: '查看openEuler兼容性列表',
              PATH: '',
            },
            {
              NAME: '安全中心',
              LABEL: '查看漏洞管理、安全公告等安全问题',
              PATH: '',
            },
          ],
        },
      ],
    },
    {
      NAME: '开发者',
      ID: 'developer',
      CHILDREN: [
        {
          NAME: '学习与贡献',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: '文档',
              LABEL: '',
              PATH: '',
            },
            {
              NAME: '课程中心',
              LABEL: '',
              PATH: '',
            },
            {
              NAME: '贡献攻略',
              LABEL: '',
              PATH: '',
            },
            {
              NAME: 'SIG中心',
              LABEL: '',
              PATH: '',
            },
            {
              NAME: '开源实习',
              LABEL: '',
              PATH: '',
            },
          ],
        },
        {
          NAME: '开发openEuler',
          TYPE: 1,
          CHILDREN: [
            {
              NAME: 'QuickIssue',
              LABEL: '简易快捷地查询、提交社区Issues',
              PATH: '',
            },
            {
              NAME: 'Pkgship',
              LABEL: '管理操作系统软件包信息和依赖项的查询工具',
              PATH: '',
            },
            {
              NAME: '软件包贡献',
              LABEL: '为全球开发者提供简便顺畅的软件包贡献流程',
              PATH: '',
            },
            {
              NAME: 'License兼容性检查工具',
              LABEL: '帮助快速检测License兼容性',
              PATH: '',
            },
            {
              NAME: 'radiaTest',
              LABEL: '基于openEuler环境开发的测试管理平台',
              PATH: '',
            },
            {
              NAME: 'X2openEuler',
              LABEL: '简介简介简介简介简介',
              PATH: '',
            },
            {
              NAME: 'Compass-CI',
              LABEL: '开放式测试服务平台',
              PATH: '',
            },
            {
              NAME: 'EulerMaker',
              LABEL: '简介简介简介简介简介',
              PATH: '',
            },
            {
              NAME: 'OEPKGS',
              LABEL: 'oepkgs软件托管平台',
              PATH: '',
            },
          ],
        },
        {
          NAME: '在openEuler上开发',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: 'EulerVM',
              LABEL: '跨平台openEuler虚拟机管理工具',
              PATH: '',
            },
            {
              NAME: 'openEuler on WSL',
              LABEL: '在Microsotf WSL中使用openEuler',
              PATH: '',
            },
            {
              NAME: 'openEuler SDK',
              LABEL: 'x',
              PATH: '',
            },
            {
              NAME: '用户软件仓(EUR)',
              LABEL: '开发者易用的软件包托管分发平台',
              PATH: '',
            },
          ],
        },
        {
          NAME: '源码',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: '代码仓',
              LABEL: '',
              PATH: '',
            },
            {
              NAME: '软件包仓',
              LABEL: '',
              PATH: '',
            },
            {
              NAME: 'Github镜像仓',
              LABEL: '',
              PATH: '',
            },
          ],
        },
      ],
    },
    {
      NAME: '社区',
      ID: 'community',
      CHILDREN: [
        {
          NAME: '关于社区',
          TYPE: 1,
          CHILDREN: [
            {
              NAME: '组织架构',
              LABEL: '了解openEuler的委员会成员',
              PATH: '',
            },
            {
              NAME: '成员单位',
              LABEL: '了解openEuler的捐赠单位',
              PATH: '',
            },
            {
              NAME: '社区章程',
              LABEL: '了解openEuler的章程、条例、行为准则、License策略',
              PATH: '',
            },
            {
              NAME: '社区荣誉',
              LABEL: '了解openEuler的荣誉奖项',
              PATH: '',
            },
            {
              NAME: '贡献看板',
              LABEL: '查看openEuler社区数据',
              PATH: '',
            },
            {
              NAME: '社区基础设施赞助人',
              LABEL: '了解企业设备投入',
              PATH: '',
            },
          ],
        },
        {
          NAME: '学习与贡献',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: '文档',
              LABEL: '',
              PATH: '',
            },
            {
              NAME: '课程中心',
              LABEL: '',
              PATH: '',
            },
            {
              NAME: '贡献攻略',
              LABEL: '',
              PATH: '',
            },
            {
              NAME: 'SIG中心',
              LABEL: '',
              PATH: '',
            },
            {
              NAME: '培训认证',
              LABEL: '',
              PATH: '',
            },
          ],
        },
        {
          NAME: '项目',
          TYPE: 1,
          CHILDREN: [
            {
              NAME: 'A-Tune',
              LABEL: '一款基于AI开发的智能优化引擎',
              PATH: '',
            },
            {
              NAME: 'BiSheng JDK',
              LABEL: 'ARM上最好用的JDK',
              PATH: '',
            },
            {
              NAME: 'iSula',
              LABEL: '容器技术方案',
              PATH: '',
            },
            {
              NAME: 'secGear',
              LABEL: '供开发者开发安全应用的机密计算框架',
              PATH: '',
            },
            {
              NAME: 'StratoVirt',
              LABEL: '面向云数据中心的企业级虚拟化VMM',
              PATH: '',
            },
          ],
        },
      ],
    },
    {
      NAME: '下载',
      ID: 'download',
      CHILDREN: [
        {
          NAME: '最新版本',
          TYPE: 1,
          CHILDREN: [
            {
              NAME: 'openEuler 22.03 LTS SP1',
              LABEL:
                'openEuler 22.03 LTS SP1 是openEuler 22.03 LTS的补丁版本，基于5.10内核构建，实现了服务器、云、边缘和嵌入式的全场景支持',
              PATH: '',
              CHILDREN: [
                {
                  NAME: '服务器',
                  LABEL: '',
                  PATH: '',
                },
                {
                  NAME: '边缘计算',
                  LABEL: '',
                  PATH: '',
                },
                {
                  NAME: '云计算',
                  LABEL: '',
                  PATH: '',
                },
                {
                  NAME: '嵌入式',
                  LABEL: '',
                  PATH: '',
                },
              ],
            },
            {
              NAME: 'openEuler 22.03',
              LABEL:
                'openEuler 23.03 uses Linux Kernel 6.1 to explore technologies, adapt hardware, and innovate basic technologies and upper-layer applications for future openEuler LTS versions built on Linux Kernel 6.x.',
              PATH: '',
              CHILDREN: [
                {
                  NAME: '服务器',
                  LABEL: '',
                  PATH: '',
                },
                {
                  NAME: '边缘计算',
                  LABEL: '',
                  PATH: '',
                },
                {
                  NAME: '云计算',
                  LABEL: '',
                  PATH: '',
                },
                {
                  NAME: '嵌入式',
                  LABEL: '',
                  PATH: '',
                },
              ],
            },
          ],
        },
        {
          NAME: '其他版本',
          TYPE: 0,
          CHILDREN: [
            {
              NAME: '社区发行版',
              LABEL: '',
              PATH: '',
            },
            {
              NAME: '商业发行版',
              LABEL: '',
              PATH: '',
            },
            {
              NAME: '企业自用版',
              LABEL: '',
              PATH: '',
            },
          ],
        },
      ],
    },
  ],
  LANG: 'English',
  LANG_LIST: ['中文', 'English', 'Русский'],
  USER_CENTER: 'User Center',
  LOGOUT: 'Logout',
  PLEASE: 'Please',
  LOGIN: 'login',
  GITTE: 'Source code',
  CODE: 'CODE',
  FOOTER: {
    ATOM_TEXT:
      'openEuler is an open source project incubated and operated by the OpenAtom Foundation.',
    ATOM_PC: '/atom-pc.png',
    ATOM_MO: '/atom-mo.png',
    MAIL: 'contact@openeuler.io',
    COPY_RIGHT: 'Copyright © 2023 openEuler. All rights reserved.',
    RIGHT_LIST: [
      {
        NAME: 'Trademark',
        URL: '/other/brand/',
      },
      {
        NAME: 'Privacy Policy',
        URL: '/other/privacy/',
      },
      {
        NAME: 'Legal Notice',
        URL: '/other/legal/',
      },
      {
        NAME: 'Service Status',
        URL: 'https://status.openeuler.org/',
      },
    ],
    QR_CODE: 'WeChat Subscription',
    QR_ASSISTANT: 'WeChat Assistant',
  },
  BUILDING: {
    BUILDING: 'Building',
    BUILDINGMES: 'Coming soon…',
  },
  SEARCH: {
    BROWSEHISTORY: 'History',
    CLEAN: 'Clean up',
    TOPSEARCH: 'Top search',
    CHANGE: 'Change',
    PLEACHOLDER: 'Please enter the content',
  },
  PREV: 'pre',
  NEXT: 'next',
};
