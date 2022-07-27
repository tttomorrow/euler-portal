export default {
  MEETINGS_TIME: 'Time: ',
  MEETINGS_REPLAY: 'Воспроизведение',
  SEARCH_PLACE_HOLDER: 'Введите текст',
  COOKIE_LEGAL_TEXT:
    'Продолжая просмотр сайта и(или) нажимая X, я соглашаюсь с использованием файлов cookie владельцем сайта в соответствии с ',
  COOKIE_LEGAL_TEXT_OTHER:
    'в том числе на передачу данных, указанных в Политике, третьим лицам (статистическим службам сети Интернет), в соответствии с ',
  COOKIE_LEGAL_LINK_TEXT: 'Политикой в отношении файлов cookie ',
  COOKIE_LEGAL_LINK_TEXT_OTHER: 'Пользовательским соглашением >',
  NAV_ROUTER: {
    DOWNLOAD: 'Загрузить',
    ISO: 'Software Packages',
    MIRRORLIST: 'Mirrors',
    LEARNING: 'Обучение',
    DOCS: 'Документация',
    MOOC: 'МООК',
    INTERNSHIP: 'Internship',
    CONNECT: 'Подключиться',
    NEWS: 'Новости',
    BLOG: 'Блог',
    LIVE: 'Прямой эфир',
    SALON: 'Семинары',
    SUMMIT: 'Саммит',
    COMMUNITY: 'Сообщество',
    CONTRIBUTION: 'Contribution',
    CONVENTION: 'Кодекс',
    MAILINGLIST: 'Mailing Lists',
    CERTIFICATION: 'Сертификация',
    TALENT: 'Talent',
    STATISTICS: 'Statistics',
    SIG: 'SIG',
    SIGLIST: 'Списки SIG',
    APPLICATION: 'Заявка',
    ROLES: 'Роли',
    MEETINGGUIDE: 'Meeting-Guide',
    DISCOVERY: 'Открытие',
    ATUNE: 'A-Tune',
    BISHENGJDK: 'Bisheng JDK',
    ISULA: 'iSula',
    SECGEAR: 'secGear',
    STRATOVIRT: 'StratoVirt',
    COMPASSCI: 'Compass-CI',
    COMPLIANCE: 'Compliance',
    PKGSHIP: 'Pkgship',
    SUPPORT: 'Поддержка',
    VULNERABILITY: 'Управление уязвимостями',
    SAFETY: 'Консультанты по безопасности',
    CVE: 'CVE',
    APPROVE: 'Approve',
    COMPATIBILITY_EVALUATION: 'Compatibility Technology Evaluation',
    COMPATIBILITY: 'Список совместимости',
    MIGRATION: 'Migration',
  },
  NAV_ROUTER_CONFIG: [
    {
      PATH: '',
      NAME: 'Загрузить',
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
      CLASS: [],
    },
    {
      NAME: 'Обучение',
      ID: 'learning',
      CHILDREN: [
        {
          NAME: 'Документация',
          PATH: '/ru/',
          ID: 'docs',
          IS_OPEN_WINDOW: 1,
        },
        {
          NAME: 'МООК',
          ID: 'mooc',
          PATH: '/learn/mooc/',
        },
      ],
      CLASS: [],
    },
    {
      PATH: '',
      NAME: 'Подключиться',
      ID: 'connect',
      CHILDREN: [
        {
          NAME: 'Новости',
          ID: 'news',
          PATH: '/interaction/news-list/',
        },
        {
          ID: 'blog',
          NAME: 'Блог',
          PATH: '/interaction/blog-list/',
        },
        {
          NAME: 'Прямой эфир',
          ID: 'live',
          PATH: '/interaction/live-list/',
        },
        {
          NAME: 'Семинары',
          ID: 'salon',
          PATH: '/interaction/salon-list/',
        },
        {
          NAME: 'Саммит',
          ID: 'summit',
          PATH: '/interaction/summit-list/devday2022/',
        },
      ],
      OTHER_CHILDREN: [
        {
          PATH: '/news/',
        },
        {
          PATH: '/blog/',
        },
      ],
      CLASS: [],
    },
    {
      PATH: '',
      NAME: 'Сообщество',
      ID: 'community',
      CHILDREN: [
        {
          NAME: 'Кодекс',
          ID: 'convention',
          PATH: '/community/conduct/',
        },
        {
          NAME: 'Сертификация',
          ID: 'certification',
          PATH: '/community/certification-services/',
        },
      ],
      CLASS: [],
    },
    {
      PATH: '',
      NAME: 'SIG',
      ID: 'sig',
      CHILDREN: [
        {
          NAME: 'Списки SIG',
          ID: 'sig-list',
          PATH: '/sig/sig-list/',
        },
        {
          NAME: 'Заявка',
          ID: 'application',
          PATH: '/sig/sig-guidance/',
        },
        {
          NAME: 'Роли',
          ID: 'roles',
          PATH: '/sig/role-description/',
        },
      ],
      CLASS: [],
    },
    {
      PATH: '',
      NAME: 'Открытие',
      ID: 'discovery',
      CHILDREN: [
        {
          NAME: 'A-Tune',
          ID: 'atune',
          PATH: '/other/projects/atune/',
        },
        {
          NAME: 'Bisheng JDK',
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
      ],
      CLASS: [],
    },
    {
      PATH: '',
      NAME: 'Поддержка',
      ID: 'support',
      CHILDREN: [
        {
          NAME: 'Управление уязвимостями',
          ID: 'vulnerability-reporting',
          PATH: '/security/vulnerability-reporting/',
        },
        {
          NAME: 'Консультанты по безопасности',
          ID: 'safety-bulletin',
          PATH: '/security/safety-bulletin/',
        },
        {
          NAME: 'CVE',
          ID: 'cve',
          PATH: '/security/cve/',
        },
        {
          NAME: 'Список совместимости',
          ID: 'compatibility',
          PATH: '/security/compatibility/',
        },
      ],
      CLASS: [],
    },
  ],
  LANG: 'Русский',
  LANG_LIST: ['中文', 'English', 'Русский'],
  GITTE: 'Source code',
  CODE: 'Код',
  GITTE_RESOURCE_LIST: [
    {
      NAME: 'Источники кода',
      URL: 'https://gitee.com/openeuler',
    },
    {
      NAME: 'Источники пакетов',
      URL: 'https://gitee.com/src-openeuler',
    },
    {
      NAME: 'Зеркало GitHub',
      URL: 'https://github.com/openeuler-mirror',
    },
  ],
  FOOTER: {
    ATOM_TEXT:
      'openEuler - это проект с открытым исходным кодом, созданный и управляемый фондом OpenAtom.',
    ATOM_PC: '/atom-pc.png',
    ATOM_MO: '/atom-mo.png',
    MAIL: 'contact@openeuler.io',
    COPY_RIGHT: 'Авторские права © openEuler 2022. Все права защищены.',
    RIGHT_LIST: [
      {
        NAME: 'Товарный знак',
        URL: '/other/brand/',
      },
      {
        NAME: 'Политика конфиденциальности',
        URL: '/other/privacy/',
      },
      {
        NAME: 'Правовое уведомление',
        URL: '/other/legal/',
      },
      {
        NAME: 'Статус сервиса',
        URL: 'https://status.openeuler.org/',
      },
    ],
    QR_CODE: 'Подписка на WeChat',
    QR_ASSISTANT: 'openeuler Assistant',
  },
  BUILDING: {
    BUILDING: 'Создание',
    BUILDINGMES: 'Ожидается...',
  },
};
