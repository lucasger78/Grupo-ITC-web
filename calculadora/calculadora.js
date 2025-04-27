
///////////FUNCIONA BIEN SOLO QUE CUANDO ELIMINO UN ELEMENTO SE ELIMINA EL ENVIO TAMBIÉN //////////////
// const precioInput = document.getElementById('precio');
// const categoriaSelect = document.getElementById('categoria');
// const agregarBtn = document.getElementById('agregar');
// const listaCategorias = document.getElementById('listaCategorias');
// const totalFinal = document.getElementById('totalFinal');
// const entregaSelect = document.getElementById('entrega');
// const pesoInput = document.getElementById('peso');

// let categoriasElegidas = [];

// function actualizarDOM() {
//   listaCategorias.innerHTML = "";
//   let sumaTotal = 0;

//   categoriasElegidas.forEach((cat, index) => {
//     const extra = cat.precioBase * (cat.porcentaje / 100);
//     let total = cat.precioBase + extra;
//     sumaTotal += total;

//     const div = document.createElement('div');
//     div.className = 'categoria-item';
//     div.innerHTML = `
//       <strong>${cat.nombre}</strong><br>
//       Porcentaje: ${cat.porcentaje}%<br>
//       Precio base: $${cat.precioBase.toFixed(2)}<br>
//       Precio final: $${total.toFixed(2)}
//       <button class="quitar-btn" onclick="eliminarCategoria(${index})">Quitar</button>
//     `;
//     listaCategorias.appendChild(div);
//   });

//   // ✅ Corregido para evitar NaN si los inputs están vacíos
//   const costoEnvio = parseFloat(entregaSelect.value) || 0;
//   const peso = parseFloat(pesoInput.value) || 0;
//   let recargoPeso = peso > 25 ? 50 : 0;

//   sumaTotal += costoEnvio + recargoPeso;

//   totalFinal.innerText = `Total final: $${sumaTotal.toFixed(2)}`;
// }

// function eliminarCategoria(index) {
//   categoriasElegidas.splice(index, 1);
//   actualizarDOM();
// }

// agregarBtn.addEventListener('click', () => {
//   const porcentaje = parseFloat(categoriaSelect.value);
//   const nombre = categoriaSelect.options[categoriaSelect.selectedIndex].text;
//   const precioBase = parseFloat(precioInput.value);

//   if (precioBase > 3000) {
//     Swal.fire({
//       icon: 'error',
//       title: 'Oops...',
//       text: 'Superaste el monto máximo permitido (U$S 3000)' 
//     });
//     return;
//   }

//   if (!isNaN(porcentaje) && !isNaN(precioBase)) {
//     categoriasElegidas.push({ nombre, porcentaje, precioBase });
//     actualizarDOM();

//     // ✅ Limpia el formulario después de agregar
//     limpiarFormulario();
//   }
// });

// pesoInput.addEventListener('input', actualizarDOM);
// entregaSelect.addEventListener('change', actualizarDOM);

// window.eliminarCategoria = eliminarCategoria;

// // ✅ NUEVA función para limpiar el formulario
// function limpiarFormulario() {
//   document.getElementById("precio").value = "";
//   document.getElementById("peso").value = "";
//   document.getElementById("categoria").selectedIndex = 0;
//   document.getElementById("entrega").selectedIndex = 0;
//   document.getElementById("precio").focus(); // opcional: enfoca el input de precio
// }

//////////OTRA PRUEBA/////////
const precioInput = document.getElementById('precio');
const categoriaSelect = document.getElementById('categoria');
const agregarBtn = document.getElementById('agregar');
const listaCategorias = document.getElementById('listaCategorias');
const totalFinal = document.getElementById('totalFinal');
const entregaSelect = document.getElementById('entrega');
const pesoInput = document.getElementById('peso');

let categoriasElegidas = [];

// ✅ Solo se suma una vez
let costoEnvioFijo = 0;

function actualizarDOM() {
  listaCategorias.innerHTML = "";
  let sumaTotal = 0;

  categoriasElegidas.forEach((cat, index) => {
    const extra = cat.precioBase * (cat.porcentaje / 100);
    let total = cat.precioBase + extra;

    // ✅ Sumar recargo por peso si ese ítem pesa más de 25
    if (cat.peso > 25) {
      total += 50;
    }

    sumaTotal += total;

    const div = document.createElement('div');
    div.className = 'categoria-item';
    div.innerHTML = `
      <strong>${cat.nombre}</strong><br>
      Porcentaje: ${cat.porcentaje}%<br>
      Precio base: $${cat.precioBase.toFixed(2)}<br>
      Peso: ${cat.peso} kg<br>
      Precio final: $${total.toFixed(2)}
      <button class="quitar-btn" onclick="eliminarCategoria(${index})">Quitar</button>
    `;
    listaCategorias.appendChild(div);
  });

  // ✅ Sumar costo de envío una sola vez si hay al menos 1 ítem
  if (categoriasElegidas.length > 0) {
    sumaTotal += costoEnvioFijo;
  } else {
    costoEnvioFijo = 0;
  }

  totalFinal.innerText = `Total final con envío: $${sumaTotal.toFixed(2)}`;
}

function eliminarCategoria(index) {
  categoriasElegidas.splice(index, 1);
  actualizarDOM();
}

agregarBtn.addEventListener('click', () => {
  const porcentaje = parseFloat(categoriaSelect.value);
  const nombre = categoriaSelect.options[categoriaSelect.selectedIndex].text;
  const precioBase = parseFloat(precioInput.value);
  const peso = parseFloat(pesoInput.value);

  if (precioBase > 3000) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Superaste el monto máximo permitido (U$S 3000)' 
    });
    return;
  }

  if (peso > 50) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Superaste el peso máximo permitido (50 KG)' 
    });
    return;
  } 

  if (!isNaN(porcentaje) && !isNaN(precioBase) && !isNaN(peso)) {
    categoriasElegidas.push({ nombre, porcentaje, precioBase, peso });

    // ✅ Guardar el costo de envío la primera vez
    if (categoriasElegidas.length === 1) {
      costoEnvioFijo = parseFloat(entregaSelect.value) || 0;
    }

    actualizarDOM();
    limpiarFormulario();
  }
});

pesoInput.addEventListener('input', actualizarDOM);
entregaSelect.addEventListener('change', actualizarDOM);

window.eliminarCategoria = eliminarCategoria;

// ✅ Limpieza de formulario
function limpiarFormulario() {
  document.getElementById("precio").value = "";
  document.getElementById("peso").value = "";
  document.getElementById("categoria").selectedIndex = 0;
  document.getElementById("entrega").selectedIndex = 0;
  document.getElementById("precio").focus();
}
