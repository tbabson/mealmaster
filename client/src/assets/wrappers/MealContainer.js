import styled from "styled-components";

const Wrapper = styled.div`
  .meals {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    margin: 2rem;
    /* gap: 2rem; */
    row-gap: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 2rem;
      row-gap: 2rem;
      justify-items: center;
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 2rem;
      row-gap: 3rem;
      justify-items: center;
    }
  }

  /* Optional: Style for pagination */
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