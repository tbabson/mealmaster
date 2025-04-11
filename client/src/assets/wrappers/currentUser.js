import styled from 'styled-components';

const Wrapper = styled.div`
  .currentUser {
    background: var(--darkest);
    width: 100%;
    margin: 0 auto;
  }

  .currentUserContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    max-width: 90%;
    margin: 0 auto;
    padding: 1rem 2rem;
    flex-wrap: nowrap;
    overflow-x: auto;
  }

  .user-name {
    color: var(--light);
    text-transform: capitalize;
    font-size: 1rem;
    font-weight: 500;

    @media (min-width: 768px) {
      font-size: 1.1rem;
    }
  }

  .logAndCart {
    display: flex;
    align-items: center;
    gap: 1rem;
    white-space: nowrap;
  }

  .login-btn,
  .logout-btn {
    background: var(--transparent);
    color: var(--light);
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: underline;
    transition: background 0.3s, color 0.3s;
    white-space: nowrap;
  }

  .login-btn:hover,
  .logout-btn:hover {
    background: var(--transparent);
    color: var(--dark);
  }

  .indicator {
    position: relative;
    cursor: pointer;
    color: var(--secondary);
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .indicator span {
    position: absolute;
    top: -10px;
    right: -14px;
    background: var(--light);
    color: var(--primary);
    border-radius: 50%;
    font-size: 10px;
    padding: 2px 6px;
    font-weight: 600;
  }
`;

export default Wrapper;
