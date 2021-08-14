import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import type { RouteConfigComponentProps } from "react-router-config";
import { SearchInput } from "@/components/input";
import { ArrowLeftOutlined, ArrowRightOutlined, FullscreenOutlined, SettingOutlined, SkinOutlined, SyncOutlined } from "@ant-design/icons";

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
      <ArrowLeftOutlined title="后退" onClick={() => history.go(-1)} />
      <ArrowRightOutlined title="前进" onClick={() => history.go(-1)} />
      <SyncOutlined title="刷新" />
      <div style={{ flex: 1 }}>
        <SearchInput width={350} onPressEnter={onSearch} />
      </div>
      <SkinOutlined title="换肤" />
      <Link to="/setting">
        <SettingOutlined title="设置" />
      </Link>
      <FullscreenOutlined title="全屏" />
    </HeaderControlContainer>
  );
};

export default HeaderControl;
