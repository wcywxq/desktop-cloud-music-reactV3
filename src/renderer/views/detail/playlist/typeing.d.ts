export type Creator = {
  avatarUrl: string;
  nickname: string;
};

export type TrackIds = { id: number };

export declare namespace DetailDataType {
  interface Playlist {
    id: number;
    commentCount: number;
    coverImgUrl: string;
    playCount: number;
    name: string;
    creator: Creator;
    createTime: Date;
    subscribedCount: number;
    trackIds: TrackIds[]; // trackIds 可用来调用 song/detail 获取详细信息
  }
}

export interface PlaylistDataType {
  data?: DetailDataType.Playlist;
}

export interface CommentsType {
  commentId: number;
  user: {
    avatarUrl: string;
    nickname: string;
  };
  content: string;
  beReplied: CommentsType[];
  visible: boolean;
  time?: Date;
  liked?: boolean;
  likedCount?: number;
}
