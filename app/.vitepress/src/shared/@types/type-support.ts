export interface baseQuery {
  page: number;
  size: number;
}
export interface cveQuery {
  pages: {
    page: number;
    size: number;
  };
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

export interface BulletinParams {
  page: number;
  size: number;
}

export interface SecurityLists {
  affectedComponent: string;
  affectedProduct: string;
  announcementTime: string;
  securityNoticeNo: string;
  summary: string;
  type: string;
}

export interface cveLists {
  announcementTime: string;
  cveId: string;
  cvsssCoreOE: string;
  status: string;
  summary: string;
  updateTime: string;
}

export interface compatibilityList {
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
