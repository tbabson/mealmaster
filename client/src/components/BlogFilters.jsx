import { useDispatch, useSelector } from "react-redux";
import { FormRow, FormRowSelect } from ".";
import { handleChange, clearFilters } from "../Features/Blog/blogSlice";
import Wrapper from "../assets/wrappers/BlogFilter";

const BlogFilters = () => {
  const dispatch = useDispatch();
  const { search, searchCategory, sort } = useSelector((store) => store.blog);

  const handleSearch = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className="search-filters">
        <FormRow
          type="text"
          name="search"
          value={search}
          handleChange={handleSearch}
          labelText="search blogs"
        />
        <FormRowSelect
          name="searchCategory"
          value={searchCategory}
          handleChange={handleSearch}
          list={[
            "all",
            "recipes",
            "nutrition",
            "cooking-tips",
            "health",
            "lifestyle",
            "other",
          ]}
          labelText="category"
        />
        <FormRowSelect
          name="sort"
          value={sort}
          handleChange={handleSearch}
          list={["newest", "oldest", "a-z", "z-a"]}
          labelText="sort by"
        />
        <button
          type="button"
          className="btn btn-block clear-btn"
          onClick={handleSubmit}
        >
          Clear Filters
        </button>
      </form>
    </Wrapper>
  );
};

export default BlogFilters;
