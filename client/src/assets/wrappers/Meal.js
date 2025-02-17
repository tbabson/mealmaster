import styled from "styled-components";

const Wrapper = styled.div`

a{
    text-decoration: none;
}

.mealCard{
    width: 90%;
    margin: auto;
    border-radius: 1rem;
    box-shadow: var(--shadow-1);
    transition: 0.3s;
    animation: fadeIn 1s;
    height: 430px;
    flex-direction: column;
    background: var(--white);
    overflow: hidden;

    /* @media (min-width: 425px) {
        height: 450px;
    }
    @media (min-width: 768px) {
        height: 500px;
    }
    @media (min-width: 1024px) {
        height: 470px;
    }
    @media (min-width: 1440px) {
        height: 450px;
    } */
}


.mealCardImage{
  width: 100%;
  flex: 1;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  overflow: hidden;
}

.mealCardImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mealInfo{
    padding: 1.5rem;
    flex: 0 0 auto;
}

.mealInfo h3{
    font-size: 1rem;
    color: var(--darkest);
    font-weight: 600;
    margin-bottom: 0.5rem;
    line-height: 1.3;

    @media (min-width: 768px) {
        font-size: 1.2rem;
    }
    @media (min-width: 1024px) {
        font-size: 1.4rem;
    }
}

.mc{
    display: flex;
    font-weight: 400;    
    text-transform: capitalize;
    color: var(--dark);
    margin: 0.5rem 0;
    line-height: 1.5;
    flex-wrap: wrap;
}

.mc p{    
    margin-right: 1rem;
    flex-shrink: 0;
}

.mc .icon{
    color: var(--secondary);
    font-size: 1rem;
    margin-right: 0.2rem;
}

.mealOption {
    display: flex;
    justify-content: space-between;
    margin-top: auto; /* Push this section to the bottom of the card */
  }

  .mealOption p {
    font-size: 0.9rem;
    color: var(--dark);
    cursor: pointer;
    transition: color 0.3s;
  }

  .mealOption p:hover {
    color: var(--primary); /* Change color on hover */
  }
`

export default Wrapper