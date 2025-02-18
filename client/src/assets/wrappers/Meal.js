// import styled from "styled-components";

// const Wrapper = styled.div`

// a{
//     text-decoration: none;
// }

// .mealCard{
//     width: 90%;
//     margin: auto;
//     border-radius: 1rem;
//     box-shadow: var(--shadow-1);
//     transition: 0.3s;
//     animation: fadeIn 1s;
//     height: 450px;
//     flex-direction: column;
//     background: var(--white);
//     overflow: hidden;

// }


// .mealCardImage{
//   width: 100%;
//   flex: 1;
//   border-top-left-radius: 15px;
//   border-top-right-radius: 15px;
//   overflow: hidden;
// }

// .mealCardImage img {
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
// }

// .mealInfo{
//     padding: 1.5rem;
//     flex: 0 0 auto;
// }

// .mealInfo h3{
//     font-size: 1rem;
//     color: var(--darkest);
//     font-weight: 600;
//     margin-bottom: 0.5rem;
//     line-height: 1.3;

//     @media (min-width: 768px) {
//         font-size: 1.2rem;
//     }
//     @media (min-width: 1024px) {
//         font-size: 1.4rem;
//     }
// }

// .mc{
//     display: flex;
//     font-weight: 400;
//     text-transform: capitalize;
//     color: var(--dark);
//     margin: 0.5rem 0;
//     line-height: 1.5;
//     flex-wrap: wrap;
// }

// .mc p{
//     margin-right: 1rem;
//     flex-shrink: 0;
// }

// .mc .icon{
//     color: var(--secondary);
//     font-size: 1rem;
//     margin-right: 0.2rem;
// }

// .mealOption {
//     display: flex;
//     justify-content: space-between;
//     margin-top: auto; /* Push this section to the bottom of the card */
//   }

//   .mealOption p {
//     font-size: 0.9rem;
//     color: var(--dark);
//     cursor: pointer;
//     transition: color 0.3s;
//   }

//   .mealOption p:hover {
//     color: var(--primary); /* Change color on hover */
//   }
// `

// export default Wrapper

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

  .mealInfo h3 {
    font-size: 1.2rem;
    color: var(--darkest);
    font-weight: 600;
    margin-bottom: 0.5rem;
    line-height: 1.3;

    @media (min-width: 768px) {
      font-size: 1.3rem;
    }
  }

  .mc {
    display: flex;
    font-weight: 400;
    text-transform: capitalize;
    color: var(--dark);
    margin: 0.5rem 0;
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
    align-items: center;
    margin-top: auto; /* Push this section to the bottom */
  }

  .mealOption p {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--medium);
  }


`

export default Wrapper;
