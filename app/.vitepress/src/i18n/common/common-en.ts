export default {
  MEETINGS_TIME: 'Time: ',
  MEETINGS_REPLAY: 'Replay',
  SEARCH_PLACE_HOLDER: 'Input content',
  COOKIE_LEGAL_TEXT: 'This site uses cookies. By continuing to browse the site you are agreeing to our use of cookies.',
  COOKIE_LEGAL_LINK_TEXT: 'Read our privacy policy>',
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
    BISHENGJDK: 'Bisheng JDK',
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
  NAV_ROUTER_CONFIG: [{
    PATH: '',
    NAME: 'Download',
    ID: 'download',
    CHILDREN: [
      {
        NAME: 'Software Packages',
        ID: 'iso',
        PATH: '/download/'
      },
      {
        NAME: 'Mirrors',
        ID: 'mirror-list',
        PATH: '/mirror/list/'
      }
    ],
    CLASS: []
  },
  {
    NAME: 'Learning',
    ID: 'learning',
    CHILDREN: [
      {
        NAME: 'Documentation',
        ID: 'docs',
        PATH: '/en/',
        IS_OPEN_WINDOW: 1
      },
      {
        NAME: 'MOOC',
        ID: 'mooc',
        PATH: '/learn/mooc/'
      }
    ],
    CLASS: []
  },
  {
    PATH: '',
    NAME: 'Connect',
    ID: 'connect',
    CHILDREN: [{
      NAME: 'News',
      ID: 'news',
      PATH: '/interaction/news-list/'
    },
    {
      NAME: 'Blog',
      ID: 'blog',
      PATH: '/interaction/blog-list/'
    },
    {
      NAME: 'Live',
      ID: 'live',
      PATH: '/interaction/live-list/'
    },
    {
      NAME: 'Meetups',
      ID: 'salon',
      PATH: '/interaction/salon-list/'
    },
    {
      NAME: 'Summit',
      ID: 'summit',
      PATH: '/interaction/summit-list/devday2022/'
    }
    ],
    OTHER_CHILDREN: [
      {
        PATH: '/news/'
      },
      {
        PATH: '/blog/'
      }
    ],
    CLASS: []
  },
  {
    PATH: '',
    NAME: 'Community',
    ID: 'community',
    CHILDREN: [{
      NAME: 'Contribution',
      ID: 'contribution',
      PATH: '/community/contribution/'
    },
    {
      NAME: 'Convention',
      ID: 'convention',
      PATH: '/community/conduct/'
    },
    {
      NAME: 'Mailing Lists',
      ID: 'mailing-list',
      PATH: '/community/mailing-list/'
    },
    {
      NAME: 'Certification',
      ID: 'certification',
      PATH: '/community/certification-services/'
    },
    ],
    CLASS: []
  },
  {
    PATH: '',
    NAME: 'SIG',
    ID: 'sig',
    CHILDREN: [{
      NAME: 'SIG Lists',
      ID: 'sig-list',
      PATH: '/sig/sig-list/'
    },
    {
      NAME: 'Application',
      ID: 'application',
      PATH: '/sig/sig-guidance/'
    },
    {
      NAME: 'Roles',
      ID: 'roles',
      PATH: '/sig/role-description/'
    }
    ],
    CLASS: []
  },
  {
    PATH: '',
    NAME: 'Discovery',
    ID: 'discovery',
    CHILDREN: [{
      NAME: 'A-Tune',
      ID: 'atune',
      PATH: '/other/projects/atune'
    },
    {
      NAME: 'Bisheng JDK',
      ID: 'bishengjdk',
      PATH: '/other/projects/bishengjdk'
    },
    {
      NAME: 'iSula',
      ID: 'isula',
      PATH: '/other/projects/isula'
    },
    {
      NAME: 'secGear',
      ID: 'secgear',
      PATH: '/other/projects/secgear'
    },
    {
      NAME: 'StratoVirt',
      ID: 'stratovirt',
      PATH: '/other/projects/stratovirt'
    },
    {
      NAME: 'Compass-CI',
      ID: 'compass-ci',
      PATH: 'https://compass-ci.openeuler.org/',
      IS_OPEN_MINISITE_WINDOW: 1
    },
    {
      NAME: 'Compliance',
      ID: 'compliance',
      PATH: 'https://compliance.openeuler.org/',
      IS_OPEN_MINISITE_WINDOW: 1
    },
    {
      NAME: 'Pkgship',
      ID: 'pkgship',
      PATH: 'https://pkgmanage.openeuler.org/',
      IS_OPEN_MINISITE_WINDOW: 1
    }
    ],
    CLASS: []
  },
  {
    PATH: '',
    NAME: 'Support',
    ID: 'support',
    CHILDREN: [{
      NAME: 'Vulnerability Management',
      ID: 'vulnerability-reporting',
      PATH: '/security/vulnerability-reporting/'
    },
    {
      NAME: 'Security Advisories',
      ID: 'safety-bulletin',
      PATH: '/security/safety-bulletin/'
    },
    {
      NAME: 'CVE',
      ID: 'cve',
      PATH: '/security/cve/'
    },
    {
      NAME: 'Compatibility List',
      ID: 'compatibility',
      PATH: '/compatibility/'
    },
    ],
    CLASS: []
  }
  ],
  LANG: 'English',
  LANG_LIST: ['中文', 'English', 'Русский'],
  GITTE: 'Source code',
  CODE: 'CODE',
  GITTE_RESOURCE_LIST: [{
    NAME: 'Code Sources',
    URL: 'https://gitee.com/openeuler'
  },
  {
    NAME: 'Package Sources',
    URL: 'https://gitee.com/src-openeuler'
  },
  {
    NAME: 'GitHub Mirror',
    URL: 'https://github.com/openeuler-mirror'
  }
  ],
  FOOTER: {
    ATOM_TEXT: 'openEuler is an open source project incubated and operated by the OpenAtom Foundation.',
    ATOM_PC: '/atom-pc.png',
    ATOM_MO: '/atom-mo.png',
    MAIL: 'contact@openeuler.io',
    COPY_RIGHT: 'Copyright © 2022 openEuler. All rights reserved.',
    RIGHT_LIST: [{
      NAME: 'Trademark',
      URL: '/other/brand/'
    },
    {
      NAME: 'Privacy Policy',
      URL: '/other/privacy/'
    },
    {
      NAME: 'Legal Notice',
      URL: '/other/legal/'
    },
    {
      NAME: 'Service Status',
      URL: 'https://status.openeuler.org/'
    }
    ],
    QR_CODE: 'WeChat Subscription'
  },
  BUILDING: {
    BUILDING: 'Building',
    BUILDINGMES: 'Coming soon…'
  }
};
