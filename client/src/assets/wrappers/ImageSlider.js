import styled from "styled-components";

const Wrapper = styled.div`
  .slider-container {
    position: relative;
    width: 90%;
    height: 400px;
    margin: 2rem auto;
    overflow: hidden;
    border-radius: 12px;

    @media (min-width: 768px) {
      height: 500px;
    }

    @media (min-width: 1024px) {
      height: 750px;
    }
  }

  .slide {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }

  .text-overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
    color: var(--light);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
    text-align: center;
    border-radius: 12px;

    @media (min-width: 768px) {
      justify-content: center;
      align-items: flex-start;
      text-align: left;
      padding-left: 3rem;
      background: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
    }
  }

  .text-overlay h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    width: 100%;

    @media (min-width: 768px) {
      font-size: 1.5rem;
      max-width: 70%;
    }

    @media (min-width: 1024px) {
      font-size: 2rem;
    }
  }

  .text-overlay p {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
      font-size: 1.2rem;
      max-width: 60%;
    }

    @media (min-width: 1024px) {
      font-size: 1.4rem;
    }
  }

  .arrow-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 50%;
    z-index: 2;
  }

  .arrow-button:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  .left-arrow {
    left: 10px;
  }

  .right-arrow {
    right: 10px;
  }

  .dots-container {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: gray;
    border: none;
    cursor: pointer;
  }

  .dot.active {
    background: white;
  }
`;

export default Wrapper;
