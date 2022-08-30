import expertImg_pc from '../../assets/category/home/banner/expert_pc.png';
import expertImg_mo from '../../assets/category/home/banner/expert_mo.png';
import migrationImg_pc from '../../assets/category/home/banner/migration_pc.png';
import migrationImg_mo from '../../assets/category/home/banner/migration_mo.png';
export default {
  // 首页banner  targetTap:1 新页签打开
  HOMEBANNER: {
    zh: [
      {
        pcBanner: expertImg_pc,
        moBanner: expertImg_mo,
        link: '/zh/experts/',
        targetTap: 1,
        title: '顾问专家',
        desc: '欧拉开源社区聘任首批顾问专家',
        btn: '了解更多',
      },
      {
        pcBanner: migrationImg_pc,
        moBanner: migrationImg_mo,
        link: '/zh/migration/download/',
        targetTap: 1,
        title: '一起迁移吧',
        desc: '手把手教你把操作系统替换成openEuler',
        btn: '了解更多',
      },
    ],
    en: [
      {
        pcBanner: expertImg_pc,
        moBanner: expertImg_mo,
        link: `/zh/experts/`,
        targetTap: 1,
        title: 'Expert Consultants',
        desc: 'openEuler Community  Appointed the First Group of Expert Consultants',
        btn: 'Learn More',
      },
      {
        pcBanner: migrationImg_pc,
        moBanner: migrationImg_mo,
        link: `/zh/migration/download/`,
        targetTap: 1,
        title: 'Start Porting Now!',
        desc: 'Learn how to port to openEuler.',
        btn: 'Learn More',
      },
    ],
    ru: [
      {
        pcBanner: expertImg_pc,
        moBanner: expertImg_mo,
        link: `/zh/experts/`,
        targetTap: 1,
        title: 'Expert Consultants',
        desc: 'openEuler Community  Appointed the First Group of Expert Consultants',
        btn: 'Learn More',
      },
      {
        pcBanner: migrationImg_pc,
        moBanner: migrationImg_mo,
        link: `/zh/migration/download/`,
        targetTap: 1,
        title: 'Start Porting Now!',
        desc: 'Learn how to port to openEuler.',
        btn: 'Learn More',
      },
    ],
  },
};
