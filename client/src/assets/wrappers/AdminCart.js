import styled from "styled-components";

const Wrapper = styled.div`
  .admin-content {
    padding: 2rem;
    background: var(--background-secondary-color);
  }

  .header {
    margin-bottom: 2rem;
    h2 {
      color: var(--darkest);
      font-size: 2rem;
    }
  }

  .filters-container {
    background: var(--grey-50);
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
        color: var(--dark);
      }

      .form-input,
      .form-select {
        width: 100%;
        padding: 0.75rem;
        border-radius: var(--border-radius);
        background: var(--lightest);
        border: 1px solid var(--primary);
        color: var(--dark);

        &:focus {
          border-color: var(--dark);
        }
      }

      .form-select {
        padding-right: 2rem;
      }
    }

    .clear-btn {
      height: 40px;
      align-self: end;
      background: var(--primary);
      color: var(--light);
      transition: var(--transition);
      padding: 0.375rem 0.75rem;
      font-size: 0.9rem;
      text-transform: capitalize;
      border-radius: var(--border-radius);
      border: 1px solid var(--primary);
      cursor: pointer;
      letter-spacing: var(--letter-spacing);
      
      @media (min-width: 1200px) {
        align-self: flex-end;
      }
      
      &:hover {
        background: var(--light);
        color: var(--dark);
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
    background: var(--grey-50);
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
      border-bottom: 1px solid var(--primary);
      font-weight: 600;

      span{
        color: var(--darkest);
        line-height: 1.5;
      }

      span.date{
        color: var(--darkest);
        line-height: 1.5;
      }

      .date {
        font-size: 0.9rem;
        
      }
    }

    .cart-details {
      .user-info {
        padding: 1rem;
        margin-bottom: 1.5rem;

        span.label {
          color: var(--dark);
          font-weight: 600;
        }

        span.value {
          color: var(--primary);
          font-weight: 500;
        }


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
            color: var(--primary);
            font-weight: 600;
            font-size: 1rem;
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

            /* &:hover {
              background: var(--background-secondary-color);
            } */

            .meal-name {
              font-weight: 500;
              color: var(--dark);
            }

            .meal-total {
              font-weight: 600;
              color: var(--primary);
            }
          }
        }

        .totals {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 2px dashed var(--primary);

          p {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0.5rem 0;

            &:last-child {
              margin-top: 1rem;
              padding-top: 1rem;
              border-top: 1px solid var(--primary);
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
      color: var(--dark);
    }

    .value {
      color: var(--primary);
    }

    .action-buttons {
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid var(--grey-100);

      button {
        width: 100%;
        padding: 0.75rem;
        border-radius: var(--border-radius);
        border: 1px solid var(--primary);
        cursor: pointer;
        transition: var(--transition);
        font-weight: 600;        
      }

      .delete-btn {
        background: var(--light);
        color: var(--dark);

        &:hover {
          background: var(--primary);
          color: var(--light);
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