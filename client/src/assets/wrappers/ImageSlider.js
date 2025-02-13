import styled from "styled-components";

const Wrapper = styled.div`
.slider-container {
  position: relative;
  width: 90%;
  height: 400px;
  margin: 2rem auto 0;
  overflow: hidden;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    height: 500px;
  }

  @media (min-width: 1024px) {
    height: 750px;
  }
}

.slide {
  width: 100%;
  height: 100%;
  position: absolute;
  transition: opacity 0.5s ease-in-out;
  opacity: 0;
}

.slide.active {
  opacity: 1;
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
  width: 100%;
  height: 100%; /* Cover entire parent div */
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.9) 100%
  );
  color: var(--light);
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Align text at the bottom */
  align-items: center;
  padding: 20px;
  text-align: center;
  border-radius: 12px;


       @media (min-width: 768px){
background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.8) 60%
  );
  display: flex;
  flex-direction: column;
  justify-content: center; /* Align text at the bottom */
  align-items: flex-start;
  text-align: left;
  text-wrap: wrap;
  width: 65%;
  //max-width: 700px;
  }

}

.text-overlay h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: -0.8rem;
  line-height: 1.2;
  
   @media (min-width: 768px){
    font-size: 1.4rem;
    margin-left: 1.5rem;
    text-wrap: wrap;
  width: 75%;

   }

   @media (min-width: 1024px){
    font-size: 1.8rem;
    margin-left: 3rem;
    text-wrap: wrap;
  width: 50%;

   }

}

.text-overlay p {
  font-size: 1rem;
  margin: 20px;
  line-height: 1.5;

   @media (min-width: 768px){
    font-size: 1.2rem;
    margin-left: 1.5rem;
    text-wrap: wrap;
  width: 75%;
   }

   @media (min-width: 1024px){
    font-size: 1.4rem;
    margin-left: 3rem;
    text-wrap: wrap;
  width: 50%;

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
  z-index: 10;
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
  gap: 8px;
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

`




export default Wrapper;