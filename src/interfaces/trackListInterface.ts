export interface TrackListDetailType {
  trackDataPath: string;
  trackTitle: string;
  artistName: string;
  artWorkPath: string;
  linkedMyProjects: [
    {
      projectTitle: any;
    },
  ];
}

export interface TrackListItemsType {
  trackListItems: any[];
}
