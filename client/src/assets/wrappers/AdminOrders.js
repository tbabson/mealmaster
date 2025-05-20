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
  .filters-container {
    background: var(--grey-50);
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    margin-bottom: 2rem;

    display: grid;
    gap: 1.5rem;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 1120px) {
      grid-template-columns: repeat(4, 1fr);
    }

    .form-row {
      margin-bottom: 0;

      label {
        display: block;
        font-size: 0.875rem;
        margin-bottom: 0.5rem;
        color: var(--dark);
        text-transform: capitalize;
        letter-spacing: 1px;
      }

      input, select {
        width: 100%;
        padding: 0.75rem;
        border-radius: var(--border-radius);
        background: var(--white);
        border: 1px solid var(--primary);
        color: var(--darkest);
        
        &:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px var(--primary-100);
        }
      }

      select {
        text-transform: capitalize;
      }
    }

    .clear-btn {
      background: var(--light);
      color: var(--primary);
      grid-column: 1 / -1;
      padding: 0.75rem;
      border-radius: var(--border-radius);
      border: 1px solid var(--primary);
      font-size: 1rem;
      text-transform: capitalize;
      letter-spacing: 1px;
      transition: var(--transition);
      
      &:hover {
        background: var(--primary);
        color: var(--lightest);
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }
    }

    @media (max-width: 767px) {
      padding: 1.5rem;
      gap: 1rem;
      
      .form-row {
        margin-bottom: 0;
      }

      .clear-btn {
        margin-top: 0.5rem;
      }
    }
  }

  .orders-grid {
    display: grid;
    gap: 2rem;
    
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 1120px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .order-card {
    background: var(--grey-50);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    padding: 1.5rem;
    transition: var(--transition);

    &:hover {
      box-shadow: var(--shadow-4);
      transform: translateY(-2px);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      color: var(--dark);
      font-weight: 500;

      span{        
        color: var(--dark);
      }

      .tracking {
        font-size: 0.9rem;  
        /* color: var(--dark);      */
      }
    }

    .card-details {
      color: var(--darkest);
      font-size: 0.9rem;

      p {
        margin: 0.5rem 0;
        display: flex;
        justify-content: space-between;
        
      }

      /* span.value{
        color: var(--primary);
      } */


      .label {
        font-weight: 500;
      }

      .value {
        text-align: right;
        color: var(--primary);
      }
    }

    .status-container {
      display: flex;
      gap: 1rem;
      margin: 1rem 0;
      padding: 1rem 0;
      border-top: 1px solid var(--grey-100);
      border-bottom: 1px solid var(--grey-100);

      .select-group {
        flex: 1;

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
          color: var(--dark);
        }

        select {
          width: 100%;
          padding: 0.375rem;
          border-radius: var(--border-radius);
          border: 1px solid var(--grey-300);
          background: var(--background-color);
          
          &:focus {
            border-color: var(--primary-500);
            outline: none;
          }
        }
      }
    }    .payment-btn {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid ;
      border-radius: var(--border-radius);
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin: 1rem 0;

      &.paid {
        background: var(--green-light);
        color: var(--darkest);
        border-color: var(--green-dark);
        
        &:hover {
          background: var(--primary);
          color: var(--light);
          transform: translateY(-2px);
          box-shadow: 0 2px 5px rgba(0, 128, 0, 0.2);
        }

        &::before {
          content: "✓";
          font-weight: bold;
        }
      }

      &.unpaid {
        background: var(--red-light);
        color: var(--darkest);
        border-color: var(--red-dark);
        
        &:hover {
          background: var(--primary);
          color: var(--light);
          transform: translateY(-2px);
          box-shadow: 0 2px 5px rgba(255, 0, 0, 0.2);
        }

        &::before {
          content: "!";
          font-weight: bold;
        }
      }

      &:active {
        transform: translateY(0);
      }
    }

    .view-details {
      width: 100%;
      margin-top: 1rem;
      padding: 0.5rem;
      background: var(--light);
      color: var(--primary);
      border: 1px solid var(--primary);
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: var(--transition);

      &:hover {
        background: var(--primary);
        color: var(--lightest);
      }
    }

    .meals-list {
      margin: 1rem 0;
      padding: 0.5rem;
      background: var(--grey-50);
      border-radius: var(--border-radius);

      p {
        margin: 0.5rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.25rem 0;
        border-bottom: 1px dashed var(--grey-200);
        
        &:last-child {
          border-bottom: none;
        }
      }

      .meal-name {
        color: var(--darkest);
        font-weight: 500;
        flex: 1;
        margin-right: 1rem;
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;

    .btn {
      background: var(--background-secondary-color);
      padding: 0.375rem 0.75rem;
      border-radius: var(--border-radius);
      cursor: pointer;

      &:disabled {
        background: var(--grey-100);
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: var(--primary-500);
        color: var(--white);
      }
    }

    .page-info {
      color: var(--grey-600);
    }
  }

  .loading-container {
    text-align: center;
    padding: 2rem;
    color: var(--grey-500);
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: var(--darkest);
    padding: 2rem;
    border-radius: var(--border-radius);
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }

  .modal-content h2 {
    margin-bottom: 1rem;
    color: var(--light);
    font-weight: 600;
  }

  .card-header span{
    font-size: 0.9rem;
    color: var(--light);
    margin-left: 1rem;
  }

  .close-modal {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--light);
  }



  .order-items {
    margin: 1.5rem 0;

    h3 {
        margin-bottom: 1rem;
        font-weight: 500;
        color: var(--light);
    }
  }

  .order-item {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid var(--lightest);
    border-radius: var(--border-radius);
    margin-bottom: 1rem;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: var(--border-radius);
    }

    .item-details {
      h4 {
        margin: 0;
        color: var(--light);
      }

      .ingredients {
        margin-top: 0.5rem;
        font-size: 0.9rem;
        color: var(--lightest);
        
      }
    }
  }

  .order-summary {
    border-top: 2px solid var(--secondary);
    margin-top: 1.5rem;
    padding: 1.5rem 1.5rem;
    background: var(--light);
    border-radius: var(--border-radius);

    h3 {
      margin-bottom: 1rem;
      font-weight: 500;
      color: var(--darkest);
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      margin: 0.5rem 0;
      color: var(--dark);
    }
  }

  .address-details {
    margin: 1.5rem 0;
    padding: 1rem;
    background: var(--light);
    border-radius: var(--border-radius);

    h3 {
      margin-bottom: 1rem;
        font-weight: 600;
        color: var(--darkest);
    }

    p {
      margin: 0.5rem 0;
        color: var(--dark);

    }
  }

  @media (max-width: 768px) {
    .filters-container {
      grid-template-columns: 1fr;
    }

    .orders-grid {
      grid-template-columns: 1fr;
    }

    .order-card {
      margin-bottom: 1rem;

      .status-container {
        flex-direction: column;
      }
    }
  }
`;

export default Wrapper;