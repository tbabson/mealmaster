import styled from 'styled-components'

const Wrapper = styled.nav`
  background: var(--transparent-background);
  position: relative;

  .nav-center {
    width: 80%;
    max-width: 80%;
    margin: 0 auto;
    padding: 1rem;
  }
 

  .nav-display {
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
  }
  .logo {
    width: 200px;
    height: auto;
  }

@media (max-width: 800px){
.nav-center {
    width: 90%;
    max-width: 90%;
    margin: 0 auto;
    padding: 0.5rem;
  }
 .logo {
    width: 130px;
    height: auto;
    margin-top: 0.5rem;
  }
}

  .nav-toggle {
    font-size: 2rem;
    color: var(--primary-900);
    background: none;
    border: none;
    cursor: pointer;
    transition: var(--transition);
    padding: 0;
  }

.nav-links{
z-index: 1200;

}

a.nav-link{
       padding-bottom: 0;
          margin-bottom: 0;
          display: inline-block;
          height: 10%;
      
}


  .nav-toggle:hover {
    color: var(--secondary-900);
  }
  .nav-links-container {
    overflow: hidden;
    transition: var(--transition);
    position: absolute;  // Change this from relative to absolute
    //bottom: 5%;  // Position it above the nav toggle
    left: 0;
    right: 30px;
    background: var(--transparent-background);  // Add background
    overflow: hidden;
    margin-top: -3rem;
    transition: var(--transition);
    max-height: 0;  // Change height to max-height
  }
  .show-menu {
    /* height: auto; */
    max-height: 500px;  // Adjust this value as needed
  }
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 0;
    align-items: flex-end;
    height: 300px;
    width: 98%;
  }
  .nav-link {
    font-weight: 600;
    color: var(--primary-900);
    transition: var(--transition);
    letter-spacing: var(--letter-spacing);
  }
  .nav-link:hover {
    color: var(--secondary-900);
  }
  /* .nav-link span {
    font-weight: 500;
    color: var(--primary-900);
    background-color: var(--white);
    padding: 0.4rem 0.7rem;
    transition: var(--transition);
    letter-spacing: var(--letter-spacing);
    border-radius: var(--border-radius);
  }
  .nav-link span:hover {
    color: var(--white);
    background: var(--primary-900);
  } */
  .active {
    color: var(--secondary-900);
  }
  /* .active span {
    color: var(--secondary-900);
  } */


  @media (min-width: 800px) {
    .nav-toggle {
      display: none;
    }
    .nav-links-container {
           position: static;  // Reset position for larger screens
      max-height: none;  // Reset max-height
      overflow: none;
      background: none;  // Remove background
      margin-top: -8.5rem;
    }
.nav-link {
    margin-top: 8px;
  }

  .logo {
    margin-top: -1.5rem;
  }

.nav-links {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
       margin-top: -10px;
       align-items: normal;
      gap: 0.8rem;
      height: 50%;
    }


    /* .a.nav-link{
          padding-bottom: 0;
          margin-bottom: 0;
          display: inline-block;
    } */

}


    
  
`

export default Wrapper