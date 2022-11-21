// import newEdition_pc_en from '@/assets/category/home/banner/banner22.09_pc_en.png';
// import newEdition_mo_en from '@/assets/category/home/banner/banner22.09_mo_en.png';

import prize_en_pc from '@/assets/category/home/banner/prize_en_pc.png';
import prize_en_mo from '@/assets/category/home/banner/prize_en_mo.png';
import prize_zh_pc from '@/assets/category/home/banner/prize_zh_pc.png';
import prize_zh_mo from '@/assets/category/home/banner/prize_zh_mo.png';

import techDay_pc from '@/assets/category/home/banner/tech-day_pc.png';
import techDay_mo from '@/assets/category/home/banner/tech-day_mo.png';
import newEdition_pc_zh from '@/assets/category/home/banner/banner22.09_pc_zh.png';
import newEdition_mo_zh from '@/assets/category/home/banner/banner22.09_mo_zh.png';
import liveImg_pc from '@/assets/category/home/banner/banner-contribution_pc.png';
import liveImg_mo from '@/assets/category/home/banner/banner-contribution_mo.png';
import migrationImg_pc from '@/assets/category/home/banner/migration_pc.png';
import migrationImg_mo from '@/assets/category/home/banner/migration_mo.png';
import summit_pc from '@/assets/category/home/banner/summit_pc.jpg';
import summit_mo from '@/assets/category/home/banner/summit_mo.png';

export default {
  // 首页banner  targetTap:1 新页签打开
  HOMEBANNER: {
    zh: [
      {
        pcBanner: summit_pc,
        moBanner: summit_mo,
        link: '/zh/interaction/summit-list/summit2022/',
        id: '',
        targetTap: 1,
      },
      {
        pcBanner: prize_zh_pc,
        moBanner: prize_zh_mo,
        link: 'https://mp.weixin.qq.com/s/a8ff7y6u4KADVg2npQQtyg',
        title: 'openEuler 开源操作系统荣获',
        desc: ['2022世界互联网领先科技成就奖'],
        btn: '了解更多',
        id: 'prize',
        targetTap: 1,
      },
      {
        pcBanner: migrationImg_pc,
        moBanner: migrationImg_mo,
        link: '/zh/migration/background/',
        targetTap: 1,
        id: '',
        title: 'openEuler迁移专区全面升级',
        desc: ['助您平滑高效的迁移操作系统'],
        btn: '了解更多',
      },
      {
        pcBanner: newEdition_pc_zh,
        moBanner: newEdition_mo_zh,
        link: 'https://mp.weixin.qq.com/s/pvp_drAo3Vzg11MjRqbXwg',
        btn: '查看详情',
        id: 'newEdition',
        targetTap: 1,
      },
      {
        pcBanner: liveImg_pc,
        moBanner: liveImg_mo,
        link: 'https://mp.weixin.qq.com/s/UeDpgGGQJX2mJQOMXvVibA',
        targetTap: 1,
        id: '',
      },
    ],
    en: [
      {
        pcBanner: prize_en_pc,
        moBanner: prize_en_mo,
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
        link: `/zh/migration/background/`,
        targetTap: 1,
        id: '',
        title: 'Start Porting Now!',
        desc: ['Learn how to port to openEuler.'],
        btn: 'Learn More',
      },
    ],
    ru: [
      // {
      //   pcBanner: newEdition_pc_en,
      //   moBanner: newEdition_mo_en,
      //   btn: 'Explore More',
      //   id: 'newEdition',
      //   targetTap: 1,
      // },
      {
        pcBanner: migrationImg_pc,
        moBanner: migrationImg_mo,
        link: `/zh/migration/background/`,
        id: '',
        targetTap: 1,
        title: 'Start Porting Now!',
        desc: ['Learn how to port to openEuler.'],
        btn: 'Learn More',
      },
    ],
  },
};
