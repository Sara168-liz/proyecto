const BASE_URL = "http://127.0.0.1:5000";

// Visualizar datos en la tabla
function visualizar(data) {
  let tabla = "";
  data.forEach(item => {
    tabla += `<tr data-id="${item.id_baul}">
      <td>${item.id_baul}</td>
      <td>${item.Plataforma}</td>
      <td>${item.usuario}</td>
      <td>${item.clave}</td>
      <td>
        <button class='btn btn-info' onclick="location.href='edit.html?id=${item.id_baul}'">Editar</button>
        <button class='btn btn-warning' onclick="eliminar(${item.id_baul})">Eliminar</button>
      </td>
    </tr>`;
  });
  document.getElementById('data').innerHTML = tabla;
}

// Consulta general (GET)
function consulta_general() {
  fetch(`${BASE_URL}/baul`)
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(data => visualizar(data))
    .catch(e => console.error('Error:', e));
}

// Eliminar (DELETE)
function eliminar(id) {
  if (!confirm(`¿Eliminar la credencial ${id}?`)) return;
  fetch(`${BASE_URL}/baul/${id}`, { method: 'DELETE' })
    .then(r => r.json())
    .then(() => consulta_general())
    .catch(e => console.error('Error:', e));
}

// Registrar (POST)
function registrar() {
  const data = {
    Plataforma: document.getElementById("Plataforma").value,
    usuario: document.getElementById("usuario").value,
    clave: document.getElementById("clave").value
  };
  fetch(`${BASE_URL}/baul`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(r => r.json())
    .then(() => { alert("Credencial registrada"); location.href = 'index.html'; })
    .catch(e => console.error('Error:', e));
}

// Consulta individual (GET)
function consulta_individual(id) {
  fetch(`${BASE_URL}/baul/${id}`)
    .then(r => r.json())
    .then(data => {
      document.getElementById("Plataforma").value = data.Plataforma;
      document.getElementById("usuario").value = data.usuario;
      document.getElementById("clave").value = data.clave;
    })
    .catch(e => console.error('Error:', e));
}

// Modificar (PUT)
function modificar(id) {
  const data = {
    Plataforma: document.getElementById("Plataforma").value,
    usuario: document.getElementById("usuario").value,
    clave: document.getElementById("clave").value
  };
  fetch(`${BASE_URL}/baul/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(r => r.json())
    .then(() => { alert("Credencial actualizada"); location.href = 'index.html'; })
    .catch(e => console.error('Error:', e));
}