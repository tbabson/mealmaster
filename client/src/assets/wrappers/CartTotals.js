import styled from "styled-components";

const Wrapper = styled.div`
  margin: 2rem 0;
  
  .card {
    background: #ffffff;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .card-body {
    padding: 2rem;
  }
  
  .card-title {
    color: var(--primary-500, #645cff);
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    text-align: center;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 1rem;
  }
  
  .card-text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    font-size: 1rem;
    color: var(--grey-700, #333);
  }
  
  .card-text:last-child {
    margin-top: 1rem;
    border-top: 2px dashed #f1f1f1;
    padding-top: 1.5rem;
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--primary-600, #483d8b);
  }
  
  .card-text span:first-child {
    font-weight: 500;
  }
  
  @media (min-width: 768px) {
    display: flex;
    justify-content: flex-end;
  }
`;

export default Wrapper;