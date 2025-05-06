import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  max-width: 100%;

  .cart-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .cart-item-container {
    width: 100%;
    overflow-x: hidden;
  }
`;

export default Wrapper;