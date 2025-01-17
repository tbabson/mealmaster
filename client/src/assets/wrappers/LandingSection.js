import styled from "styled-components";


const Wrapper = styled.div`


.landing-sections{
    margin: 0 auto 1.5rem;
    width: 100%;
    background-color: var(--accent-50);
    padding: 1rem 0 2rem;

}

.section-title{
    margin-bottom: 1rem;
}


.section{
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1.5rem;
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
}

.section img{
     max-width: 90%; /* Scales down the image to fit its container */
        height: auto; /* Maintains the aspect ratio */
        //border-radius: var(--border-radius);
        object-fit: contain;
        transition: transform 0.3s;
        box-shadow: var(--shadow-5);
        //box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
        border: 5px solid var(--white);
        margin-top: 1rem;
}

.section-writeup{
    padding-left: 1rem;
    //background-color: var(--grey-600);
    max-width: 90%;
    margin-top: 1rem;
    margin-left: -2rem;
    //border: 5px solid var(--white);
}
.section-writeup h3{
    color: var(--primary-800);
    font-size: 1.2rem;
    font-weight: 600;
    font-family: "Roboto", sans-serif;
    line-height: 1.3rem;
}

.section-writeup p{
    color: var(--primary-800);
    font-size: 0.8rem;
    line-height: 1.3rem;
}

.single-line-border {
  border: 1px solid #ff5722;
  width: 80vw;
  text-align: center;  
  margin: 1.5rem 0 0 2.8rem;
}

 @media (min-width: 700px){
    .section-container{
        
    }

    .section{
    display:flex;
    flex-direction: row;
    }
    
 }



`

export default Wrapper;