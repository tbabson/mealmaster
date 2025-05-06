import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  padding: 0 1rem;

  .center-title p {
    text-align: center;
    margin: 0 auto;
    margin-top: 5rem;
  }

  .login-prompt {
    width: 100%;
    text-align: center;

    .btn-primary {        
      margin-bottom: 2rem;
    }
  }

  .cartContainer {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;

    @media (min-width: 768px) {
      grid-template-columns: 2fr 1fr;
    }
  }

  .cartTotals {
    margin: 0 0 2rem;

    @media (min-width: 768px) {
      margin-top: -2rem;
    }
  }

  .cartItemList {
    width: 100%;
  }
`

export default Wrapper;