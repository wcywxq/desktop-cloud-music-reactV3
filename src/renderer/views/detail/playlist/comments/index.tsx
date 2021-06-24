import React, { useEffect, useState } from "react";
import { Space, Row, Col, Divider, Pagination, Card } from "antd";
import { DownOutlined, LikeOutlined, MessageOutlined, ShareAltOutlined, UpOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Text } from "@/components/text";
import type { PlaylistDataType, CommentsDataType } from "../typeing";
import { getPlaylistComments } from "../api";
import Reply from "../components/Reply";

type IconTextType = {
  icon: React.FC;
  text?: string | number;
};

const IconText = ({ icon, text }: IconTextType) => (
  <Text color="#9b9b9b">
    <Space size="small">
      {React.createElement(icon)}
      {text}
    </Space>
  </Text>
);

const Comments: React.FC<PlaylistDataType> = props => {
  const { data } = props;
  const [commentsData, setCommentsData] = useState<CommentsDataType[]>([]);
  const [hotCommentsData, setHotCommentsData] = useState<CommentsDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 当前页码
  const [current, setCurrent] = useState<number>(1);
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
          comments: CommentsDataType[];
          hotComments: CommentsDataType[];
          total: number;
        } = await getPlaylistComments({ id });
        setCommentsData(comments);
        setHotCommentsData(hotComments);
        setTotalCount(total);
      } catch (err) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    };

    if (data) {
      const { id } = data;
      fetchData(id.toString());
    }
  }, [data]);

  const onVisibleChange = (id: number) => {
    const newData = [...commentsData];
    const target = newData.find(item => item.commentId === id);
    if (target) {
      target.visible = !target.visible;
      setCommentsData(newData);
    }
  };

  return (
    <Card bordered={false} loading={loading} bodyStyle={{ padding: 0 }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Reply
          dataSource={commentsData}
          renderItem={item => (
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
                    {item.visible ? <>收起{item.beReplied.length}条回复</> : <>展开{item.beReplied.length}条回复</>}
                    <Text size={10} color="#1890ff" active="#1890ff">
                      {item.visible ? <UpOutlined /> : <DownOutlined />}
                    </Text>
                  </Text>
                  {item.visible && (
                    <Reply
                      style={{ background: "#f5f5f5", borderRadius: "20px" }}
                      dataSource={item.beReplied}
                      renderItem={child => (
                        <Text active="#333" cursor="auto">
                          {child.content}
                        </Text>
                      )}
                    />
                  )}
                </>
              )}
            </Space>
          )}
        />
        {totalCount > 0 && (
          <Row justify="center">
            <Pagination showQuickJumper showSizeChanger={false} pageSize={20} current={current} total={totalCount} />
          </Row>
        )}
      </Space>
    </Card>
  );
};

export default Comments;
