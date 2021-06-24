declare module "*.png";
declare module "*.gif";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.webp";
declare module "*.svg";
declare module "*.psd";
declare module "*.bmp";
declare module "*.tif";
declare module "*.scss";

declare interface AuthorStruct {
  id: number;
  name: string;
}

declare interface AlbumStruct {
  id: number;
  name: string;
}

declare interface SongsStruct {
  id: number;
  name: string;
  ar: AuthorStruct[];
  al: AlbumStruct;
  dt: Date;
}

declare interface SingerStruct {
  id: number;
  name: string;
}
interface PlaylistBaseStruct {
  id: number;
  coverImgUrl: string;
  playCount: number;
  name: string;
  creator: {
    avatarUrl: string;
    nickname: string;
  };
}

declare interface PlaylistStruct extends PlaylistBaseStruct {}

declare interface UserStruct {
  avatarUrl: string;
  nickname: string;
}

declare interface LyricStruct {}

declare interface RadioStruct {}

declare interface VideoStruct {}

// detail
declare namespace DetailState {
  interface Playlist extends PlaylistBaseStruct {
    commentCount: number;
    createTime: Date;
    subscribedCount: number;
    trackIds: { id: number }[];
  }
}

export interface DetailStateType {
  data?: DetailState.Playlist;
}

// search
declare namespace SearchState {
  interface Single {
    songCount: number;
    songs: SongsStruct[];
  }

  interface Album {
    albumCount: number;
    albums: AlbumStruct[];
  }

  interface Singer {
    artistCount: number;
    artists: SingerStruct[];
  }

  interface Playlist {
    playlistCount: number;
    playlists: PlaylistStruct[];
  }

  interface User {
    userprofileCount: number;
    userprofiles: UserStruct[];
  }

  interface Lyric {
    songCount: number;
    songs: LyricStruct[];
  }

  interface Radio {
    djRadiosCount: number;
    djRadios: RadioStruct[];
  }

  interface Video {
    videoCount: number;
    videos: VideoStruct[];
  }
}

declare type SearchType = "1" | "10" | "100" | "1000" | "1002" | "1004" | "1006" | "1009" | "1014" | "1018";

export interface SearchStateType {
  result: Partial<
    SearchState.Single &
      SearchState.Album &
      SearchState.Singer &
      SearchState.Playlist &
      SearchState.User &
      SearchState.Lyric &
      SearchState.Radio &
      SearchState.Video
  >;
}
