import styled from 'styled-components';

const Wrapper = styled.div`
    .hero{
        margin-top: -10.5rem;
        height: 100vh;
        background-image: linear-gradient(to bottom, rgba(255, 247, 230, 0.5),rgba(255, 247, 230, 0.9)50%),url('https://res.cloudinary.com/dwrmehhg3/image/upload/v1734945930/mealmaster/cbketscux7nfrvgtikfq.webp');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        z-index: 500;
        background-attachment: fixed;
    }


    .hero-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        text-align: center;
    }

    .hero-image img {
    margin-top: 12rem;
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
        font-family: "Roboto", serif;
        margin: 2rem 0 1rem;
        font-weight: 900;
        color: var(--primary-800);
        font-size: 3rem;
        line-height: 3.5rem;
        text-transform: capitalize;
    }

    .hero-description{
        font-size: 1.2rem;
        line-height: 1.5rem;
        margin-bottom: 2rem;
        color:var(--secondary-600);
    }

    .cook-btn a{
        text-decoration: none;
        color: var(--grey-500)
    }



`;

export default Wrapper;