import styled from 'styled-components';

const Wrapper = styled.div`
    .hero{
        margin-top: -10.5rem;
        min-height: 50vh;
        background-image: url('bkgd2.webp');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        z-index: 500;
        background-attachment: fixed;
    }


    .hero-content{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        text-align: center;
    }




`;

export default Wrapper;