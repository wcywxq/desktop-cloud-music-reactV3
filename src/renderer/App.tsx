import React from "react";
import MobxClass from "@/components/MobxClass";
import MobxHooks from "@/components/MobxHooks";

const App: React.FC = () => (
  <React.Fragment>
    <h3>mobx + class</h3>
    <MobxClass />
    <hr />
    <h3>mobx + hooks</h3>
    <MobxHooks />
    <hr />
  </React.Fragment>
);

export default App;
