export interface DownloadData {
  CLOUD_IMAGE: string;
  DESC: string;
  DOWNLOAD_URL: string;
  EDGE_IMAGE: string;
  EMBEDDEN_IMAGE: string;
  GET_ISO_URL: string;
  INSTALL_GUIDENCE_URL: string;
  LIFE_CYCLE_URL: string;
  LTS: boolean;
  MANUFACTURER: string;
  NAME: string;
  PUBLISH_DATE: string;
  RELEASE_DESC_URL: string;
  SEEK_HELP_URL: string;
  WEBSITE_SELECT: string;
  WHITE_PAPER: string;
  SERVER_IMAGE?: string;
  DETAILED_LINK: {
    SERVER?: ArchList[];
    EDGE_CLOUD?: ArchList[];
    CLOUD_COMPUTING?: ArchList[];
    EMBEDDED?: ArchList[];
    [key: string]: any;
  };
}
export interface ArchList {
  ARCH: string;
  LINK: string;
  [key: string]: string;
}
