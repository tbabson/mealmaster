import styled from 'styled-components';

const Wrapper = styled.section`
  margin: 1rem 0;

  .reviews {
    display: grid;
    gap: 1rem;
  }

  .reviews-container {
    padding: 2rem;
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .btn-container {
    display: flex;
    gap: 0.5rem;
  }  .filter-container {
    margin-bottom: 2rem;
    padding: 2rem;
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
  }

  .search-container {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr auto;
    gap: 1.5rem;
    align-items: end;

    .form-row {
      margin-bottom: 0;
    }

    .form-label {
      display: block;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      color: var(--grey-700);
      font-weight: 500;
      text-transform: capitalize;
    }

    .form-input,
    .form-select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--grey-200);
      border-radius: var(--border-radius);
      background: var(--grey-50);
      font-size: 1rem;
      color: var(--grey-900);
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: var(--primary-500);
        box-shadow: 0 0 0 3px var(--primary-100);
      }

      &::placeholder {
        color: var(--grey-400);
      }
    }

    .form-select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 1em;
      padding-right: 2.5rem;

      option {
        color: var(--grey-900);
      }
    }

    .clear-btn {
      background: var(--red-light);
      color: var(--red-dark);
      border: 2px solid var(--red-dark);
      padding: 0.75rem 1.5rem;
      border-radius: var(--border-radius);
      cursor: pointer;
      font-weight: 600;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
      align-self: end;
      height: 43px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: var(--red-dark);
        color: white;
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
  @media (max-width: 992px) {
    .filter-container {
      padding: 1.5rem;
    }
    
    .search-container {
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

      .form-input,
      .form-select,
      .clear-btn {
        width: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    .filter-container {
      padding: 1.25rem;
    }
  }

  @media (max-width: 600px) {
    .filter-container {
      padding: 1rem;
    }
    
    .search-container {
      grid-template-columns: 1fr;

      .clear-btn {
        margin-top: 0.5rem;
      }
    }
  }.review-card {
    background: var(--white);
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-1);
    margin-bottom: 1.5rem;
    transition: all 0.3s ease;
    border: 1px solid var(--grey-100);
    position: relative;
    overflow: hidden;

    &:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-3);
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: var(--primary-500);
    }
  }

  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.25rem;
    gap: 1rem;
  }

  .review-info {
    display: grid;
    gap: 0.75rem;
  }

  .review-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--grey-900);
    margin: 0;
  }

  .review-rating {
    display: flex;
    align-items: center;
    gap: 0.35rem;

    svg {
      font-size: 1.1rem;
    }
  }

  .review-content {
    color: var(--grey-600);
    margin: 1.25rem 0;
    line-height: 1.6;
    font-size: 1rem;
  }

  .review-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--grey-100);
    font-size: 0.9rem;
    color: var(--grey-500);

    span {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .review-actions {
    display: flex;
    gap: 0.75rem;

    .btn {
      padding: 0.5rem;
      border-radius: var(--border-radius);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        transform: translateY(-2px);
      }
    }

    .btn-danger {
      background: var(--red-light);
      color: var(--red-dark);

      &:hover {
        background: var(--red-dark);
        color: var(--white);
      }
    }
  }.error-container {
    text-align: center;
    padding: 2rem;
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    margin: 2rem auto;
    max-width: 600px;

    h3 {
      color: var(--red-dark);
      margin-bottom: 1rem;
    }

    p {
      color: var(--grey-600);
    }
  }

  .empty-reviews {
    text-align: center;
    padding: 2rem;
    color: var(--grey-500);
    
    h3 {
      margin-bottom: 1rem;
    }
  }

  .pagination-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
    flex-wrap: wrap;

    .btn-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .btn {
      border: none;
      padding: 0.5rem 1rem;
      background: var(--primary);
      color: var(--lightest);
      font-size: 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover:not(:disabled) {
        background: var(--darkest);
      }

      &:disabled {
        background: var(--grey-200);
        cursor: not-allowed;
      }
    }

    .page-btn.active {
      background: var(--darkest);
      color: var(--lightest);
    }

    .prev-btn,
    .next-btn {
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-weight: 500;
    }
  }
`;

export default Wrapper;