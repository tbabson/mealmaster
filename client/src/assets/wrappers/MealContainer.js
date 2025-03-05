import styled from "styled-components";

const Wrapper = styled.div`
  .foodCount{
    width: 90%;
    margin: 0 2.5rem;

    @media (min-width: 768px){
      margin: 0 3.5rem;
    }
  }

  .foodCount h5{
    color: var(--dark);
    text-transform: uppercase;
    font-size: 1.2rem;
  }


  .meals {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); /* Responsive grid */
    gap: 1rem; /* Add horizontal and vertical gaps */
    row-gap: 1rem;
    margin: 2rem auto;
    width: 90%;

    @media (min-width: 768px) {
      gap: 1rem; /* Ensure consistent spacing */
      row-gap: 1rem;
      width: 90%;
    }

    @media (min-width: 1024px) {
      gap: 1rem;
      row-gap: 2rem;
      width: 90%;
    }
  }

  /* Pagination styling */
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 2rem;

    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      margin: 0 0.5rem;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.3s ease-in-out;

      &:hover {
        background-color: #0056b3;
      }

      &[disabled] {
        background-color: #ccc;
        cursor: not-allowed;
      }
    }
  }
`;

export default Wrapper;
