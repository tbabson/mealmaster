import { FormRowSelect, FormRow, SubmitBtn, SectionTitle } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { Form, useSubmit, Link } from "react-router-dom";
import { MEAL, DIETARY, SORT } from "../../../utils/constants";
import { useAllMealsContext } from "../pages/Meals";

const SearchContainer = () => {
  const { searchValues } = useAllMealsContext();
  const {
    name = "",
    country = "",
    mealType = "All",
    dietary = "All",
    sort = "newest",
  } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  // Function to reset the form to default values
  const resetForm = (e) => {
    e.preventDefault(); // Prevent the default link behavior
    const form = e.currentTarget.closest("form"); // Get the form element
    if (form) {
      form.reset(); // Reset the form fields to their default values
      submit(form); // Submit the form to update the URL and refetch data
    }
  };

  return (
    <Wrapper>
      <section className="section">
        <Form className="form" action="/meals">
          <SectionTitle
            title="Search for various meals"
            description="Discover the amazing features of Meal Master"
          />
          <div className="formCenter">
            <FormRow
              className="formRow-input"
              type="name"
              name="name"
              defaultValue={name}
              onChange={debounce((form) => {
                submit(form);
              })}
            />
            <FormRow
              className="formRow-input"
              type="country"
              name="country"
              defaultValue={country}
              onChange={debounce((form) => {
                submit(form);
              })}
            />
            <FormRowSelect
              labelText="meal"
              name="mealType"
              list={["all", ...Object.values(MEAL)]}
              defaultValue={mealType}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
            />
            <FormRowSelect
              labelText="dietary"
              name="dietary"
              list={["all", ...Object.values(DIETARY)]}
              defaultValue={dietary}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
            />
            <FormRowSelect
              labelText="Sort"
              name="sort"
              list={[...Object.values(SORT)]}
              defaultValue={sort}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
            />
            <Link to="/meals" className="btn form-btn delete-btn">
              Reset Search
            </Link>
          </div>
        </Form>
      </section>
    </Wrapper>
  );
};

export default SearchContainer;
