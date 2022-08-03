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

export interface QueryParams {
  page: number;
  size: number;
}

export interface CveLists {
  announcementTime: string;
  cveId: string;
  cvsssCoreOE: string;
  status: string;
  summary: string;
  updateTime: string;
}
