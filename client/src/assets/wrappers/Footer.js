import styled from "styled-components";

const Wrapper = styled.div`
.footer-container{
    background: linear-gradient(90deg, #0e2510, #275429);
    padding: 1rem 2rem;
    width: 100%;
}

.footer{
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    max-width: 90%;
    margin: 2rem auto;
    gap: 2rem;
}

.footer-section{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.footer-title{
    color: var(--primary-600);
    font-size: 1.5rem;
    font-weight: 600;
}

.footer-writeup{
    color: var(--primary-200);
    font-size: 1rem;
    line-height: 1.5;
}

.footer-form{
    display: flex;
    flex-direction: row;
    
}

.footer-input{
   padding: 0.375rem 0.75rem;
   background: var(--primary-100);
  border: transparent;
  color: var(--primary-500);
  outline: none;
}

.footer-input::placeholder {
  color: var(--secondary-500);
  font-size: 15px;
  text-transform: capitalize;
}

.btn-footer{
    cursor: pointer;
  color: var(--white);
  background: var(--secondary-500);
  border: transparent;
  padding: 0.375rem 0.75rem;
  text-transform: capitalize;
  display: inline-block;
  font-size: 15px;
}
.btn-footer:hover{
 background: var(--primary-500);
 }

.footer-menu{
    display: flex;
    flex-direction: column;
}

.footer-link{
    color: var(--primary-200);
    font-size: 1rem;
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-link:hover {
    color: var(--primary-800); /* Darker shade on hover */
  }

.footer-logo{
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 0.5rem;
}

.logo{
    width: 8rem;
    height: auto;
    //margin: -3rem -1.8rem -3.6rem;
}

.footer-text p{
    font-size: 1rem;
    color: var(--primary-200);
    margin-bottom: 0.5rem;
}

.icon{
    margin-right: 0.5rem;
}

.divider{
    border: 1px solid var(--primary-800);
    width: 100%;
    margin: 2rem auto;
}

.footer-bottom{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
}

.rite-reserved{
    color: var(--primary-600);
    font-size: 0.8rem;
}

.social-media {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem; /* Space between icons */
    font-size: 1.3rem; /* Icon size */
    color: var(--primary-700); /* Default color for icons */
}

.social-media a {
    text-decoration: none; /* Remove underline */
    color: inherit; /* Inherit color from .social-media */
    transition: color 0.3s ease; /* Add a smooth hover effect */
}

.social-media a:hover {
    color: var(--primary-300); /* Change color on hover */
}

.terms-conditions {
    display: flex;
    gap: 1rem; 
    font-size: 0.8rem;
    color: var(--primary-600);
}

.terms-link {
    text-decoration: none;
    color: var(--primary-600); /* Ensure consistent link color */
}


@media (min-width: 768px) {
  .footer-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* background-color: var(--primary-100); */
    /* padding: 3rem 0; */
  }

  .footer {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Three equal columns */
    grid-template-rows: auto; /* Adjusts rows based on content */
    align-items: flex-start; /* Align items to the top */
    justify-content: center; /* Center grid items horizontally */
    max-width: 80%;
    margin: 1rem auto;
    gap: 3.5rem; /* Space between grid items */
  }

  .footer-section {
    display: flex;
    flex-direction: column;
    gap: 2rem; /* Space between elements within each section */
    align-items: flex-start; /* Align elements to the left */
    justify-content: flex-start; /* Top-align the content */
  }

  .footer-menu {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .footer-link {
    color: var(--primary-200); /* Adjust as needed for your theme */
    font-size: 1rem;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-link:hover {
    color: var(--primary-800); /* Darker shade on hover */
  }

  .logo{
    width: 10rem;
    height: auto;
    margin: -1rem 0 -0.6rem;
}

  .footer-text p {
    display: flex;
    align-items: center;
    gap: 0.5rem; /* Space between the icon and text */
    font-size: 1rem;
    color: var(--primary-200);
    margin-bottom: 0.5rem;
  }

  .footer-contact .icon {
    font-size: 1.2rem;
    color: var(--primary-500); /* Icon color */
  }

  .footer-form {
    display: flex;
    width: 100%;
  }

  .footer-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 1px solid var(--grey-300);
    font-size: 1rem;
  }

  .btn-footer {
    padding: 0.75rem 1.5rem;
    background-color: var(--secondary-500);
    color: #fff;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-footer:hover {
    background-color: var(--primary-500);
  }

.footer-bottom {
  display: flex;
  flex-direction: row;
  align-items: center; /* Align items vertically */
  justify-content: space-around; /* Even spacing */
}

  .divider {
    border: 1px solid var(--primary-800);
    margin: 2rem 0;
    max-width: 90%;
  }


.social-media {
    grid-column: span 3; /* Spans all three columns */
    display: flex;
    justify-content: center; /* Center the icons */
    gap: 2rem; /* Space between social media icons */
  }

  .social-media a {
    font-size: 1.5rem;
    color: var(--primary-600); /* Icon color */
    transition: color 0.3s ease;
  }

  .social-media a:hover {
    color: var(--primary-800); /* Darker shade on hover */
  }



}


@media (min-width: 1024px) {
  .footer-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-100);
    /* padding: 3rem 0; */
  }

    .footer {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    /* max-width: 1200px; */
    max-width: 80%;
  }

  .footer-section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .footer-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary-600);
    margin-bottom: 0.5rem;
  }

  .footer-writeup {
    font-size: 1rem;
    color: var(--primary-200);
    margin-bottom: 0.5rem;
  }

  .footer-form {
    display: flex;
    flex-direction: row;
  }

  .footer-input {
    flex: 1;
    padding: 0.75rem;
     font-size: 1rem;
  }

  .btn-footer {
    padding: 0.75rem 1.5rem;
    background-color: var(--secondary-500);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }

  .footer-menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .footer-link {
    text-decoration: none;
    color: var(--primary-200);
    font-size: 1rem;
    transition: color 0.3s;
  }

  .footer-link:hover {
    color: var(--primary-800);
  }

  .footer-contact {
    display: flex;
    flex-direction: column;
   
  }

  .footer-text p {
    display: flex;
    align-items: center;
    font-size: 1rem;
    margin-bottom: 0.8rem;
  }

  .footer-logo .icon {
    margin-right: 0.5rem;
    font-size: 1.25rem;
    color: var(--primary-500);
  }
  
  .divider {
    border: 1px solid var(--primary-800);
    margin: 2rem 0;
    max-width: 90%;
  }

    .footer-bottom {
  display: flex;
  flex-direction: row;
  align-items: center; /* Align items vertically */
  justify-content: space-around; /* Even spacing */
}

  .social-media {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .social-media a {
    font-size: 1.5rem;
    color: var(--primary-600);
    transition: color 0.3s;
  }

  .social-media a:hover {
    color: var(--primary-300);
  }
}




`

export default Wrapper; 