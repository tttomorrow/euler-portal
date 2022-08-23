export default {
  BISHENG_BANNER_TEXT: ['BiSheng JDK', 'Top-notch JDK on ARM'],
  BISHENG_DESC: [
    'BiSheng JDK is an open source version of Huawei JDK customized based on OpenJDK. Huawei JDK runs on more than 500 Huawei products. The R&D team has accumulated rich development experience and resolved the problems that arose during service running.',
    'As a downstream product of OpenJDK, BiSheng JDK is a high-performance OpenJDK distribution that can be used in production environments. BiSheng JDK fixes some performance and stability issues encountered in Huawei internal applications, optimizes performance and enhances stability on the ARM architecture, and delivers improved performance in big data scenarios.',
    'BiSheng JDK is committed to providing Java developers with a stable, reliable, high-performance, and easy-to-debug JDK. It is also a better choice on the ARM architecture.',
  ],
  BISHENG_ANCHOR_DATA: [
    { id: 'architecture', name: 'Architecture' },
    { id: 'learn', name: 'Learning' },
    { id: 'link', name: 'Links' },
  ],
  BISHENG_LINK: [
    {
      IMG: '/img/projects/share/cards-work.png',
      DARK_IMG: '/img/projects/share/cards-work.png',
      TITLE: 'Start with BiSheng JDK',
      LINK_LIST: [
        {
          TEXT: 'BiSheng JDK 8',
          LINK: 'https://gitee.com/openeuler/bishengjdk-8',
        },
        {
          TEXT: 'BiSheng JDK 11',
          LINK: 'https://gitee.com/openeuler/bishengjdk-11',
        },
        {
          TEXT: 'BiSheng JDK 17',
          LINK: 'https://gitee.com/openeuler/bishengjdk-17',
        },
      ],
      SHOW: false,
    },
    {
      IMG: '/img/projects/share/cards-letter.png',
      DARK_IMG: '/img/projects/share/cards-letter.png',
      TITLE: 'Word to BiSheng JDK',
      LINK_LIST: [
        {
          TEXT: 'BiSheng JDK 8',
          LINK: 'https://gitee.com/openeuler/bishengjdk-8/issues',
        },
        {
          TEXT: 'BiSheng JDK 11',
          LINK: 'https://gitee.com/openeuler/bishengjdk-11/issues',
        },
        {
          TEXT: 'BiSheng JDK 17',
          LINK: 'https://gitee.com/openeuler/bishengjdk-17/issues',
        },
      ],
      SHOW: false,
    },
    {
      IMG: '/img/projects/bisheng/cards-look.png',
      DARK_IMG: '/img/projects/bisheng/cards-look.png',
      TITLE: 'Compiler SIG Meetings',
      LINK_LIST: [
        {
          TEXT: '2021',
          LINK: 'https://gitee.com/openeuler/bishengjdk-8/wikis/Compiler%20SIG%E4%BE%8B%E4%BC%9A?sort_id=4182234',
        },
        {
          TEXT: '2022',
          LINK: 'https://etherpad.openeuler.org/p/Compiler-meetings',
        },
      ],
      SHOW: false,
    },
    {
      IMG: '/img/projects/bisheng/cards-upload.png',
      DARK_IMG: '/img/projects/bisheng/cards-upload.png',
      TITLE: 'Roadmap',
      LINK_LIST: [
        'https://gitee.com/openeuler/bishengjdk-8/wikis/%E9%A1%B9%E7%9B%AE%E8%B7%AF%E6%A0%87?sort_id=4182245',
      ],
      SHOW: false,
    },
  ],
  BISHENG_MORE: 'More information:',
  BISHENG_INFO: [
    {
      THEME: 'License: ',
      BODY: 'The GPLv2 with Classpath Exception protocol is used.',
    },
    {
      THEME: 'Supported Java versions: ',
      BODY: 'Currently, BiSheng JDK supports Java 8 (LTS), 11 (LTS), and 17 (LTS).',
    },
    {
      THEME: 'Supported architectures: ',
      BODY: 'Linux/AArch64 and Linux/x86_64.',
    },
    {
      THEME: 'Supported OSs: ',
      BODY: 'Almost all mainstream Linux OSs are supported. The glibc version must be 2.17 or later. BiSheng JDK has passed the stability verification on all openEuler OSs and CentOS 7.6 before the release.',
    },
  ],
  BISHENG_FRAMEWORK: {
    TITLE_OUTSIDE: 'Architecture',
    TITLE_INSIDE: 'ARCHITECTURE',
    DESC_LIST: [
      'The following figure shows the overall architecture of the JDK. JRE is short for Java Runtime Environment, including the Java Virtual Machine (JVM) and libraries. JDK is a superset of JRE, and therefore includes all JRE content as well as the compilers and debuggers such as javac and JDB required by developers. JRE provides only runtime libraries, JVMs, and other components required to run Java applications.',
    ],
    FRAMEWORK_IMG: '/img/projects/bisheng/framework-hight-zh.png',
    FRAMEWORK_IMG_DARK: '/img/projects/bisheng/framework-dark-zh.png',
  },
  BISHENG_LEARN: {
    TITLE_OUTSIDE: 'Learning',
    TITLE_INSIDE: 'LEARNING',
    DATA_LIST: [
      {
        IMG: '/img/projects/share/illustration-book.png',
        DESC: '',
        THEME: 'Documentation',
        LINK: [
          {
            TEXT: 'BiSheng JDK 8',
            LINK: 'https://gitee.com/openeuler/bishengjdk-8/wikis/Home',
          },
          {
            TEXT: 'BiSheng JDK 11',
            LINK: 'https://gitee.com/openeuler/bishengjdk-11/wikis/Home',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-newspapper.png',
        DESC: '',
        THEME: 'Learn and Practice',
        LINK: [
          {
            TEXT: 'Using BiSheng JDK',
            LINK: 'https://education.huaweicloud.com/courses/course-v1:HuaweiX+CBUCNXK067+Self-paced/about',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-file.png',
        DESC: '',
        THEME: 'Download',
        LINK: [
          {
            TEXT: 'Earlier Versions',
            LINK: 'https://www.hikunpeng.com/zh/developer/devkit/compiler/jdk',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
    ],
  },
  BISHENG_REFERENCE: {
    TITLE_OUTSIDE: 'Links',
    TITLE_INSIDE: 'LINKS',
    LINK_LIST: [
      {
        TEXT: 'BiSheng JDK (Kunpeng Community)',
        LINK: 'https://www.hikunpeng.com/developer/devkit/compiler/jdk',
      },
      {
        TEXT: 'BiSheng Compiler (Kunpeng Community)',
        LINK: 'https://www.hikunpeng.com/developer/devkit/compiler/bisheng',
      },
      {
        TEXT: 'BiSheng Compiler (Kunpeng Community)',
        LINK: 'https://www.hikunpeng.com/developer/devkit/compiler/gcc',
      },
    ],
  },
};
