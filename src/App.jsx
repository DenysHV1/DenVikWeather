import { useDispatch } from "react-redux";
import Search from "./components/Search/Search";
import getCityNameByAddress from "./redux/getCityName/getCityNameByAddress";
import { getCityName } from "./redux/weatherReducer";
import { useEffect } from "react";
import { getWeatherByCoordinates } from "./redux/operations";
import geolocationError from "./redux/getCityName/geolocationError";
import StoryList from "./components/StoryList/StoryList";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(
        getWeatherByCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      );
      getCityNameByAddress(
        position.coords.latitude,
        position.coords.longitude
      ).then((name) => dispatch(getCityName(name)));
    }, geolocationError);
  }, [dispatch]);

  return (
    <div className="container">
      <Search />
      <WeatherInfo/>
      <StoryList/>
    </div>
  );
}

export default App;
