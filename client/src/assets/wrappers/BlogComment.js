import styled from 'styled-components';

const Wrapper = styled.section`
  .comments-section {
    padding: 2rem;
    background: var(--white);
    border-radius: var(--border-radius);
    margin-top: 2rem;

    h3 {
      color: var(--text-color);
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      border-bottom: 2px solid var(--grey-100);
      padding-bottom: 0.5rem;
    }
  }

  .comment {
    background: var(--background-secondary-color);
    padding: 1rem;
    border-radius: var(--border-radius);
    margin-bottom: 1rem;
    position: relative;
  }

  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .comment-author {
    font-weight: 600;
    color: var(--primary-500);
  }

  .comment-date {
    font-size: 0.85rem;
    color: var(--text-secondary-color);
  }

  .btn-danger {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    color: var(--red-dark);
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    transition: var(--transition);

    &:hover {
      color: var(--red-light);
      transform: scale(1.1);
    }
  }

  .comment-form {
    margin-top: 2rem;
    background: var(--background-secondary-color);
    padding: 1.5rem;
    border-radius: var(--border-radius);
  }

  .form-control {
    margin-bottom: 1rem;

    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--grey-200);
      border-radius: var(--border-radius);
      background: var(--background-color);
      font-size: 1rem;
      color: var(--text-color);
      resize: vertical;
      min-height: 100px;

      &:focus {
        outline: none;
        border-color: var(--primary-500);
      }

      &::placeholder {
        color: var(--grey-400);
      }
    }
  }

  .btn {
    background: var(--primary-500);
    color: var(--white);
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);

    &:hover {
      background: var(--primary-700);
      transform: translateY(-2px);
    }

    &:disabled {
      background: var(--grey-300);
      cursor: not-allowed;
    }
  }

  .login-message {
    text-align: center;
    color: var(--text-secondary-color);
    padding: 1rem;
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
  }

  @media (max-width: 768px) {
    .comments-section {
      padding: 1rem;
    }

    .comment-header {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export default Wrapper;