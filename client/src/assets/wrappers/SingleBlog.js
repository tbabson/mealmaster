import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 2rem var(--fluid-padding);
  max-width: var(--max-width);
  margin: 0 auto;

  .blog-post {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    overflow: hidden;
  }

  .blog-header {
    padding: 2rem;
    text-align: center;
    border-bottom: 1px solid var(--grey-100);

    h1 {
      font-size: 2.5rem;
      color: var(--text-color);
      margin-bottom: 1.5rem;
    }
  }

  .blog-meta {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    color: var(--text-secondary-color);

    span {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      svg {
        color: var(--primary-500);
      }
    }
  }

  .featured-image {
    width: 100%;
    height: 400px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .blog-content {
    padding: 2rem;
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-color);

    p {
      margin-bottom: 1.5rem;
    }
  }

  .comments-container {
    padding: 2rem;
    background: var(--background-secondary-color);
    border-top: 1px solid var(--grey-100);
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .blog-header {
      padding: 1.5rem 1rem;

      h1 {
        font-size: 2rem;
      }
    }

    .blog-meta {
      gap: 1rem;
      font-size: 0.9rem;
    }

    .featured-image {
      height: 300px;
    }

    .blog-content {
      padding: 1.5rem 1rem;
      font-size: 1rem;
    }

    .comments-container {
      padding: 1.5rem 1rem;
    }
  }
`;

export default Wrapper;