import styled from 'styled-components';

const Wrapper = styled.div`
    .hero{
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center; /* Centers content vertically */
        align-items: center;
        margin-top: -8rem;
        background-image: linear-gradient(to top, rgba(249, 249, 249, 0.8),rgba(249, 249, 249, 0.8)70%),url('https://res.cloudinary.com/dwrmehhg3/image/upload/v1734953363/mealmaster/lsldkvataufcy4d0knd2.webp');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        z-index: 500;
        background-attachment: fixed;
        width: 100%;
        @media (max-width: 768px) {
      background-attachment: scroll;
    }
    }
    
    .hero-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        text-align: center;
        width: 90%;
        max-width: 1200px;
    }
    
    .hero-image img {
        margin-top: 5rem;
        max-width: 90%; /* Scales down the image to fit its container */
        height: auto; /* Maintains the aspect ratio */
        border-radius: var(--border-radius);
        object-fit: contain;
        transition: transform 0.3s;
    }
    
    .hero-image img:hover {
        transform: scale(1.03); /* Zooms in */
    }
    
    .hero-writeup{
        position: relative;
        max-width: 100%;
    }
    
    /* .hero-title{
        font-family: "Roboto", serif;
        margin: 1rem 0 1rem;
        font-weight: 900;
        color: var(--primary-800);
        font-size: 3rem;
        line-height: 3.5rem;
        text-transform: capitalize;
    } */

@keyframes slideInEach {
  0% {
    transform: translateY(100%); /* Start off-screen (below) */
    opacity: 0; /* Fully transparent */
  }
  50% {
    opacity: 0.5; /* Partially fade in */
  }
  100% {
    transform: translateY(0); /* Slide to the original position */
    opacity: 1; /* Fully visible */
  }
}

.hero-title {
  font-family: "Roboto", serif;
  margin: 1rem 0 1rem;
  font-weight: 900;
  color: var(--primary-800);
  font-size: 3rem;
  line-height: 3.5rem;
  text-transform: capitalize;
  display: flex;
  flex-wrap: wrap; /* Ensures words wrap to new lines if needed */
  gap: 0.5rem; /* Adds spacing between words */
  justify-content: center; /* Centers content horizontally */
  text-align: center; /* Ensures text alignment is centered */
}


.hero-title span {
  display: inline-block;
  animation: slideInEach 1s ease-out forwards; /* Applies animation */
  opacity: 0; /* Initially hidden */
}

/* Apply staggered delays for each word */
.hero-title span:nth-child(1) {
  animation-delay: 0s;
}

.hero-title span:nth-child(2) {
  animation-delay: 0.2s;
}

.hero-title span:nth-child(3) {
  animation-delay: 0.4s;
}

.hero-title span:nth-child(4) {
  animation-delay: 0.6s;
}

.hero-title span:nth-child(5) {
  animation-delay: 0.8s;
}

.hero-title span:nth-child(6) {
  animation-delay: 1s;
}

.hero-title span:nth-child(7) {
  animation-delay: 1.2s;
}

.hero-title span:nth-child(8) {
  animation-delay: 1.4s;
}


    .hero-description {
        font-size: 1.2rem;
        line-height: 1.5rem;
        color:var(--secondary-600);
        //max-width: 300px;
        word-wrap: break-word;  
        text-align: center;
        width: auto; 
    }

    .hero-button{
    display: flex;
    justify-content: center; /* Centers horizontally */
    align-items: center;    /* Centers vertically */
    margin-top: -1rem;
    }
    
    .cook-btn a{
        text-decoration: none;
        color: var(--grey-500);
    }

    .cook-btn:hover{
    transform: scale(1.05);
    }

    @media (min-width: 800px) {

    .hero{
        height: 100vh;
        margin-top: -7rem;
    }
    

    .hero-content{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: left;
        width: 90%;
        margin: 0 auto;
    }

    .hero-image img {
        margin-top: 7rem;
        max-width: 100%; /* Scales down the image to fit its container */
        height: auto; /* Maintains the aspect ratio */
        border-radius: var(--border-radius);
        object-fit: contain;
        transition: transform 0.3s;
    }

    .hero-image img:hover {
    transform: scale(1.03); /* Zooms in */
    }

    .hero-title{
        margin: 8rem 0 1rem;
        padding-left: 2rem;
    }


    .hero-description{
        padding-left: 2rem;
        text-align: center;
        width: 80%;
    }

    .cook-btn{
        margin-top: 1rem;
    }

}

 @media (min-width: 1024px){

.hero{
    height: 100vh;
    margin-top: -7rem;
}


.hero-content{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: left;
        width: 90%;
        margin: 0 auto;
    }


    .hero-image img {
    margin: 7rem 0 0 0;
    max-width: 100%; /* Scales down the image to fit its container */
    height: auto; /* Maintains the aspect ratio */
    border-radius: var(--border-radius);
    object-fit: contain;
    transition: transform 0.3s;
    }

    .hero-title{
        font-size: 3rem;
        line-height: 4rem;
        width: 80%;
       line-height: 1.2;
        margin: 6rem auto 2rem;
    }


    .hero-description{
        text-align: center;
        font-size: 1.5rem;
        width: 80%;
        margin: 0 auto;
        line-height: 1.2;
    }

    .cook-btn {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border: none;
    transition: transform 0.3s;
    margin-top: 1.5rem;
    margin: 1rem auto;
    }


 }


`;

export default Wrapper;