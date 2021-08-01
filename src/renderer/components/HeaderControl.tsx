import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import type { RouteConfigComponentProps } from "react-router-config";
import { SearchInput } from "@/components/input";
import { IconFont } from "./icon";

const HeaderControlContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 20px;

  svg {
    font-size: 16px;
    cursor: pointer;
    color: #9b9b9b;
  }
`;

const HeaderControl: React.FC<RouteConfigComponentProps> = ({ history }) => {
  const onSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    history.push(`/search/single?keywords=${(event.target as any).value}`);
  };

  return (
    <HeaderControlContainer>
      <IconFont type="icon-arrow-left" title="后退" onClick={() => history.go(-1)} />
      <IconFont type="icon-arrow-right" title="前进" onClick={() => history.go(1)} />
      <IconFont type="icon-refresh" title="刷新" />
      <div style={{ flex: 1 }}>
        <SearchInput width={350} onPressEnter={onSearch} />
      </div>
      <IconFont type="icon-shirt" title="换肤" />
      <Link to="/setting">
        <IconFont type="icon-setting" title="设置" />
      </Link>
      <IconFont type="icon-screen-on" title="全屏" />
    </HeaderControlContainer>
  );
};

export default HeaderControl;
