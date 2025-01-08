import { useDispatch, useSelector } from "react-redux";
import { selectDataStory } from "../../redux/selectors";
import { useState } from "react";
import { getWeatherByName } from "../../redux/operations";
import { getCityName } from "../../redux/weatherReducer";

const StoryList = () => {
  const [toggleStory, setToggleStory] = useState(false);
  const story = useSelector(selectDataStory);
  const dispatch = useDispatch();

  const handleShowStory = () => {
    setToggleStory((prev) => !prev);
  };

  const filteredStory = [...new Set(story)];

  const handlerGetWeatherByName = (city) => {
    dispatch(getWeatherByName(city));
    dispatch(getCityName(city));
  };

  return (
    <>
      <button onClick={handleShowStory}>Show story!</button>
      {toggleStory && (
        <ul>
          {filteredStory?.length ? (
            filteredStory.map((city, idx) => (
              <li key={idx}>
                <button onClick={() => handlerGetWeatherByName(city)}>
                  {city}
                </button>
              </li>
            ))
          ) : (
            <li>Story is Empty!</li>
          )}
        </ul>
      )}
    </>
  );
};

export default StoryList;
