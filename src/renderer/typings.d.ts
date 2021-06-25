import React from "react";

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

// loading
declare interface Loading {
  loading: boolean;
}

// 分页
declare interface PaginationOptionsType {
  pageNum: number;
  pageSize: number;
  handleCurrentChange: (pageNum: number, pageSize?: number | undefined) => void;
  handleSizeChange: (pageNum: number, pageSize: number) => void;
}

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

declare interface PlaylistStruct extends PlaylistBaseStruct {
  trackCount: number;
}

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

declare type DetailStateType = Partial<DetailState.Playlist>;

declare type DetailRouteType = Partial<{
  loading: boolean;
  state: DetailStateType;
  children: React.ReactNode;
}>;

// search
declare namespace SearchState {
  interface Single {
    songCount: number;
    songs: Array<SongsStruct & Loading>;
  }

  interface Album {
    albumCount: number;
    albums: Array<AlbumStruct & Loading>;
  }

  interface Singer {
    artistCount: number;
    artists: Array<SingerStruct & Loading>;
  }

  interface Playlist {
    playlistCount: number;
    playlists: Array<PlaylistStruct & Loading>;
  }

  interface User {
    userprofileCount: number;
    userprofiles: Array<UserStruct & Loading>;
  }

  interface Lyric {
    songCount: number;
    songs: Array<LyricStruct & Loading>;
  }

  interface Radio {
    djRadiosCount: number;
    djRadios: Array<RadioStruct & Loading>;
  }

  interface Video {
    videoCount: number;
    videos: Array<VideoStruct & Loading>;
  }
}

declare type SearchType = "1" | "10" | "100" | "1000" | "1002" | "1004" | "1006" | "1009" | "1014" | "1018";

declare type SearchStateType = Partial<
  SearchState.Single &
    SearchState.Album &
    SearchState.Singer &
    SearchState.Playlist &
    SearchState.User &
    SearchState.Lyric &
    SearchState.Radio &
    SearchState.Video
>;

declare type SearchRouteType = Partial<
  PaginationOptionsType & { loading: boolean; state: SearchStateType; children: React.ReactNode }
>;
