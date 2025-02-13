import styled from "styled-components";



const Wrapper = styled.nav`
  background: var(--transparent-background);
  position: relative;

  .nav-center {
    width: 90%;
    margin: 0 auto;
    padding: 0.5rem 0;
  }

  .logo {
    width: 100px;
    height: auto;
  }

  .nav-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-toggle {
    font-size: 2rem;
    color: var(--primary);
    background: none;
    border: none;
    cursor: pointer;
    transition: var(--transition);
  }

  .nav-toggle:hover {
    color: var(--medium);
  }

  .nav-links-container {
    position: absolute;
    left: 0;
    right: 0;
    background: var(--transparent-background);
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease-in-out;
  }

  .show-menu {
    max-height: 500px;
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 0;
    align-items: flex-end;
    margin-right: 2.5rem;
    margin-top: -0.6rem;
  }

  .nav-link {
    font-weight: 600;
    color: var(--lightest);
    transition: var(--transition);
    letter-spacing: var(--letter-spacing);
    background-color: rgba(255, 255, 255, 0.4);
    padding: 0.5rem 1rem;
    border-radius: 6px;
    width: 80%;
    text-align: center;
  }

  .nav-link:hover {
    color: var(--primary);
    transform: scale(1.05);
  }

  .active {
    color: var(--primary);
  }

  /* For screens 768px and above */
  @media (min-width: 768px) {
    .nav-toggle {
      display: none;
    }

    .nav-links-container {
      position: static;
      max-height: none;
      overflow: visible;
      background: none;
      display: flex;
      justify-content: flex-end;
      margin-top: -3rem;
    }

    .nav-links {
      flex-direction: row;
      align-items: center;
      background: rgba(80, 115, 82, 0.5);
      border-radius: 30px;
      padding: 0 0.5rem ;
      margin-top: 0.5rem;
      //gap: 1rem;
    }

    .nav-link {
      background-color: transparent;
      padding: 0.5rem 0.5rem;
    }
  }
`



export default Wrapper; 