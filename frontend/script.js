const apiUrlPost = "http://localhost:8080/api/postUsuario"; // URL para registrar un usuario
const apiUrlGet = "http://localhost:8080/api/getUsuarios"; // URL para obtener los usuarios

// Función para registrar un usuario
async function registrarUsuario(event) {
  event.preventDefault(); // Evita que se recargue la página al enviar el formulario

  // Captura los valores del formulario
  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const telefono = document.getElementById("telefono").value;
  const usuario = document.getElementById("usuario").value;

  // Crea el objeto que será enviado al backend
  const usuarioData = { nombre, apellidos, telefono, usuario };

  try {
    const response = await fetch(apiUrlPost, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioData),
    });

    if (response.ok) {
      alert("Usuario registrado con éxito!");
      obtenerUsuarios(); // Actualiza la tabla con los usuarios
    } else {
      alert("Error al registrar el usuario");
    }
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
  }
}

// Función para obtener y mostrar todos los usuarios
async function obtenerUsuarios() {
  try {
    const response = await fetch(apiUrlGet, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const usuarios = await response.json();

      // Verifica si la tabla existe antes de intentar modificarla
      const tablaCuerpo = document.getElementById("usuariosTable")?.getElementsByTagName("tbody")[0];
      if (tablaCuerpo) {
        tablaCuerpo.innerHTML = ""; // Limpia la tabla antes de agregar los datos

        usuarios.forEach((usuario) => {
          const fila = document.createElement("tr");
          fila.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.telefono}</td>
            <td>${usuario.usuario}</td>
          `;
          tablaCuerpo.appendChild(fila);
        });
      } else {
        console.error("No se encontró el cuerpo de la tabla.");
      }
    } else {
      alert("Error al obtener la lista de usuarios");
    }
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
  }
}

// Llama a obtenerUsuarios al cargar la página
document.addEventListener("DOMContentLoaded", obtenerUsuarios);

// Asigna la función al evento de envío del formulario
document.getElementById("formulario-usuario").addEventListener("submit", registrarUsuario);
