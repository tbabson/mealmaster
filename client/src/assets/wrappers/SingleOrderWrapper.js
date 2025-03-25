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
  }
`;

export default Wrapper;