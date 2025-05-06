import styled from "styled-components";

const Wrapper = styled.div`
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;

  .layout-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  .main-content {
    flex-grow: 1;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
    padding: 0 1rem;
  }
`

export default Wrapper;