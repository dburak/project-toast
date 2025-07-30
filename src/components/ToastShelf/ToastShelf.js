import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({ createdToasts, onDismiss }) {
  console.log(createdToasts, 'createdToasts');

  return (
    <ol className={styles.wrapper}>
      {createdToasts.map((toast) => {
        return (
          <li key={toast.id} className={styles.toastWrapper}>
            <Toast
              id={toast.id}
              variant={toast.variant}
              message={toast.message}
              onDismiss={onDismiss}
            />
          </li>
        );
      })}
    </ol>
  );
}

export default ToastShelf;
