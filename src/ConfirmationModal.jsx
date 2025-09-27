import React from 'react';
import styles from './ConfirmationModal.module.css';

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <p className={styles.modalMessage}>¿Estás seguro de que quieres eliminar esta publicacion?</p>
        <div className={styles.modalActions}>
          <button className={styles.confirmButton} onClick={onConfirm}>Aceptar</button>
          <button className={styles.cancelButton} onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;