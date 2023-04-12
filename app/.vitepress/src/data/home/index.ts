import techDay_pc from '@/assets/category/home/banner/tech-day_pc.png';
import techDay_mo from '@/assets/category/home/banner/tech-day_mo.png';
import migrationImg_pc from '@/assets/category/home/banner/migration_pc.png';
import migrationImg_mo from '@/assets/category/home/banner/migration_mo.png';

import forum_pc from '@/assets/category/home/banner/forum_pc.jpg';
import forum_mo from '@/assets/category/home/banner/forum_mo.jpg';
import eur_mo from '@/assets/category/home/banner/eur-banner_mo.jpg';
import eur_pc from '@/assets/category/home/banner/eur-banner_pc.jpg';

import internship_pc from '@/assets/category/home/banner/internship_pc.jpg';
import internship_mo from '@/assets/category/home/banner/internship_mo.jpg';
import devday_pc from '@/assets/category/home/banner/devday_pc.jpg';
import devday_mo from '@/assets/category/home/banner/devday_mo.png';
import sigWork_pc from '@/assets/category/home/banner/sig-work_pc.jpg';
import sigWork_mo from '@/assets/category/home/banner/sig-work_mo.jpg';

export default {
  // 首页banner  targetTap:1 新页签打开
  HOMEBANNER: {
    zh: [
      {
        pcBanner: devday_pc,
        moBanner: devday_mo,
        link: '/zh/interaction/summit-list/devday2023/',
        id: 'devday',
        targetTap: 1,
      },
      {
        pcBanner: sigWork_pc,
        moBanner: sigWork_mo,
        link: 'https://shimo.im/forms/ajofLUZ8Wac7lOJY/fill',
        id: '',
        targetTap: 1,
      },
      {
        pcBanner: internship_pc,
        moBanner: internship_mo,
        link: 'https://summer-ospp.ac.cn/',
        id: '',
        targetTap: 1,
      },
      {
        pcBanner: eur_pc,
        moBanner: eur_mo,
        link: '/zh/blog/waaagh/openEuler-user-repo-intro.html',
        id: 'eur',
        title: ['openEuler', '用户软件仓（EUR）发布'],
        targetTap: 1,
      },
      {
        pcBanner: forum_pc,
        moBanner: forum_mo,
        link: 'https://forum.openeuler.org/',
        id: '',
        targetTap: 1,
      },
      {
        pcBanner: migrationImg_pc,
        moBanner: migrationImg_mo,
        link: '/zh/migration/',
        targetTap: 1,
        id: '',
        title: ['openEuler迁移专区全面升级'],
        desc: ['助您平滑高效的迁移操作系统'],
        btn: '了解更多',
      },
    ],
    en: [
      {
        pcBanner: techDay_pc,
        moBanner: techDay_mo,
        id: '',
        link: `https://www.openeuler.org/en/blog/openeuler-techday/openEuler%20TechDay%20Invitation.html`,
        targetTap: 1,
      },
      {
        pcBanner: migrationImg_pc,
        moBanner: migrationImg_mo,
        id: '',
        link: `/zh/migration/`,
        targetTap: 1,
        title: ['Start Porting Now!'],
        desc: ['Learn how to port to openEuler.'],
        btn: 'Learn More',
      },
    ],
    ru: [
      {
        pcBanner: migrationImg_pc,
        moBanner: migrationImg_mo,
        link: `/zh/migration/`,
        id: '',
        targetTap: 1,
        title: ['Start Porting Now!'],
        desc: ['Learn how to port to openEuler.'],
        btn: 'Learn More',
      },
    ],
  },
};
