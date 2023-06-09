/**
 * @file  学习模块国际化配置入口
 * */
import mooc from '@/assets/category/mooc/mooc1.png';
export default {
  MOOC: '课程中心',
  MOOC_COURSE: [
    {
      ID: '1',
      IMG: mooc,
      TITLE: 'HCIA-openEuler 认证培训课程',
      DESC: '欢迎学习HCIA-openEuler华为认证openEuler工程师在线课程。',
      CHILDREN: [
        {
          NAME: '课程学习',
          PATH: 'https://e.huawei.com/cn/talent/#/cert/product-details?certifiedProductId=383&authenticationLevel=CTYPE_CARE_HCIA&technicalField=PSC&version=1.0 ',
        },
        {
          NAME: '考试报名',
          PATH: 'https://e.huawei.com/cn/talent/#/cert/product-details?certifiedProductId=383&authenticationLevel=CTYPE_CARE_HCIA&technicalField=PSC&version=1.0 ',
        },
      ],
    },
    {
      ID: '2',
      IMG: mooc,
      TITLE: 'openEuler精品课程',
      DESC: '开源基础软件学习培训',
      APPLY_LINK: 'https://training-assessment.osinfra.cn/ ',
      CHILDREN: [
        {
          NAME: '开始学习',
          PATH: 'https://training-assessment.osinfra.cn/',
        },
      ],
    },
    {
      ID: '3',
      IMG: mooc,
      TITLE: 'Moocstudio',
      DESC: '集计算机课程编写和学习一体的教育平台',
      CHILDREN: [
        {
          NAME: '开始学习',
          PATH: 'https://moocstudio.openeuler.org/zh',
        },
      ],
    },
    {
      ID: '4',
      IMG: mooc,
      TITLE: 'Tutorials',
      DESC: 'openEuler官方出品的迷你视频课程',

      CHILDREN: [
        {
          NAME: '开始学习',
          PATH: 'https://space.bilibili.com/527064077/channel/collectiondetail?sid=1229363',
        },
      ],
    },
  ],
  BTN_LEARN: '课程学习',
  BTN_APPLY: '考试报名',
  MOOC_CATALOG: '目录',
  COURSE_DOWNLOAD: '课件下载',
  TEACHER_TEAM: '讲师团队',
  MOOC_LIST_ROUTRE: '慕课',
  PREV_TEXT: '上一篇',
  NEXT_TEXT: '下一篇',
};
