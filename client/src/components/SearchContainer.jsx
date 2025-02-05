import { FormRowSelect, SubmitBtn, SectionTitle } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { Form, useSubmit, Link } from "react-router-dom";
import { MEAL, CUISINE, DIETARY, SORT_BY } from "../../../utils/constants";
import { useAllMealsContext } from "../pages/Meals";

const SearchContainer = () => {
  const { searchValues } = useAllMealsContext();
  const {
    meal = "all" | "Breakfast",
    cuisine = "all" | "Nigeria",
    dietary = "all" | "none",
    sort_by = "newest",
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

  return (
    <Wrapper>
      <section className="section">
        <Form className="form">
          <SectionTitle
            title="Search for various meals"
            description="Discover the amazing features of Meal Master"
          />
          <div className="form-row">
            <FormRowSelect
              labelText="meal"
              name="meal"
              list={["all", ...Object.values(MEAL)]}
              defaultValue={meal}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
            />
          </div>
          <div className="form-row">
            <FormRowSelect
              labelText="cuisine"
              name="cuisine"
              list={["all", ...Object.values(CUISINE)]}
              defaultValue={cuisine}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
            />
          </div>
          <div className="form-row">
            <FormRowSelect
              labelText="dietary"
              name="dietary"
              list={["all", ...Object.values(DIETARY)]}
              defaultValue={dietary}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
            />
          </div>
          <div className="form-row">
            <FormRowSelect
              labelText="Sort"
              name="sort_by"
              list={[...Object.values(SORT_BY)]}
              defaultValue={sort_by}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
            />
          </div>
          <Link to="/meals" className="btn form-btn delete-btn">
            Reset Search
          </Link>
        </Form>
      </section>
    </Wrapper>
  );
};

export default SearchContainer;
