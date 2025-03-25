import styled from 'styled-components';

const Wrapper = styled.section`
  max-width: 90%;
  margin: 0 auto;
  padding: 2rem 1rem;

  .login-container {
    text-align: center;
    padding: 3rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin: 2rem auto;
    max-width: 500px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .login-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }

  .login-button {
    background-color: #4b70e2;
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #3a5bbf;
    }
  }

  .orders-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .orders-title {
    font-size: 1.8rem;
    color: var(--darkest);
    margin: 0;
  }

  .orders-count {
    color: #666;
    background-color: #f0f0f0;
    padding: 0.3rem 0.8rem;
    border-radius: 50px;
    font-size: 0.9rem;
  }

  .no-orders {
    max-width: 100%;
    text-align: center;
    padding: 3rem;
    background-color: var(--light);
    border-radius: 8px;
    margin: 2rem auto;
  }

  .no-orders h2{
    color: var(--dark);
    margin-bottom: 1rem;
  }
  .no-orders p{
    color: var(--dark);
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  .orders-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .order-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    padding: 1.2rem;
    background-color: #f9f9f9;
    border-bottom: 1px solid #eaeaea;
  }

  .order-number {
    font-weight: 600;
  }

  .order-date {
    color: #666;
    font-size: 0.9rem;
  }

  .order-content {
    padding: 1.2rem;
  }

  .order-items {
    margin-bottom: 1.5rem;
  }

  .item-preview {
    display: flex;
    align-items: center;
  }

  .item-images {
    display: flex;
    margin-right: 1rem;
  }

  .item-image {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    object-fit: cover;
    border: 2px solid white;
    margin-right: -10px;
    
    &:last-child {
      margin-right: 0;
    }
  }

  .items-count {
    font-size: 0.9rem;
    color: #666;
  }

  .order-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    border-top: 1px solid #eaeaea;
  }

  .order-total {
    font-weight: 600;
    font-size: 1.1rem;
  }

  .status-badge {
    display: inline-block;
    padding: 0.4rem 0.8rem;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 600;
    color: white;
    
    &.pending {
      background-color: #f7b955;
    }
    
    &.processing {
      background-color: #3498db;
    }
    
    &.shipped {
      background-color: #2ecc71;
    }
    
    &.delivered {
      background-color: #27ae60;
    }
    
    &.cancelled {
      background-color: #e74c3c;
    }
  }

  .view-button {
    display: block;
    text-align: center;
    background-color: #4b70e2;
    color: white;
    text-decoration: none;
    padding: 0.8rem;
    border-radius: 4px;
    font-weight: 500;
    margin-top: 1rem;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #3a5bbf;
    }
  }

  .error-message {
    color: #e74c3c;
    background-color: #fde8e8;
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
  }

  @media (min-width: 768px) {
    .orders-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .orders-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default Wrapper;