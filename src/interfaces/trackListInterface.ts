export interface TrackListDetailType {
  trackDataPath: string;
  trackTitle: string;
  artistName: string;
  artWorkPath: string;
  linkedMyProjects: [
    {
      projectTitle: string;
    },
  ];
}

export interface TrackListItemsType {
  trackListItems: any[];
}
