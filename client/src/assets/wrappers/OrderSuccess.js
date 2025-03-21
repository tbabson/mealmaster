import styled from "styled-components";

const Wrapper = styled.div`
  .order-success-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    text-align: center;
  }

  .order-card {
    background-color: var(--white, #fff);
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 90%;
    margin: 0 auto;
  }

  .icon-container {
    width: 4rem;
    height: 4rem;
    margin: 0 auto 1rem;
    background-color: var(--light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .check-icon {
    height: 2rem;
    width: 2rem;
    color: var(--secondary);
  }

  .order-title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 1rem;
  }

  .order-message {
    color: var(--medium);
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .order-details {
    text-align: left;
    border-top: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem 0;
    margin: 1rem 0;
  }

  .order-info {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #333;
  }

  .order-status {
    background-color: #fef3c7;
    color: #92400e;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .button-container {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .primary-button,
  .secondary-button {
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    text-decoration: none;
    transition: background-color 0.3s;
    text-align: center;
  }

  .primary-button {
    background-color: #2563eb;
    color: white;
  }

  .primary-button:hover {
    background-color: #1d4ed8;
  }

  .secondary-button {
    background-color: var(--dark);
    color: var(--lightest);
  }

  .secondary-button:hover {
    background-color: var(--light);
    color: var(--dark);
  }
`;

export default Wrapper;
