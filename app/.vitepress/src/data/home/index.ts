// import newEdition_pc_en from '@/assets/category/home/banner/banner22.09_pc_en.png';
// import newEdition_mo_en from '@/assets/category/home/banner/banner22.09_mo_en.png';
import newEdition_pc_zh from '@/assets/category/home/banner/banner22.09_pc_zh.png';
import newEdition_mo_zh from '@/assets/category/home/banner/banner22.09_mo_zh.png';
import summitImg_pc from '@/assets/category/home/banner/banner-summit_pc.png';
import summitImg_mo from '@/assets/category/home/banner/banner-summit_mo.png';
import liveImg_pc from '@/assets/category/home/banner/banner-contribution_pc.png';
import liveImg_mo from '@/assets/category/home/banner/banner-contribution_mo.png';
import migrationImg_pc from '@/assets/category/home/banner/migration_pc.png';
import migrationImg_mo from '@/assets/category/home/banner/migration_mo.png';

export default {
  // 首页banner  targetTap:1 新页签打开
  HOMEBANNER: {
    zh: [
      {
        pcBanner: newEdition_pc_zh,
        moBanner: newEdition_mo_zh,
        link: '/zh/interaction/summit-list/summit2022-changsha/',
        btn: '查看详情',
        id: 'newEdition',
        targetTap: 1,
      },
      {
        pcBanner: summitImg_pc,
        moBanner: summitImg_mo,
        link: 'https://mp.weixin.qq.com/s/c39TJYsR9b-TA6mYh6ehOg',
        targetTap: 1,
        id: '',
      },
      {
        pcBanner: liveImg_pc,
        moBanner: liveImg_mo,
        link: 'https://mp.weixin.qq.com/s/UeDpgGGQJX2mJQOMXvVibA',
        targetTap: 1,
        id: '',
      },
      {
        pcBanner: migrationImg_pc,
        moBanner: migrationImg_mo,
        link: '/zh/migration/download/',
        targetTap: 1,
        id: '',
        title: '一起迁移吧',
        desc: ['手把手教你把操作系统替换成openEuler'],
        btn: '了解更多',
      },
    ],
    en: [
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
        link: `/zh/migration/download/`,
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
        link: `/zh/migration/download/`,
        id: '',
        targetTap: 1,
        title: 'Start Porting Now!',
        desc: ['Learn how to port to openEuler.'],
        btn: 'Learn More',
      },
    ],
  },
};
