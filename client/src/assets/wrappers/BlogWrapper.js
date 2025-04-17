import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 2rem var(--fluid-padding);
  width: 90%;
  margin: 0 auto;

  .blog-header {
    margin-bottom: 2rem;
    
    h1 {
      font-size: 2.5rem;
      color: var(--primary);
      text-align: center;
    }
  }

  .blog-content {
    margin-top: 2rem;
  }

  .blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .blog-item {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    overflow: hidden;
    transition: var(--transition);

    &:hover {
      box-shadow: var(--shadow-4);
      transform: translateY(-5px);
    }
  }

  .no-blogs {
    text-align: center;
    padding: 3rem 2rem;
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);

    h2 {
      color: var(--grey-600);
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }

    p {
      color: var(--grey-500);
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 2rem;

    .page-btn {
      min-width: 40px;
      height: 40px;
      padding: 0.5rem;
      border-radius: var(--border-radius);
      background: var(--white);
      color: var(--primary-500);
      border: 1px solid var(--primary-500);
      cursor: pointer;
      transition: var(--transition);

      &:hover {
        background: var(--primary-50);
      }

      &.active {
        background: var(--primary-500);
        color: var(--white);
        border-color: var(--primary-500);
      }
    }
  }

  @media (max-width: 992px) {
    .blog-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .blog-header h1 {
      font-size: 2rem;
    }

    .blog-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default Wrapper;