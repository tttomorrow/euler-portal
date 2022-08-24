export default {
  ISULA_BANNER_TEXT: ['iSula', 'Packs a huge punch in a small size'],
  ISULA_BANNER_IMG: '/img/minisite/isula/mobile-banner.png',
  ISULA_LOGO: '/img/minisite/isula/isula-logo.png',
  ISULA_DESC_UP: [
    'iSula is the brand of Huawei container solution. It derives its name from a species of ant, one of the most powerful insects in the world despite its small size. This combination of ultimate power and minimal size is the perfect description of the iSula container technology solution.',
  ],
  ISULA_DESC_DOWN: [
    'Currently, the iSula family includes the following components:',
    'iSulad: iSulad is the universal container engine that provides full lifecycle management. It is compatible with the Container Runtime Interface (CRI) of Kubernetes in the northbound direction as well as the OCI ecosystem in the southbound direction.',
    'isula-build: isula-build is the container image building tool that helps you quickly build container images.',
    'isula-transform: isula-transform is the container migration tool that enables the cold migration of Docker containers to iSulad.',
  ],
  ISULA_DESC_IMG: '/img/minisite/isula/zh-desc.png',
  ISULA_MAIL: 'mail to:isulad@openeuler.org',
  ISULA_ANCHOR_DATA: [
    { id: 'architecture', name: 'Architecture' },
    { id: 'docs', name: 'Documentation' },
  ],
  ISULA_LINK: [
    {
      IMG: '/img/projects/share/cards-work.png',
      DARK_IMG: '/img/projects/share/cards-work.png',
      TITLE: 'Try Now',
      LINK_LIST: [
        'https://gitee.com/openeuler/community/tree/master/sig/iSulad',
      ],
      SHOW: false,
    },
    {
      IMG: '/img/projects/share/cards-letter.png',
      DARK_IMG: '/img/projects/share/cards-letter.png',
      TITLE: 'Feedback',
      LINK_LIST: ['mail to:isulad@openeuler.org'],
      SHOW: true,
    },
    {
      IMG: '/img/projects/isula/isula-logo.png',
      DARK_IMG: '/img/projects/isula/isula-logo.png',
      TITLE: 'iSula logo',
      LINK_LIST: ['/other/projects/isula/'],
      SHOW: false,
    },
  ],
  ISULA_FRAMEWORK: {
    TITLE_OUTSIDE: 'Architecture',
    TITLE_INSIDE: 'ARCHITECTURE',
    TAB: [
      {
        KEY: 'ISULAD',
        VALUE: 'iSulad',
      },
      {
        KEY: 'ISULAD_BUILD',
        VALUE: 'isula-build',
      },
      {
        KEY: 'ISULAD_TRANSFORM',
        VALUE: 'isula-transform',
      },
    ],
    ISULAD: {
      DESC_LIST: [
        'iSulad provides a unified architecture for different CT and IT requirements. It features a lightweight, fast, and flexible design, unlocking great power like the small isula ant.',
        'iSulad boasts the following features:',
        'Multiple languages: supports C/C++and will support Rust in the future.',
        'Northbound interface: provides the CRI that connects to Kubernets, as well as easy-to-use command lines.',
        'Southbound interface: supports OCI runtime and image specifications for smooth replacement.',
        'Container forms: supports multiple container forms, such as system and VM.',
        'Scalability: provides a plug-in architecture that allows you to develop custom plug-ins.',
        'iSulad is not restricted by hardware specifications and architectures. It features minimal background noise, making it a perfect option for many fields.',
      ],
      FRAMEWORK_TITLE: 'The architecture of iSulad is as follows:',
      FRAMEWORK_IMG: '/img/projects/isula/framework-isulad-hight-zh.png',
      FRAMEWORK_IMG_DARK: '/img/projects/isula/framework-isulad-dark-zh.png',
    },
    ISULAD_BUILD: {
      DESC_LIST: [
        'isula-build usually runs in the build environment and provides template container images for the runtime system.',
        'During the build operation, isula-build reads Dockerfile as the input to quickly build container images that comply with the Docker and OCI image specifications. Then, isula-build distributes the images to the iSulad/Docker on the same node, local TAR packages, or remote container image repositories.',
      ],
      FRAMEWORK_TITLE: 'The architecture of isula-build is as follows:',
      FRAMEWORK_IMG: '/img/projects/isula/framework-isula-build-hight-en.png',
      FRAMEWORK_IMG_DARK:
        '/img/projects/isula/framework-isula-build-dark-en.png',
    },
    ISULAD_TRANSFORM: {
      DESC_LIST: [
        'isula-transform was released together with iSulad 2.0 to convert containers managed by the Docker container engine and migrate them to the iSulad engine. After the migration, iSulad allows you to effortlessly manage the lifecycle of containers.',
      ],
      FRAMEWORK_IMG:
        '/img/projects/isula/framework-isula-transform-hight-en.png',
      FRAMEWORK_IMG_DARK:
        '/img/projects/isula/framework-isula-transform-dark-en.png',
    },
  },
  ISULA_DOCUMENT: {
    TITLE_OUTSIDE: 'Documentation',
    TITLE_INSIDE: 'DOCUMENTATION',
    TAB: [
      {
        KEY: 'ISULAD',
        VALUE: 'iSulad',
      },
      {
        KEY: 'ISULAD_BUILD',
        VALUE: 'isula-build',
      },
      {
        KEY: 'ISULAD_TRANSFORM',
        VALUE: 'isula-transform',
      },
    ],
    ISULAD: {
      DATA_LIST: [
        {
          IMG: '/img/projects/share/illustration-arrow.png',
          THEME: 'README',
          DESC: '',
          LINK: [],
          BACKGROUND: {
            IMG: '/img/projects/share/group.png',
            TYPE: 2,
          },
        },
        {
          IMG: '/img/projects/share/illustration-file.png',
          THEME: 'Architecture',
          DESC: '',
          LINK: [],
          BACKGROUND: {
            IMG: '/img/projects/share/group.png',
            TYPE: 2,
          },
        },
        {
          IMG: '/img/projects/share/illustration-book.png',
          THEME: 'Build Guide for RISC-V Integration',
          DESC: '',
          LINK: [],
          BACKGROUND: {
            IMG: '/img/projects/share/group.png',
            TYPE: 2,
          },
        },
      ],
    },
    ISULAD_BUILD: {
      DATA_LIST: [
        {
          IMG: '/img/projects/share/illustration-arrow.png',
          THEME: 'README',
          DESC: '',
          LINK: [],
          BACKGROUND: {
            IMG: '/img/projects/share/group.png',
            TYPE: 2,
          },
        },
        {
          IMG: '/img/projects/share/illustration-newspapper.png',
          THEME: 'Manual',
          DESC: '',
          LINK: [],
          BACKGROUND: {
            IMG: '/img/projects/share/group.png',
            TYPE: 2,
          },
        },
      ],
    },
    ISULAD_TRANSFORM: {
      DATA_LIST: [
        {
          IMG: '/img/projects/share/illustration-arrow.png',
          THEME: 'README',
          DESC: '',
          LINK: [],
          BACKGROUND: {
            IMG: '/img/projects/share/group.png',
            TYPE: 2,
          },
        },
      ],
    },
  },
};
