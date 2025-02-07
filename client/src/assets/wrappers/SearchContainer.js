import styled from "styled-components";


const Wrapper = styled.div`

.section{
    max-width: 100%;
}

.form {
  width: 80%;
  padding: 1rem 2rem;
  margin: 0 auto;
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
  width: 80%;
  padding: 0.375rem 0.75rem;
  border-radius: var(--border-radius);
  background: var(--primary-500);
  border: 1.5px solid var(--primary-900);
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