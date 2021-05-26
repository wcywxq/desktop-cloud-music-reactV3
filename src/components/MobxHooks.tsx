import React from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
// import { Button } from "antd";
import counterStore from "@/store/counterStore";
import Icon from "@/assets/images/hanbao.png";
import styles from "./MobxHooks.scss";

const MobxHooks = observer(() => {
  const store = useLocalObservable(() => counterStore);
  return (
    <div className={styles.container}>
      <span>
        <label>计算属性</label>
        {store.currentCount}
      </span>
      <span>
        <label>当前值</label>
        {store.count}
      </span>
      <button onClick={() => store.increase()}>增加</button>
      <img src={Icon} />
    </div>
  );
});

export default MobxHooks;
