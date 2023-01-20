import techDay_pc from '@/assets/category/home/banner/tech-day_pc.png';
import techDay_mo from '@/assets/category/home/banner/tech-day_mo.png';
import migrationImg_pc from '@/assets/category/home/banner/migration_pc.png';
import migrationImg_mo from '@/assets/category/home/banner/migration_mo.png';
import year_pc_en from '@/assets/category/home/banner/openeuler-year_en.jpg';
import year_mo_en from '@/assets/category/home/banner/openeuler-year_mo_en.png';
import year_pc from '@/assets/category/home/banner/openeuler-year_pc.jpg';
import year_mo from '@/assets/category/home/banner/openeuler-year_mo.png';
import annals_pc from '@/assets/category/home/banner/annals_pc.jpg';
import annals_mo from '@/assets/category/home/banner/annals_mo.png';
import forum_pc from '@/assets/category/home/banner/forum_pc.jpg';
import forum_mo from '@/assets/category/home/banner/forum_mo.jpg';

export default {
  // 首页banner  targetTap:1 新页签打开
  HOMEBANNER: {
    zh: [
      {
        pcBanner: year_pc,
        moBanner: year_mo,
        link: '',
        id: '',
        targetTap: 1,
      },
      {
        pcBanner: annals_pc,
        moBanner: annals_mo,
        link: '/zh/news/2022年度报告/年度报告.html',
        id: '',
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
        title: 'openEuler迁移专区全面升级',
        desc: ['助您平滑高效的迁移操作系统'],
        btn: '了解更多',
      },
    ],
    en: [
      {
        pcBanner: year_pc_en,
        moBanner: year_mo_en,
        link: '',
        id: '',
        targetTap: 1,
      },
      {
        pcBanner: techDay_pc,
        moBanner: techDay_mo,
        link: `https://www.openeuler.org/en/blog/openeuler-techday/openEuler%20TechDay%20Invitation.html`,
        targetTap: 1,
      },
      {
        pcBanner: migrationImg_pc,
        moBanner: migrationImg_mo,
        link: `/zh/migration/`,
        targetTap: 1,
        id: '',
        title: 'Start Porting Now!',
        desc: ['Learn how to port to openEuler.'],
        btn: 'Learn More',
      },
    ],
    ru: [
      {
        pcBanner: year_pc_en,
        moBanner: year_mo_en,
        link: '',
        id: '',
        targetTap: 1,
      },
      {
        pcBanner: migrationImg_pc,
        moBanner: migrationImg_mo,
        link: `/zh/migration/`,
        id: '',
        targetTap: 1,
        title: 'Start Porting Now!',
        desc: ['Learn how to port to openEuler.'],
        btn: 'Learn More',
      },
    ],
  },
};
