import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 2rem var(--fluid-padding);
  max-width: var(--max-width);
  margin: 2rem auto 5rem auto;

  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    font-size: 0.9rem;
    color: var(--grey-500);

    a {
      color: var(--primary-500);
      text-decoration: none;
      transition: var(--transition);

      &:hover {
        color: var(--primary-700);
      }
    }

    svg {
      font-size: 0.8rem;
      color: var(--grey-400);
    }

    span {
      color: var(--grey-700);
    }
  }

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
      font-weight: 600;
      line-height: 1.4;
      text-transform: capitalize;
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

    /* Style paragraphs */
    p {
      margin-bottom: 1.5rem;
    }

    /* Style headings */
    h1, h2, h3, h4, h5, h6 {
      color: var(--text-color);
      margin: 2rem 0 1rem;
      font-weight: 600;
      line-height: 1.4;
    }

    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
    h5 { font-size: 1.1rem; }
    h6 { font-size: 1rem; }

    /* Style lists */
    ul, ol {
      margin: 1.5rem 0;
      padding-left: 2rem;
    }

    li {
      margin-bottom: 0.5rem;
    }

    /* Style links */
    a {
      color: var(--primary-500);
      text-decoration: none;
      transition: var(--transition);

      &:hover {
        color: var(--primary-700);
        text-decoration: underline;
      }
    }

    /* Style blockquotes */
    blockquote {
      margin: 1.5rem 0;
      padding: 1rem 1.5rem;
      border-left: 4px solid var(--primary-500);
      background-color: var(--grey-50);
      font-style: italic;
      color: var(--grey-700);
    }

    /* Style code blocks */
    pre {
      background: var(--grey-900);
      color: var(--white);
      padding: 1rem;
      border-radius: var(--border-radius);
      overflow-x: auto;
      margin: 1.5rem 0;
    }

    code {
      background: var(--grey-100);
      color: var(--primary-500);
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: monospace;
    }

    /* Style tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
    }

    th, td {
      border: 1px solid var(--grey-200);
      padding: 0.75rem;
      text-align: left;
    }

    th {
      background: var(--grey-50);
      font-weight: 600;
    }

    /* Style images */
    img {
      max-width: 100%;
      height: auto;
      margin: 1.5rem 0;
      border-radius: var(--border-radius);
    }
  }

  .error-container {
    text-align: center;
    padding: 3rem 2rem;
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);

    h2 {
      color: var(--red-dark);
      margin-bottom: 1rem;
    }

    p {
      color: var(--text-color);
    }
  }

  .comments-container {
    padding: 2rem;
    background: var(--background-secondary-color);
    border-top: 1px solid var(--grey-100);
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .breadcrumbs {
      font-size: 0.8rem;
      margin-bottom: 1.5rem;
    }

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