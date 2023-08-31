import styles from "./Place.module.scss";
import Title from "../../components/Title/Title";
import MapLink from "../../components/MapLink/MapLink";
import Button from "../../components/Button/Button";
import MainImage from "../../components/MainImage/MainImage";
import Map from "../../components/Map/Map";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "react-modal";
import axiosRequest from "../../api";
import { AxiosResponse } from "axios";

interface IResponse {
  data: IData;
}

interface IData {
  place: MainImageItem;
}

interface MainImageItem {
  id: number;
  mainImage: string;
  detailImage: string;
  placeName: string;
  placeLikeCount: number;
  price: number; // 가격
}

export default function Place() {
  const params = useParams();
  const placeId = Number(params.placeId);
  const [imageInfo, setImageInfo] = useState<IData | null>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const openMapModal = () => {
    setIsMapModalOpen(true);
  };

  const closeMapModal = () => {
    setIsMapModalOpen(false);
  };

  useEffect(() => {
    const fetchPlaceInfo = async () => {
      try {
        console.log(placeId);
        const response = await axiosRequest.requestAxios<IResponse>(
          "get",
          `/places/${placeId}`
        );

        setImageInfo(response.data);
      } catch (error) {
        console.error("Error fetching place info:", error);
      }
    };

    fetchPlaceInfo();
  }, []);

  return (
    <>
      <div className={styles.subImage}>
        <img
          src={
            "https://cdn.pixabay.com/photo/2019/07/25/17/09/camp-4363073_1280.png"
          }
          alt="Sub Image"
        />
      </div>
      <div className={styles.subBox}>
        <div className={styles.subLeft}>
          <div className={styles.subTitle}>
            {imageInfo?.placeName}
            <button onClick={openMapModal}>
              <MapLink />
            </button>
          </div>
          <Title size="p" className={styles.subInfo}>
            인근 골프장, 식료품점/편의점, 테라스 등을 오라카이 송도파크 호텔에서
            이용해 보세요.
            <br />
            휴식 및 재충전을 위해 사우나에서 시간을 보내보세요.
            <br />
            시설 내 커피숍인 illy CAFFE에서 브런치, 가벼운 식사도 즐기실 수
            있습니다.
            <br />
            모든 고객은 객실 내 무료 WiFi, 커피숍/카페, 드라이클리닝/세탁 서비스
            등을 이용하실 수 있습니다.
          </Title>
          <div className={styles.subPlaces}>
            <Title size="h5">서울특별시</Title>
            <Title size="h5" className={styles.price}>
              {imageInfo?.price}
            </Title>
          </div>
          <div className={styles.btnBox}>
            <Button onClick={() => {}}>예약하기</Button>
            <Button onClick={() => {}}>후기 / 질문남기기</Button>
          </div>
        </div>
        <div className={styles.subRight}>
          <div className={styles.subImage}>
            <img
              src={
                "https://yaimg.yanolja.com/v5/2022/08/22/19/1280/6303d23b1e8ef8.15385382.png"
              }
              alt="Sub Image"
            />
          </div>
        </div>
      </div>
      <div className={styles.subImage}>
        <img
          src={
            "https://yaimg.yanolja.com/v5/2022/10/17/15/1280/634d7563600ed4.17945107.jpg"
          }
          alt="Sub Image"
        />
      </div>
      <Modal
        isOpen={isMapModalOpen}
        onRequestClose={closeMapModal}
        contentLabel="지도 팝업"
        className={styles.mapModal}
        overlayClassName={styles.mapOverlay}
        style={{
          content: {
            width: "1400px",
            height: "600px",
            left: "50%", // Move it to the horizontal center
            top: "50%", // Move it to the horizontal center
            transform: "translate(-50%, -50%)", // Center it precisely
          },
        }}
      >
        {/* 팝업 내용 */}
        <Map onClose={closeMapModal} />
      </Modal>
    </>
  );
}
