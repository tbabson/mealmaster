import styled from "styled-components";

const Wrapper = styled.div`
  .admin-content {
    padding: 2rem;
    background: var(--background-secondary-color);
  }

  .header {
    margin-bottom: 2rem;
    h2 {
      color: var(--text-color);
    }
  }

  .filters-container {
    background: var(--white);
    padding: 2rem;
    border-radius: var(--border-radius);
    margin-bottom: 2rem;
    box-shadow: var(--shadow-2);
    transition: var(--transition);
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;

    &:hover {
      box-shadow: var(--shadow-3);
    }

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 1200px) {
      grid-template-columns: 1fr 1fr 1fr auto;
      align-items: end;
    }

    .form-row {
      margin-bottom: 0;

      .form-label {
        display: block;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        text-transform: capitalize;
        letter-spacing: 1px;
        color: var(--text-secondary-color);
      }

      .form-input,
      .form-select {
        width: 100%;
        padding: 0.75rem;
        border-radius: var(--border-radius);
        background: var(--background-secondary-color);
        border: 1px solid var(--grey-100);
        color: var(--text-color);

        &:focus {
          border-color: var(--primary-500);
        }
      }

      .form-select {
        padding-right: 2rem;
      }
    }

    .clear-btn {
      height: 40px;
      align-self: end;
      background: var(--grey-500);
      color: var(--white);
      transition: var(--transition);
      padding: 0.375rem 0.75rem;
      font-size: 0.9rem;
      text-transform: capitalize;
      border-radius: var(--border-radius);
      border: none;
      cursor: pointer;
      letter-spacing: var(--letter-spacing);

      @media (min-width: 1200px) {
        align-self: flex-end;
      }

      &:hover {
        background: var(--grey-600);
      }
    }
  }

  .carts-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr;

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 1200px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  .cart-card {
    background: var(--background-color);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow-2);
    transition: var(--transition);

    &:hover {
      box-shadow: var(--shadow-4);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--grey-100);
      font-weight: 600;

      .date {
        font-size: 0.9rem;
        color: var(--text-secondary-color);
      }
    }

    .cart-details {
      .user-info {
        background: var(--background-secondary-color);
        padding: 1rem;
        border-radius: var(--border-radius);
        margin-bottom: 1.5rem;

        p {
          margin: 0.5rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }

      .cart-summary {
        .meals-list {
          margin: 1rem 0;

          h4 {
            margin-bottom: 1rem;
            color: var(--primary-500);
          }

          .meal-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 1rem;
            border-radius: var(--border-radius);
            margin-bottom: 0.5rem;
            background: var(--white);
            transition: var(--transition);

            &:hover {
              background: var(--background-secondary-color);
            }

            .meal-name {
              font-weight: 500;
              color: var(--text-color);
            }

            .meal-total {
              font-weight: 600;
              color: var(--primary-500);
            }
          }
        }

        .totals {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 2px dashed var(--grey-100);

          p {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0.5rem 0;

            &:last-child {
              margin-top: 1rem;
              padding-top: 1rem;
              border-top: 1px solid var(--grey-100);
              font-size: 1.1rem;
            }
          }

          .highlight {
            color: var(--primary-500);
            font-weight: 600;
          }
        }
      }
    }

    .label {
      font-weight: 500;
      color: var(--text-secondary-color);
    }

    .value {
      color: var(--text-color);
    }

    .action-buttons {
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid var(--grey-100);

      button {
        width: 100%;
        padding: 0.75rem;
        border-radius: var(--border-radius);
        border: none;
        cursor: pointer;
        transition: var(--transition);
        font-weight: 500;
      }

      .delete-btn {
        background: var(--red-light);
        color: var(--red-dark);

        &:hover {
          background: var(--red-dark);
          color: var(--white);
        }
      }
    }
  }

  .pagination {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    .btn {
      padding: 0.5rem 1rem;
    }

    .page-info {
      color: var(--text-secondary-color);
    }
  }
`;

export default Wrapper;