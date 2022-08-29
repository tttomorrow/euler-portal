export default [
  {
    label: '下载',
    link: 'download',
    isLeaf: true,
  },
  {
    label: '背景',
    link: 'background',
  },
  {
    label: '方案介绍',
    link: 'guidance',
    children: [
      {
        label: '迁移概述',
        link: '1-summary',
      },
      {
        label: '迁移注意事项',
        link: '2-attention',
      },
      {
        label: '迁移流程',
        link: '3-process',
      },
      {
        label: '迁移评估',
        link: '4-assessment',
      },
      {
        label: '迁移适配',
        link: '5-adaptive',
      },
      {
        label: '迁移实施（存量替换）',
        link: '6-stock-migration',
      },
      {
        label: '迁移实施（新增/扩容）',
        link: '7-increased-migration',
      },
      {
        label: '使用SUT进行升级（原地升级）',
        link: '8-updated',
      },
      {
        label: '跟踪迁移',
        link: '9-followup',
      },
    ],
  },
  {
    label: '移植案例',
    link: 'transplantation-cases',
  },
  {
    label: '用户案例',
    link: 'user-cases',
  },
  {
    label: '搬迁实施指导',
    link: 'implement-guide',
  },
];
