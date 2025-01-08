import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { getWeatherByName } from "../../redux/operations";
import { getCityName } from "../../redux/weatherReducer";

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
      <Form>
        <Field name="city" />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
};

export default Search;
