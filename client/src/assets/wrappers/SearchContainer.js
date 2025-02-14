import styled from "styled-components";


const Wrapper = styled.div`

.section{
    max-width: 100%;
    margin-bottom: 2rem;
}

.form {
  width: 100%;
  padding: 1rem 2rem;
  margin: 0 auto;
}

.formCenter {
    display: grid;
    row-gap: 0;
    /* width: 100%; */
    margin: 0 auto;


    @media (min-width: 768px) {
    
    
      grid-template-columns: 1fr 1fr ;
      align-items: center;
      column-gap: 1rem;
      width: 100%;
      margin: 0 auto;
    
    /* .form-btn {
      grid-column: span 4;
      justify-self: center;
      width: 25%;
    } */
   
  }

  @media (min-width: 1024px) {
    
      grid-template-columns: 1fr 1fr 1fr;
      width: 90%;
       margin: 0 auto 2rem;
    
    /* .form-btn {
      grid-column: span 6;
      justify-self: center;
      width: 25%;
    } */
  }
    }

.form-label {
  display: block;
  font-size: var(--small-text);
  margin-bottom: 0.2rem;
  text-transform: capitalize;
  line-height: 1.2;
  color: var(--primary-600);
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.375rem 0.75rem;
  border-radius: var(--border-radius);
  background: var(--primary);
  border: 1.5px solid var(--darkest);
  color: var(--white);
  cursor: pointer;
}

.formRow-input{
  cursor: text;
}

.form-row {
  margin-bottom: 1rem;
  outline: none;
}




`

export default Wrapper