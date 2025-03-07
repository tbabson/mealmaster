import styled from "styled-components";

const Wrapper = styled.div`
.cartContainer{
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    width: 90%;
    margin: 0 auto;

    @media (max-width: 768px){
        grid-template-columns: 1fr;
    }

    @media (min-width: 768px){
        grid-template-columns: 2fr 1fr;
    }

    @media (min-width: 1024px){
        grid-template-columns: 2fr 1fr;
    }
}




`

export default Wrapper;