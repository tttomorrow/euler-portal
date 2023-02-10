export interface SortParams {
  category: string;
  lang: string;
  page: number;
  pageSize: number;
}

export interface SortResponse {
  msg: string;
  obj: any;
  status: number;
}
