import React, { useState } from "react";
import { HeartOutlined, StepBackwardOutlined, StepForwardOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Slider, Space, Dropdown, Menu, Popover } from "antd";
import { observer, useLocalObservable } from "mobx-react-lite";
import store from "@/store";
import { IconFont } from "./icon";

type FlexLayoutProps = {
  align?: "start" | "end" | "center" | "space-between";
  justify?: "start" | "end" | "center" | "space-between";
};

const Container = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
`;

const Control = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Prev = styled(StepBackwardOutlined)`
  color: #ff4d4f;
  font-size: 20px;
`;

const Next = styled(StepForwardOutlined)`
  color: #ff4d4f;
  font-size: 20px;
`;

const Extra = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  svg {
    font-size: 18px;
    cursor: pointer;
  }
`;

const FlexLayout = styled.div`
  display: flex;
  align-items: ${(props: FlexLayoutProps) => props.align || "center"};
  justify-content: ${(props: FlexLayoutProps) => props.justify || "center"};
`;

const Panel = styled(FlexLayout)`
  flex: 1;
  gap: 15px;
`;

const Poster = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background-color: #000;
`;

const Message = styled.div`
  width: 100%;
`;

const InfoText = styled.span`
  display: inline-block;
  transform: scale(0.9);
  color: ${(props: { color?: string }) => props.color || "#333"};
  cursor: pointer;
`;

const Progress = styled(Slider)`
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
  const [volumeStatus, setVolumeStatus] = useState<boolean>(false);
  const [volumeValue, setVolumeValue] = useState<number | [number, number]>(75);

  const { common } = useLocalObservable(() => store);

  const onChangeVolumeStatus = () => {
    // 改变声音状态
    setVolumeStatus(prevState => !prevState);
    // 改变声音数值
    setVolumeValue(volumeStatus ? 75 : 0);
  };

  return (
    <Container>
      <Control>
        <Prev />
        <IconFont type={isPlaying ? "icon-music_pause" : "icon-music_play"} style={{ fontSize: "42px", cursor: "pointer" }} onClick={() => setIsPlaying(prevState => !prevState)} />
        <Next />
      </Control>
      <Extra>
        <HeartOutlined title="喜欢" />
        <IconFont type="icon-send" title="分享" />
        <IconFont type="icon-loop" title="循环播放" />
      </Extra>
      <Panel align="center" justify="space-between">
        <Poster />
        <Message>
          <FlexLayout align="center" justify="space-between">
            <Space>
              <InfoText>一首想不通的古风</InfoText>
              <InfoText>张三/李四/王五</InfoText>
            </Space>
            <InfoText color="#9b9b9b">00:00 / 00:00</InfoText>
          </FlexLayout>
          <Progress defaultValue={30} />
        </Message>
      </Panel>
      <Extra>
        <Popover content={<Progress value={volumeValue} vertical height={150} onChange={(value: number | [number, number]) => setVolumeValue(value)} />}>
          <IconFont type={volumeStatus ? "icon-close_volume" : "icon-volume"} title={volumeStatus ? "恢复音量" : "静音"} onClick={() => onChangeVolumeStatus()} />
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
          <InfoText>倍速</InfoText>
        </Dropdown>
        {common.visiblePlayList ? <MenuFoldOutlined onClick={() => common.onShowPlayList()} /> : <MenuUnfoldOutlined onClick={() => common.onShowPlayList()} />}
      </Extra>
    </Container>
  );
});

export default MusicPlayer;
