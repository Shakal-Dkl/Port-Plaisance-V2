// Gestion des utilisateurs
document.getElementById('createUserForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  try {
    const result = await apiRequest('/api/users', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    showMessage(result.message, 'success');
    e.target.reset();
  } catch (error) {
    showMessage(error.message, 'danger');
  }
});

document.getElementById('updateUserForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  const id = data.id;
  delete data.id;
  
  // Nettoyer les champs vides
  Object.keys(data).forEach(key => {
    if (!data[key]) delete data[key];
  });
  
  try {
    const result = await apiRequest(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    
    showMessage(result.message, 'success');
    e.target.reset();
  } catch (error) {
    showMessage(error.message, 'danger');
  }
});

document.getElementById('deleteUserForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const id = formData.get('id');
  
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    return;
  }
  
  try {
    const result = await apiRequest(`/api/users/${id}`, {
      method: 'DELETE'
    });
    
    showMessage(result.message, 'success');
    e.target.reset();
  } catch (error) {
    showMessage(error.message, 'danger');
  }
});

// Gestion des catways
document.getElementById('createCatwayForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  try {
    const result = await apiRequest('/api/catways', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    showMessage(result.message, 'success');
    e.target.reset();
    setTimeout(() => location.reload(), 2000);
  } catch (error) {
    showMessage(error.message, 'danger');
  }
});

document.getElementById('updateCatwayForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  const id = data.id;
  delete data.id;
  
  try {
    const result = await apiRequest(`/api/catways/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    
    showMessage(result.message, 'success');
    e.target.reset();
    setTimeout(() => location.reload(), 2000);
  } catch (error) {
    showMessage(error.message, 'danger');
  }
});

document.getElementById('deleteCatwayForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const id = formData.get('id');
  
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce catway ?')) {
    return;
  }
  
  try {
    const result = await apiRequest(`/api/catways/${id}`, {
      method: 'DELETE'
    });
    
    showMessage(result.message, 'success');
    e.target.reset();
    setTimeout(() => location.reload(), 2000);
  } catch (error) {
    showMessage(error.message, 'danger');
  }
});

document.getElementById('viewCatwayForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const id = formData.get('id');
  
  try {
    const result = await apiRequest(`/api/catways/${id}`);
    const catway = result.data;
    
    const detailsDiv = document.getElementById('catwayDetails');
    detailsDiv.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Catway ${catway.catwayNumber}</h5>
          <dl class="row mb-0">
            <dt class="col-sm-3">ID:</dt>
            <dd class="col-sm-9"><code>${catway._id}</code></dd>
            <dt class="col-sm-3">Numéro:</dt>
            <dd class="col-sm-9">${catway.catwayNumber}</dd>
            <dt class="col-sm-3">Type:</dt>
            <dd class="col-sm-9"><span class="badge bg-${catway.type === 'long' ? 'primary' : 'secondary'}">${catway.type}</span></dd>
            <dt class="col-sm-3">État:</dt>
            <dd class="col-sm-9">${catway.catwayState}</dd>
            <dt class="col-sm-3">Créé le:</dt>
            <dd class="col-sm-9">${new Date(catway.createdAt).toLocaleString('fr-FR')}</dd>
          </dl>
        </div>
      </div>
    `;
  } catch (error) {
    showMessage(error.message, 'danger');
  }
});

// Gestion des réservations
document.getElementById('createReservationForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  try {
    const result = await apiRequest('/api/reservations', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    showMessage(result.message, 'success');
    e.target.reset();
    setTimeout(() => location.reload(), 2000);
  } catch (error) {
    showMessage(error.message, 'danger');
  }
});

document.getElementById('deleteReservationForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const id = formData.get('id');
  
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
    return;
  }
  
  try {
    const result = await apiRequest(`/api/reservations/${id}`, {
      method: 'DELETE'
    });
    
    showMessage(result.message, 'success');
    e.target.reset();
    setTimeout(() => location.reload(), 2000);
  } catch (error) {
    showMessage(error.message, 'danger');
  }
});

document.getElementById('viewReservationForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const id = formData.get('id');
  
  try {
    const result = await apiRequest(`/api/reservations/${id}`);
    const reservation = result.data;
    
    const checkInDate = new Date(reservation.checkIn);
    const checkOutDate = new Date(reservation.checkOut);
    const duration = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    const detailsDiv = document.getElementById('reservationDetails');
    detailsDiv.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Réservation - ${reservation.clientName}</h5>
          <dl class="row mb-0">
            <dt class="col-sm-3">ID:</dt>
            <dd class="col-sm-9"><code>${reservation._id}</code></dd>
            <dt class="col-sm-3">Catway:</dt>
            <dd class="col-sm-9">${reservation.catwayNumber}</dd>
            <dt class="col-sm-3">Client:</dt>
            <dd class="col-sm-9">${reservation.clientName}</dd>
            <dt class="col-sm-3">Bateau:</dt>
            <dd class="col-sm-9">${reservation.boatName}</dd>
            <dt class="col-sm-3">Arrivée:</dt>
            <dd class="col-sm-9">${checkInDate.toLocaleDateString('fr-FR')}</dd>
            <dt class="col-sm-3">Départ:</dt>
            <dd class="col-sm-9">${checkOutDate.toLocaleDateString('fr-FR')}</dd>
            <dt class="col-sm-3">Durée:</dt>
            <dd class="col-sm-9">${duration} jour${duration > 1 ? 's' : ''}</dd>
            <dt class="col-sm-3">Créée le:</dt>
            <dd class="col-sm-9">${new Date(reservation.createdAt).toLocaleString('fr-FR')}</dd>
          </dl>
        </div>
      </div>
    `;
  } catch (error) {
    showMessage(error.message, 'danger');
  }
});
