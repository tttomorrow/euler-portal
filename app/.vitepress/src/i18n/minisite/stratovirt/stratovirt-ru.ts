import logo from '@/assets/category/minisite/stratovirt/logo.png';
import logo_dark from '@/assets/category/minisite/stratovirt/logo_dark.png';

import frameImg_light_en from '@/assets/category/minisite/stratovirt/frame_light_en.png';
import frameImg_dark_en from '@/assets/category/minisite/stratovirt/frame_dark_en.png';

import workImg from '@/assets/category/minisite/shared/cards-work.png';
import letterImg from '@/assets/category/minisite/shared/cards-letter.png';
import tvImg from '@/assets/category/minisite/shared/cards-tv.png';
import shadingImg from '@/assets/category/minisite/shared/cards-shading.png';

import safetyIcon from '@/assets/category/minisite/stratovirt/icon-safety.png';
import lowNoiseIcon from '@/assets/category/minisite/stratovirt/icon-low-noise.png';
import flexIcon from '@/assets/category/minisite/stratovirt/icon-flex.png';
import withIcon from '@/assets/category/minisite/stratovirt/icon-with.png';
import extendIcon from '@/assets/category/minisite/stratovirt/icon-extend.png';
import strengthenIcon from '@/assets/category/minisite/stratovirt/icon-strengthen.png';

import grainImg from '@/assets/category/minisite/stratovirt/stratovirt-grain.png';

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
      IMG: workImg,
      DARK_IMG: workImg,
      TITLE: 'Try Now',
      LINK_LIST: ['https://gitee.com/openeuler/stratovirt'],
      SHOW: false,
    },
    {
      IMG: letterImg,
      DARK_IMG: letterImg,
      TITLE: 'Feedback',
      LINK_LIST: ['https://gitee.com/openeuler/stratovirt/issues'],
      SHOW: false,
    },
    {
      IMG: tvImg,
      DARK_IMG: tvImg,
      TITLE: 'Join Us',
      LINK_LIST: ['https://gitee.com/openeuler/community/tree/master/sig/Virt'],
      SHOW: false,
    },
    {
      IMG: logo,
      DARK_IMG: logo_dark,
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
        IMG: safetyIcon,
        TITLE: 'Улучшенная безопасность',
        DESC: 'В решении StratoVirt используется язык Rust и поддерживаются функции seccomp для изоляции клиентов-арендаторов.',
      },
      {
        IMG: lowNoiseIcon,
        TITLE: 'Облегченное решение с низким уровнем помех',
        DESC: 'Запуск устройства упрощенной модели в течение 50 мс и показатель Noise Floor памяти менее 4 МБ. Поддерживается безсерверная нагрузка.',
      },
      {
        IMG: flexIcon,
        TITLE: 'Быстрое масштабирование',
        DESC: 'StratoVirt поддерживает масштабирование устройства за считанные миллисекунды, гибкие возможности расширения ресурсов для легких нагрузок.',
      },
      {
        IMG: withIcon,
        TITLE: 'Взаимодействие программного и аппаратного обеспечения',
        DESC: 'Аппаратное ускорение на базе мультисистемной платформы за счет поддержки x86 VT и Kunpeng-V.',
      },
      {
        IMG: extendIcon,
        TITLE: 'Высокая степень масштабируемости',
        DESC: 'Модель устройства можно расширить для поддержки таких сложных спецификаций, как PCI, и реализации стандартных виртуальных машин.',
      },
      {
        IMG: strengthenIcon,
        TITLE: 'Улучшенное распределение гетерогенных ресурсов',
        DESC: 'Помимо общего решения аппаратного сквозного доступа SR-IOV, используется функционал определения программного обеспечения Ascend, который позволяет гибче распределять гетерогенные вычислительные ресурсы.',
      },
    ],
  },
  SVIRT_FRAMEWORK: {
    TITLE_OUTSIDE: 'Архитектура',
    TITLE_INSIDE: 'ARCHITECTURE',
    FRAMEWORK_IMG: frameImg_light_en,
    FRAMEWORK_IMG_DARK: frameImg_dark_en,
    DESC_LIST: [
      'Базовая архитектура StratoVirt делится на три уровня (сверху вниз):',
      'Интерфейс OCI для обеспечения совместимости: StratoVirt полностью совместим с протоколом QEMU Machine Protocol и наследует функции OCI.',
      'BootLoader: StratoVirt реализует упрощенную и ускоренную загрузку вместо традиционного способа загрузки BIOS+GRUB.',
      'MicroVM: уровень виртуализации, который упрощает управление устройствами и поддерживает масштабирование ресурсов с низкой задержкой за счет взаимодействия программного и аппаратного обеспечения.',
    ],
    DESC_BACKGROUND: shadingImg,
  },
  SVIRT_DOCUMENT: {
    TITLE_OUTSIDE: 'Документы',
    TITLE_INSIDE: 'DOCUMENTATION',
    DATA_LIST: [
      {
        THEME: 'Основы StratoVirt',
        DESC: '',
        LINK: [
          {
            TEXT: 'Eщe',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/StratoVirt%E4%BB%8B%E7%BB%8D.md',
          },
        ],
        BACKGROUND: {
          IMG: grainImg,
          TYPE: 1,
        },
      },
      {
        THEME: 'Установка StratoVirt',
        DESC: '',
        LINK: [
          {
            TEXT: 'Eщe',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%AE%89%E8%A3%85StratoVirt.md',
          },
        ],
        BACKGROUND: {
          IMG: grainImg,
          TYPE: 1,
        },
      },
      {
        THEME: 'Подготовка среды',
        DESC: '',
        LINK: [
          {
            TEXT: 'Eщe',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%87%86%E5%A4%87%E4%BD%BF%E7%94%A8%E7%8E%AF%E5%A2%83.md',
          },
        ],
        BACKGROUND: {
          IMG: grainImg,
          TYPE: 1,
        },
      },
      {
        THEME: 'Конфигурирование виртуальных машин',
        DESC: '',
        LINK: [
          {
            TEXT: 'Eщe',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E8%99%9A%E6%8B%9F%E6%9C%BA%E9%85%8D%E7%BD%AE.md',
          },
        ],
        BACKGROUND: {
          IMG: grainImg,
          TYPE: 1,
        },
      },
      {
        THEME: 'Управление жизненным циклом виртуальной машины',
        DESC: '',
        LINK: [
          {
            TEXT: 'Eщe',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E8%99%9A%E6%8B%9F%E6%9C%BA%E7%AE%A1%E7%90%86.md',
          },
        ],
        BACKGROUND: {
          IMG: grainImg,
          TYPE: 1,
        },
      },
      {
        THEME: 'Подключение к контейнерам безопасности iSula',
        DESC: '',
        LINK: [
          {
            TEXT: 'Eщe',
            LINK: 'https://gitee.com/openeuler/docs/blob/master/docs/zh/docs/StratoVirt/%E5%AF%B9%E6%8E%A5iSula%E5%AE%89%E5%85%A8%E5%AE%B9%E5%99%A8.md',
          },
        ],
        BACKGROUND: {
          IMG: grainImg,
          TYPE: 1,
        },
      },
    ],
  },
};
