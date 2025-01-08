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

const WeatherInfo = () => {
  const info = useSelector(selectData);
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);
  const cityName = useSelector(selectCityName);
  console.log(info);

  const selectCloud = (rain, snowfall) => {
    if (rain > snowfall && rain > 2.4) {
      return <LiaCloudRainSolid />;
    } else if (snowfall > rain && snowfall > 2.4) {
      return <BsCloudSnow />;
    } else {
      return <MdOutlineCloud />;
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isError ? (
        <>
          <h1>{cityName}</h1>
          <ul>
            {info?.length > 0 ? (
              info.map(({ time, temp, rain, snowfall, speed }, idx) => (
                <li key={`item${idx}`}>
                  {selectCloud(rain, snowfall)}
                  <p>{time}</p>
                  <p>{`${temp} ℃`}</p>
				  <div>
					<p>Wind speed: </p>
					<p>{`${speed} m/c`}</p>
				  </div>
                </li>
              ))
            ) : (
              <li>Sorry we don't have info about this city!</li>
            )}
          </ul>
        </>
      ) : (
        <p>{isError}</p>
      )}
    </>
  );
};

export default WeatherInfo;
