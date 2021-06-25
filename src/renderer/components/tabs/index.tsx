export { default as Tabs } from "./Tabs";

export interface TabPaneStruct<T> {
  key: string;
  title: string;
  component: React.FC<T>;
}
