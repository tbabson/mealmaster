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

.divider {
  border: 1px solid #ff5722;
  width: 80vw;
  max-width: 90vw;
  text-align: center;  
   margin: 1rem auto 1rem;
}

 @media (min-width: 700px) {
  .section-container {
    display: grid;
    grid-template-columns: 1fr; /* Single column layout for sections */
    gap: 2rem; /* Space between sections */
    width: 90%;
    margin: 0 auto;
  }

  .section {
    display: flex;
    flex-direction: row; /* Stack content vertically */
    align-items: center; /* Center align items horizontally */
    justify-content: center; /* Center align items vertically */
    width: 80%; /* Take 100% of the parent container */
    text-align: left; /* Center text alignment */
    margin: 0 auto; /* Center horizontally */
    padding: 0 1rem; /* Add spacing inside */
  }

  .section img {
    max-width: 50%; /* Scale image to fit the container */
    width: 40%; /* Ensure image takes up full width of container */
    height: auto; /* Maintain aspect ratio */
    margin-bottom: 1rem; /* Add spacing below image */
  }

  .section-writeup {
    width: 50%; /* Ensure text takes up full width of the section */
    padding: 0 1rem; /* Add some padding for readability */
    margin-left: 0.5rem; /* Add spacing between image and text */
  }

  .divider {
    border: 1px solid #ff5722;
    width: 80%;
    margin: 1rem auto; /* Center divider */
  }
}





`

export default Wrapper;