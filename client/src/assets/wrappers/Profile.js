import styled from 'styled-components';

const Wrapper = styled.div`
  .profile-container {
    max-width: 1400px;
    margin: 2rem auto;
    padding: 0 1rem;
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
  }

  .profile-image-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .profile-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    background: var(--grey-100);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .profile-image-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      color: var(--grey-500);
      text-transform: uppercase;
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;

      .camera-icon {
        color: white;
        font-size: 1.5rem;
      }
    }

    &:hover .image-overlay {
      opacity: 1;
    }
  }

  .user-details {
    grid-column: 1 / 2;
  }

  .content-section {
    grid-column: 2 / 3;
  }

  .profile-header {
    background: var(--white);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: var(--shadow-1);
    margin-bottom: 2rem;
    height: fit-content;
  }
  .profile-header h2{
    font-size: 2rem;
    color: var(--dark); 
    line-height: 1.2;
    font-weight: 600;
  }

  .user-info {
    margin: 1rem 0;

    p{
        font-size: 1.2rem;
        color: var(--medium);
        line-height: 1.5;
    }
  }

  .profile-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .edit-btn, .password-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;
    justify-content: center;
  }

  .edit-btn {
    background: var(--primary-500);
    color: var(--white);
  }

  .password-btn {
    background: var(--grey-500);
    color: var(--white);
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: var(--white);
    padding: 2rem;
    border-radius: 1rem;
    width: 90%;
    max-width: 500px;
    box-shadow: var(--shadow-2);

    h3 {
      margin-bottom: 1.5rem;
      color: var(--primary-500);
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .btn-container {
      display: flex;
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .submit-btn {
      background: var(--primary-500);
      color: var(--white);
    }

    .cancel-btn {
      background: var(--grey-500);
      color: var(--white);
    }
  }

  .stats-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: var(--white);
    padding: 1.5rem;
    border-radius: 1rem;
    box-shadow: var(--shadow-1);
    text-align: center;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-500);
  }

  .stat-label {
    color: var(--grey-500);
    margin-top: 0.5rem;
  }

  .accordion {
    background: var(--white);
    border-radius: 1rem;
    box-shadow: var(--shadow-1);
    overflow: hidden;
  }

  .accordion-item {
    border-bottom: 1px solid var(--grey-100);
  }

  .accordion-header {
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background: var(--white);
    transition: background 0.3s ease;

    &:hover {
      background: var(--grey-50);
    }

    h3 {
      margin: 0;
      color: var(--grey-700);
    }
  }

  .accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    padding: 0 2rem;

    &.active {
      max-height: 1000px;
      padding: 1rem 2rem;
    }
  }

  .order-card, .reminder-card {
    background: var(--grey-50);
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;

    h4 {
      color: var(--primary-500);
      margin-bottom: 0.5rem;
    }

    p {
      margin: 0.25rem 0;
      color: var(--grey-600);
    }
  }

  @media (max-width: 992px) {
    .profile-container {
      grid-template-columns: 1fr;
    }

    .user-details, .content-section {
      grid-column: 1 / -1;
    }

    .stats-container {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
  }

  @media (max-width: 768px) {
    .stats-container {
      grid-template-columns: 1fr;
    }
  }
`;

export default Wrapper;