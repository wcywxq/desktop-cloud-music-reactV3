import React, { useState } from "react";
import {
  AlignLeftOutlined,
  CaretRightOutlined,
  HeartOutlined,
  PauseOutlined,
  ShareAltOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  SoundOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";
import styled from "styled-components";
import { Slider, Space, Dropdown, Menu, Popover } from "antd";
import PlayListDrawer from "./PlayListDrawer";
import { observer, useLocalObservable } from "mobx-react-lite";
import store from "@/store";

const MusicPlayerContainer = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
`;

const MusicPlayerControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const MusicPlayerControlPrev = styled(StepBackwardOutlined)`
  color: #ff4d4f;
  font-size: 20px;
`;

const MusicPlayerControlNext = styled(StepForwardOutlined)`
  color: #ff4d4f;
  font-size: 20px;
`;

const MusicPlayerControlMain = styled.span`
  background-color: #ff4d4f;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;

  svg {
    color: #fff;
    font-size: 20px;
  }
`;

const MusicPlayerExtra = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  svg {
    color: #9b9b9b;
    font-size: 18px;
    cursor: pointer;
  }
`;

const MusicPlayerPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
`;

const MusicPlayerPoster = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background-color: #000;
`;

const MusicPlayerMessage = styled.div`
  width: 100%;
`;

const MusicPlayerInfoText = styled.span`
  display: inline-block;
  transform: scale(0.9);
  color: ${(props: { color?: string }) => props.color || "#333"};
  cursor: pointer;
`;

const MusicPlayerInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MusicPlayerProgress = styled(Slider)`
  margin: 0;
  flex: 1;
  height: ${(props: { height?: number }) => `${props.height}px`};

  .ant-slider-rail {
    background-color: #ddd;
  }

  .ant-slider-handle,
  .ant-slider-track {
    background-color: #ff4d4f;
  }

  .ant-slider-handle {
    border: none;
  }

  &:hover {
    .ant-slider-handle,
    .ant-slider-track {
      background-color: #ff4d4f;
    }
  }
`;

const MusicPlayer = observer(() => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { common } = useLocalObservable(() => store);

  return (
    <>
      <MusicPlayerContainer>
        <MusicPlayerControl>
          <MusicPlayerControlPrev />
          <MusicPlayerControlMain onClick={() => setIsPlaying(prevState => !prevState)}>
            {isPlaying ? <CaretRightOutlined /> : <PauseOutlined />}
          </MusicPlayerControlMain>
          <MusicPlayerControlNext />
        </MusicPlayerControl>
        <MusicPlayerExtra>
          <HeartOutlined />
          <ShareAltOutlined />
          <AlignLeftOutlined />
        </MusicPlayerExtra>
        <MusicPlayerPanel>
          <MusicPlayerPoster></MusicPlayerPoster>
          <MusicPlayerMessage>
            <MusicPlayerInfo>
              <Space>
                <MusicPlayerInfoText>一首想不通的古风</MusicPlayerInfoText>
                <MusicPlayerInfoText>张三/李四/王五</MusicPlayerInfoText>
              </Space>
              <MusicPlayerInfoText color="#9b9b9b">00:00 / 00:00</MusicPlayerInfoText>
            </MusicPlayerInfo>
            <MusicPlayerProgress defaultValue={30} />
          </MusicPlayerMessage>
        </MusicPlayerPanel>
        <MusicPlayerExtra>
          <Popover content={<MusicPlayerProgress defaultValue={30} vertical height={150} />} trigger="click">
            <SoundOutlined />
          </Popover>
          <Dropdown
            placement="topCenter"
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="3.0">3.0x</Menu.Item>
                <Menu.Item key="2.5">2.5x</Menu.Item>
                <Menu.Item key="2.0">2.0x</Menu.Item>
                <Menu.Item key="1.75">1.75x</Menu.Item>
                <Menu.Item key="1.5">1.5x</Menu.Item>
                <Menu.Item key="1.25">1.25x</Menu.Item>
                <Menu.Item key="1.0">1.0x</Menu.Item>
                <Menu.Item key="0.75">0.75x</Menu.Item>
              </Menu>
            }>
            <MusicPlayerInfoText color="#9b9b9b">倍速</MusicPlayerInfoText>
          </Dropdown>
          {common.visiblePlayList ? (
            <MenuFoldOutlined onClick={() => common.onShowPlayList()} />
          ) : (
            <MenuUnfoldOutlined onClick={() => common.onShowPlayList()} />
          )}
        </MusicPlayerExtra>
      </MusicPlayerContainer>
    </>
  );
});

export default MusicPlayer;
