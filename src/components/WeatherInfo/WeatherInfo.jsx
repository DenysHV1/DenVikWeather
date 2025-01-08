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
import { LiaCloudRainSolid } from "react-icons/lia";
import { BsCloudSnow } from "react-icons/bs";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const WeatherInfo = () => {
  const info = useSelector(selectData);
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);
  const cityName = useSelector(selectCityName);
  console.log(info);

  const updatedCityName = `${cityName.charAt().toUpperCase()}${cityName
    .slice(1, 20)
    .toLowerCase()}`;

  const selectCloud = (rain, snowfall) => {
    if (rain > snowfall && rain > 2.4) {
      return <LiaCloudRainSolid className={s.cloud} />;
    } else if (snowfall > rain && snowfall > 2.4) {
      return <BsCloudSnow className={s.cloud} />;
    } else {
      return <MdOutlineCloud className={s.cloud} />;
    }
  };

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
        return "00"
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
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {info?.length > 0 ? (
              info.map(({ time, temp, rain, snowfall, speed }, idx) => (
                <SwiperSlide key={`item${idx}`} className={s.listItem}>
                  {selectCloud(rain, snowfall)}
                  <p className={s.time}>{Number(time) > 23 ? `${fixTime(time)}:00`: `${time}:00`}</p>
                  <p className={s.day}>{Number(time) > 23 ? "Tomorrow" : "Today"}</p>
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
              ))
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
