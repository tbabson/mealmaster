import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 2rem;

  .dashboard-header {
    margin-bottom: 2rem;
    text-align: center;

    h2 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: var(--primary-500);
    }

    p {
      color: var(--grey-600);
    }
  }

  .dashboard-modules {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .dashboard-module {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    padding: 1.5rem;
    transition: var(--transition);
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--textColor);

    &:hover {
      box-shadow: var(--shadow-4);
      transform: translateY(-5px);
    }
  }

  .module-icon {
    font-size: 2rem;
    margin-right: 1rem;
    color: var(--primary-500);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dashboard-icon {
    font-size: 2rem;
  }

  .module-content {
    h3 {
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    p {
      color: var(--grey-600);
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;
    
    .dashboard-modules {
      grid-template-columns: 1fr;
    }
  }
`;

export default Wrapper;