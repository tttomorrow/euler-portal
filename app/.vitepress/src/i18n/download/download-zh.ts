import data from '../../data/download/download';
export default {
  RELEASE_DESC: '发行说明',
  COPY_SUCCESS: '复制成功',
  SERVER_IMAGE: '服务器镜像',
  CLOUD_IMAGE: '云镜像',
  EDGE_IMAGE: '边缘镜像',
  EMBEDDEN_IMAGE: '嵌入式镜像',
  INSTALL_GUIDENCE: '安装指南',
  SEEK_HELP: '提问求助',
  GET_ISO: '获取 ISO',
  SELECT: '筛选',
  // 新增 start
  VERSION: '社区发行',
  ARCHITECTURE: '商业发行',
  DETAIL1:
    'openEuler当前最新版本为22年12月发布的openEuler 22.03 LTS SP1，欢迎下载体验！',
  DETAIL2: '更多历史版本下载请',
  CLICK_VIEW: '点此查看。',
  ARCHIVE_LINK: '/zh/download/architecture/',
  DETAIL3:
    '我们会根据访问的IP地址为您推荐最优镜像仓下载源，如果您需要寻找特定的镜像仓、或者您在考虑为openEuler社区创建一个新的公共镜像仓，请',
  HISTORY: '历史版本下载',
  // 新增 end
  CLICK_List: '点此访问openEuler镜像仓列表。',
  SCENARIO: '应用场景',
  RELEASE_DATE: '发布时间',
  DOWNLOAD_LINK: '下载地址',
  ALL_DATA: '全部',
  LIFE_CYCLE: '生命周期',
  DOWNLOAD_BTN_NAME: '立即下载',
  OUTSIDE_TITLE: '下载',
  MANUFACTURER: '厂商',
  PUBLISH_DATE: '发行时间',
  WHITE_PAPER: '白皮书',
  WEBSITE_SELECT: '站点选择',
  COPY_SUCCESSFULLY: '复制成功！',
  DOWNLOAD_CLASS: '下载：',
  DOCS_CLASS: '文档：',
  GUIDANCE_CLASS: '社区指导：',
  PAGINATION: ['已显示', '条记录/共', '条', '加载更多'],
  BTNSURE: '确定',
  BTNRESET: '重置',
  DOWNLOAD_LIST: data.zh.DOWNLOAD_LIST,
  SCENARIO_LIST: data.zh.SCENARIO_LIST,
  MIRROR_SELECT: {
    TITLE: '获取 ISO',
    RANK: 'Rank',
    NAME: 'Mirror Name',
    URL: 'URL',
    COUNTRY: 'Area',
    CONTINENT: 'Continent',
    DISTANCE: 'Distance(KM)',
    CONTENT: [
      'You are connecting from IP address: ',
      ', which belongs to ',
      '. We believe you are somewhere in ',
      ' and have selected the applicable mirrors.',
    ],
  },
  MIRROR_ALL: {
    TITLE: '镜像仓列表',
    NAME: 'Mirror Name',
    LOCATION: 'Location',
    SPONSOR: 'Sponsor',
    HTTPS: 'Http(s)',
    RSNC: 'RSYNC',
    FTP: 'FTP',
    Mbs: 'NetworkBandwidth(Mb/s)',
    TIME: 'Last Sync time',
    CONTENT: [
      'openEuler welcomes new mirror sites. If you are considering to set up a public mirror site for openEuler, please follow the mirror guidelines to make sure that your mirror is consistent with the other mirror sites. Any questions, feel free to',
      'contact us',
    ],
  },
};
