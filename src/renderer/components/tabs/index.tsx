export { default as Tabs } from "./Tabs";

export interface TabPaneStruct {
  key: string;
  title: string;
  component: React.FC;
}
