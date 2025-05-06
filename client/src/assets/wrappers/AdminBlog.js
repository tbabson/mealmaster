import styled from 'styled-components';

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  padding: 2rem;

  .sidebar {
    width: 200px;
    padding: 1rem;
    background: var(--primary);
    border-radius: var(--border-radius);
    height: fit-content;
    position: sticky;
    top: 2rem;
  }

  .sidebar-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
    border: none;
    border-radius: var(--border-radius);
    background: var(--white);
    color: var(--text-color);
    cursor: pointer;
    transition: var(--transition);

    &:hover {
      background: var(--primary-500);
      color: var(--white);
    }

    &.active {
      background: var(--primary-500);
      color: var(--white);
    }
  }

  .content {
    width: 100%;
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    padding: 2rem;
  }

  .blogs-list {
    h2 {
      margin-bottom: 2rem;
    }
  }

  .filters-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;

    .form-input, .form-select {
      height: 35px;
      padding: 0.375rem 0.75rem;
      border-radius: var(--border-radius);
      background: var(--white);
      border: 1px solid var(--grey-200);
    }

    .clear-btn {
      align-self: end;
      height: 35px;
      padding: 0.375rem 0.75rem;
      background: var(--grey-500);
      color: var(--white);
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      
      &:hover {
        background: var(--grey-600);
      }
    }
  }

  .blogs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .blog-card {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    overflow: hidden;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-4);
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .blog-info {
      padding: 1rem;

      h3 {
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
        color: var(--text-color);
      }

      p {
        color: var(--text-secondary-color);
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
      }

      .blog-meta {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 0.8rem;
        color: var(--grey-500);
        margin-top: 0.5rem;
        
        span {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
      }

      .blog-category {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        background: var(--primary-100);
        color: var(--primary-500);
        border-radius: var(--border-radius);
        font-size: 0.75rem;
        font-weight: 500;
        margin-top: 0.5rem;
      }

      .blog-status {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        border-radius: var(--border-radius);
        font-size: 0.75rem;
        font-weight: 500;
        margin-left: 0.5rem;
        
        &.published {
          background: var(--green-light);
          color: var(--green-dark);
        }
        
        &.draft {
          background: var(--grey-100);
          color: var(--grey-500);
        }
      }
    }

    .blog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      padding: 0.5rem 1rem 1rem;

      button {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        transition: var(--transition);
        padding: 0.25rem;
        border-radius: 50%;

        &.edit-btn {
          color: var(--primary-500);
          &:hover {
            background-color: var(--primary-50);
            color: var(--primary-700);
          }
        }

        &.delete-btn {
          color: var(--red-dark);
          &:hover {
            background-color: var(--red-50);
            color: var(--red-light);
          }
        }
        
        &.view-btn {
          color: var(--grey-600);
          &:hover {
            background-color: var(--grey-50);
            color: var(--grey-800);
          }
        }
      }
    }
  }

  .blog-form {
    h2 {
      margin-bottom: 2rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-row {
      margin-bottom: 1rem;
      
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }
      
      input, select {
        width: 100%;
        padding: 0.75rem;
        border-radius: var(--border-radius);
        border: 1px solid var(--grey-300);
        background: var(--white);
      }

      /* React Quill Editor Styles */
      .quill {
        background: var(--white);
        border-radius: var(--border-radius);
        margin-bottom: 2rem;

        .ql-toolbar {
          border-top-left-radius: var(--border-radius);
          border-top-right-radius: var(--border-radius);
          border-color: var(--grey-300);
          background: var(--grey-50);
        }

        .ql-container {
          min-height: 300px;
          border-bottom-left-radius: var(--border-radius);
          border-bottom-right-radius: var(--border-radius);
          border-color: var(--grey-300);
          font-family: inherit;
          font-size: 1rem;
        }

        .ql-editor {
          min-height: 300px;
          
          h1, h2, h3, h4, h5, h6 {
            margin: 1rem 0;
            font-weight: 600;
          }

          p {
            margin-bottom: 1rem;
          }

          ul, ol {
            margin: 1rem 0;
            padding-left: 1.5rem;
          }

          blockquote {
            border-left: 4px solid var(--primary-500);
            padding-left: 1rem;
            margin: 1rem 0;
            color: var(--grey-700);
          }

          code, pre {
            background: var(--grey-100);
            border-radius: 3px;
            padding: 0.2rem 0.4rem;
            font-family: monospace;
          }

          pre {
            padding: 1rem;
            margin: 1rem 0;
            background: var(--grey-900);
            color: var(--white);
          }
        }
      }
    }

    .image-preview {
      width: 100%;
      max-height: 300px;
      border-radius: var(--border-radius);
      overflow: hidden;
      margin-bottom: 1rem;
      
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }

    .file-input-container {
      position: relative;
      margin-bottom: 1rem;
      
      .file-input-label {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background: var(--primary-500);
        color: white;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: var(--transition);
        
        &:hover {
          background: var(--primary-700);
        }
      }
      
      input[type="file"] {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        width: 0.1px;
        height: 0.1px;
      }
    }

    textarea {
      width: 100%;
      min-height: 300px;
      padding: 0.75rem;
      border-radius: var(--border-radius);
      border: 1px solid var(--grey-300);
      background: var(--white);
      font-family: inherit;
      resize: vertical;
    }

    .btn-container {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
      
      button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: var(--transition);
        font-weight: 500;
        
        &.submit-btn {
          background: var(--primary-500);
          color: white;
          
          &:hover {
            background: var(--primary-700);
          }
        }
        
        &.cancel-btn {
          background: var(--grey-200);
          color: var(--grey-700);
          
          &:hover {
            background: var(--grey-300);
          }
        }
        
        &.draft-btn {
          background: var(--grey-500);
          color: white;
          
          &:hover {
            background: var(--grey-600);
          }
        }
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: var(--border-radius);
      background: var(--primary-500);
      color: var(--white);
      cursor: pointer;
      transition: var(--transition);

      &:hover {
        background: var(--primary-700);
      }

      &:disabled {
        background: var(--grey-300);
        cursor: not-allowed;
      }
    }

    .page-btn {
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: var(--transition);
      font-weight: 500;
      
      &.active {
        background: var(--primary-500);
        color: white;
      }
      
      &:hover:not(.active) {
        background: var(--primary-50);
      }
    }

    .page-info {
      color: var(--text-secondary-color);
      font-size: 0.9rem;
    }
  }

  .empty-blogs {
    text-align: center;
    padding: 3rem 0;
    
    h3 {
      margin-bottom: 1rem;
      color: var(--grey-600);
    }
    
    p {
      color: var(--grey-500);
      margin-bottom: 1.5rem;
    }
    
    .add-blog-btn {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: var(--primary-500);
      color: white;
      border-radius: var(--border-radius);
      border: none;
      cursor: pointer;
      transition: var(--transition);
      text-decoration: none;
      
      &:hover {
        background: var(--primary-700);
      }
    }
  }

  /* Responsive Design */
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    
    .sidebar {
      width: 100%;
      margin-bottom: 2rem;
      position: static;
      background: var(--primary-100);
      
      .sidebar-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        
        .sidebar-btn {
          flex: 1;
          min-width: 150px;
          margin-bottom: 0;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;
    
    .content {
      padding: 1.5rem;
    }
    
    .blogs-grid {
      grid-template-columns: 1fr;
    }
    
    .filters-container {
      grid-template-columns: 1fr;
    }
  }
`;

export default Wrapper;