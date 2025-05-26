import styled from 'styled-components';

const Wrapper = styled.main`
  max-width: 90%;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  
  h1 {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--darkest);
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #ff5722;
    padding-bottom: 0.75rem;
  }
  
  h2 {
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--dark);
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: var(--dark);
  }
  
  .section {
    margin-bottom: 2rem;
    padding: 1.25rem;
    background-color: var(--lightest);
    border-radius: 8px;
  }
  
  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 0.5rem;
    
    p {
      font-size: 0.95rem;
      color: var(--dark);
      margin-bottom: 0.5rem;
    }
    
    .order-id {
      font-family: monospace;
      background-color: var(--lightest);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      color: var(--darkest);
      font-weight: 500;
    }
  }
  
  .item-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .order-item {
    padding: 1rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    }
    
    .price {
      font-weight: 600;
      color: var(--darkest);
      margin-bottom: 0.25rem;
    }
    
    .quantity {
      color: var(--medium);
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
  }

  /* Review Section Styles */
  .review-section {
    margin-top: 1rem;
    border-top: 1px solid #e2e8f0;
    padding-top: 1rem;
  }

  .review-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 0.75rem;
    background-color: #f8fafc;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #f1f5f9;
      border-color: #cbd5e1;
    }
    
    span:first-child {
      font-weight: 500;
      color: var(--dark);
    }
    
    .arrow {
      transition: transform 0.2s ease;
      color: var(--medium);
      
      &.open {
        transform: rotate(180deg);
      }
    }
  }

  .review-form {
    margin-top: 1rem;
    padding: 1.25rem;
    background-color: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
  }

  .rating-section {
    margin-bottom: 1rem;
    
    label {
      display: block;
      font-weight: 500;
      color: var(--dark);
      margin-bottom: 0.5rem;
    }
  }

  .star-rating {
    display: flex;
    gap: 0.25rem;
    
    .star {
      font-size: 1.5rem;
      color: #d1d5db;
      cursor: pointer;
      transition: color 0.2s ease;
      user-select: none;
      
      &:hover {
        color: #fbbf24;
      }
      
      &.filled {
        color: #f59e0b;
      }
    }
  }

  .form-group {
    margin-bottom: 1rem;
    
    label {
      display: block;
      font-weight: 500;
      color: var(--dark);
      margin-bottom: 0.5rem;
    }
    
    input, textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 0.95rem;
      transition: border-color 0.2s ease;
      
      &:focus {
        outline: none;
        border-color: var(--primary);
        box-shadow: 0 0 0 2px rgba(255, 87, 34, 0.1);
      }
      
      &::placeholder {
        color: #9ca3af;
      }
    }
    
    textarea {
      resize: vertical;
      min-height: 100px;
      font-family: inherit;
    }
  }

  .form-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 1.5rem;
    
    button {
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }

  .submit-review-btn {
    background-color: var(--primary);
    color: white;
    
    &:hover:not(:disabled) {
      background-color: var(--dark);
      transform: translateY(-1px);
    }
  }

  .cancel-review-btn {
    background-color: #6b7280;
    color: white;
    
    &:hover {
      background-color: #4b5563;
    }
  }

  .review-submitted {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    background-color: #dcfce7;
    border-radius: 6px;
    border: 1px solid #bbf7d0;
    
    span {
      color: #15803d;
      font-weight: 500;
      font-size: 0.95rem;
    }
  }
  
  .order-summary, .shipping-address {
    p {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px dashed #ff5722;
      
      &:last-child {
        border-bottom: none;
      }
      
      span:first-child {
        color: var(--medium);
        font-weight: 400;
      }
      
      span:last-child {
        font-weight: 500;
        color: #334155;
      }
    }
    
    .total {
      font-size: 1.1rem;
      font-weight: 600;
      
      span:last-child {
        color: var(--darkest);
      }
    }
    
    .status {
      span:last-child {
        background-color: #dcfce7;
        color: var(--dark);
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.85rem;
      }
    }
    
    .paid span:last-child {
      color: var(--dark);
    }
    
    .not-paid span:last-child {
      color: var(--secondary);
    }

    .payment-method span:last-child {
      color: var(--darkest);
      text-transform: capitalize;
    }
  }

  .shipping-address {
    p {
      justify-content: flex-start;
      border-bottom: none;
      padding: 0.25rem 0;
      color: var(--darkest);
      text-transform: capitalize;
    }
  }
  
  .back-button {
    display: inline-block;
    background-color: var(--primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin-top: 1rem;
    
    &:hover {
      background-color: var(--dark);
    }
  }
  
  .error-container {
    text-align: center;
    padding: 3rem 1rem;
    
    p {
      color: #b91c1c;
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
    }
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    
    .order-header {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .item-list {
      grid-template-columns: 1fr;
    }
    
    .form-actions {
      flex-direction: column;
      
      button {
        width: 100%;
      }
    }
    
    .star-rating {
      justify-content: center;
      
      .star {
        font-size: 1.75rem;
      }
    }
  }
`;

export default Wrapper;