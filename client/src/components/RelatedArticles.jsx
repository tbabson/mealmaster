import { Link } from "react-router-dom";
import styled from "styled-components";

const RelatedArticlesWrapper = styled.section`
  margin: 3rem 0;
  padding: 2rem;
  background: var(--grey-50);
  border-radius: var(--border-radius);

  h2 {
    font-size: 1.5rem;
    color: var(--text-color);
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .article-card {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-1);
    overflow: hidden;
    transition: var(--transition);

    &:hover {
      box-shadow: var(--shadow-3);
      transform: translateY(-2px);
    }

    img {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }

    .article-content {
      padding: 1rem;

      h3 {
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
        color: var(--text-color);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .article-meta {
        font-size: 0.9rem;
        color: var(--text-secondary-color);
      }
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .articles-grid {
      grid-template-columns: 1fr;
    }
  }
`;

const RelatedArticles = ({ articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <RelatedArticlesWrapper>
      <h2>Related Articles</h2>
      <div className="articles-grid">
        {articles.map((article) => (
          <Link
            key={article._id}
            to={`/blog/${article._id}`}
            className="article-card"
          >
            {article.featuredImage && (
              <img
                src={article.featuredImage}
                alt={article.featuredImageAlt || article.title}
              />
            )}
            <div className="article-content">
              <h3>{article.title}</h3>
              <p className="article-meta">
                {article.author?.fullName} · {article.category}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </RelatedArticlesWrapper>
  );
};

export default RelatedArticles;
