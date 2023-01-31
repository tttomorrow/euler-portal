export interface TeacherItem {
  img: string;
  position: string;
  name: string;
}
export interface NodeItem {
  label: string;
  key: string;
  introduction?: string | never | undefined[];
  desc?: string;
  teacher: TeacherItem[];
  ppt_link?: string;
  video_link?: string;
}
export interface VideoObj {
  element: HTMLElement | null;
  isShow: boolean;
  barWidth: number;
}
