import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaFolder } from "react-icons/fa";
import { formatDate } from "../utils/formatDate";
import Wrapper from "../assets/wrappers/BlogCard";

const BlogCard = ({ blog }) => {
  const { _id, title, content, featuredImage, author, category, createdAt } =
    blog;

  return (
    <Wrapper>
      <img src={featuredImage} alt={title} className="blog-img" />
      <div className="blog-content">
        <header className="blog-header">
          <h3>{title}</h3>
        </header>
        <div className="blog-info">
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
        <p className="blog-text">{content}</p>
        <Link to={`/blogs/${_id}`} className="btn">
          Read More
        </Link>
      </div>
    </Wrapper>
  );
};

export default BlogCard;
