import styled from 'styled-components';

const Wrapper = styled.section`
  .search-filters {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    padding: 2rem;
    margin-bottom: 2rem;
    display: grid;
    gap: 1rem;
    width: 100%;
  }

  @media (min-width: 768px) {
    .search-filters {
      grid-template-columns: 1fr 1fr;
      align-items: end;
    }
  }

  @media (min-width: 992px) {
    .search-filters {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-select {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: var(--border-radius);
    background: var(--background-secondary-color);
    border: 1px solid var(--grey-200);
    color: var(--text-color);
    font-size: 1rem;
  }

  .btn-block {
    margin-top: 0.5rem;
    background: var(--primary-500);
    color: var(--white);
    transition: var(--transition);

    &:hover {
      background: var(--primary-700);
    }
  }

  .clear-btn {
    background: var(--red-light);
    color: var(--red-dark);
    
    &:hover {
      background: var(--red-dark);
      color: var(--white);
    }
  }

  .form-label {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    color: var(--grey-700);
    text-transform: capitalize;
  }

  .form-input {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: var(--border-radius);
    background: var(--background-secondary-color);
    border: 1px solid var(--grey-200);
    color: var(--text-color);
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: var(--primary-500);
    }
  }
`;

export default Wrapper;