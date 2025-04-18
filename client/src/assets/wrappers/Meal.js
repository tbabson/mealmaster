import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Responsive grid */
  gap: 1.5rem;
  justify-items: center;
  padding: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(250px, 1fr)); /* 2 columns on tablets */
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(250px, 1fr)); /* 3 columns on larger screens */
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, minmax(250px, 1fr)); /* 4 columns on extra-large screens */
  }

  a {
    text-decoration: none;
  }

  .mealCard {
    width: 100%;
    max-width: 350px;
    border-radius: 1rem;
    box-shadow: var(--shadow-1);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    background: var(--white);
    overflow: hidden;
    display: flex;
    flex-direction: column;

    /* &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-2); 
    } */
  }

  .mealCardImage {
    width: 100%;
    height: 200px; /* Fixed height for consistent card sizes */
    overflow: hidden;
  }

  .mealCardImage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease-in-out;

    @media (min-width: 768px){
        &:hover {
          transform: scale(1.1); /* Slight zoom effect on hover */
        }
      }
    }

  .mealInfo {
    padding: 1.5rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .mealName {
    font-size: 1.2rem;
    color: var(--darkest);
    font-weight: 600;
    margin-bottom: 0.8rem;
    line-height: 1.3;
    position: relative;

    @media (min-width: 768px) {
      font-size: 1.3rem;
      margin-bottom: 1rem;      
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 40px;
      height: 2px;
      background: var(--primary);
    }
  }

  .mc {
    display: flex;
    font-weight: 400;
    text-transform: capitalize;
    color: var(--dark);
    margin: 0.8rem 0;
    flex-wrap: wrap;
    align-items: center;
  }

  .mc p {
    margin-right: 1rem;
    flex-shrink: 0;
    line-height: 1.5;
  }

  .mc .icon {
    color: var(--secondary);
    font-size: 1rem;
    margin-right: 0.3rem;
  }

  .mealOption {
    display: flex;
    justify-content: space-between;
    margin-top: 1.25rem;
    padding-top: 0.8rem;
    border-top: 1px solid var(--secondary);
    align-items: center;
    margin-top: auto; /* Push this section to the bottom */
  }

  .mealOption p {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--dark);
  }


`

export default Wrapper;
