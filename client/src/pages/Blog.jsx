import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/BlogWrapper";
import { getAllBlogs, changePage } from "../Features/Blog/blogSlice";
import BlogCard from "../components/BlogCard";
import BlogFilters from "../components/BlogFilters";
import Loading from "../components/Loading";

const Blog = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    blogs = [],
    search,
    searchCategory,
    sort,
    page,
    numOfPages,
  } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch, search, searchCategory, sort, page]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <div className="blog-header">
        <h1>Blog Posts</h1>
      </div>

      <BlogFilters />

      <div className="blog-content">
        {blogs.length === 0 ? (
          <div className="no-blogs">
            <h2>No blog posts found</h2>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <div className="blog-grid">
              {blogs.map((blog) => (
                <div key={blog._id} className="blog-item">
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>

            {numOfPages > 1 && (
              <div className="pagination">
                {Array.from({ length: numOfPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`btn page-btn ${
                      page === index + 1 ? "active" : ""
                    }`}
                    onClick={() => dispatch(changePage(index + 1))}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default Blog;
