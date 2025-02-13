import styled from 'styled-components'

const Wrapper = styled.div`
.currentUser{
    background: var(--darkest);
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
    color: var(--light);
    text-transform: capitalize;
    font-size: var(--small-text);
}

.login-btn {
  background-color:var(--transparent);
  color: var(--light);
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  text-decoration: underline;
}
.logout-btn {
  background-color:var(--transparent);
  color: var(--light);
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  text-decoration: underline;
}

.login-btn:hover {
  color: var(--dark);
}

.logout-btn:hover {
  color: var(--dark);
}


`
export default Wrapper