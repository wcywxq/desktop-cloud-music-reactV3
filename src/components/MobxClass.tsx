import { inject, observer } from "mobx-react";
import React from "react";
import { CounterStore } from "../store/counterStore";

type IProps = {
  counterStore?: CounterStore;
};
type IState = {};

@inject("counterStore")
@observer
export default class MobxClass extends React.Component<IProps, IState> {
  componentDidMount() {
    console.log(this.props);
    this.props.counterStore?.fetchApi();
  }
  add = () => {
    this.props.counterStore?.increase();
    console.log(this.props.counterStore?.currentCount);
  };
  render() {
    return (
      <>
        {this.props.counterStore?.count}
        {this.props.counterStore?.currentCount}
        <button onClick={this.add}>+</button>
      </>
    );
  }
}
