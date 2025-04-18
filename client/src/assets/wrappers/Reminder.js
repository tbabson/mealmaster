import styled from 'styled-components';

const Wrapper = styled.div`
  .reminderContainer{
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    width: 90%;
    margin: 2rem auto;

    @media (max-width: 768px){
        grid-template-columns: 1fr;
    }

    @media (min-width: 768px){
        grid-template-columns: 1.5fr 1fr;
    }

    @media (min-width: 1024px){
        grid-template-columns: 1.5fr 1fr;
    }
  }

  .reminderMealDetails {
    background-color: var(--white);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  h2 {
    text-align: center;
    color: var(--dark);
    margin-bottom: 20px;
    font-size: 25px;
    line-height: 1.5;
    font-weight: 600;
  }

  .meal-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .ingredients {
    margin-bottom: 2rem;
    
    h3 {
      color: var(--dark);
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--light);
      padding-bottom: 0.8rem;
    }
    
    ul {
      padding-left: 20px;
      
      li {
        margin-bottom: 0.5rem;
        color: var(--medium);
        text-transform: capitalize;
        font-size: 18px;
      }
    }
  }

  .howTo {
    margin-bottom: 20px;
    
    h3 {
      color: var(--dark);
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--light);
      padding-bottom: 0.8rem;
    }
    
    ol {
      padding-left: 20px;
      
      li {
        margin-bottom: 0.5rem;
        color: var(--medium);
        text-transform: capitalize;
        font-size: 18px;
        text-decoration: none;
        list-style: none;
      }
    }
    
    p {
      margin-bottom: 10px;
      color: var(--medium);
      line-height: 1.5;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
    
    label {
      font-weight: 600;
      color: var(--dark);
    }
    
    input {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
      color: var(--primary);
      
    }
    select {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
      color: var(--primary);
      background: var(--light);
      
    }
  }

  /* New styling for the date, time, and period inputs */
  .datetime-group {
    display: flex;
    gap: 10px;

    input[type="date"],
    input[type="time"] {
      flex: 1;
    }

    select {
      width: 100px;
    }
  }

  .checkbox-group {
    flex-direction: row;
    align-items: center;
    gap: 10px;
    
    input[type="checkbox"] {
      margin-right: 10px;
    }
  }

  .submit-btn {
    background-color: var(--primary);
    color: white;
    border: none;
    padding: 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    margin-top: 10px;
    
    &:hover {
      background-color: var(--darkest);
    }
    
    &:disabled {
      background-color: var(--darkest);
      cursor: not-allowed;
    }
  }

  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
`;

export default Wrapper;
