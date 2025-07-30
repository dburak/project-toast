import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';

import ToastShelf from '../ToastShelf/ToastShelf';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState('notice');
  const [showNotice, setShowNotice] = React.useState(false);
  const [createdToasts, setCreatedToasts] = React.useState([]);

  const handleShowToast = () => {
    if (message) {
      setShowNotice(true);

      setCreatedToasts((prevToasts) => [
        ...prevToasts,
        { id: Date.now(), message, variant },
      ]);

      setMessage('');
      setVariant('notice');
    } else {
      alert('Please enter a message');
    }
  };

  const handleOnDismiss = (id) => {
    setCreatedToasts((prevToasts) =>
      prevToasts.filter((toast) => toast.id !== id)
    );

    if (createdToasts.length === 1) {
      setShowNotice(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleShowToast();
      }}
    >
      <div className={styles.wrapper}>
        <header>
          <img alt='Cute toast mascot' src='/toast.png' />
          <h1>Toast Playground</h1>
        </header>

        {showNotice && (
          <ToastShelf
            createdToasts={createdToasts}
            onDismiss={handleOnDismiss}
          />
        )}

        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor='message'
              className={styles.label}
              style={{ alignSelf: 'baseline' }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <input
                id='message'
                className={styles.messageInput}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
            >
              {VARIANT_OPTIONS.map((variant) => (
                <label key={variant} htmlFor={`variant-${variant}`}>
                  <input
                    type='radio'
                    id={`variant-${variant}`}
                    name='variant'
                    value={variant}
                    defaultChecked={variant === 'notice'}
                    onChange={(e) => setVariant(e.target.value)}
                  />
                  {variant}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
            >
              <Button type='submit'>Pop Toast!</Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ToastPlayground;
