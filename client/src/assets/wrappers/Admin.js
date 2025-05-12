import styled from "styled-components";

const Wrapper = styled.div`
  .admin-main {
    display: flex;
    min-height: 100vh;
    position: relative;
  }

  .toggle-btn {
    position: fixed;
    top: 1rem;
    left: 1rem;
    background: var(--primary-500);
    color: var(--white);
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: none; // Hidden by default, will be shown on mobile
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 1000;
    
    &:hover {
      background: var(--primary-700);
      transform: scale(1.05);
    }
  }

  .sidebar {
    width: 250px;
    background: var(--primary-500);
    padding: 4rem 1rem 2rem;
    color: white;
    position: fixed;
    height: 100vh;
    transition: all 0.3s ease-in-out;
    z-index: 999;

    @media (max-width: 768px) {
      width: 250px;
      left: -250px; // Off-screen by default on mobile
      top: 0;
      bottom: 0;
      
      &.open {
        left: 0; // Slide in when open
      }
    }
  }

  .logo-container {
    margin-bottom: 2rem;
    text-align: center;
  }

  .admin-title {
    font-size: 1.5rem;
    margin: 0;
    white-space: nowrap;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    color: var(--white);
    text-decoration: none;
    border-radius: 0.5rem;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
      background: var(--primary-700);
    }

    &.active {
      background: var(--primary-800);
    }
  }

  .icon-spacing {
    margin-right: 0.75rem;
    font-size: 1.2rem;
    min-width: 1.2rem;
  }

  .logout-btn {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.75rem 1rem;
    margin-top: 2rem;
    color: var(--white);
    background: var(--primary-700);
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
      background: var(--primary-800);
    }
  }

  .content-container {
    flex: 1;
    transition: margin-left 0.3s ease-in-out;
    min-height: 100vh;
    padding: 1rem;
    margin-left: 250px;

    @media (max-width: 768px) {
      margin-left: 0; // Full width on mobile
      padding: 0.5rem;
    }
  }

  .content-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 3rem;

    @media (max-width: 768px) {
      padding-top: 1rem;
    }
  }

  // Mobile-specific adjustments
  @media (max-width: 768px) {
    .toggle-btn {
      display: flex; // Show toggle button on mobile
    }
  }
`;

export default Wrapper;