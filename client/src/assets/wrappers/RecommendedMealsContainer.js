import styled from "styled-components";


const Wrapper = styled.div`
.recommended-meals-container{
    margin: 0 auto 1.5rem;
    width: 90%;
    display:flex;
    /* justify-content: center;
    align-items: center;  */
    flex-direction: column;
    
}

.recommended-meals-container h3{
    margin-left: 0;
    text-align: left;
    font-family: "Roboto", sans-serif;
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--accent-600);
}

.recommended-meal{
        margin: 1rem auto;
    }

.meal-details{
    text-decoration: none;
}

.meal-details h2{
    padding: 0.5rem 0 0.3rem;
    color: var(--primary-800);
    font-weight: 600;
    font-size: 1.4rem;
    text-transform: capitalize;
    line-height: 1.5rem;
    max-width: 90%;
}

.meal-details p{
    color: var(--secondary-400);
    font-size: 1rem;
    text-transform: capitalize;
    font-family: "Roboto", sans-serif;
}
    
.recommended-meal img {
        //margin-top: 6rem;
        max-width: 90%; /* Scales down the image to fit its container */
        height: auto; /* Maintains the aspect ratio */
        border-radius: var(--border-radius);
        object-fit: contain;
        transition: transform 0.3s;
    }


     @media (min-width: 800px){
.recommended-meals-container{
    margin: 0 auto 1.5rem;
    width: 90%;
    display:flex;
    /* justify-content: center;
    align-items: center;  */
    flex-direction: row;
    
}
     }


`

export default Wrapper;