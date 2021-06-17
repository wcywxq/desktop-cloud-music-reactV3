import React, { useEffect, useState } from 'react';
import { Row, Col, Avatar, Button, Space } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { RouteConfigComponentProps } from 'react-router-config';
import styled from 'styled-components';
import { PlayCount, Text, RaiseButton, IconFont } from '@/components/core';
import { transformDate } from '@/utils';
import { getSongDetail } from './api';

type Creator = {
  avatarUrl: string;
  nickname: string;
};

type ResponseDataType = {
  id: number;
  coverImgUrl: string;
  playCount: number;
  name: string;
  creator: Creator;
  createTime: Date;
  subscribedCount: number;
};

const Flex = styled(Row)`
  gap: 25px;
`;

const Image = styled(Avatar)`
  position: relative;
  border-radius: 10px;
`;

const SpaceContainer = styled(Space)`
  width: 100%;
`;

const MessageContainer = styled.div``;

const DetailSong: React.FC<RouteConfigComponentProps<{ id: string }>> = (props) => {
	const { match } = props;
	const [dataSet, setDataSet] = useState<ResponseDataType>();

	useEffect(() => {
		const fetchData = async (id: string) => {
			const { playlist }: { playlist: ResponseDataType } = await getSongDetail({ id: id });
			setDataSet(playlist);
		};
		fetchData(match.params.id);
	}, [match.params.id]);

	return (
    <>
      <MessageContainer>
        <Flex>
          <Col>
            <Image shape="square" size={190} src={dataSet?.coverImgUrl} />
            <PlayCount value={dataSet?.playCount || 0} />
          </Col>
          <Col flex={1}>
            <Space size="large" direction="vertical">
              <SpaceContainer>
                <Button danger size="small">
                  歌单
                </Button>
                <Text size={18} strong ellipsis active="#333" title={dataSet?.name}>
                  {dataSet?.name}
                </Text>
              </SpaceContainer>
              <SpaceContainer>
                <Avatar size="small" src={dataSet?.creator?.avatarUrl} />
                <Text size={13} strong color="#cc8e4b" title={dataSet?.creator?.nickname}>
                  {dataSet?.creator?.nickname}
                </Text>
                <Text size={13} color="#8c8c8c" title={`${transformDate(dataSet?.createTime)}创建`}>
                  {transformDate(dataSet?.createTime)}创建
                </Text>
              </SpaceContainer>
              <SpaceContainer>
                <RaiseButton color="#fff" background="#ff4d4f" icon={<IconFont type="icon-play" />}>
                  继续播放
                </RaiseButton>
                <RaiseButton color="#333" background="#f5f5f5" activebackground="#ddd" icon={<StarOutlined />}>
                  收藏({dataSet?.subscribedCount || 0})
                </RaiseButton>
                <RaiseButton color="#333" background="#f5f5f5" activebackground="#ddd">
                  ...
                </RaiseButton>
              </SpaceContainer>
            </Space>
          </Col>
        </Flex>
      </MessageContainer>
    </>
	);
};

export default DetailSong;
