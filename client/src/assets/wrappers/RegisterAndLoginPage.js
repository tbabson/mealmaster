import styled from 'styled-components'

const Wrapper = styled.section`
.section{
max-width: 100%
}

.registerContainer{
  max-width: 80%;
  margin: auto;
  overflow: hidden
}

.caption{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    max-width: 80%;
  margin: 0 auto;
  text-align: center;
}

.logo{
  margin-top: 0;
    width: 12rem;
    height: auto;
}

.caption p{
  margin-top: 0;
color: var(--primary-900);
line-height: 20px;
}

.caption p span{
color: var(--secondary-600);
font-weight: 800;
}

.registerForm h3{
    text-transform: capitalize;
    color: var(--primary-900);
    font-weight: 600;
    margin: 1rem 0;
}

.form {
  width: 80%;
  max-width: var(--fixed-width);
  background: var(--grey-500);
  border-radius: 10px;
  padding: 1rem 2rem;
  margin: 2rem auto 4rem;
}

.form-row {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  font-size: var(--small-text);
  margin-bottom: 0.2rem;
  text-transform: capitalize;
  line-height: 1.5;
  color: var(--primary-900);
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.375rem 0.75rem;
  border-radius: var(--border-radius);
  background: var(--secondary-500);
  border: 1.5px solid var(--secondary-900);
  color: var(--secondary-950);
  cursor: text;
  outline: none;
}


.divider2{
    margin: 1.5rem auto;
   width: 100%;
  height: 1px;
  background-color: var(--accent-600);

}

.forgetPassword p {
    margin: 1rem auto;
    text-align: center;
    line-height: 1.5;
    color: var(--primary-600)
  } 

.member p {
    margin-top: -0.4rem;
    text-align: center;
    line-height: 1.5;
    color: var(--primary-600)
  } 
  
  .member-btn {
    color: var(--secondary-700);
    margin-left: 0.25rem;
    font-weight: 600;
  }

`
export default Wrapper