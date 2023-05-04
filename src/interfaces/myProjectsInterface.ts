import { CueButtonsType } from "interfaces/cueButtonsInterface";
export interface MyProjectsDetailType {
  projectTitle: string;
  lyric: string;
  trackDataPath: string;
  trackTitle: string;
  artistName: string;
  artWorkPath: string;
  cueButtons: CueButtonsType[];
}

export interface MyProjectsItemsType {
  myProjectsItems: any[];
}
