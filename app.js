const scriptURL = "https://script.google.com/macros/s/AKfycbxPcPqdRrTB0wpGhfZsSOhmMUOV0VsCE150uVdXD79Y4Tm3G5qrBuL_EYAswfvXc695/exec"; // Reemplaza con tu URL

    function registrar(tipo) {
      const empleado = document.getElementById("empleado").value;
      const mensajeDiv = document.getElementById("mensaje");

      fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify({ empleado, tipo })
      })
      .then(res => res.text())
.then(texto => {
  if (texto === "OK") {
    mensajeDiv.textContent = `✔️ ${tipo} registrada para ${empleado}`;
    mensajeDiv.style.color = "green";
  } else if (texto === "DUPLICADO") {
    mensajeDiv.textContent = `⚠️ Ya se registró ${tipo} hoy para ${empleado}`;
    mensajeDiv.style.color = "orange";
  } else {
    mensajeDiv.textContent = "❌ Error al registrar";
    mensajeDiv.style.color = "red";
  }
})
      .catch(() => {
        mensajeDiv.textContent = "❌ Error de conexión";
        mensajeDiv.style.color = "red";
      });
    }