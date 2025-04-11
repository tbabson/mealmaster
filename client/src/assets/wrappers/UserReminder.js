// UserReminder.js
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;

  .calendar-section {
    max-width: 400px;
  }

  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .reminder-list {
    flex-grow: 1;
  }

  .btn-group {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
  }

  .edit-btn,
  .delete-btn,
  .save-btn,
  .cancel-btn,
  .confirm-btn {
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s ease;
  }

  .edit-btn {
    background-color: #007bff;
    color: white;
  }

  .delete-btn {
    background-color: #dc3545;
    color: white;
  }

  .save-btn {
    background-color: #28a745;
    color: white;
  }

  .cancel-btn {
    background-color: #6c757d;
    color: white;
  }

  .confirm-btn {
    background-color: #dc3545;
    color: white;
  }

  textarea {
    width: 100%;
    resize: none;
    padding: 0.5rem;
    font-size: 1rem;
    margin-top: 0.5rem;
  }
`;

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const ModalContent = styled(motion.div)`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
`;

export const ReminderCard = styled(motion.li)`
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
  list-style: none;

  .edit-time-input {
  margin-top: 0.5rem;
  padding: 0.3rem;
  font-size: 0.9rem;
  border-radius: 4px;
  border: 1px solid var(--grey);
}

`;

export default Wrapper;
