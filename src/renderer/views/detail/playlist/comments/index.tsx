import React, { useEffect, useState } from "react";
import { Space, Row, Col, Card, Divider, Pagination, List, Avatar, Skeleton } from "antd";
import { DownOutlined, LikeOutlined, MessageOutlined, ShareAltOutlined, UpOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Text } from "@/components/text";
import { IconText } from "@/components/icon";
import type { DetailStateType } from "@/typings";
import { getPlaylistComments } from "../api";

interface CommentsStateType {
  commentId: number;
  user: {
    avatarUrl: string;
    nickname: string;
  };
  content: string;
  beReplied: CommentsStateType[];
  visible: boolean;
  time?: Date;
  liked?: boolean;
  likedCount?: number;
}

interface IProps {
  loading?: boolean;
  state?: DetailStateType;
  children?: React.ReactNode;
}

const Comments: React.FC<IProps> = props => {
  const { state } = props;
  const [commentsData, setCommentsData] = useState<CommentsStateType[]>([]);
  const [hotCommentsData, setHotCommentsData] = useState<CommentsStateType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 当前页码
  const [pageNum, setPageNum] = useState<number>(1);
  // 每页条数
  const [pageSize, setPageSize] = useState<number>(50);
  // 总数量
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async (id: string) => {
      setLoading(true);
      try {
        const {
          comments,
          hotComments,
          total
        }: {
          comments: CommentsStateType[];
          hotComments: CommentsStateType[];
          total: number;
        } = await getPlaylistComments({
          id,
          limit: pageSize,
          offset: (pageNum - 1) * pageSize
        });
        setCommentsData(comments);
        setHotCommentsData(hotComments);
        setTotalCount(total);
      } catch (err) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    };

    if (state) {
      const { id } = state;
      if (id) {
        fetchData(id.toString());
      }
    }
  }, [state, pageNum, pageSize]);

  const onVisibleChange = (id: number) => {
    const newData = [...commentsData];
    const target = newData.find(item => item.commentId === id);
    if (target) {
      target.visible = !target.visible;
      setCommentsData(newData);
    }
  };

  const handleCurrentChange = (pageNum: number, pageSize?: number) => {
    setPageNum(pageNum);
    pageSize !== undefined && setPageSize(pageSize);
  };

  const handleSizeChange = (pageNum: number, pageSize: number) => {
    setPageNum(pageNum);
    setPageSize(pageSize);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <List
        loading={loading}
        dataSource={commentsData}
        pagination={{
          position: "bottom",
          size: "small",
          hideOnSinglePage: true,
          total: totalCount,
          pageSizeOptions: ["50"],
          showSizeChanger: false,
          current: pageNum,
          pageSize,
          onChange: handleCurrentChange,
          onShowSizeChange: handleSizeChange
        }}
        renderItem={item => (
          <List.Item>
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                style={{ marginBottom: 0 }}
                avatar={<Avatar src={item.user.avatarUrl} />}
                title={
                  <Text strong color="#cc8c4b">
                    {item.user.nickname}
                  </Text>
                }
                description={
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Text active="#333" cursor="auto">
                      {item.content}
                    </Text>
                    <Row justify="space-between">
                      <Text color="#9b9b9b" active="#9b9b9b" cursor="auto">
                        {dayjs(item.time).format("YYYY-MM-DD HH:mm:ss")}
                      </Text>
                      <Space size={4} split={<Divider type="vertical" />}>
                        <IconText icon={LikeOutlined} text={item.likedCount} />
                        <IconText icon={ShareAltOutlined} />
                        <IconText icon={MessageOutlined} />
                      </Space>
                    </Row>
                    {item.beReplied.length > 0 && (
                      <>
                        <Text
                          color="#1890ff"
                          active="#1890ff"
                          style={{ width: "100%" }}
                          onClick={() => onVisibleChange(item.commentId)}>
                          {item.visible ? (
                            <>收起{item.beReplied.length}条回复</>
                          ) : (
                            <>展开{item.beReplied.length}条回复</>
                          )}
                          <Text size={10} color="#1890ff" active="#1890ff">
                            {item.visible ? <UpOutlined /> : <DownOutlined />}
                          </Text>
                        </Text>
                        {item.visible && (
                          <List
                            loading={loading}
                            dataSource={item.beReplied}
                            renderItem={child => (
                              <Card bodyStyle={{ background: "#f5f5f5", padding: "0 12px" }}>
                                <List.Item>
                                  <List.Item.Meta
                                    style={{ marginBottom: 0 }}
                                    avatar={<Avatar src={item.user.avatarUrl} />}
                                    title={
                                      <Text strong color="#cc8c4b">
                                        {item.user.nickname}
                                      </Text>
                                    }
                                    description={
                                      <Text active="#333" cursor="auto">
                                        {child.content}
                                      </Text>
                                    }
                                  />
                                </List.Item>
                              </Card>
                            )}
                          />
                        )}
                      </>
                    )}
                  </Space>
                }
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </Space>
  );
};

export default Comments;
