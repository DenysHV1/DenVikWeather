import s from './StoryList.module.css';

import { useDispatch, useSelector } from "react-redux";
import { selectDataStory } from "../../redux/selectors";
import { useState } from "react";
import { getWeatherByName } from "../../redux/operations";
import { getCityName } from "../../redux/weatherReducer";
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';

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
      <button onClick={handleShowStory} className={s.show_btn}>Show story! {toggleStory ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}</button>
      {toggleStory && (
        <ul className={s.list}>
          {filteredStory?.length ? (
            filteredStory.map((city, idx) => (
              <li key={idx}>
                <button onClick={() => handlerGetWeatherByName(city)} className={s.list_btn}>
                  {city}
                </button>
              </li>
            ))
          ) : (
            <li className={s.empty}>Story is Empty!</li>
          )}
        </ul>
      )}
    </>
  );
};

export default StoryList;
