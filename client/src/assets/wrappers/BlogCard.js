import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-2);
  transition: var(--transition);

  &:hover {
    box-shadow: var(--shadow-4);
    transform: translateY(-5px);
  }

  .blog-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }

  .blog-content {
    padding: 1.5rem;
  }

  .blog-header {
    margin-bottom: 1rem;
    
    h3 {
      color: var(--text-color);
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
  }

  .blog-info {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
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

  .blog-text {
    color: var(--text-color);
    margin-bottom: 1.5rem;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--primary-500);
    color: var(--white);
    border-radius: var(--border-radius);
    transition: var(--transition);
    text-decoration: none;

    &:hover {
      background: var(--primary-700);
      transform: translateY(-2px);
    }
  }
`;

export default Wrapper;