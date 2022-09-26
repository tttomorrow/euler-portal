import summitImg_pc from '@/assets/category/home/banner/banner-summit_pc.png';
import summitImg_mo from '@/assets/category/home/banner/banner-summit_mo.png';
import ossImg_pc from '@/assets/category/home/banner/banner-oss_pc.jpg';
import ossImg_mo from '@/assets/category/home/banner/banner-oss_mo.jpg';
import liveImg_pc from '@/assets/category/home/banner/banner-contribution_pc.png';
import liveImg_mo from '@/assets/category/home/banner/banner-contribution_mo.png';
import migrationImg_pc from '@/assets/category/home/banner/migration_pc.png';
import migrationImg_mo from '@/assets/category/home/banner/migration_mo.png';

export default {
  // 首页banner  targetTap:1 新页签打开
  HOMEBANNER: {
    zh: [
      {
        pcBanner: summitImg_pc,
        moBanner: summitImg_mo,
        link: '/zh/interaction/summit-list/summit2022-changsha/',
        targetTap: 1,
      },
      {
        pcBanner: ossImg_pc,
        moBanner: ossImg_mo,
        link: 'https://mp.weixin.qq.com/s/CGgvaj9lL3kW6nsU-kY9Ww',
        targetTap: 1,
      },
      {
        pcBanner: liveImg_pc,
        moBanner: liveImg_mo,
        link: 'https://mp.weixin.qq.com/s/UeDpgGGQJX2mJQOMXvVibA',
        targetTap: 1,
      },
      {
        pcBanner: migrationImg_pc,
        moBanner: migrationImg_mo,
        link: '/zh/migration/download/',
        targetTap: 1,
        title: '一起迁移吧',
        desc: ['手把手教你把操作系统替换成openEuler'],
        btn: '了解更多',
      },
    ],
    en: [
      {
        pcBanner: ossImg_pc,
        moBanner: ossImg_mo,
        link: 'https://mp.weixin.qq.com/s/CGgvaj9lL3kW6nsU-kY9Ww',
        targetTap: 1,
      },
      {
        pcBanner: migrationImg_pc,
        moBanner: migrationImg_mo,
        link: `/zh/migration/download/`,
        targetTap: 1,
        title: 'Start Porting Now!',
        desc: ['Learn how to port to openEuler.'],
        btn: 'Learn More',
      },
    ],
    ru: [
      {
        pcBanner: ossImg_pc,
        moBanner: ossImg_mo,
        link: 'https://mp.weixin.qq.com/s/CGgvaj9lL3kW6nsU-kY9Ww',
        targetTap: 1,
      },
      {
        pcBanner: migrationImg_pc,
        moBanner: migrationImg_mo,
        link: `/zh/migration/download/`,
        targetTap: 1,
        title: 'Start Porting Now!',
        desc: ['Learn how to port to openEuler.'],
        btn: 'Learn More',
      },
    ],
  },
};
