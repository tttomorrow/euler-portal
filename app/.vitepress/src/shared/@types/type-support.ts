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
  testOrganization?: string;
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
  packageName: string;
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

export interface BoardCardList {
  architecture: string;
  boardModel: string;
  chipModel: string;
  chipVendor: string;
  deviceID?: string;
  downloadLink?: string;
  driverDate: string;
  driverName: string;
  driverSize?: string;
  id?: number;
  item?: string;
  lang?: string;
  os: string;
  sha256?: string;
  ssID?: string;
  svID?: string;
  type: string;
  updateTime?: string;
  vendorID?: string;
  version: string;
}

export interface SoftWareQuery {
  page_size: number;
  page_num: number;
}

export interface SelectParams {
  lang: string;
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

export interface BusinessSoftWareQuery {
  pageSize: number;
  pageNo: number;
}
export interface PlatFormAndServerModel {
  platformName: string;
  serverProvider: string;
  serverTypes: string[];
}
export interface BusinessSoftWareList {
  authenticateLink?: null;
  certId?: number;
  companyName: string;
  osName: string;
  osVersion: string;
  platformTypeAndServerModel: PlatFormAndServerModel[];
  productName: string;
  productVersion: string;
  testOrganization: string;
  type: string;
}

export interface FilterList {
  select: string[];
  title: string;
}

// export interface SafetyBulletinDatail {
//   affectedComponent?: string;
//   affectedProduct?: string;
//   announcementTime: string;
//   cveId?: string;
//   cveList?: [];
//   cvrf?: null;
//   description?: string;
//   id?: number;
//   introduction?: string;
//   packageHelperList?: PackageHelperList[];
//   packageList?: ReferenceList[];
//   packageName?: string;
//   referenceDocuments?: string;
//   referenceList?: [];
//   revisionHistory?: string;
//   securityNoticeNo: string;
//   subject: string;
//   summary: string;
//   type?: string;
//   updateTime?: string;
// }

// export interface ReferenceList {
//   id: number;
//   securityNoticeNo: string;
//   type: string;
//   updateTime: string;
//   url: string;
// }
// export interface PackageHelperList {
//   child: [];
//   packageName: string;
//   productName: string;
//   sha256: string;
// }
