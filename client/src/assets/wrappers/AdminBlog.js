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

  .blogs-list, .blog-form {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--shadow-2);
  }

  .filters-container {
    background: var(--background-secondary-color);
    padding: 2rem;
    border-radius: var(--border-radius);
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    box-shadow: var(--shadow-2);
    border: 1px solid var(--grey-200);

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1120px) {
      grid-template-columns: repeat(3, 1fr);
    }

    .form-label {
      color: var(--grey-700);
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .form-input, .form-select {
      padding: 0.75rem;
      border-radius: var(--border-radius);
      background: var(--white);
      border: 1px solid var(--grey-300);
      width: 100%;
      transition: all 0.3s ease;
      
      &:focus {
        border-color: var(--primary-500);
        box-shadow: 0 0 0 3px rgba(var(--primary-500-rgb), 0.2);
        outline: none;
      }
    }

    .clear-btn {
      background: var(--primary-500);
      color: var(--white);
      align-self: end;
      border: none;
      padding: 0.75rem 1rem;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
      grid-column: 1 / -1;
      justify-self: start;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &:hover {
        background: var(--primary-700);
        transform: translateY(-2px);
      }
    }
  }

  .blogs-grid {
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

  .blog-card {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    overflow: hidden;
    transition: var(--transition);

    &:hover {
      box-shadow: var(--shadow-4);
      transform: translateY(-2px);
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .blog-info {
      padding: 1rem;

      h3 {
        margin-bottom: 0.5rem;
        color: var(--grey-900);
      }

      p {
        color: var(--grey-500);
        margin-bottom: 0.25rem;
      }
    }

    .blog-actions {
      display: flex;
      justify-content: flex-end;
      padding: 1rem;
      gap: 0.5rem;
      border-top: 1px solid var(--grey-100);

      button {
        padding: 0.5rem;
        border: none;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: var(--transition);

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
      }
    }
  }

  .blog-form {
    max-width: 1200px;
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
    }

    .seo-section {
      background: var(--grey-50);
      padding: 1.5rem;
      border-radius: var(--border-radius);
      margin-bottom: 2rem;

      h3 {
        color: var(--primary-500);
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--grey-100);
      }

      small {
        margin-left: 1rem;
        color: var(--grey-500);
      }
    }

    .keywords-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;

      .keyword-tag {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem 0.75rem;
        background: var(--primary-100);
        color: var(--primary-700);
        border-radius: var(--border-radius);
        font-size: 0.875rem;

        button {
          border: none;
          background: none;
          color: var(--primary-700);
          cursor: pointer;
          padding: 0;
          font-size: 1.25rem;
          line-height: 1;
          
          &:hover {
            color: var(--red-dark);
          }
        }
      }
    }

    .quill {
      margin-bottom: 1.5rem;
      
      .ql-toolbar {
        border-radius: var(--border-radius) var(--border-radius) 0 0;
        border-color: var(--grey-300);
        background: var(--grey-50);
      }
      
      .ql-container {
        border-radius: 0 0 var(--border-radius) var(--border-radius);
        border-color: var(--grey-300);
        min-height: 200px;
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    gap: 0.5rem;
    
    .btn {
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius);
      border: none;
      background: var(--primary-100);
      color: var(--primary-700);
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover:not(:disabled) {
        background: var(--primary-500);
        color: var(--white);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    
    .page-info {
      padding: 0.5rem 1rem;
      background: var(--white);
      border-radius: var(--border-radius);
      border: 1px solid var(--grey-200);
    }
  }

  // Responsive adjustments
  @media (max-width: 768px) {
    flex-direction: column;
    
    .blog-form {
      padding: 1rem;
      
      .seo-section {
        padding: 1rem;
      }
    }
    
    .blogs-grid {
      grid-template-columns: 1fr;
      padding: 0.5rem;
    }
    
    .filters-container {
      padding: 1rem;
    }
  }
`;

export default Wrapper;