import styled from "styled-components";


const Wrapper = styled.div`
.section-title{
margin: 1rem 0;
width: 100%;
}

.section-title-container{
width: 90%;
margin: 0 auto;
}

.section-title h2{
text-transform: capitalize;
padding-bottom: 0.5rem;
color: var(--secondary);
font-weight: 600;
font-size: 1.2rem;
}

.section-title p{
//padding: 0.5rem 1rem;
color: var(--primary);
font-size: 1rem;
//font-family: "Roboto", sans-serif;
}

@media (min-width: 700px){
.section-title h2{
text-transform: capitalize;
padding-bottom: 0.5rem;
color: var(--secondary-600);
font-weight: 600;
font-size: 1.5rem;
}

.section-title p{
//padding: 0.5rem 1rem;
color: var(--primary-600);
font-size: 1.3rem;
}

}

`

export default Wrapper;