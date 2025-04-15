import styled from 'styled-components';

const Wrapper = styled.section`
  .blog-center {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    
    @media (min-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .blog-card {
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    transition: var(--transition);

    &:hover {
      box-shadow: var(--shadow-4);
      transform: translateY(-5px);
    }
  }

  .blog-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .blog-content {
    padding: 1rem;
  }

  .blog-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .blog-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.8rem;
    color: var(--text-secondary-color);
  }

  .blog-text {
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .single-blog {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
  }

  .single-blog-img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: var(--border-radius);
    margin-bottom: 2rem;
  }

  .comments-section {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--grey-100);
  }

  .comment {
    background: var(--background-color);
    padding: 1rem;
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .comment-author {
    font-weight: 600;
  }

  .comment-date {
    color: var(--text-secondary-color);
  }

  .comment-form {
    margin-top: 2rem;
  }

  .search-filters {
    margin-bottom: 2rem;
    display: grid;
    gap: 1rem;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default Wrapper;