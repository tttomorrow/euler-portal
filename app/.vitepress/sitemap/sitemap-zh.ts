// 目前vitepress无法完全覆盖keywords，暂采取该方法，待升级vitepress版本
const tdks = {
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
  // 迁移案例
  '/zh/migration/transplantation-cases/': {
    description:
      'openEuler助力企业简单、平稳、高效进行操作系统升级。移植案例移植指南专区涵盖MySQL移植案例、Apache移植指南、Nginx移植指南、Dubbo移植指南。想要了解更多系统迁移案例及移植指南相关信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler移植案例,linux系统移植,mysql移植方案,apache移植方案,nginx移植方案,mysql数据迁移工具',
  },
  // 迁移指导
  '/zh/migration/guidance/': {
    description:
      'openEuler 提供端到端的迁移方案，包括成立迁移保障组织、迁移分析、方案设计、移植适配、迁移实施和测试上线六个阶段，同时通过 x2openEuler 工具的迁移评估和原地升级技术，将繁琐的迁移过程简化，实现了全场景业务的“简单、平稳、高效”的迁移。想要了解更多服务器操作系统迁移相关内容，欢迎访问openEuler官网。',
    keywords:
      'CentOS迁移工具,操作系统迁移,操作系统替换,服务器系统迁移软件,服务器系统迁移工具,Centos系统迁移',
  },
  // 慕课详情
  '/zh/learn/mooc/detail/': {
    description:
      'HCIA-openEuler华为认证openEuler工程师在线课程定位于培养和认证具备企业数据中心核心操作系统基础操作与管理能力的工程师。通过HCIA-OpenEuler V1.0 认证，您将掌握openEuler操作系统基础命令，掌握openEuler用户管理、网络管理、权限管理，掌握shell基础知识。想要了解更多相关信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler,开源Linux系统,Linux迁移,Linux,服务器安装linux系统,linux开源社区',
  },
  // 新闻列表
  '/zh/interaction/news-list/': {
    description:
      'openEuler新闻资讯，为您提供关于openEuler官方发布的第一手资讯。想要了解更多相关信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler,openEuler新闻,欧拉社区,开源Linux系统,linux开源社区,开源社区',
  },
  // 博客列表
  '/zh/interaction/blog-list/': {
    description:
      'openEuler开发者博客是面向开发者的知识分享平台，涵盖服务器系统迁移、Mysql数据库迁移、CentOS虚拟机安装、CentOS迁移、apache移植方案、nginx移植方案、mysql数据库集群，等各相关内容便于开发者之间的知识交流。 想要了解更多相关信息，欢迎访问openEuler官网。',
    keywords: 'openEuler,openEuler博客,欧拉社区,开发者博客,开发者文档,迁移指南',
  },
  // 沙龙列表
  '/zh/interaction/salon-list/': {
    description:
      'openEuler活动沙龙，为您提供关于openEuler官方发布的第一手开发者活动信息。想要了解更多相关信息，欢迎访问openEuler官网。',
    keywords:
      'openEuler,openEuler活动沙龙,开发者沙龙,开源社区,linux开源社区,服务器系统迁移',
  },
  // 博客
  '/zh/blog/20220726-banqian-mysql/banqian-mysql': {
    description:
      '本文主要用于在 openEuler 20.03 sp1 操作系统上部署 MySQL 数据库。本次实践主要使用 x86_64 架构虚拟机，通过评估工具 x2openEuler 评估 MySQL 5.7.21 软件移植到 openEuler 操作系统的兼容性，再实施数据搬迁。想要了解更多数据库迁移相关内容，欢迎访问openEuler官网。',
    keywords:
      '数据库迁移方案,Mysql数据库迁移,mysql数据库集群,mysql数据迁移工具,mysql移植方案,迁移工具',
  },
  '/zh/blog/randy1568/Nginx 1-14-2-porting-guide': {
    description:
      '本文主要用于指导在openEuler 20.03 sp1 操作系统上部署Nginx服务器。想要了解更多服务器移植相关内容，欢迎访问openEuler官网。',
    keywords:
      'nginx移植方案,迁移步骤,服务器迁移方案,服务器迁移,系统迁移工具,迁移工具',
  },
  '/zh/blog/randy1568/Apache 2-4-39-porting-guide': {
    description:
      '本文主要用于指导在openEuler 20.03 sp1 操作系统上部署Apache服务器。想要了解更多服务器移植相关内容，欢迎访问openEuler官网。',
    keywords:
      'nginx移植方案,迁移步骤,服务器迁移方案,服务器迁移,系统迁移工具,迁移工具',
  },
  '/zh/blog/20220701-centos/20220701': {
    description:
      '本文主要用于指导安全快速的从Centos系统迁移到openEuler系统。想要了解更多服务器操作系统迁移相关内容，欢迎访问openEuler官网。',
    keywords:
      'CentOS虚拟机安装,linux服务器操作系统迁移,服务器系统迁移,CentOS8,CentOS搬迁,CentOS迁移',
  },
  '/zh/blog/2022-08-29/migration': {
    description:
      ' 随着数字化转型深入，操作系统正在向支持多样性计算、支持全场景的方向发展。在数字化转型的过程中，企业面临迁移操作系统的刚性需求，针对企业在迁移操作系统的需求，欧拉开源社区推出这份迁移指南，助力企业简单、平稳、高效进行操作系统迁移。想要了解更多服务器操作系统迁移相关内容，欢迎访问openEuler官网。',
    keywords:
      '开源服务器操作系统,操作系统迁移,操作系统替换,服务器系统迁移软件,服务器系统迁移工具,Centos系统迁移',
  },
  '/zh/blog/randy1568/Dubbo 2-6-8-porting-guide': {
    description:
      '本文主要用于指导在openEuler 20.03 sp1 服务器操作系统上迁移部署Dubbo 2.6.8。想要了解更多服务器迁移相关内容，欢迎访问openEuler官网。',
    keywords:
      'Dubbo移植方案,迁移步骤,服务器迁移方案,服务器迁移,系统迁移工具,迁移工具',
  },
  '/zh/blog/randy1568/Dubbo 2-7-5-porting-guide': {
    description:
      '本文主要用于指导在openEuler 20.03 sp1 服务器操作系统上迁移部署Dubbo 2.7.5。想要了解更多服务器迁移相关内容，欢迎访问openEuler官网。',
    keywords:
      'Dubbo移植方案,迁移步骤,服务器迁移方案,服务器迁移,系统迁移工具,迁移工具',
  },
  '/zh/blog/randy1568/enca1-19-porting-guide': {
    description:
      '本文主要用于指导在openEuler 20.03 sp1 服务器操作系统上迁移部署enca 1.19。想要了解更多服务器迁移相关内容，欢迎访问openEuler官网。',
    keywords:
      'enca移植方案,迁移步骤,服务器迁移方案,服务器迁移,系统迁移工具,迁移工具',
  },
  '/zh/blog/randy1568/flask 1-1-2-porting-guide': {
    description:
      '本文主要用于指导在openEuler 20.03 sp1 服务器操作系统上迁移部署flask 1.1.2。想要了解更多服务器迁移相关内容，欢迎访问openEuler官网。',
    keywords:
      'flask移植方案,迁移步骤,服务器迁移方案,服务器迁移,系统迁移工具,迁移工具',
  },
  '/zh/blog/randy1568/HAProxy 1-9-0-porting-guide': {
    description:
      '本文主要用于指导在openEuler 20.03 sp1 服务器操作系统上迁移部署HAProxy 1.9.0。想要了解更多服务器迁移相关内容，欢迎访问openEuler官网。',
    keywords:
      'HAProxy移植方案,迁移步骤,服务器迁移方案,服务器迁移,系统迁移工具,迁移工具',
  },
  '/zh/blog/randy1568/Iok 2.1.3-porting-guide': {
    description:
      '本文主要用于指导在openEuler 20.03 sp1 服务器操作系统上迁移部署Iok 2.1.3。想要了解更多服务器迁移相关内容，欢迎访问openEuler官网。',
    keywords:
      'Iok移植方案,迁移步骤,服务器迁移方案,服务器迁移,系统迁移工具,迁移工具',
  },
  '/zh/blog/randy1568/Lighttpd 1-4-53-porting-guide': {
    description:
      '本文主要用于指导在openEuler 20.03 sp1 服务器操作系统上迁移部署Lighttpd 1.4.53。想要了解更多服务器迁移相关内容，欢迎访问openEuler官网。',
    keywords:
      'Lighttpd移植方案,迁移步骤,服务器迁移方案,服务器迁移,系统迁移工具,迁移工具',
  },
  '/zh/blog/randy1568/Memcached 1-5-12-porting-guide': {
    description:
      '本文主要用于指导在openEuler 20.03 sp1 服务器操作系统上迁移部署Memcached 1.5.12。想要了解更多服务器迁移相关内容，欢迎访问openEuler官网。',
    keywords:
      'Memcached移植方案,迁移步骤,服务器迁移方案,服务器迁移,系统迁移工具,迁移工具',
  },
  '/zh/blog/randy1568/MySQL 5-7-21-migrate-guide': {
    description:
      '本文主要用于指导在openEuler 20.03 sp1 服务器操作系统上迁移部署MySQL 5.7.21数据库。想要了解更多服务器迁移相关内容，欢迎访问openEuler官网。',
    keywords:
      '数据库迁移方案,Mysql数据库迁移,mysql数据库集群,mysql数据迁移工具,mysql移植方案,迁移工具',
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
        [
          'script',
          {
            src: '/js/analytics.js',
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
            name: 'baidu-site-verification',
            content: 'code-EWzbQRssNU',
          },
        ],
      ],
    };
  });
  return locale;
};

export default getLocaleConfig(tdks);
