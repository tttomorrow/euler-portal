import workImg from '@/assets/category/minisite/shared/cards-work.png';
import letterImg from '@/assets/category/minisite/shared/cards-letter.png';
import tvImg from '@/assets/category/minisite/shared/cards-tv.png';

import frameImg_light_en from '@/assets/category/minisite/atune/frame_light_en.png';
import frameImg_dark_en from '@/assets/category/minisite/atune/frame_dark_en.png';

import arrowBg from '@/assets/category/minisite/shared/bg-arrow.png';
import docBg from '@/assets/category/minisite/shared/bg-doc.png';

import fileIllustration from '@/assets/category/minisite/shared/illustration-file.png';
import bookIllustration from '@/assets/category/minisite/shared/illustration-book.png';
import glassIllustration from '@/assets/category/minisite/shared/illustration-glass.png';

export default {
  ATUNE_BANNER_TEXT: ['A-Tune', '1.02x A-Tune инструмент настройки на базе ИИ'],
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
      IMG: workImg,
      DARK_IMG: workImg,
      TITLE: 'onpo6yTe cenuac',
      LINK_LIST: ['https://gitee.com/openeuler/A-Tune'],
      SHOW: false,
    },
    {
      IMG: letterImg,
      DARK_IMG: letterImg,
      TITLE: '06paTHas CBA3b',
      LINK_LIST: ['mail to:a-tune@openeuler.org'],
      SHOW: true,
    },
    {
      IMG: tvImg,
      DARK_IMG: tvImg,
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
    FRAMEWORK_IMG: frameImg_light_en,
    FRAMEWORK_IMG_DARK: frameImg_dark_en,
  },
  ATUNE_DOCUMENT: {
    TITLE_OUTSIDE: 'Документы',
    TITLE_INSIDE: 'DOCUMENTATION',
    DATA_LIST: [
      {
        IMG: arrowBg,
        THEME: 'Об инструменте A-Tune',
        DESC: '',
        LINK: [
          {
            TEXT: 'Eщe',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E8%AE%A4%E8%AF%86A-Tune.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: fileIllustration,
        THEME: 'Установка и развертывание',
        DESC: '',
        LINK: [
          {
            TEXT: 'Eщe',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E5%AE%89%E8%A3%85%E4%B8%8E%E9%83%A8%E7%BD%B2.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: bookIllustration,
        THEME: 'Использование инструмента',
        DESC: '',
        LINK: [
          {
            TEXT: 'Eщe',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
      {
        IMG: glassIllustration,
        THEME: 'Вопросы и ответы',
        DESC: '',
        LINK: [
          {
            TEXT: 'Eщe',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/A-Tune/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95.md',
          },
        ],
        BACKGROUND: {
          IMG: docBg,
          TYPE: 2,
        },
      },
    ],
  },
};
