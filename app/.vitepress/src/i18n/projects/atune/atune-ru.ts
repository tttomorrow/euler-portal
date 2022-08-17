export default {
  ATUNE_BANNER_TEXT: ['A-Tune', '1.02x A-Tune инструмент настройки на базе ИИ'],
  ATUNE_BANNER_IMG: '/img/projects/atune/illustration-banner.png',
  ATUNE_DESC: [
    'A-Tune — это автоматический интеллектуальный инструмент настройки рабочих параметров, разработанный сообществом openEuler. За счет использования технологий искусственного интеллекта инструмент обеспечивает оптимальную работу служб. A-Tune создает точные модели работающих в операционной системе служб, динамически отслеживает изменения их показателей и делает логические выводы о состоянии работы конкретных приложений. Настраивая параметры на основе данных о сервисной нагрузке, инструмент позволяет добиться их оптимальной конфигурации.',
  ],
  ATUNE_MAIL: 'mail to:a-tune@openeuler.org',
  ATUNE_ANCHOR_DATA: [
    { id: 'architecture', name: 'Архитектура' },
    { id: 'docs', name: 'Документы' },
  ],
  ATUNE_LINK: [
    {
      IMG: '/img/projects/share/cards-work.png',
      TITLE: 'onpo6yTe cenuac',
      LINK_LIST: ['https://gitee.com/openeuler/A-Tune'],
      SHOW: false,
    },
    {
      IMG: '/img/projects/share/cards-letter.png',
      TITLE: '06paTHas CBA3b',
      LINK_LIST: ['mail to:a-tune@openeuler.org'],
      SHOW: true,
    },
    {
      IMG: '/img/projects/share/cards-tv.png',
      TITLE: 'Web UI',
      LINK_LIST: ['https://gitee.com/openeuler/A-Tune-UI'],
      SHOW: false,
    },
  ],
  ATUNE_FRAMEWORK: {
    TITLE_OUTSIDE: 'Архитектура',
    TITLE_INSIDE: 'ARCHITECTURE',
    DESC_LIST: [
      'A-Tune предоставляет два основных функционала: статическая онлайн-настройка и динамическая офлайн-настройка. Общая архитектура состоит из трех уровней: уровень интеллектуального принятия решений, уровень построения профиля системы и уровень системы взаимодействия.',
      'Уровень интеллектуального принятия решений состоит из подсистемы измерений, выполняющей функции интеллектуального измерения рабочих показателей приложений, и подсистемы принятия решений, которая принимает решения по оптимизации работы системы.',
      'Уровень построения профиля системы состоит из модуля автоматической компоновки функций и двухуровневой модели классификации. Модуль автоматической компоновки функций служит для автоматического выбора сервисных функций, а двухуровневая модель классификации используется для обучения и классификации сервисных моделей.',
      'На уровне системы взаимодействия осуществляется контроль и настройка различных системных ресурсов. На этом уровне применяются политики настройки.',
      'Библиотека моделей настройки содержит конфигурации для настройки приложений 10 категорий в более чем 20 сценариях.',
    ],
    FRAMEWORK_IMG: '/img/projects/atune/framework-hight-zh.png',
    FRAMEWORK_IMG_DARK: '/img/projects/atune/framework-dark-zh.png',
  },
  ATUNE_DOCUMENT: {
    TITLE_OUTSIDE: 'Документы',
    TITLE_INSIDE: 'DOCUMENTATION',
    DATA_LIST: [
      {
        IMG: '/img/projects/share/illustration-arrow.png',
        THEME: 'Об инструменте A-Tune',
        DESC: '',
        LINK: [],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-file.png',
        THEME: 'Установка и развертывание',
        DESC: '',
        LINK: [],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-book.png',
        THEME: 'Использование инструмента',
        DESC: '',
        LINK: [],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
      {
        IMG: '/img/projects/share/illustration-glass.png',
        THEME: 'Вопросы и ответы',
        DESC: '',
        LINK: [],
        BACKGROUND: {
          IMG: '/img/projects/share/group.png',
          TYPE: 2,
        },
      },
    ],
  },
};
