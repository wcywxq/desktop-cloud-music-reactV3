export declare namespace DetailDataType {
  interface Playlist {
    id: number;
    commentCount: number;
    coverImgUrl: string;
    playCount: number;
    name: string;
    creator: {
      avatarUrl: string;
      nickname: string;
    };
    createTime: Date;
    subscribedCount: number;
    trackIds: { id: number }[]; // trackIds 可用来调用 song/detail 获取详细信息
  }
}

export interface PlaylistDataType {
  data?: DetailDataType.Playlist;
}

export interface CommentsDataType {
  commentId: number;
  user: {
    avatarUrl: string;
    nickname: string;
  };
  content: string;
  beReplied: CommentsDataType[];
  visible: boolean;
  time?: Date;
  liked?: boolean;
  likedCount?: number;
}
