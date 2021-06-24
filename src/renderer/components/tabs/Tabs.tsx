import styled from "styled-components";
import { Tabs as TabControl } from "antd";

const Tabs = styled(TabControl)`
  .ant-tabs-ink-bar {
    background: transparent;
  }

  .ant-tabs-nav {
    &:before {
      border-bottom: none;
    }
  }
`;

export default Tabs;
