import React from 'react';
import styles from './PopupCard.module.css';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface PopupCardProps {
  type: 'success' | 'error';
  title: string;
  message: string;
  buttonText: string;
  onButtonClick: () => void;
}

const PopupCard: React.FC<PopupCardProps> = ({
  type,
  title,
  message,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={`${styles.popupCard} ${styles[type]}`}>
        {type === 'success' ? (
          <CheckCircle className={styles.icon} />
        ) : (
          <AlertCircle className={styles.icon} />
        )}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <button className={styles.button} onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PopupCard;