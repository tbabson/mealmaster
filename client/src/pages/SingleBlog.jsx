import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBlog } from "../Features/Blog/blogSlice";
import Loading from "../components/Loading";
import BlogComments from "../components/BlogComments";
import { FaCalendarAlt, FaUser, FaFolder } from "react-icons/fa";
import { formatDate } from "../utils/formatDate";
import Wrapper from "../assets/wrappers/SingleBlog";

const SingleBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, blog } = useSelector((state) => state.blog);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        await dispatch(getSingleBlog(id)).unwrap();
        setFetchError(null);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setFetchError(error || "Failed to fetch blog");
      }
    };

    fetchBlog();
  }, [dispatch, id]); // Remove blog?._id dependency

  if (isLoading) {
    return <Loading />;
  }

  if (fetchError) {
    return (
      <Wrapper>
        <div className="error-container">
          <h2>Error</h2>
          <p>
            {typeof fetchError === "string"
              ? fetchError
              : "Failed to fetch blog"}
          </p>
        </div>
      </Wrapper>
    );
  }

  if (!blog) {
    return (
      <Wrapper>
        <div className="error-container">
          <h2>Blog Not Found</h2>
          <p>The blog post you're looking for could not be found.</p>
        </div>
      </Wrapper>
    );
  }

  const { title, content, featuredImage, author, category, createdAt } = blog;

  return (
    <Wrapper>
      <article className="blog-post">
        <header className="blog-header">
          <h1>{title}</h1>
          <div className="blog-meta">
            <span>
              <FaUser /> {author?.fullName}
            </span>
            <span>
              <FaCalendarAlt /> {formatDate(createdAt)}
            </span>
            <span>
              <FaFolder /> {category}
            </span>
          </div>
        </header>
        {featuredImage && (
          <div className="featured-image">
            <img src={featuredImage} alt={title} />
          </div>
        )}
        <div className="blog-content">
          <p>{content}</p>
        </div>
        <div className="comments-container">
          <BlogComments blogId={id} />
        </div>
      </article>
    </Wrapper>
  );
};

export default SingleBlog;
