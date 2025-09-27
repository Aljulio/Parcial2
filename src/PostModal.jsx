// src/PostModal.jsx

import React, { useState, useEffect } from 'react';
import styles from './PostModal.module.css';

const PostModal = ({ postToEdit, onClose, onSave }) => {
  const [post, setPost] = useState({ 
    title: '',
    // *** ELIMINAMOS EL PRECIO Y LA IMAGEN DEL ESTADO INICIAL ***
    // price: '0.00', 
    description: '', 
    // image: 'https://picsum.photos/300/200', 
    category: 'Publicación'
  });

  useEffect(() => {
    if (postToEdit) { 
      // Si hay una publicación para editar, asegúrate de que no haya campos de producto viejos
      setPost({
        id: postToEdit.id,
        title: postToEdit.title,
        description: postToEdit.description,
        category: postToEdit.category || 'Publicación' // Asegurar categoría
      });
    }
  }, [postToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prevPost => ({
      ...prevPost,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validaciones mínimas (solo título y descripción)
    if (!post.title || !post.description) {
        alert('El Título y el Cuerpo del Post son obligatorios.');
        return;
    }
    
    onSave(post); 
    onClose();
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>&times;</button>
        <h2 className={styles.modalTitle}>
          {postToEdit ? 'Editar Publicación' : 'Añadir Nueva Publicación'}
        </h2>
        <form onSubmit={handleSubmit} className={styles.postForm}>
          
          <div className={styles.formGroup}>
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* *** ELIMINAMOS EL CAMPO DE PRECIO *** */}
          {/* <div className={styles.formGroup}>
            <label htmlFor="price">Precio (Simulado):</label>
            <input
              type="number"
              id="price"
              name="price"
              value={post.price}
              onChange={handleChange}
              required
              min="0.01"
              step="0.01"
            />
          </div> */}
          
          <div className={styles.formGroup}>
            <label htmlFor="description">Cuerpo del Post:</label> {/* Etiqueta más limpia */}
            <textarea
              id="description"
              name="description"
              value={post.description}
              onChange={handleChange}
              rows="6" // Más filas para la descripción
              required
            ></textarea>
          </div>
          
          {/* *** ELIMINAMOS EL CAMPO DE IMAGEN *** */}
          {/* <div className={styles.formGroup}>
            <label htmlFor="image">URL de la Imagen (Simulada):</label>
            <input
              type="url"
              id="image"
              name="image"
              value={post.image}
              onChange={handleChange}
              required
            />
          </div> */}

          <div className={styles.formActions}>
            <button type="submit" className={styles.saveButton}>Guardar</button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;