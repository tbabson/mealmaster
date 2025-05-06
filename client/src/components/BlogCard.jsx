import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaFolder } from "react-icons/fa";
import { formatDate } from "../utils/formatDate";
import Wrapper from "../assets/wrappers/BlogCard";
import DOMPurify from "dompurify";

const BlogCard = ({ blog }) => {
  const { _id, title, content, featuredImage, author, category, createdAt } =
    blog;

  // Create a temporary div to strip HTML tags for preview
  const stripHtml = (html) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  // Get first 200 characters of text content for preview and sanitize
  const contentPreview = stripHtml(content).substring(0, 200) + "...";

  // Sanitize content for safe rendering
  const sanitizedContent = DOMPurify.sanitize(contentPreview);

  return (
    <Wrapper>
      {featuredImage && (
        <img src={featuredImage} alt={title} className="blog-img" />
      )}
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
        <div
          className="blog-text"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        <Link to={`/blogs/${_id}`} className="btn">
          Read More
        </Link>
      </div>
    </Wrapper>
  );
};

export default BlogCard;
