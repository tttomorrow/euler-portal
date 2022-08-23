export default {
  SVIRT_BANNER_TEXT: [
    'StratoVirt',
    'Платформа виртуализации для облачных центров обработки данных',
  ],
  SVIRT_BANNER_IMG: '/img/minisite/svirt/mobile-banner.png',
  SVIRT_DESC: [
    'StratoVirt — это облачная платформа виртуализации корпоративного класса, на единой архитектуре которой поддерживаются виртуальные машины, контейнеры и центры обработки данных, работающие без сервера. StratoVirt обладает конкурентными преимуществами: облегченное решение с низким уровнем помех, взаимодействие программного и аппаратного обеспечения, а также безопасность премиум-уровня за счет использования языка программирования Rust.',
    'StratoVirt предоставляет функционалы высокого класса для гибкой компонентной сборки и интерфейсы, необходимые в проектировании архитектуры и поддержки стандартной виртуализации. StratoVirt позволяет добиться идеального баланса между функциональными требованиями, сценариями применения и гибкостью.',
  ],
  SVIRT_IMG: '/img/minisite/svirt/pc-svirt.png',
  SVIRT_MB_IMG: '/img/minisite/svirt/mobile-svirt.png',
  SVIRT_ANCHOR_DATA: [
    { id: 'feature', name: 'Особенности' },
    { id: 'architecture', name: 'Архитектура' },
    { id: 'docs', name: 'Документы' },
  ],
  SVIRT_LINK: [
    {
      IMG: '/img/projects/share/cards-work.png',
      DARK_IMG: '/img/projects/share/cards-work.png',
      TITLE: 'Try Now',
      LINK_LIST: ['https://gitee.com/openeuler/stratovirt'],
      SHOW: false,
    },
    {
      IMG: '/img/projects/share/cards-letter.png',
      DARK_IMG: '/img/projects/share/cards-letter.png',
      TITLE: 'Feedback',
      LINK_LIST: ['https://gitee.com/openeuler/stratovirt/issues'],
      SHOW: false,
    },
    {
      IMG: '/img/projects/share/cards-tv.png',
      DARK_IMG: '/img/projects/share/cards-tv.png',
      TITLE: 'Join Us',
      LINK_LIST: ['https://gitee.com/openeuler/community/tree/master/sig/Virt'],
      SHOW: false,
    },
    {
      IMG: '/img/projects/stratovirt/stratovirt-logo.png',
      DARK_IMG: '/img/projects/stratovirt/stratovirt-logo-dark.png',
      TITLE: 'StratoVirt Logo',
      LINK_LIST: ['/other/projects/stratovirt/'],
      SHOW: false,
    },
  ],
  SVIRT_CHARACTER: {
    TITLE_OUTSIDE: 'Особенности',
    TITLE_INSIDE: 'FEATURE',
    CHARACTER_TEXT:
      'StratoVirt является стабильно функционирующим защищенным уровнем openEuler. Он воссоздает базу виртуализации openEuler и обладает следующими техническими особенностями:',
    CHARACTER_LIST: [
      {
        IMG: '/img/projects/stratovirt/illustration-safety.png',
        TITLE: 'Улучшенная безопасность',
        DESC: 'В решении StratoVirt используется язык Rust и поддерживаются функции seccomp для изоляции клиентов-арендаторов.',
      },
      {
        IMG: '/img/projects/stratovirt/illustration-low-noise.png',
        TITLE: 'Облегченное решение с низким уровнем помех',
        DESC: 'Запуск устройства упрощенной модели в течение 50 мс и показатель Noise Floor памяти менее 4 МБ. Поддерживается безсерверная нагрузка.',
      },
      {
        IMG: '/img/projects/stratovirt/illustration-flex.png',
        TITLE: 'Быстрое масштабирование',
        DESC: 'StratoVirt поддерживает масштабирование устройства за считанные миллисекунды, гибкие возможности расширения ресурсов для легких нагрузок.',
      },
      {
        IMG: '/img/projects/stratovirt/illustration-with.png',
        TITLE: 'Взаимодействие программного и аппаратного обеспечения',
        DESC: 'Аппаратное ускорение на базе мультисистемной платформы за счет поддержки x86 VT и Kunpeng-V.',
      },
      {
        IMG: '/img/projects/stratovirt/illustration-extend.png',
        TITLE: 'Высокая степень масштабируемости',
        DESC: 'Модель устройства можно расширить для поддержки таких сложных спецификаций, как PCI, и реализации стандартных виртуальных машин.',
      },
      {
        IMG: '/img/projects/stratovirt/illustration-strengthen.png',
        TITLE: 'Улучшенное распределение гетерогенных ресурсов',
        DESC: 'Помимо общего решения аппаратного сквозного доступа SR-IOV, используется функционал определения программного обеспечения Ascend, который позволяет гибче распределять гетерогенные вычислительные ресурсы.',
      },
    ],
  },
  SVIRT_FRAMEWORK: {
    TITLE_OUTSIDE: 'Архитектура',
    TITLE_INSIDE: 'ARCHITECTURE',
    FRAMEWORK_IMG: '/img/projects/stratovirt/framework-hight-en.png',
    FRAMEWORK_IMG_DARK: '/img/projects/stratovirt/framework-dark-en.png',
    DESC_LIST: [
      'Базовая архитектура StratoVirt делится на три уровня (сверху вниз):',
      'Интерфейс OCI для обеспечения совместимости: StratoVirt полностью совместим с протоколом QEMU Machine Protocol и наследует функции OCI.',
      'BootLoader: StratoVirt реализует упрощенную и ускоренную загрузку вместо традиционного способа загрузки BIOS+GRUB.',
      'MicroVM: уровень виртуализации, который упрощает управление устройствами и поддерживает масштабирование ресурсов с низкой задержкой за счет взаимодействия программного и аппаратного обеспечения.',
    ],
    DESC_BACKGROUND: '/img/projects/share/card-shading.png',
  },
  SVIRT_DOCUMENT: {
    TITLE_OUTSIDE: 'Документы',
    TITLE_INSIDE: 'DOCUMENTATION',
    DATA_LIST: [
      {
        THEME: 'Основы StratoVirt',
        DESC: '',
        LINK: [],
        BACKGROUND: {
          IMG: '/img/projects/stratovirt/stratovirt-grain.png',
          TYPE: 1,
        },
      },
      {
        THEME: 'Установка StratoVirt',
        DESC: '',
        LINK: [],
        BACKGROUND: {
          IMG: '/img/projects/stratovirt/stratovirt-grain.png',
          TYPE: 1,
        },
      },
      {
        THEME: 'Подготовка среды',
        DESC: '',
        LINK: [],
        BACKGROUND: {
          IMG: '/img/projects/stratovirt/stratovirt-grain.png',
          TYPE: 1,
        },
      },
      {
        THEME: 'Конфигурирование виртуальных машин',
        DESC: '',
        LINK: [],
        BACKGROUND: {
          IMG: '/img/projects/stratovirt/stratovirt-grain.png',
          TYPE: 1,
        },
      },
      {
        THEME: 'Управление жизненным циклом виртуальной машины',
        DESC: '',
        LINK: [],
        BACKGROUND: {
          IMG: '/img/projects/stratovirt/stratovirt-grain.png',
          TYPE: 1,
        },
      },
      {
        THEME: 'Подключение к контейнерам безопасности iSula',
        DESC: '',
        LINK: [],
        BACKGROUND: {
          IMG: '/img/projects/stratovirt/stratovirt-grain.png',
          TYPE: 1,
        },
      },
    ],
  },
};
