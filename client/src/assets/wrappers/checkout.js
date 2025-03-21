import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem 1rem;

  .checkout-container {
    width: 90%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin: 0 auto;
    
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .checkout-card {
    width: 100%;
    margin-bottom: 2rem;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: var(--white, #fff);
  }

  .form-label {
  display: block;
  font-size: var(--small-text);
  margin-bottom: 0.2rem;
  text-transform: capitalize;
  line-height: 1.2;
  color: var(--primary-600);
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.375rem 0.75rem;
  border-radius: var(--border-radius);
  background: var(--dark);
  border: 1.5px solid var(--darkest);
  color: var(--white);
  cursor: pointer;
}

.form-row {
  margin-bottom: 1rem;
  outline: none;
}

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .payment-methods {
    margin-top: 1.5rem;
  }

  .payment-options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .payment-options span{
    color: var(--dark, #4b5563);
  }

  .payment-label {
    display: flex;
    align-items: center;
    
    span {
      margin-left: 0.5rem;
    }
  }

  .btn-primary {
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: var(--primary, #3498db);
    color: white;
    border: none;
    border-radius: 0.375rem;
    margin-top: 1.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: var(--dark, #2980b9);
    }
    
    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }

  /* .paypal-container {
    margin-top: 1.5rem;
  } */

.bank-transfer-container {
  margin-top: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: var(--lightest, #f9f9f9);
}

.bank-details {
  margin-bottom: 1.5rem;
}

.bank-details h4 {
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: var(--dark, #4b5563);
}

.bank-details p {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  color: var(--dark, #4b5563);
  line-height: 1.5;
}

.bank-instruction {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #e6f7ff;
  border-left: 3px solid #ff5722;
  font-size: 0.9rem;
}

.transfer-confirmation {
  margin: 1.5rem 0;
}

.transfer-confirmation span{
  color: var(--secondary, #4b5563);
}

.confirmation-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.confirmation-label input {
  margin-right: 0.5rem;
}

.confirmation-label span {
  font-weight: 500;
}

  .order-item {
    border-bottom: 2px solid var(--secondary, #e5e7eb);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }

  .order-item-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .order-item-details {
    display: flex;
    align-items: center;
  }

  .item-image {
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    border-radius: 0.375rem;
    margin-right: 0.75rem;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }

  .item-name {
    font-weight: 500;
    color: var(--darkest, #333);
    line-height: 1.5;
    font-size: 1.125rem;
  }

  .ingredients-list {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 1.5rem;
  }

  .ingredient-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.875rem;
    color: var(--dark, #4b5563);
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    background-color: var(--background, #f9f9f9);
  }

  .summary-section {
    /* border-top: 1px solid var(--secondary, #ff5722); */
    padding-top: 1rem;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .summary-row span{
    color: var(--dark, #4b5563);
  }

  .total-row {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    font-size: 1.125rem;
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 2px solid var(--secondary, #e5e7eb);
  }
  
  .total-row span{
    color: var(--dark, #4b5563);
  }
  
  @media (max-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
    
    .item-image {
      max-width: 120px;
    }
  }
`;

export default Wrapper;