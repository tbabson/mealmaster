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

.recommended-meal {
    margin: 1rem auto;
    background-color: var(--grey-100);
    max-width: 90%; /* Ensure the container adapts to the image width */
    display: inline-block; /* Matches the size of its child elements */
    padding: 0; /* Removes unnecessary spacing */
    border-radius: var(--border-radius);
    overflow: hidden; /* Ensures content stays within the container */
  }

.meal-details{
    text-decoration: none;
    padding: 0.7rem;

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
    max-width: 100%; /* Scales the image to fit the container's width */
    height: auto; /* Maintains aspect ratio */
    object-fit: cover; /* Ensures the image covers its container */
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
.recommended-meal{
    margin: 0 0.5rem 1.5rem;
}
     }

     @media (min-width: 1024px){
.recommended-meals-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    width: 90%;
    //grid-gap: 20px;

  }

  .recommended-meal {
    position: relative;
    overflow: hidden;
    border-radius: 0;
    //box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
  }

  .recommended-meal img {

        border-radius: 0;


    }

  .recommended-meal:hover {
    transform: scale(1.05);
  }

  figure {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    padding: 0;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .meal-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(254, 253, 232, 0.7);
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    text-align: center;
    padding: 10px;
  }

  .recommended-meal:hover .meal-details {
    opacity: 1;
  }

  h3 {
    grid-column: 1 / -1;
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.8rem;
    color: #333;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    margin: 0;
  }

  /* @media (max-width: 1024px) {
    .recommended-meals-container {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  } */
     }


`

export default Wrapper;