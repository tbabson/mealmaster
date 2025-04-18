import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }

  .calendar-section {
    max-width: 400px;
    position: sticky;
    top: 2rem;
  }

  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  .subtitle {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-secondary-color);
  }

  .reminder-list {
    flex-grow: 1;
    width: 100%;
  }
`;

export const ReminderCard = styled(motion.li)`
  border: 1px solid var(--grey-100);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 1rem;
  background-color: var(--white);
  list-style: none;
  box-shadow: var(--shadow-1);
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    box-shadow: var(--shadow-2);
    transform: translateY(-2px);
  }

  h4 {
    color: var(--primary-500);
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  p {
    margin: 0.5rem 0;
    color: var(--text-color);
  }

  .reminder-note {
    margin-top: 1rem;
    padding: 1rem;
    background: var(--grey-50);
    border-radius: var(--border-radius);
    border-left: 3px solid var(--primary-500);

    .note-label {
      font-weight: 600;
      color: var(--text-secondary-color);
      margin-bottom: 0.5rem;
    }

    .note-content {
      color: var(--text-color);
      line-height: 1.5;
    }
  }
`;

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContent = styled(motion.div)`
  background: var(--white);
  padding: 2rem;
  border-radius: var(--border-radius);
  width: 95%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: var(--shadow-4);

  .close-modal-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--grey-500);
    cursor: pointer;
    transition: var(--transition);

    &:hover {
      color: var(--grey-800);
      transform: scale(1.1);
    }
  }

  .modal-content {
    h3 {
      color: var(--primary-500);
      margin-bottom: 1.5rem;
      text-align: center;
      font-size: 1.5rem;
    }

    .reminder-details {
      margin-bottom: 1.5rem;

      p {
        margin: 0.75rem 0;
        color: var(--text-color);

        strong {
          color: var(--text-secondary-color);
          margin-right: 0.5rem;
        }
      }

      .note-section {
        margin-top: 1rem;
        padding: 1rem;
        background: var(--grey-50);
        border-radius: var(--border-radius);
        border-left: 3px solid var(--primary-500);
      }
    }

    .edit-form {
      .form-group {
        margin-bottom: 1.5rem;

        label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-secondary-color);
          font-weight: 500;
        }

        small {
          color: var(--grey-500);
          font-size: 0.8rem;
          margin-top: 0.25rem;
          display: block;
        }
      }
    }
  }

  .edit-time-input,
  .edit-note-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--grey-200);
    border-radius: var(--border-radius);
    font-size: 1rem;
    transition: var(--transition);

    &:focus {
      outline: none;
      border-color: var(--primary-500);
      box-shadow: 0 0 0 2px var(--primary-100);
    }
  }

  .edit-note-input {
    resize: vertical;
    min-height: 100px;
    font-family: inherit;
  }

  .btn-group {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    justify-content: flex-end;

    button {
      padding: 0.6rem 1.2rem;
      border-radius: var(--border-radius);
      border: none;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
    }

    .edit-btn {
      background: var(--primary-500);
      color: var(--white);
      &:hover { background: var(--primary-700); }
    }

    .delete-btn {
      background: var(--red-light);
      color: var(--red-dark);
      &:hover {
        background: var(--red-dark);
        color: var(--white);
      }
    }

    .save-btn {
      background: var(--green-dark);
      color: var(--white);
      &:hover { opacity: 0.9; }
    }

    .cancel-btn {
      background: var(--grey-200);
      color: var(--grey-600);
      &:hover { background: var(--grey-300); }
    }

    .confirm-btn {
      background: var(--red-dark);
      color: var(--white);
      &:hover { opacity: 0.9; }
    }
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    
    .btn-group {
      flex-direction: column;
      button {
        width: 100%;
      }
    }
  }
`;

export default Wrapper;