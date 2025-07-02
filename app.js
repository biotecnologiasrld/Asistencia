const scriptURL = "https://script.google.com/macros/s/AKfycbxoewMnRVsUISSxU9qSs8eAp0Jp1xH-Y-kydPvlFb9iHjNAuC1FDfJyCT0dbId7v2bA/exec"; // Reemplaza con tu URL

function registrar(tipo) {
  const empleado = document.getElementById("empleado").value;

  // Mostrar alerta de carga
  Swal.fire({
    title: 'Registrando...',
    text: 'Por favor espera',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify({ empleado, tipo })
  })
  .then(res => res.text())
  .then(texto => {
    Swal.close(); // Cierra la alerta de carga

    if (texto === "OK") {
      Swal.fire({
        icon: 'success',
        title: `✔️ ${tipo} registrada`,
        text: `Empleado: ${empleado}`,
        showConfirmButton: false,
        timer: 1500
      });
    } else if (texto === "DUPLICADO") {
      Swal.fire({
        icon: 'warning',
        title: `⚠️ Registro duplicado`,
        text: `${empleado} ya marcó ${tipo} hoy.`,
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: '❌ Error al registrar',
        text: 'Intenta nuevamente.',
        showConfirmButton: false,
        timer: 1500
      });
    }
  })
  .catch(() => {
    Swal.close(); // Cierra la alerta de carga
    Swal.fire({
      icon: 'error',
      title: '❌ Error de conexión',
      text: 'Verifica tu red',
      showConfirmButton: false,
      timer: 1500
    });
  });
}
