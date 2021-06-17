import { makeAutoObservable } from 'mobx';

export class CommonStore {
  visiblePlayList = false;

  constructor() {
  	makeAutoObservable(this);
  }

  /**
   * @description 切换播放列表
   */
  onShowPlayList() {
  	console.log(this.visiblePlayList);
  	this.visiblePlayList = !this.visiblePlayList;
  }
}

export default new CommonStore();
