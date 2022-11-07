// 目前vitepress无法完全覆盖keywords，暂采取该方法，待升级vitepress版本
const tdks = {
  // 首页
  // '/zh/': {
  //   description:
  //     'openEuler是一个开源、免费的 Linux 发行版平台，将通过开放的社区形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系。同时，openEuler 也是一个创新的平台，鼓励任何人在该平台上提出新想法、开拓新思路、实践新方案。想要了解更多信息，欢迎访问openEuler官网。 ,
  //   keywords:
  //     'openEuler,开源Linux系统,linux开源社区,开源社区,Linux迁移,EulerOS',
  // },
  // 下载
  '/zh/download/': {
    description:
      '欧拉操作系统(openEuler, 简称“欧拉”)是面向数字基础设施的操作系统,支持服务器、云计算、边缘计算、嵌入式等应用场景,支持多样性计算,致力于提供安全、稳定、易用的开源服务器Linux操作系统。欢迎访问openEuler官网，下载使用。',
    keywords:
      'openEuler下载,openEuler镜像下载,欧拉系统ISO镜像,openEuler社区官网,openEuler镜像,开源Linux系统',
  },
  // 镜像列表
  '/zh/mirror/list/': {
    description:
      'openEuler欢迎新的镜像站点，如果您正在考虑为openEuler设置公共镜像站点，请遵循镜像指南，确保您的镜像与其他镜像站点一致。如有任何问题，请随时与我们联系。',
    keywords:
      'openEuler镜像,开源Linux系统,Linux系统,服务器安装linux系统,linux服务器操作系统,开源服务器操作系统',
  },
  // 实习
  '/zh/internship/': {
    description:
      'openEuler开源实习是openEuler社区和社区合作单位共同发起的线上实习项目，旨在鼓励在校学生积极参与开源社区，在实际的开源环境中提升实践能力，在社区中成长为优秀的开源人才。想要了解更多信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler开源实习,开源社区实习,开源项目实习,开源Linux系统,linux系统移植,免费linux服务器',
  },
  // 迁移下载
  '/zh/migration/download/': {
    description:
      'openEuler迁移专区为您提供专业化的服务器系统迁移方案，及CentOS迁移操作系统迁移工具，助力企业简单、平稳、高效进行操作系统升级及操作系统迁移。想要了解更多系统迁移相关信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler迁移,Linux迁移,Linux服务器迁移,系统迁移工具,服务器迁移方案,CentOS迁移',
  },
  // 迁移背景
  '/zh/migration/background/': {
    description:
      'openEuler创新架构，全栈优化，释放多样性算力，打造全场景协同的数字基础设施操作系统，包括基础加速库、虚拟化、内核、驱动、编译器、OS 工具、OpenJDK 等组件。想要了解更多系统迁移相关信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler迁移背景,开源服务器操作系统,Centos系统迁移,服务器系统迁移,Linux迁移,服务器安装linux系统',
  },
  // 迁移概述
  // '/zh/migration/guidance/1-summary/': {
  //   description:
  //     'openEuler迁移支持Java类业务应用、C语言类业务应用、Python类业务应用及CentOS迁移方案，可根据业务系统的情况 ，确定对应的迁移场景，制定迁移方案和实施。想要了解更多系统迁移相关信息，欢迎访问openEuler官网。',
  //   keywords:
  //     'openEuler迁移,CentOS迁移方案,资料搬迁,CentOS搬迁方案,云服务器迁移方案,操作系统替换',
  // },
  // 移植案例
  '/zh/migration/transplantation-cases/': {
    description:
      'openEuler助力企业简单、平稳、高效进行操作系统升级。移植案例移植指南专区涵盖MySQL移植案例、Apache移植指南、Nginx移植指南、Dubbo移植指南。想要了解更多系统迁移案例及移植指南相关信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler移植案例,linux系统移植,mysql移植方案,apache移植方案,nginx移植方案,mysql数据迁移工具',
  },
};

const getLocaleConfig = (tdks: {
  [url: string]: {
    description: string;
    keywords: string;
  };
}) => {
  const lang = 'zh';
  let locale: {
    [url: string]: {
      lang: string;
      head: any;
    };
  } = {};
  Object.keys(tdks).forEach((url) => {
    const tdk = tdks[url];
    locale[url] = {
      lang,
      head: [
        // [
        //   'meta',
        //   {
        //     name: 'description',
        //     content: tdk.description,
        //   },
        // ],
        [
          'meta',
          {
            name: 'keywords',
            content: tdk.keywords,
          },
        ],
      ],
    };
  });
  return locale;
};

export default getLocaleConfig(tdks);
