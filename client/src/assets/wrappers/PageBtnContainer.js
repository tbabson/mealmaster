import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
  width: 100%;
  flex-wrap: wrap;

  .btn-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .btn {
    border: none;
    padding: 0.5rem 1rem;
    background: var(--primary);
    color: var(--lightest);
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn:hover {
    background: var(--darkest);
  }

  .page-btn.active {
    background: var(--darkest);
    color: var(--lightest);
  }

  .dots {
    pointer-events: none;
    background: transparent;
    font-size: 1rem;
    color: var(--primary);
  }

  .prev-btn,
  .next-btn {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-weight: 500;
  }
`;

export default Wrapper;
