export default {
  SECGEAR_BANNER_TEXT: [
    'secGear',
    'Confidential computing framework for developing secure applications',
  ],
  SECGEAR_DESC: [
    'secGear is a confidential computing development suite used to develop secure applications in the computing industry. It aims to provide a unified development framework for different hardware devices, shielding the differences between underlying confidential computing architectures and APIs. Currently, secGear supports Intel® SGX hardware and Arm TrustZone (iTrustee supported).',
    'secGear provides rich extensibility capabilities at both the middleware layer and service layer, allowing developers to easily call security components and even directly use the confidential computing services.',
  ],
  SECGEAR_ANCHOR_DATA: [
    { id: 'architecture', name: 'Architecture' },
    { id: 'docs', name: 'Documentation' },
  ],
  SECGEAR_FRAMEWORK: {
    TITLE_OUTSIDE: 'Architecture',
    TITLE_INSIDE: 'ARCHITECTURE',
    DESC_LIST: [
      'As shown in the figure, secGear consists of three layers. Currently, only the base layer is open source. The service layer and middleware layer will be gradually brought to open source.',
      'The service layer provides complete security services based on confidential computing. You can directly use related services to enjoy the security brought by confidential computing.',
      'The middleware layer provides common security protocol components and various security function libraries. You can directly call related APIs on the secure and non-secure sides without creating them by yourself. Currently, PKCS11 and PAKE are being built.',
      'The base layer provides rich enclave development APIs or tools, including code generation tools and enclave life cycle management APIs. POSIX APIs and standard OpenSSL APIs are supported on the secure side. You can develop secure applications based on these APIs.',
    ],
    DESC_BACKGROUND: '/img/projects/share/card-shading.png',
    FRAMEWORK_IMG: '/img/projects/secgear/framework-hight-en.png',
    FRAMEWORK_IMG_DARK: '/img/projects/secgear/framework-dark-en.png',
  },
  SECGEAR_DOCUMENT: {
    TITLE_OUTSIDE: 'Documentation',
    TITLE_INSIDE: 'DOCUMENTATION',
    DATA_LIST: [
      {
        IMG: '/img/projects/share/illustration-arrow.png',
        THEME: 'Overview',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read me',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E8%AE%A4%E8%AF%86secGear.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-file.png',
        THEME: 'Installation',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read me',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E5%AE%89%E8%A3%85secGear.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-book.png',
        THEME: 'Developer Guide',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read me',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E5%BC%80%E5%8F%91secGear%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-glass.png',
        THEME: '工具Tool Usage用文档',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read me',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E4%BD%BF%E7%94%A8secGear%E5%B7%A5%E5%85%B7.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-newspapper.png',
        THEME: 'API Reference',
        DESC: '',
        LINK: [
          {
            TEXT: 'Read me',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/secGear/%E6%8E%A5%E5%8F%A3%E5%8F%82%E8%80%83.md',
          },
        ],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
    ],
  },
};
