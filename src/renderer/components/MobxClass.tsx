import { inject, observer } from "mobx-react";
import React from "react";
import { CounterStore } from "@/store";

interface IProps {
  counter?: CounterStore;
};

interface IState {};

@inject("counter")
@observer
export default class MobxClass extends React.Component<IProps, IState> {
  componentDidMount() {
    console.log(this.props);
    this.props.counter?.fetchApi();
  }
  add = () => {
    this.props.counter?.increase();
    console.log(this.props.counter?.currentCount);
  };
  render() {
    return (
      <>
        {this.props.counter?.count}
        {this.props.counter?.currentCount}
        <button onClick={this.add}>+</button>
      </>
    );
  }
}
