export interface BaseQuery {
  page: number;
  size: number;
}
export interface CveQuery {
  pages: BaseQuery;
  keyword?: string;
  status?: string;
  type?: string;
  year?: string;
  architecture?: string;
  cpu?: string;
  os?: string;
  lang?: string;
}
export interface DetailParams {
  securityNoticeNo: string;
}

export interface SecurityLists {
  affectedComponent: string;
  affectedProduct: string;
  announcementTime: string;
  securityNoticeNo: string;
  summary: string;
  type: string;
}

export interface CveLists {
  announcementTime: string;
  cveId: string;
  cvsssCoreOE: string;
  status: string;
  summary: string;
  updateTime: string;
}

export interface CompatibilityList {
  architecture: string;
  biosUefi?: string;
  boardCards?: [];
  certificationAddr?: string;
  certificationTime?: string;
  commitID?: string;
  compatibilityConfiguration?: null;
  computerType?: string;
  cpu?: string;
  date?: string;
  friendlyLink?: string;
  hardDiskDrive?: string;
  hardwareFactory?: string;
  hardwareModel?: string;
  hostBusAdapter?: string;
  id?: number;
  lang?: string;
  mainboardModel?: string;
  osVersion?: string;
  portsBusTypes?: string;
  productInformation?: string;
  ram?: string;
  updateTime?: string;
  videoAdapter?: string;
}

export interface SoftWareQuery {
  page_size: number;
  page_num: number;
}
export interface SoftWareList {
  arch: string;
  bin: string;
  category: string;
  downloadLink: string;
  group: string;
  install: string;
  libs: string;
  license: string;
  os: string;
  property: string;
  result_root: string;
  result_url: string;
  softwareName: string;
  src_location: string;
  type: string;
  uninstall: string;
  version: string;
}
