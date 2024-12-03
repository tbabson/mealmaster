import styled from 'styled-components'

const Wrapper = styled.section`
.registerContainer{
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin: auto;
  overflow: hidden
}

.caption{
    width: 100vw;
  max-width: var(--fixed-width);
  margin: 4rem auto -1rem;
  text-align: center;
}

.logo{
    width: 12rem;
    height: auto;
}

.caption p{
color: var(--primary-900);
line-height: 20px;
}

.caption p span{
color: var(--secondary-900);
font-weight: 800;
}

.registerForm h3{
    text-transform: capitalize;
    color: var(--primary-900);
    font-weight: 600;
    margin: 1rem 0;
}

.form {
  width: 100vw;
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
    margin-top: -0.4rem 0 -0.5rem;
    text-align: center;
    line-height: 1.5;
    color: var(--primary-900)
  } 

.member p {
    margin-top: -0.4rem;
    text-align: center;
    line-height: 1.5;
    color: var(--primary-900)
  } 
  
  .member-btn {
    color: var(--secondary-900);
    margin-left: 0.25rem;
    font-weight: 600;
  }

`
export default Wrapper