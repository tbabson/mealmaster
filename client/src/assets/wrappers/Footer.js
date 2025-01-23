import styled from "styled-components";

const Wrapper = styled.div`
.footer-container{
    background: linear-gradient(90deg, #0e2510, #275429);
    padding: 2rem 2rem;
    width: 100%;
}

.footer{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    width: 90%;
    margin: 3rem auto;
    gap: 3.5rem;
}

.footer-section{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.footer-title{
    color: var(--primary-100);
    font-size: 1.5rem;
    font-weight: 600;
}

.footer-writeup{
    color: var(--primary-200);
    font-size: 1rem;
    line-height: 1.5;
}

.footer-form{
    display: flex;
    flex-direction: row;
    
}

.footer-input{
   padding: 0.375rem 0.75rem;
   background: var(--primary-100);
  border: transparent;
  color: var(--primary-500);
  outline: none;
}

.footer-input::placeholder {
  color: var(--secondary-500);
  font-size: 15px;
  text-transform: capitalize;
}

.btn-footer{
    cursor: pointer;
  color: var(--white);
  background: var(--secondary-500);
  border: transparent;
  padding: 0.375rem 0.75rem;
  text-transform: capitalize;
  display: inline-block;
  font-size: 15px;
}
.btn-footer:hover{
 background: var(--primary-500);
 }

.footer-menu{
    display: flex;
    flex-direction: column;
}

.footer-link{
    color: var(--primary-200);
    font-size: 1rem;
    text-decoration: none;
    margin: 0.5rem 0;
}

.footer-logo{
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 0.5rem;
}

.logo{
    width: 20rem;
    height: auto;
    margin: -3rem -1.8rem -3.6rem;
}

.footer-logo p{
    font-size: 1rem;
    color: var(--primary-200);
}

.icon{
    margin-right: 0.5rem;
}

.divider{
    border: 1px solid var(--primary-500);
    width: 100%;
    margin: 0 auto;
}

.social-media{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    font-size: 1.3rem;
    color: var(--primary-600);
}
.social-media a{
    text-decoration: none;
}

@media (min-width: 800px) {
.footer{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    width: 90%;
    margin: 3rem auto;
    gap: 3.5rem;
}

.footer-section{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
}


}

@media (max-width: 1024px) {
.footer{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    width: 90%;
    margin: 3rem auto;
    gap: 3.5rem;
}


`

export default Wrapper; 