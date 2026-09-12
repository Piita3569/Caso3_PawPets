document.addEventListener("DOMContentLoaded", function () {
    cargarRegiones();
    validarLogin();
    validarRegistro();
    validarContacto();
});

function cargarRegiones() {
    var regiones = { "Metropolitana": ["Santiago", "Puente Alto", "Maipú"], "Valparaíso": ["Viña del Mar", "Valparaíso", "Quilpué"] };
    var region = document.getElementById("region");
    var comuna = document.getElementById("comuna");
    var nombreRegion;
    if (region == null || comuna == null) return;

    for (nombreRegion in regiones) region.innerHTML += '<option value="' + nombreRegion + '">' + nombreRegion + '</option>';
    region.addEventListener("change", function () {
        var i;
        comuna.innerHTML = '<option value="">Seleccione una comuna</option>';
        comuna.disabled = region.value == "";
        if (region.value == "") return;
        for (i = 0; i < regiones[region.value].length; i++) comuna.innerHTML += '<option value="' + regiones[region.value][i] + '">' + regiones[region.value][i] + '</option>';
    });
}

function validarLogin() {
    var formulario = document.getElementById("formularioLogin");
    if (formulario == null) return;
    formulario.addEventListener("submit", function (evento) {
        var rol = document.getElementById("rol").value;
        var email = document.getElementById("email").value.trim();
        var password = document.getElementById("password").value;
        var correcto = true;
        evento.preventDefault();

        if (rol == "") { mostrarError("errorRol", "Seleccione un rol."); correcto = false; } else mostrarError("errorRol", "");
        if (!validarCorreo(email)) { mostrarError("errorEmail", "Ingrese un correo válido."); correcto = false; } else mostrarError("errorEmail", "");
        if (password.length < 4 || password.length > 10) { mostrarError("errorPassword", "La contraseña debe tener entre 4 y 10 caracteres."); correcto = false; } else mostrarError("errorPassword", "");
        if (correcto) window.location.href = destinoRol(rol);
    });
}

function validarRegistro() {
    var formulario = document.getElementById("formularioRegistro");
    if (formulario == null) return;
    formulario.addEventListener("submit", function (evento) {
        var nombre = document.getElementById("nombre").value.trim();
        var email = document.getElementById("emailRegistro").value.trim();
        var password = document.getElementById("passwordRegistro").value;
        var confirmarPassword = document.getElementById("confirmarPassword").value;
        var rut = document.getElementById("rut").value;
        var region = document.getElementById("region");
        var comuna = document.getElementById("comuna");
        var correcto = true;
        evento.preventDefault();

        if (nombre.length < 3) { mostrarError("errorNombre", "Ingrese su nombre completo."); correcto = false; } else mostrarError("errorNombre", "");
        if (!validarCorreo(email)) { mostrarError("errorEmailRegistro", "Ingrese un correo válido."); correcto = false; } else mostrarError("errorEmailRegistro", "");
        if (password.length < 4 || password.length > 10) { mostrarError("errorPasswordRegistro", "La contraseña debe tener entre 4 y 10 caracteres."); correcto = false; } else mostrarError("errorPasswordRegistro", "");
        if (password != confirmarPassword) { mostrarError("errorConfirmarPassword", "Las contraseñas no coinciden."); correcto = false; } else mostrarError("errorConfirmarPassword", "");
        if (!validarRut(rut)) { mostrarError("errorRut", "Ingrese un RUT válido."); correcto = false; } else mostrarError("errorRut", "");
        if (region.value == "") { mostrarError("errorRegion", "Seleccione una región."); correcto = false; } else mostrarError("errorRegion", "");
        if (comuna.value == "") { mostrarError("errorComuna", "Seleccione una comuna."); correcto = false; } else mostrarError("errorComuna", "");

        if (correcto) {
            document.getElementById("mensajeRegistro").innerHTML = "¡Registro realizado correctamente!";
            formulario.reset();
            comuna.innerHTML = '<option value="">Primero seleccione región</option>';
            comuna.disabled = true;
        } else document.getElementById("mensajeRegistro").innerHTML = "";
    });
}

function validarContacto() {
    var formulario = document.getElementById("formularioContacto");
    if (formulario == null) return;
    formulario.addEventListener("submit", function (evento) {
        var nombre = document.getElementById("contactoNombre").value.trim();
        var email = document.getElementById("contactoEmail").value.trim();
        var comentario = document.getElementById("comentario").value.trim();
        var correcto = true;
        evento.preventDefault();
        if (nombre == "") { mostrarError("errorContactoNombre", "El nombre es obligatorio."); correcto = false; } else mostrarError("errorContactoNombre", "");
        if (!validarCorreo(email)) { mostrarError("errorContactoEmail", "Ingrese un correo válido."); correcto = false; } else mostrarError("errorContactoEmail", "");
        if (comentario == "") { mostrarError("errorComentario", "El mensaje es obligatorio."); correcto = false; } else mostrarError("errorComentario", "");
        if (correcto) document.getElementById("mensajeContacto").innerHTML = "Mensaje enviado correctamente.";
    });
}

function mostrarError(id, mensaje) { document.getElementById(id).innerHTML = mensaje; }

function validarRut(rut) {
    var limpio = rut.replace(/[^0-9kK]/g, "").toUpperCase();
    var cuerpo = limpio.slice(0, -1);
    var digito = limpio.slice(-1);
    var suma = 0;
    var multiplicador = 2;
    var i;
    var resultado;
    var esperado;

    if (!/^\d{7,8}[0-9K]$/.test(limpio)) return false;
    for (i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador == 7 ? 2 : multiplicador + 1;
    }
    resultado = 11 - (suma % 11);
    esperado = resultado == 11 ? "0" : resultado == 10 ? "K" : String(resultado);
    return digito == esperado;
}

function validarCorreo(email) {
    var formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    var dominio = email.endsWith("@duoc.cl") || email.endsWith("@profesor.duoc.cl") || email.endsWith("@gmail.com") || email.endsWith("@pawpets.cl");
    return formato && dominio;
}

function destinoRol(rol) {
    if (rol == "administrador") return "admin_productos.html";
    if (rol == "vendedor") return "vendedor.html";
    return "index.html";
}
