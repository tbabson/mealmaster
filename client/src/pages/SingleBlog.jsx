// Frontend: SingleBlog.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, Link } from "react-router-dom";
import { getSingleBlog } from "../Features/Blog/blogSlice";
import {
  Loading,
  BlogComments,
  SocialShare,
  RelatedArticles,
  BlogSchema,
  BreadcrumbSchema,
} from "../components";
import {
  FaCalendarAlt,
  FaUser,
  FaFolder,
  FaChevronRight,
} from "react-icons/fa";
import { formatDate } from "../utils/formatDate";
import Wrapper from "../assets/wrappers/SingleBlog";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";

const SingleBlog = () => {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, blog, relatedArticles } = useSelector(
    (state) => state.blog
  );
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
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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

  const {
    title,
    slug,
    content,
    featuredImage,
    author,
    category,
    createdAt,
    metaTitle,
    metaDescription,
    keywords,
    featuredImageAlt,
    tags,
  } = blog;
  const sanitizedContent = DOMPurify.sanitize(content);
  const currentUrl = window.location.href;

  const breadcrumbItems = [
    { path: "/", label: "Home" },
    { path: "/blog", label: "Blog" },
    { path: `/blog/${id}`, label: title },
  ];

  return (
    <>
      <Helmet>
        <title>{metaTitle || title}</title>
        <meta
          name="description"
          content={metaDescription || content.substring(0, 160)}
        />
        {keywords?.length > 0 && (
          <meta name="keywords" content={keywords.join(", ")} />
        )}
        <meta property="og:title" content={metaTitle || title} />
        <meta
          property="og:description"
          content={metaDescription || content.substring(0, 160)}
        />
        {featuredImage && <meta property="og:image" content={featuredImage} />}
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle || title} />
        <meta
          name="twitter:description"
          content={metaDescription || content.substring(0, 160)}
        />
        {featuredImage && <meta name="twitter:image" content={featuredImage} />}
        <link rel="canonical" href={currentUrl} />
      </Helmet>

      <BlogSchema blog={blog} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Wrapper>
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <FaChevronRight />
          <Link to="/blog">Blog</Link>
          <FaChevronRight />
          <span>{title}</span>
        </div>

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
              <img src={featuredImage} alt={featuredImageAlt || title} />
            </div>
          )}

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          <SocialShare url={currentUrl} title={title} />

          {relatedArticles && relatedArticles.length > 0 && (
            <RelatedArticles articles={relatedArticles} />
          )}

          <div className="comments-container">
            <BlogComments blogId={id} />
          </div>
        </article>
      </Wrapper>
    </>
  );
};

export default SingleBlog;
