let habitacionesMap = {}; // 👈 Ahora es global


document.addEventListener('DOMContentLoaded', () => {
  // Cargar habitaciones y llenar el mapa + selector
  fetch('/rooms')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('rooms-container');
      const select = document.getElementById('numero_habitacion');

      habitacionesMap = {};
      data.forEach(room => {
        habitacionesMap[room.numero] = room.codigo;

        container.innerHTML += `<p>🛏️ <strong>${room.numero}</strong> - ${room.tipo} - $${room.valor}</p>`;
        select.innerHTML += `<option value="${room.numero}">${room.numero} - ${room.tipo}</option>`;
      });
    });

  // ✅ Lógica para que el tipo determine el valor automáticamente
  const tipoInput = document.getElementById('tipo');
  const valorInput = document.getElementById('valor');

  const valoresPorTipo = {
    Sencilla: 150000,
    Doble: 220000,
    Suite: 350000,
    Familiar: 280000,
    Ejecutiva: 320000
  };

  tipoInput.addEventListener('change', () => {
    const tipoSeleccionado = tipoInput.value;
    valorInput.value = valoresPorTipo[tipoSeleccionado] || '';
  });

  // Envío de formulario de habitaciones
  const form = document.getElementById('room-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const numero = document.getElementById('numero').value;
    const tipo = tipoInput.value;
    const valor = valorInput.value;

    fetch('/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero, tipo, valor })
    })
    .then(res => res.json())
    .then(() => location.reload());
  });
});
;

// Mostrar reservas
fetch('/bookings')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('bookings-container');
    container.innerHTML = data.map(b => `
      <p>📅 <strong>${b.nombre_cliente}</strong> reservó habitación <strong>${b.codigo_habitacion}</strong> del ${b.fecha_entrada} al ${b.fecha_salida}</p>
    `).join('');
  });

// Enviar nueva reserva
const bookingForm = document.getElementById('booking-form');
bookingForm.addEventListener('submit', e => {
  e.preventDefault();
  const numeroSeleccionado = document.getElementById('numero_habitacion').value;
  const codigo_habitacion = habitacionesMap[numeroSeleccionado];

  const data = {
    codigo_habitacion,
    nombre_cliente: document.getElementById('nombre_cliente').value,
    telefono_cliente: document.getElementById('telefono_cliente').value,
    fecha_reservacion: document.getElementById('fecha_reservacion').value,
    fecha_entrada: document.getElementById('fecha_entrada').value,
    fecha_salida: document.getElementById('fecha_salida').value
  };

  fetch('/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(() => location.reload());
});
