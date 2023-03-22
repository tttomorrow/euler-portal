import bannerDevdayMo from '../img/banner-devday_mo.png';
import bannerDevdayPc from '../img/banner-devday_pc.jpg';
import bgCollection1 from '../img/collection-bg1.png';
import bgCollection2 from '../img/collection-bg2.png';
import bgCollection3 from '../img/collection-bg3.png';
import bgCollection4 from '../img/collection-bg4.png';
export default {
  banner: {
    img_pc: bannerDevdayPc,
    img_mo: bannerDevdayMo,
    title: 'openEuler Developer Day 2023',
    subtitle: '4月20-21日  中国·上海浦东嘉里酒店',
  },
  detail: [
    'openEuler Developer Day 2023 （简称 ODD 2023）是开放原子开源基金会的 openEuler 社区发起的开发者大会。旨在推动 openEuler 在服务器、云计算、边缘计算和嵌入式四大场景的技术探索和创新。本次 ODD 2023 正式发布 openEuler 22.03 全场景长周期版本，展示社区伙伴联合创新成果，分享多行业使用 openEuler 规模部署的商业案例，举办社区治理机构的线上工作会议。openEuler 始终与开发者在一起，开创新境，共创未来。',
  ],
  collection: [
    {
      title: '议题征集',
      img_bg: bgCollection1,
      titleEn: 'CALL FOR SPEAKER',
      link: 'https://shimo.im/forms/DirYOOhoFb04bATr/fill',
    },
    {
      title: '赞助征集',
      img_bg: bgCollection2,
      titleEn: 'CALL FOR SPONSOR',
      link: 'https://shimo.im/forms/Y7JhE038Of0B25Hx/fill',
    },
    {
      title: 'SIG 征集',
      img_bg: bgCollection3,
      titleEn: 'CALL FOR SIG',
      link: 'https://shimo.im/forms/ajofLUZ8Wac7lOJY/fill',
    },
    {
      title: 'DEMO征集',
      img_bg: bgCollection4,
      titleEn: 'CALL FOR DEMO',
      link: 'https://shimo.im/forms/uUCSaEbkkt8GyGLL/fill',
    },
  ],
  previous: {
    title: '精彩回顾',
    content: [
      {
        title: 'openEuler Summit 2022',
        link: '/zh/interaction/summit-list/summit2022/',
      },
      {
        title: '湖南欧拉操作系统生态大会',
        link: '/zh/interaction/summit-list/summit2022-changsha/',
      },
      {
        title: 'openEuler Developer Day 2022',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/devday2022/',
      },
      {
        title: 'openEuler Summit 2021',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/summit2021/',
      },
      {
        title: 'openEuler Developer Day 2021',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/devday2021/',
      },
      {
        title: 'openEuler Summit 2020',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/',
      },
      {
        title: 'openEuler Virtual Summit 2020',
        link: 'https://v1.openeuler.org/zh/interaction/summit-list/list/',
      },
    ],
  },
};
