import logo from '@/assets/category/minisite/isula/isula-logo.png';

import workImg from '@/assets/category/minisite/shared/cards-work.png';
import letterImg from '@/assets/category/minisite/shared/cards-letter.png';
import fileIllustration from '@/assets/category/minisite/shared/illustration-file.png';
import bookIllustration from '@/assets/category/minisite/shared/illustration-book.png';
import newspapperIllustration from '@/assets/category/minisite/shared/illustration-newspapper.png';

import frameImg_light_en from '@/assets/category/minisite/isula/frame_light_en.png';
import frameImg_dark_en from '@/assets/category/minisite/isula/frame_dark_en.png';
import frameBuildImg_light_en from '@/assets/category/minisite/isula/frame-build_light_en.png';
import frameBuildImg_dark_en from '@/assets/category/minisite/isula/frame-build_dark_en.png';
import frameTransformImg_light_en from '@/assets/category/minisite/isula/frame-transform_light_en.png';
import frameTransformImg_dark_en from '@/assets/category/minisite/isula/frame-transform_light_en.png';

import arrowBg from '@/assets/category/minisite/shared/bg-arrow.png';
import docBg from '@/assets/category/minisite/shared/bg-doc.png';

export default {
  ISULA_BANNER_TEXT: ['iSula', 'Ударная сила в компактном размере'],
  ISULA_LOGO: logo,
  ISULA_DESC_UP: [
    'iSula — это контейнерное решение компании Huawei. Название решения происходит от вида муравьев, обитающих в джунглях Перу, — легких, быстрых и живучих. Сочетание невероятной мощности и компактного размера — самое точная характеристика контейнерного решения iSula.',
  ],
  ISULA_DESC_DOWN: [
    'На сегодняшний день в семейство iSula входят следующие компоненты:',
    'iSulad: Это универсальный контейнерный движок, который обеспечивает полное управление жизненным циклом. Он совместим с интерфейсом Container Runtime Interface (CRI) от Kubernetes на северной стороне и экосистемой OCI на южной стороне.',
    'isula-build: Это инструмент, помогающий быстро создавать образы контейнера.',
    'isula-transform: Инструмент, позволяющий осуществлять холодную миграцию контейнеров Docker в iSulad.',
  ],
  ISULA_MAIL: 'mail to:isulad@openeuler.org',
  ISULA_ANCHOR_DATA: [
    { id: 'architecture', name: 'Архитектура' },
    { id: 'docs', name: 'Документы' },
  ],
  ISULA_LINK: [
    {
      IMG: workImg,
      DARK_IMG: workImg,
      TITLE: 'onpo6yre ceiuac',
      LINK_LIST: [
        'https://gitee.com/openeuler/community/tree/master/sig/iSulad',
      ],
      SHOW: false,
    },
    {
      IMG: letterImg,
      DARK_IMG: letterImg,
      TITLE: '06paTHas CB83b',
      LINK_LIST: ['mail to:isulad@openeuler.org'],
      SHOW: true,
    },
    {
      IMG: logo,
      DARK_IMG: logo,
      TITLE: 'iSula logo',
      LINK_LIST: ['/other/projects/isula/'],
      SHOW: false,
    },
  ],
  ISULA_FRAMEWORK: {
    TITLE_OUTSIDE: 'Архитектура',
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
        '<p data-v-34e1e55b="">iSulad предоставляет унифицированную архитектуру, адаптируемую под различные вычислительные и ИТ-ресурсы. Этот быстродействующий инструмент с легкой и гибкой структурой, который можно сравнить с крошечными, но сильными перуанскими муравьями семейства isula.</p>',
        'iSulad обладает следующими особенностями:',
        'Поддерживает языки программирования C/C++ и в дальнейшем ожидается поддержка языка Rust.',
        'Северный интерфейс CRI исполняемой среды контейнера для интеграции с Kubernetes, а также удобные в использовании командные строки.',
        'Южный интерфейс OCI и спецификации образов для легкой замены.',
        'Поддерживает несколько форматов контейнеров — система и виртуальная машина.',
        'В плане масштабируемости инструмент предоставляет архитектуру подключаемых модулей, которая позволяет разрабатывать специализированные плагины.',
        'Функциональность iSulad не ограничивается спецификациями оборудования и архитектурами. Решение отличается минимальным влиянием со стороны фоновых процессов, что делает его идеальным вариантом применения во многих областях.',
      ],
      FRAMEWORK_TITLE: 'Архитектура iSulad:',
      FRAMEWORK_IMG: frameImg_light_en,
      FRAMEWORK_IMG_DARK: frameImg_dark_en,
    },
    ISULAD_BUILD: {
      DESC_LIST: [
        'Isula-build обычно работает в среде сборки и предоставляет шаблонные образы контейнера для исполняющей среды.',
        'Во время сборки isula-build считывает данные из файла Docker, используя их в качестве входных данных для быстрого создания образов контейнера, соответствующих спецификациям Docker и OCI. Далее isula-build передает образ в iSulad/Docker на том же узле, в локальные пакеты TAR или удаленные репозитории на хранение.',
      ],
      FRAMEWORK_TITLE: 'Архитектура isula-build:',
      FRAMEWORK_IMG: frameBuildImg_light_en,
      FRAMEWORK_IMG_DARK: frameBuildImg_dark_en,
    },
    ISULAD_TRANSFORM: {
      DESC_LIST: [
        'isula-transform, выпущенный вместе с версией iSulad 2.0, служит для конвертации контейнеров, управляемых контейнерным движком Docker, и миграции их в движок iSulad. После миграции пользователи легко управляют жизненным циклом контейнеров, используя iSulad.',
      ],
      FRAMEWORK_IMG: frameTransformImg_light_en,
      FRAMEWORK_IMG_DARK: frameTransformImg_dark_en,
    },
  },
  ISULA_DOCUMENT: {
    TITLE_OUTSIDE: 'Документы',
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
          IMG: arrowBg,
          THEME: 'README',
          DESC: '',
          LINK: [
            {
              TEXT: 'Eщe',
              LINK: 'https://gitee.com/openeuler/iSulad/blob/master/README.md',
            },
          ],
          BACKGROUND: {
            IMG: docBg,
            TYPE: 2,
          },
        },
        {
          IMG: fileIllustration,
          THEME: 'Architecture',
          DESC: '',
          LINK: [
            {
              TEXT: 'Eщe',
              LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/design/architecture_en.md',
            },
          ],
          BACKGROUND: {
            IMG: docBg,
            TYPE: 2,
          },
        },
        {
          IMG: bookIllustration,
          THEME: 'Build Guide for RISC-V Integration',
          DESC: '',
          LINK: [
            {
              TEXT: 'Eщe',
              LINK: 'https://gitee.com/openeuler/iSulad/blob/master/docs/build_guide/build_guide.md',
            },
          ],
          BACKGROUND: {
            IMG: docBg,
            TYPE: 2,
          },
        },
      ],
    },
    ISULAD_BUILD: {
      DATA_LIST: [
        {
          IMG: arrowBg,
          THEME: 'README',
          DESC: '',
          LINK: [
            {
              TEXT: 'Eщe',
              LINK: 'https://gitee.com/openeuler/isula-build/blob/master/README.zh.md',
            },
          ],
          BACKGROUND: {
            IMG: docBg,
            TYPE: 2,
          },
        },
        {
          IMG: newspapperIllustration,
          THEME: 'Manual',
          DESC: '',
          LINK: [
            {
              TEXT: 'Eщe',
              LINK: 'https://gitee.com/openeuler/isula-build/blob/master/doc/manual_zh.md',
            },
          ],
          BACKGROUND: {
            IMG: docBg,
            TYPE: 2,
          },
        },
      ],
    },
    ISULAD_TRANSFORM: {
      DATA_LIST: [
        {
          IMG: arrowBg,
          THEME: 'README',
          DESC: '',
          LINK: [
            {
              TEXT: 'Eщe',
              LINK: 'https://gitee.com/openeuler/isula-transform/blob/master/README.md',
            },
          ],
          BACKGROUND: {
            IMG: docBg,
            TYPE: 2,
          },
        },
      ],
    },
  },
};
