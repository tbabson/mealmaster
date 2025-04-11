import styled from "styled-components";

const Wrapper = styled.div`
.center-title p{
    text-align: center;
    margin: 0 auto;
    margin-top: 5rem;
}

.login-prompt{
    width: 90%;
   text-align: center;

    .btn-primary{        
        margin-bottom: 2rem;
    }
}



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
.cartTotals{
    
    margin: 0 0 2rem;

    @media (min-width: 768px){
        margin-top: -2rem;
    }

}




`

export default Wrapper;