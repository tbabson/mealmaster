import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;

  .sidebar {
    width: 200px;
    background: var(--primary-500);
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .sidebar-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border: none;
    background: transparent;
    color: var(--white);
    cursor: pointer;
    transition: var(--transition);
    border-radius: var(--border-radius);

    &:hover, &.active {
      background: var(--primary-700);
    }
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
      
      &:active {
        transform: translateY(0);
      }
    }
  }

  /* Add more specific styling for filter items */
  .filter-item {
    margin-bottom: 1rem;
    
    .filter-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--grey-700);
    }
  }

  /* Add styling for pagination */
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

  .content {
    flex: 1;
    padding: 2rem;
  }

  .meals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  .meal-card {
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

    .meal-info {
      padding: 1rem;

      h3 {
        margin-bottom: 0.5rem;
      }

      p {
        color: var(--grey-500);
      }
    }

    .meal-actions {
      display: flex;
      justify-content: flex-end;
      padding: 1rem;
      gap: 0.5rem;

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

  .meal-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);

    .section-title {
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--grey-200);
      color: var(--primary-500);
    }

    section {
      margin-bottom: 2rem;
    }

    .form-row {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }

      select, input[type="file"], input[type="text"], input[type="checkbox"] {
        width: 100%;
        padding: 0.375rem 0.75rem;
        border-radius: var(--border-radius);
        background: var(--grey-50);
        border: 1px solid var(--grey-300);
      }

      select[multiple] {
        height: 120px;
      }
    }

    .btn-container {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    .ingredient-item {
      margin-bottom: 1.5rem;
      padding: 1rem;
      border: 1px solid var(--grey-200);
      border-radius: var(--border-radius);
      background: var(--grey-50);

      h4 {
        margin-bottom: 1rem;
        color: var(--primary-500);
      }

      .quantity-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      .remove-btn {
        margin-top: 0.5rem;
        background: var(--red-light);
        color: var(--red-dark);
        border: none;
        padding: 0.5rem 1rem;
        border-radius: var(--border-radius);
        cursor: pointer;

        &:hover {
          background: var(--red-dark);
          color: var(--white);
        }
      }
    }

    .add-btn {
      background: var(--primary-500);
      color: var(--white);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;

      &:hover {
        background: var(--primary-700);
      }
    }

    /* Add this to your existing Wrapper styled component */

    .preparation-section {
      margin-bottom: 2rem;
      padding: 1rem;
      border: 1px solid var(--grey-200);
      border-radius: var(--border-radius);
      background: var(--grey-50);

      h3 {
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--grey-200);
        color: var(--primary-500);
      }

      .form-textarea {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--grey-300);
        border-radius: var(--border-radius);
        min-height: 100px;
        resize: vertical;
        background: var(--white);
        margin-bottom: 1rem;
      }

      .step-item {
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: var(--white);
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-1);

        .step-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;

          h4 {
            margin: 0;
            color: var(--primary-500);
          }
        }

        .remove-btn.small {
          padding: 0.25rem 0.5rem;
          font-size: 0.8rem;
        }
      }

      .skill-level-select {
        width: 100%;
        padding: 0.375rem 0.75rem;
        border-radius: var(--border-radius);
        background: var(--white);
        border: 1px solid var(--grey-300);
        margin-bottom: 1rem;
      }
    }

    .submit-btn {
      background: var(--primary-500);
      color: var(--white);
      border: none;
      padding: 0.5rem 1.5rem;
      border-radius: var(--border-radius);
      cursor: pointer;
      
      &:hover {
        background: var(--primary-700);
      }
    }

    .clear-btn {
      background: var(--grey-200);
      color: var(--grey-700);
      border: none;
      padding: 0.5rem 1.5rem;
      border-radius: var(--border-radius);
      cursor: pointer;
      
      &:hover {
        background: var(--grey-300);
      }
    }
  }

  .filters-container {
    background: var(--background-secondary-color);
    padding: 2rem;
    border-radius: var(--border-radius);
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1120px) {
      grid-template-columns: repeat(3, 1fr);
    }

    .clear-btn {
      background: var(--primary-500);
      color: var(--white);
      align-self: end;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius);
      cursor: pointer;

      &:hover {
        background: var(--primary-700);
      }
    }
  }

  // Responsive adjustments
  @media (max-width: 768px) {
    flex-direction: column;
    
    .sidebar {
      width: 100%;
      flex-direction: row;
      padding: 1rem;
    }
    
    .meal-form {
      padding: 1rem;
      
      .quantity-row {
        grid-template-columns: 1fr !important;
      }
      
      .step-row {
        flex-direction: column;
        
        .remove-btn {
          align-self: flex-end;
        }
      }
    }
    
    .filters-container {
      grid-template-columns: 1fr;
    }
  }

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

  .toggle-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .meals-list, .meal-form {
    background: var(--white);
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--shadow-2);
  }

  .filters-container {
    display: grid;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: var(--grey-50);
    border-radius: var(--border-radius);
    
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
    
    @media (min-width: 1200px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  .meals-grid {
    display: grid;
    gap: 2rem;
    
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
    
    @media (min-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .meal-card {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-1);
    transition: var(--transition);

    &:hover {
      box-shadow: var(--shadow-3);
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: var(--border-radius) var(--border-radius) 0 0;
    }
  }

  .meal-info {
    padding: 1rem;
  }

  .meal-actions {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border-top: 1px solid var(--grey-100);
  }

  .meal-form {
    max-width: 1200px;
    margin: 0 auto;

    .section-title {
      margin: 2rem 0 1rem;
      color: var(--primary-500);
      border-bottom: 2px solid var(--grey-100);
      padding-bottom: 0.5rem;
    }

    .form-row {
      margin-bottom: 1rem;
    }

    .ingredient-item, .step-item {
      background: var(--grey-50);
      padding: 1rem;
      border-radius: var(--border-radius);
      margin-bottom: 1rem;
    }

    .quantity-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .substitutions-container {
      margin-top: 1rem;
      padding: 1rem;
      background: var(--white);
      border-radius: var(--border-radius);
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
  }

  .page-info {
    color: var(--grey-600);
  }

  .btn-container {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }

  .add-btn, .remove-btn {
    margin-top: 1rem;
    
    &.small {
      padding: 0.25rem 0.5rem;
      font-size: 0.85rem;
    }
  }
`;

export default Wrapper;