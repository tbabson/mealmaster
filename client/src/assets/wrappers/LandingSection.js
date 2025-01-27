import styled from "styled-components";


const Wrapper = styled.div`
.landing-sections {
  margin: 0 auto 1.5rem;
  width: 100%;
  background-color: var(--white);
  padding: 1rem 0 2rem;
}

.section-title {
  margin-bottom: 1rem;
}

.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 1rem auto;
  padding: 1rem 0;
}

.section img {
  width: 100%;
  max-width: 400px;
  height: auto;
  border: 2px solid var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-5);
  margin: 0;
}

.section-writeup {
  width: 100%;
  padding: 1rem;
  text-align: left;
  margin: 1rem 0 0 0;
}

.section-writeup h3 {
  color: var(--primary-800);
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 600;  
}


.section-writeup p {
  color: var(--primary-800);
  font-size: 0.95rem;
  
  
}

.divider {
  border: 1px solid #ff5722;
  width: 90%;
  margin: 1.5rem auto;
}

/* Mobile-specific adjustments */
@media (max-width: 700px) {
  .section {
    gap: 1rem;
  }

  .section img {
    max-width: 90%;
    margin-top: 0;
  }

  .section-writeup {
    padding: 0 1rem;
    margin-left: 0;
    line-height: 1.5; /* Adjust this value as needed */
  }

  .section-writeup h3 {
    font-size: 1.1rem;
  }

  .section-writeup p {
    font-size: 0.85rem;
  }
}

 @media (min-width: 700px) {
  .section-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    width: 90%;
    margin: 0 auto;
    justify-items: center; /* Centers all grid items horizontally */
  }

  .section {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80%; /* Adjust width as needed */
    text-align: left;
    padding: 0 1rem;
    /* margin: 0 auto; Remove this as justify-items handles centering */
  }

  .section img {
    max-width: 50%;
    width: 40%;
    height: auto;
    margin-bottom: 1rem;
  }

  .section-writeup {
    width: 80%;
    padding: 0 1rem;
    margin-left: 0.5rem;
    line-height: 1.5; /* Adjust this value as needed */
  }

  .divider {
    border: 1px solid #ff5722;
    width: 80%;
    margin: 1rem auto;
  }
}

@media (min-width: 1024px){
  .section-writeup {
    padding: 0 1rem;
    margin-left: 2rem;
    max-width: 80%;
    line-height: 1.5; /* Adjust this value as needed */
  }

    .section-writeup h3 {
    font-size: 2.2rem;
  }

  .section-writeup p {
    font-size: 1.2rem;
  }




}




`

export default Wrapper;