import styled from 'styled-components';

const Wrapper = styled.section`
  .admin-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--grey-100);

    h2 {
      color: var(--grey-700);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 1rem;

      .user-count {
        font-size: 1rem;
        color: var(--grey-500);
        font-weight: normal;
      }
    }

    .back-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--primary-500);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: var(--borderRadius);
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: var(--primary-700);
        transform: translateY(-2px);
      }
    }
  }
  /* Filters Container */
  .filters-container {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr auto;
    gap: 1.5rem;
    margin-bottom: 2rem;
    padding: 2rem;
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);

    .form-label {
      display: block;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      color: var(--grey-700);
      font-weight: 500;
      text-transform: capitalize;
    }

    .form-input,
    .form-select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--grey-200);
      border-radius: var(--borderRadius);
      background: var(--grey-50);
      font-size: 1rem;
      color: var(--grey-900);
      transition: all 0.2s ease;

      &:focus {
        outline: none;
        border-color: var(--primary-500);
        box-shadow: 0 0 0 3px var(--primary-100);
      }

      &::placeholder {
        color: var(--grey-400);
      }
    }

    .form-select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 1rem center;
      background-size: 1em;
      padding-right: 2.5rem;

      option {
        color: var(--grey-900);
      }
    }

    .clear-btn {
      background: var(--red-light);
      color: var(--red-dark);
      border: 2px solid var(--red-dark);
      padding: 0.75rem 1.5rem;
      border-radius: var(--borderRadius);
      cursor: pointer;
      font-weight: 600;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
      align-self: end;
      min-height: 43px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: var(--red-dark);
        color: white;
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }
    }

    @media (max-width: 992px) {
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      padding: 1.5rem;

      .form-input,
      .form-select,
      .clear-btn {
        width: 100%;
      }

      .clear-btn {
        margin-top: 1rem;
      }
    }
  }
  /* Loading, Error and Empty States */
  .loading-container {
    text-align: center;
    padding: 3rem;
    font-size: 1.2rem;
    color: var(--grey-600);
  }

  .error-container {
    text-align: center;
    padding: 2rem;
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    margin: 2rem auto;
    max-width: 600px;

    h3 {
      color: var(--red-dark);
      margin-bottom: 1rem;
    }

    p {
      color: var(--grey-600);
      margin-bottom: 1.5rem;
    }

    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--primary-500);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: var(--borderRadius);
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: var(--primary-700);
        transform: translateY(-2px);
      }
    }
  }

  .empty-state {
    text-align: center;
    padding: 3rem;
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);

    h4 {
      color: var(--grey-600);
      margin: 0;
    }
  }

  /* Users Grid */
  .users-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .user-card {
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    padding: 1.5rem;
    transition: all 0.3s ease;
    border: 1px solid var(--grey-200);

    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-4);
    }

    .user-avatar {
      text-align: center;
      margin-bottom: 1rem;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid var(--primary-500);
      }

      .avatar-placeholder {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: var(--primary-500);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
        margin: 0 auto;
      }
    }

    .user-info {
      text-align: center;
      margin-bottom: 1rem;

      h3 {
        margin: 0 0 0.5rem 0;
        color: var(--grey-700);
        font-size: 1.1rem;
      }

      .user-email {
        color: var(--grey-600);
        font-size: 0.9rem;
        margin: 0.25rem 0;
        word-break: break-word;
      }

      .user-role {
        margin: 0.5rem 0;

        .role-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: bold;
          text-transform: uppercase;

          &.admin {
            background: var(--primary-100);
            color: var(--primary-700);
          }

          &.user {
            background: var(--grey-100);
            color: var(--grey-700);
          }
        }
      }

      .user-joined {
        color: var(--grey-500);
        font-size: 0.8rem;
        margin: 0.25rem 0;
      }
    }

    .user-stats-mini {
      text-align: center;
      margin: 0.5rem 0;

      span {
        font-size: 0.8rem;
        color: var(--grey-600);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
      }
    }

    .user-actions {
      display: flex;
      gap: 0.5rem;
      justify-content: center;

      .btn {
        padding: 0.5rem;
        border: none;
        border-radius: var(--borderRadius);
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;

        &.view-btn {
          background: var(--primary-500);
          color: white;

          &:hover {
            background: var(--primary-700);
          }
        }

        &.delete-btn {
          background: var(--red-light);
          color: var(--red-dark);

          &:hover {
            background: var(--red-dark);
            color: white;
          }
        }
      }
    }
  }

  /* User Details */
  .user-details {
    max-width: 800px;
    margin: 0 auto;
  }

  .user-profile-card {
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    padding: 2rem;
    margin-bottom: 2rem;
    display: flex;
    gap: 2rem;
    align-items: center;

    .user-avatar {
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid var(--primary-500);
      }

      .avatar-placeholder {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: var(--primary-500);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: bold;
      }
    }

    .user-info {
      flex: 1;

      h3 {
        margin: 0 0 1rem 0;
        color: var(--grey-700);
        font-size: 1.5rem;
      }

      p {
        margin: 0.5rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--grey-600);

        &.user-email {
          font-weight: 500;
        }

        .role-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: bold;
          text-transform: uppercase;

          &.admin {
            background: var(--primary-100);
            color: var(--primary-700);
          }

          &.user {
            background: var(--grey-100);
            color: var(--grey-700);
          }
        }
      }
    }

    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }

  .user-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;

    .stat-card {
      background: var(--white);
      border-radius: var(--borderRadius);
      box-shadow: var(--shadow-2);
      padding: 1.5rem;
      text-align: center;

      h4 {
        margin: 0 0 0.5rem 0;
        color: var(--grey-600);
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .stat-number {
        font-size: 2rem;
        font-weight: bold;
        color: var(--primary-500);
        margin: 0;
      }

      .stat-status {
        font-size: 1rem;
        font-weight: 500;
        margin: 0;
        color: var(--grey-700);
      }
    }
  }

  .user-orders {
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-2);
    padding: 2rem;

    h4 {
      margin: 0 0 1rem 0;
      color: var(--grey-700);
      border-bottom: 2px solid var(--grey-200);
      padding-bottom: 0.5rem;
    }

    .orders-list {
      display: grid;
      gap: 1rem;

      .order-item {
        background: var(--grey-50);
        border-radius: var(--borderRadius);
        padding: 1rem;
        border-left: 4px solid var(--primary-500);

        p {
          margin: 0.25rem 0;
          color: var(--grey-600);
          font-size: 0.9rem;

          &:first-child {
            font-weight: bold;
            color: var(--grey-700);
          }
        }
      }
    }
  }
  /* Pagination */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
    padding: 1rem;
    background: var(--white);
    border-radius: var(--borderRadius);
    box-shadow: var(--shadow-1);

    .btn {
      background: var(--primary-500);
      color: var(--white);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: var(--borderRadius);
      cursor: pointer;
      transition: all 0.2s ease;
      min-width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover:not(:disabled) {
        background: var(--primary-700);
        transform: translateY(-2px);
      }

      &:disabled {
        background: var(--grey-300);
        cursor: not-allowed;
        transform: none;
      }

      &.btn-first,
      &.btn-last {
        font-weight: 600;
      }
    }

    .page-info {
      color: var(--grey-600);
      font-weight: 500;
      padding: 0.5rem;
      min-width: 120px;
      text-align: center;
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .admin-content {
      padding: 1rem;
    }

    .header {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }

    .users-grid {
      grid-template-columns: 1fr;
    }

    .user-stats {
      grid-template-columns: repeat(2, 1fr);
    }

    .pagination {
      flex-wrap: wrap;
      gap: 0.25rem;

      .btn {
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
      }

      .page-info {
        width: 100%;
        text-align: center;
        margin: 0.5rem 0;
      }
    }
  }

  @media (max-width: 480px) {
    .filters-container {
      padding: 1rem;
    }

    .user-card {
      padding: 1rem;
    }

    .user-profile-card {
      padding: 1rem;
      gap: 1rem;
    }

    .user-stats {
      grid-template-columns: 1fr;
    }
  }
`;

export default Wrapper;