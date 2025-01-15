import s from "./WeatherInfo.module.css";
import { useSelector } from "react-redux";
import {
  selectCityName,
  selectData,
  selectIsError,
  selectIsLoading,
} from "../../redux/selectors";
import Loader from "../Loader/Loader";
import { MdOutlineCloud } from "react-icons/md";
import { LiaCloudRainSolid, LiaCloudSunRainSolid } from "react-icons/lia";
import { BsCloudSnow } from "react-icons/bs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FiSun } from "react-icons/fi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { useState } from "react";

const WeatherInfo = () => {
  const info = useSelector(selectData);
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);
  const cityName = useSelector(selectCityName);

  const updatedCityName = `${cityName.slice(0, 1).toUpperCase()}${cityName
    .slice(1, 20)
    .toLowerCase()}`;

    const getCloudIcon = (rain, snowfall, cloud_cover, temp, time) => {
      if (snowfall > 0.1) {
        return <BsCloudSnow className={s.cloud} title="Snow" />;
      } else if (rain > 1) {
        return <LiaCloudRainSolid className={s.cloud} title="Rain" />;
      } else if (cloud_cover > 70) {
        return <MdOutlineCloud className={s.cloud} title="Cloudy" />;
      } else if (cloud_cover > 30) {
        return <TiWeatherPartlySunny className={s.cloud} title="Partly Cloudy" />;
      } else if (temp > 20 && time < 16) {
        return <FiSun className={s.sun} title="Sunny" />;
      } else {
        return <MdOutlineCloud className={s.cloud} title="Cloudy" />;
      }
    };

  console.log(info);

  const fixTime = (time) => {
    switch (Number(time)) {
      case 24:
        return "00";
      case 27:
        return "03";
      case 30:
        return "06";
      case 33:
        return "09";
      case 36:
        return "12";
      case 39:
        return "15";
      case 42:
        return "18";
      case 45:
        return "21";
      case 48:
        return "00";
      default:
        return "00";
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isError ? (
        <>
          <h1 className={s.title}>{updatedCityName}</h1>
          <Swiper
            className={s.list}
            cssMode={true}
            navigation={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Mousewheel, Keyboard]}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 1,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 1,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 1,
              },
              1440: {
                slidesPerView: 6,
                spaceBetween: 1,
              },
            }}
          >
            {info?.length > 0 ? (
              info.map(
                ({ time, temp, rain, snowfall, speed, cloud_cover }, idx) => (
                  <SwiperSlide key={`item${idx}`} className={s.listItem}>
                    <div className={s.icon}>
                      {getCloudIcon(rain, snowfall, cloud_cover, temp, time)}
                    </div>
                    <p className={s.time}>
                      {Number(time) > 23 ? `${fixTime(time)}:00` : `${time}:00`}
                    </p>
                    <p className={s.day}>
                      {Number(time) > 23 ? "Tomorrow" : "Today"}
                    </p>
                    <div className={s.infoBlock1}>
                      <p>Temperature: </p>
                      <p className={s.info_item}>{`${temp} ℃`}</p>
                    </div>
                    <div className={s.infoBlock2}>
                      <p>Wind speed: </p>
                      <p className={s.info_item}>{`${((speed * 1000) / 3600)
                        .toString()
                        .slice(0, 3)} m/c`}</p>
                    </div>
                  </SwiperSlide>
                )
              )
            ) : (
              <li>Sorry we don't have info about this city!</li>
            )}
          </Swiper>
        </>
      ) : (
        <p>{isError}</p>
      )}
    </>
  );
};

export default WeatherInfo;
