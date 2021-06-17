import { makeAutoObservable } from 'mobx';

export class CounterStore {
  count = 0;

  constructor() {
  	makeAutoObservable(this);
  }

  async fetchApi() {
  	const res = await fetch('http://www.baidu.com');
  	console.log(res);
  }

  get currentCount() {
  	return this.count * 10;
  }

  increase() {
  	console.log('yy');
  	this.count += 1;
  	console.log(this.count);
  }
}

export default new CounterStore();
