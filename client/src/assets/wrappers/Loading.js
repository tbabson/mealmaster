import styled from "styled-components";


const Wrapper = styled.div`
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}


.loading{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    h1{
        font-size: 2rem;
        font-weight: 700;
        animation: spinner 0.6s linear infinite;
    }
    color: var(--light);
}


`


export default Wrapper;