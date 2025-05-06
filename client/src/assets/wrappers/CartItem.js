import styled from "styled-components";

const Wrapper = styled.div`
  .cartItem {
    width: 100%;
    margin-bottom: 2rem;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: var(--white, #fff);
  }

  .cartItemContainer {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    align-items: start;

    @media (min-width: 480px) {
      grid-template-columns: 1fr 3fr;
    }
  }

  .mealImage {
    display: flex;
    justify-content: center;
    align-items: center;
   
    img {
      width: 100%;
      max-width: 120px;
      height: auto;
      border-radius: 0.5rem;
      object-fit: cover;
      transition: transform 0.3s ease;
     
      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .ingredients {
    width: 100%;
    overflow-x: hidden;

    h3 {
      font-size: 1.25rem;
      color: var(--darkest, #333);
      margin-bottom: 1rem;
      font-weight: 600;
      border-bottom: 2px solid var(--primary, #f0f0f0);
      padding-bottom: 0.5rem;
    }
   
    ul {
      list-style: none;
      padding: 0;
      margin: 0 0 1.5rem 0;
      width: 100%;
     
      li {
        margin-bottom: 0.8rem;
        padding: 0.5rem;
        border-radius: 0.25rem;
        background-color: var(--background, #f9f9f9);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        flex-wrap: wrap;
        
        span {
          color: var(--dark); 
          font-weight: 500;
          text-transform: capitalize;
          line-height: 1.5;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
          min-width: 150px;
        }
       
        div {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
       
        select {
          padding: 0.25rem;
          border: 1px solid var(--primary-light, #ddd);
          border-radius: 0.25rem;
          background-color: var(--white, #fff);
          width: 60px;
        }
       
        .removeIngredient {
          padding: 0.2rem 0.2rem;
          background-color: var(--primary);
          color: var(--light);
          border: none;
          font-size: 1rem;
          border-radius: 0.25rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
         
          &:hover {
            background-color: var(--darkest);
          }
        }
      }
    }
   
    p {
      font-weight: bold;
      font-size: 1.1rem;
      margin-bottom: 1rem;
      color: var(--darkest, #333);
    }
   
    .btn-primary {
      padding: 0.5rem 1rem;
      background-color: var(--primary, #3498db);
      color: white;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
     
      &:hover {
        background-color: var(--primary-dark, #2980b9);
      }
    }
  }
  
  .btn-primary svg {
    font-size: 1rem;
    margin-bottom: -2px;
  }
`;

export default Wrapper;