import styled from "styled-components";


const Wrapper = styled.div`
.section-title{
margin: 2.5rem auto 1rem;
width: 90%;


}

.section-title h2{
text-transform: capitalize;
padding-bottom: 0.5rem;
color: var(--secondary-600);
font-weight: 600;
font-size: 1.2rem;
}

.section-title p{
//padding: 0.5rem 1rem;
color: var(--primary-600);
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