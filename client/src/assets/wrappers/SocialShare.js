import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  justify-content: center;

  .share-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--border-radius);
    color: var(--white);
    cursor: pointer;
    transition: var(--transition);
    font-size: 1rem;

    &:hover {
      transform: translateY(-2px);
    }
  }

  .facebook {
    background: #3b5998;
    &:hover {
      background: #344e86;
    }
  }

  .twitter {
    background: #1da1f2;
    &:hover {
      background: #1a91da;
    }
  }

  .linkedin {
    background: #0077b5;
    &:hover {
      background: #006396;
    }
  }

  .whatsapp {
    background: #25d366;
    &:hover {
      background: #21bd5b;
    }
  }
`;


export default Wrapper