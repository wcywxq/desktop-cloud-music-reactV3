import React, { useState, useEffect } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Space } from "antd";
import styled from "styled-components";
import { PlayCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PlayCount } from "@/components/core";
import { Text } from "@/components/text";
import { getBanners, getRecommendPlaylist } from "./api";

import "swiper/swiper.less";
import "swiper/components/navigation/navigation.less";
import "swiper/components/pagination/pagination.less";

SwiperCore.use([Navigation, Pagination]);

const BannerSheet = styled.img`
  display: block;
  width: 520px;
  height: auto;
  border-radius: 20px;
`;

const GridContainer = styled.div`
  /* width: 1000px; */
  margin: 0 auto;
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  gap: 20px;
`;

const GridTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
`;

const PieceAlbum = styled.div`
  position: relative;

  img {
    width: 100%;
    height: auto;
    border-radius: 20px;
  }

  &:hover {
    .album-mask {
      opacity: 1;
      background-color: rgba(30, 30, 34, 0.38);

      svg {
        transform: scale(0.9);
        opacity: 1;
      }
    }
  }
`;

const PieceMask = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 20px;
  opacity: 0;
  cursor: pointer;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 46px;
    opacity: 0;
    margin: -23px 0 0 -23px;
    color: #fff;
    background: #333;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
    transform: scale(0);
  }
`;

const Discovery: React.FC = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [recommendPlaylist, setRecommendPlaylist] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [respBanners, respRecommendPlayList] = await Promise.all([getBanners(), getRecommendPlaylist()]);
        setBanners(respBanners.banners || []);
        setRecommendPlaylist(respRecommendPlayList.result || []);
      } catch (err) {
        throw new Error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Swiper
        loop
        navigation
        pagination={{ clickable: true }}
        onSwiper={swiper => {
          console.log(swiper);
        }}>
        {banners.map((banner, index) => (
          <SwiperSlide
            key={`${banner.targetId}${index}`}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
            <BannerSheet src={banner.imageUrl} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* 编辑精选 */}
      <GridContainer>
        <GridTitle>编辑精选</GridTitle>
        <GridLayout>
          {recommendPlaylist.map(item => (
            <Link key={item.id} to={`/detail/playlist/songs?id=${item.id}`}>
              <Space direction="vertical" size="small">
                <PieceAlbum>
                  <img src={item.picUrl} alt="" />
                  <PlayCount value={item.playCount} />
                  <PieceMask className="album-mask">
                    <PlayCircleFilled />
                  </PieceMask>
                </PieceAlbum>
                <Text strong ellipsis title={item.name}>
                  {item.name}
                </Text>
                <Text color="#8c8c8c" ellipsis size={13} title={item.copywriter}>
                  {item.copywriter}
                </Text>
              </Space>
            </Link>
          ))}
        </GridLayout>
      </GridContainer>
    </>
  );
};

export default Discovery;
