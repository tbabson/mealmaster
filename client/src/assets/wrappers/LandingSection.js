import styled from "styled-components";


const Wrapper = styled.div`
.landing-sections{
    margin: 0 auto 1.5rem;
    width: 100%;
    background-color: var(--accent-50);
    padding: 1rem 0 2rem;

}

.section-container{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1.5rem;
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
}

.section-container img{
     max-width: 90%; /* Scales down the image to fit its container */
        height: auto; /* Maintains the aspect ratio */
        border-radius: var(--border-radius);
        object-fit: contain;
        transition: transform 0.3s;
}



`

export default Wrapper;