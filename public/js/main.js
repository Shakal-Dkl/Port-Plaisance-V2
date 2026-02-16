// Fonction utilitaire pour afficher des messages
function showMessage(message, type = 'success') {
  const container = document.querySelector('.container');
  const alert = document.createElement('div');
  alert.className = `alert alert-${type} alert-dismissible fade show`;
  alert.role = 'alert';
  alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  container.insertBefore(alert, container.firstChild);
  
  // Auto-dismiss après 5 secondes
  setTimeout(() => {
    alert.remove();
  }, 5000);
}

// Fonction pour faire une requête API
async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Une erreur est survenue');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
}
