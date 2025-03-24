import styled from 'styled-components';

const Wrapper = styled.main`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  
  h1 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 0.75rem;
  }
  
  h2 {
    font-size: 1.3rem;
    font-weight: 500;
    color: #4a5568;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .section {
    margin-bottom: 2rem;
    padding: 1.25rem;
    background-color: #f8fafc;
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
      color: #64748b;
      margin-bottom: 0.5rem;
    }
    
    .order-id {
      font-family: monospace;
      background-color: #f1f5f9;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      color: #334155;
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
      color: #2d3748;
      margin-bottom: 0.25rem;
    }
    
    .quantity {
      color: #64748b;
      font-size: 0.9rem;
    }
  }
  
  .order-summary, .shipping-address {
    p {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px dashed #e2e8f0;
      
      &:last-child {
        border-bottom: none;
      }
      
      span:first-child {
        color: #64748b;
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
        color: #1a56db;
      }
    }
    
    .status {
      span:last-child {
        background-color: #dcfce7;
        color: #166534;
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.85rem;
      }
    }
    
    .paid span:last-child {
      color: #15803d;
    }
    
    .not-paid span:last-child {
      color: #b91c1c;
    }
  }
  
  .shipping-address {
    p {
      justify-content: flex-start;
      border-bottom: none;
      padding: 0.25rem 0;
      color: #334155;
    }
  }
  
  .back-button {
    display: inline-block;
    background-color: #3b82f6;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin-top: 1rem;
    
    &:hover {
      background-color: #2563eb;
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