import React from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
// import { Button } from "antd";
import store from "@/store";
// import Icon from "@/assets/images/hanbao.png";
import styles from "./MobxHooks.scss";

const MobxHooks = observer(() => {
  const { counter } = useLocalObservable(() => store);
  return (
    <div className={styles.container}>
      <span>
        <label>计算属性</label>
        {counter.currentCount}
      </span>
      <span>
        <label>当前值</label>
        {counter.count}
      </span>
      <button onClick={() => store.counter.increase()}>增加</button>
      {/* <img src={Icon} /> */}
    </div>
  );
});

export default MobxHooks;
