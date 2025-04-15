import { useDispatch, useSelector } from "react-redux";
import { FormRow, FormRowSelect } from ".";
import { handleChange, clearFilters } from "../Features/Blog/blogSlice";

const BlogFilters = () => {
  const dispatch = useDispatch();
  const { search, searchStatus, searchCategory, sort } = useSelector(
    (store) => store.blog
  );

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
    <form className="search-filters">
      <FormRow
        type="text"
        name="search"
        value={search}
        handleChange={handleSearch}
      />
      <FormRowSelect
        name="searchStatus"
        value={searchStatus}
        handleChange={handleSearch}
        list={["all", "draft", "published"]}
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
      />
      <FormRowSelect
        name="sort"
        value={sort}
        handleChange={handleSearch}
        list={["newest", "oldest", "a-z", "z-a"]}
      />
      <button type="button" className="btn btn-block" onClick={handleSubmit}>
        Clear Filters
      </button>
    </form>
  );
};

export default BlogFilters;
