// src/App.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './App.module.css';
import PostModal from './PostModal';
import ConfirmationModal from './ConfirmationModal';

function App({ initialRoute }) { 
  const navigate = useNavigate(); 

  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [showPostModal, setShowPostModal] = useState(initialRoute === 'new'); 
  const [postToEdit, setPostToEdit] = useState(null); 
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [postToDeleteId, setPostToDeleteId] = useState(null); // ID del post a eliminar

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); 
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const mappedData = data.slice(0, 20).map(post => ({
          id: post.id,
          userId: post.userId, 
          title: post.title,
          description: post.body, 
        }));

        setPosts(mappedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const handleSavePost = (postData) => { 
    if (!postData.id) {
      const newPost = { ...postData, id: Date.now(), userId: 1 }; 
      setPosts(prevPosts => [newPost, ...prevPosts]);
    } else {
      setPosts(prevPosts =>
        prevPosts.map(post => (post.id === postData.id ? postData : post))
      );
    }
    navigate('/'); 
  };

  // ------------------------------------------------------------------
  // *** FUNCIONES DE ELIMINACIÓN AGREGADAS/CORREGIDAS ***
  // ------------------------------------------------------------------
  
  // 1. Abre el modal y guarda el ID del post a eliminar
  const handleOpenConfirmationModal = (postId) => {
    setPostToDeleteId(postId);
    setShowConfirmationModal(true);
  };

  // 2. Confirma y ejecuta la eliminación (Simulación de DELETE)
  const handleConfirmDeletion = () => {
    // Filtra la lista para excluir el post cuyo ID coincide con postToDeleteId
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postToDeleteId));
    
    // Cierra y limpia el estado
    setShowConfirmationModal(false);
    setPostToDeleteId(null);
  };

  // 3. Cancela la eliminación
  const handleCancelDeletion = () => {
    setShowConfirmationModal(false);
    setPostToDeleteId(null);
  };
  // ------------------------------------------------------------------
  
  const handleOpenPostModal = (post = null) => {
    setPostToEdit(post);
    setShowPostModal(true);
    if (!post) {
      navigate('/nuevo');
    }
  };

  const handleClosePostModal = () => {
    setShowPostModal(false);
    setPostToEdit(null);
    navigate('/'); 
  };
  
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>Cargando publicaciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}>Gestión de Publicaciones (SPA)</h1>
      
      <div className={styles.controlsContainer}>
        <input
          type="text"
          placeholder="Buscar por título o cuerpo del post..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={styles.addButton} onClick={() => handleOpenPostModal()}>Añadir Publicación</button>
      </div>
      
      <div className={styles.productList}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <div key={post.id} className={styles.productCard}>
              <h2 className={styles.productTitle}>{post.title}</h2>
              <p className={styles.productDescription}>{post.description.substring(0, 150)}...</p>
              <div className={styles.cardButtons}>
                <button 
                  className={styles.editButton} 
                  onClick={() => handleOpenPostModal(post)}>
                  Editar
                </button>
                <button 
                  className={styles.deleteButton} 
                  // Llama a la función para abrir el modal de confirmación
                  onClick={() => handleOpenConfirmationModal(post.id)}> 
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No se encontraron publicaciones.</p>
        )}
      </div>

      {showPostModal && (
        <PostModal
          postToEdit={postToEdit}
          onClose={handleClosePostModal}
          onSave={handleSavePost}
        />
      )}

      {/* Modal de Confirmación */}
      {showConfirmationModal && (
        <ConfirmationModal
          onConfirm={handleConfirmDeletion} // Función que ejecuta la eliminación
          onCancel={handleCancelDeletion}
        />
      )}
    </div>
  );
}

export default App;