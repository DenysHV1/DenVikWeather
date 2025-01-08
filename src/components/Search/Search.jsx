import s from './Search.module.css'
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { getWeatherByName } from "../../redux/operations";
import { getCityName } from "../../redux/weatherReducer";
import { TbCloudSearch } from 'react-icons/tb';

const Search = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    const city = values.city.trim();
    if (!city) {
      return;
    }

    dispatch(getWeatherByName(city));
    dispatch(getCityName(city));

    actions.resetForm();
  };

  return (
    <Formik initialValues={{ city: "" }} onSubmit={handleSubmit}>
      <Form className={s.form}>
        <Field name="city"  className={s.input}/>
        <button type="submit" className={s.button}><TbCloudSearch className={s.btn_svg}/></button>
      </Form>
    </Formik>
  );
};

export default Search;
