export interface MyProjectsDetailType {
  projectTitle: string;
  lyric: string;
  trackDataPath: string;
  trackTitle: string;
  artistName: string;
  artWorkPath: string;
  cueButtons: [
    { cueA: string },
    { cueB: string },
    { cueC: string },
    { cueD: string },
    { cueE: string },
  ];
}

export interface MyProjectsItemsType {
  myProjectsItems: any[];
}
