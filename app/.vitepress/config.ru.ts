import type { UserConfig } from 'vitepress';

const config: UserConfig = {
  base: '/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
    [
      'script',
      {
        src: '/js/analytics-ru.js',
      },
    ],
    [
      'script',
      {
        src: '/allow_sensor/sensorsdata.min.js',
      },
    ],
    [
      'script',
      {
        src: '/allow_sensor/sensors.js',
      },
    ],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'openEuler, 操作系统, 开放, 生态, 开源, Linux 开源, OS, open, ecosystem, open source, Linux open source',
      },
    ],
    [
      'meta',
      {
        name: 'baidu-site-verification',
        content: 'code-EWzbQRssNU',
      },
    ],
  ],
  appearance: true, // enable dynamic scripts for dark mode
  titleTemplate: false, //  vitepress supports pageTitileTemplate since 1.0.0
  locales: {
    '/': {
      lang: 'ru',
      title: 'openEuler',
      description:
        'openEuler 是一个开源、免费的 Linux 发行版平台，将通过开放的社区形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系。同时，openEuler 也是一个创新的平台，鼓励任何人在该平台上提出新想法、开拓新思路、实践新方案。',
    },
    '/ru/': {
      lang: 'ru',
      title: 'openEuler',
      description:
        'openEuler is an open source, free Linux distribution platform. The platform provides an open community for global developers to build an open, diversified, and architecture-inclusive software ecosystem. openEuler is also an innovative platform that encourages everyone to propose new ideas, explore new approaches, and practice new solutions.',
    },
  },
  themeConfig: {
    docsUrl: 'https://docs.ru.openeuler.org',
  },
};
export default config;
