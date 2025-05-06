import styled from "styled-components";

const Wrapper = styled.div`
  .admin-main {
    min-height: 100vh;
    background: var(--bg-light);
  }
  
  .nav-container {
    background: var(--white);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .nav-center {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    position: relative;
  }
  
  .logo-container {
    display: flex;
    align-items: center;
  }
  
  .admin-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--dark);
  }
  
  .nav-links {
    display: none;
  }
  
  .menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.5rem;
    cursor: pointer;
    color: var(--primary);
    transition: color 0.3s ease;
  }

  .menu-toggle:hover {
    color: var(--primary);
  }

  .menu-toggle svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--white);
    padding: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 99;
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform-origin: top;
  }
  
  .mobile-link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    margin-bottom: 0.25rem;
    border-radius: 0.375rem;
    border-left: 4px solid transparent;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--primary);
    transition: all 0.3s ease;
  }
  
  .mobile-link:hover {
    background: var(--bg-hover);
    border-left-color: var(--gray-300);
    color: var(--text-dark);
  }
  
  .mobile-link.active {
    background: var(--primary-light);
    border-left-color: var(--primary);
    color: var(--darkest);
  }
  
  .mobile-logout {
    display: flex;
    align-items: center;
    width: 100%;
    text-align: left;
    padding: 0.75rem 1rem;
    margin-top: 0.5rem;
    border: none;
    border-radius: 0.375rem;
    border-left: 4px solid transparent;
    background: transparent;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--primary);
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .mobile-logout:hover {
    background: var(--red-50);
    border-left-color: var(--red-300);
  }
  
  .content-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem 1rem;
  }
  
  .content-wrapper {
    background: var(--white);
    border-radius: 0.5rem;
    padding: 1.5rem;
    min-height: calc(100vh - 10rem);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  /* Tablet and up */
  @media (min-width: 768px) {
    .nav-header {
      justify-content: flex-start;
    }
    
    .nav-links {
      display: flex;
      align-items: center;
      margin-left: 2rem;
      gap: 0.5rem;
    }
    
    .nav-link {
      display: inline-flex;
      align-items: center;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--primary);
      transition: all 0.3s ease;
    }
    
    .nav-link:hover {
      background: var(--bg-hover);
      color: var(--darkest);
    }
    
    .nav-link.active {
      background: var(--primary-light);
      color: var(--darkest);
    }
    
    .desktop-logout {
      margin-left: auto;
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.375rem;
      background: var(--red-600);
      color: var(--primary);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .desktop-logout:hover {
      background: var(--darkest);
    }
    
    .menu-toggle {
      display: none;
    }

    .mobile-menu {
      display: none;
    }
  }

  /* Large screens */
  @media (min-width: 1024px) {
    .nav-center {
      padding: 0 2rem;
    }
    
    .nav-links {
      margin-left: 3rem;
      gap: 1rem;
    }
    
    .nav-link {
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }
    
    .content-container {
      padding: 2rem;
    }
    
    .content-wrapper {
      padding: 2rem;
    }
  }
`;

export default Wrapper;