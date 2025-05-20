import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;

  .admin-content {
    padding: 2rem;
    width: 100%;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .create-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius);
    background: var(--primary-500);
    color: var(--white);
    border: none;
    cursor: pointer;
    transition: var(--transition);

    &:hover {
      background: var(--primary-700);
      transform: translateY(-2px);
    }
  }

  .reminders-list, .reminder-form {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--shadow-2);
  }

  .reminders-grid {
    display: grid;
    gap: 2rem;
    padding: 1rem;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 1120px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .reminder-card {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    padding: 1.5rem;
    transition: var(--transition);

    &:hover {
      box-shadow: var(--shadow-4);
      transform: translateY(-2px);
    }    .reminder-info {
      .meal-name {
        color: var(--primary-500);
        font-weight: 500;
        margin-bottom: 0.5rem;
      }
      
      .time {
        font-family: monospace;
        color: var(--grey-700);
        margin-bottom: 0.5rem;
      }      .creator-info {
        color: var(--grey-600);
        font-size: 0.85rem;
        margin-bottom: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        .creator-name {
          font-weight: 500;
        }

        .creator-email {
          color: var(--grey-500);
          font-style: italic;
        }
      }

      .note {
        color: var(--grey-600);
        font-size: 0.9rem;
        margin-top: 0.5rem;
      }

      .badge {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.85rem;
        margin-right: 0.5rem;
        
        &.recurring {
          background: var(--green-light);
          color: var(--green-dark);
        }
        
        &.method {
          background: var(--primary-100);
          color: var(--primary-700);
        }
      }
    }

    .reminder-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
      gap: 0.5rem;
      border-top: 1px solid var(--grey-100);
      padding-top: 1rem;

      button {
        padding: 0.5rem;
        border: none;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: var(--transition);
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.9rem;

        &.edit-btn {
          background: var(--primary-500);
          color: var(--white);

          &:hover {
            background: var(--primary-700);
          }
        }

        &.delete-btn {
          background: var(--red-light);
          color: var(--red-dark);

          &:hover {
            background: var(--red-dark);
            color: var(--white);
          }
        }

        &.sync-btn {
          background: var(--blue-light);
          color: var(--blue-dark);

          &:hover {
            background: var(--blue-dark);
            color: var(--white);
          }
        }

        &.notify-btn {
          background: var(--yellow-light);
          color: var(--yellow-dark);

          &:hover {
            background: var(--yellow-dark);
            color: var(--white);
          }
        }
      }
    }
  }

  .reminder-form {
    max-width: 800px;
    margin: 0 auto;

    .form-row {
      margin-bottom: 1.5rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--grey-700);
      }

      input, select, textarea {
        width: 100%;
        padding: 0.75rem;
        border-radius: var(--border-radius);
        background: var(--grey-50);
        border: 1px solid var(--grey-300);
        transition: all 0.3s ease;

        &:focus {
          border-color: var(--primary-500);
          box-shadow: 0 0 0 3px rgba(var(--primary-500-rgb), 0.2);
          outline: none;
        }
      }

      textarea {
        min-height: 100px;
        resize: vertical;
      }

      input[type="checkbox"] {
        width: auto;
        margin-right: 0.5rem;
      }
    }

    .submit-btn {
      width: 100%;
      padding: 0.75rem;
      background: var(--primary-500);
      color: var(--white);
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: var(--transition);
      margin-top: 1rem;

      &:hover {
        background: var(--primary-700);
      }
    }
  }

  .loading-container {
    text-align: center;
    padding: 2rem;
    color: var(--grey-500);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    
    .reminder-form {
      padding: 1rem;
    }
    
    .reminders-grid {
      grid-template-columns: 1fr;
      padding: 0.5rem;
    }
    
    .reminder-card {
      margin-bottom: 1rem;
    }
  }
`;

export default Wrapper;