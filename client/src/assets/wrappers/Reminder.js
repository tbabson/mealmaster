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
    color: #333;
    margin-bottom: 20px;
  }

  .meal-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .ingredients {
    margin-bottom: 20px;
    
    h3 {
      color: #333;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }
    
    ul {
      padding-left: 20px;
      
      li {
        margin-bottom: 5px;
      }
    }
  }

  .howTo {
    margin-bottom: 20px;
    
    h3 {
      color: #333;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }
    
    ol {
      padding-left: 20px;
      
      li {
        margin-bottom: 8px;
      }
    }
    
    p {
      margin-bottom: 10px;
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
      color: #555;
    }
    
    input, select {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
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
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    margin-top: 10px;
    
    &:hover {
      background-color: #45a049;
    }
    
    &:disabled {
      background-color: #cccccc;
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
