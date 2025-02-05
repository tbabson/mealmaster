import styled from "styled-components";

const Wrapper = styled.div`
  .hero {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(
        to top,
        rgba(249, 249, 249, 0.8),
        rgba(249, 249, 249, 0.8) 70%
      ),
      url("https://res.cloudinary.com/dwrmehhg3/image/upload/v1734953363/mealmaster/lsldkvataufcy4d0knd2.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    padding: 2rem 1rem;
    margin-top: -5rem;

    @media (max-width: 768px) {
      background-attachment: scroll;
      padding: 1rem;
    }
  }

  .hero-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    padding: 1rem;
    margin-top: 13rem;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      max-width: 90%;
      margin-top: 0;
    }
    
    @media (max-width: 768px) {
      max-width: 90%;
    }

  }

  .hero-writeup {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;

    @media (max-width: 768px) {
      align-items: left;
      text-align: left;
    }
    
    @media (min-width: 768px) {
      align-items: flex-end;
      text-align: right;
    }
    
  }

  @keyframes slideInEach {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .hero-title {
    font-family: "Roboto", serif;
    font-weight: 900;
    color: var(--primary-800);
    font-size: 2.5rem;
    line-height: 1;
    margin-bottom: 0.8rem;
    display: flex;
    flex-wrap: wrap;
    

    span {
      display: inline-block;
      animation: slideInEach 0.8s ease-out forwards;
      opacity: 0;
    }

    @media (min-width: 768px) {
      font-size: 3rem;
      line-height: 1.3;
      text-align: right;
    }

    @media (min-width: 1024px) {
      font-size: 3.5rem;
    }
  }

  /* Staggered animation delays */
  ${Array.from({ length: 8 }).map(
  (_, i) => `
    .hero-title span:nth-child(${i + 1}) {
      animation-delay: ${i * 0.15}s;
    }
  `
)}

  .hero-description {
    font-size: 1.1rem;
    color: var(--secondary-600);
    margin-bottom: 0.8rem;
    line-height: 1.6;
    max-width: 500px;

    @media (min-width: 768px) {
      font-size: 1.25rem;
    }

    @media (min-width: 1024px) {
      font-size: 1.4rem;
    }
  }

  .hero-button {
    .btn {
      padding: 0.75rem 2rem;
      font-size: 1rem;
      background-color: var(--secondary-500);
      color: var(--white);
      border: none;
      border-radius: var(--border-radius);
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: scale(1.05);
        background-color: var(--primary-600);
      }

      a {
        text-decoration: none;
        color: inherit;
      }
    }
  }

  .hero-image {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 100%;
      height: auto;
      border-radius: var(--border-radius);
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.03);
      }
    }
  }

  /* Mobile-specific adjustments */
  @media (max-width: 480px) {
    .hero-title {
      font-size: 2rem;
      gap: 0.25rem;
    }

    .hero-description {
      font-size: 1rem;
    }

    .hero-button .btn {
      padding: 0.5rem 1.5rem;
      font-size: 0.9rem;
    }
  }
`

export default Wrapper;

