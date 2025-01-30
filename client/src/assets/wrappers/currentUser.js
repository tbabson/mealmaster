import styled from 'styled-components'

const Wrapper = styled.div`
.currentUser{
    background: var(--grey-8000);
    width: 100vw;
   
}

.currentUserContainer{
  display: flex;
    flex-direction: rows;
    align-items: center;
    justify-content: space-between;
  max-width: 80%;
 padding: 0.5rem 2rem; 
}

.currentUserContainer p{
    color: var(--grey-500);
    text-transform: capitalize;
    font-size: var(--small-text);
}

.login-btn {
  background-color:var(--secondary-500);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}
.logout-btn {
  background-color:var(--secondary-500);
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.login-btn:hover {
  background-color:var(--primary-400);
}

.logout-btn:hover {
  background-color:var(--primary-400);
}


`
export default Wrapper