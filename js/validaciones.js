document.addEventListener("DOMContentLoaded", function () {
    var regiones = {
        "Metropolitana": ["Santiago", "Puente Alto", "Maipú"],
        "Valparaíso": ["Viña del Mar", "Valparaíso", "Quilpué"]
    };
    var region = document.getElementById("region");
    var comuna = document.getElementById("comuna");
    var nombreRegion;

    if (region != null && comuna != null) {
        for (nombreRegion in regiones) {
            region.innerHTML += '<option value="' + nombreRegion + '">' + nombreRegion + '</option>';
        }

        region.addEventListener("change", function () {
            var i;
            comuna.innerHTML = '<option value="">Seleccione una comuna</option>';
            comuna.disabled = false;

            for (i = 0; i < regiones[region.value].length; i++) {
                comuna.innerHTML += '<option value="' + regiones[region.value][i] + '">' + regiones[region.value][i] + '</option>';
            }
        });
    }

    var formularioLogin = document.getElementById("formularioLogin");
    if (formularioLogin != null) {
        formularioLogin.addEventListener("submit", function (evento) {
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;
            var correoValido = email.indexOf("@duoc.cl") != -1 || email.indexOf("@profesor.duoc.cl") != -1 || email.indexOf("@gmail.com") != -1;
            var correcto = true;
            evento.preventDefault();

            if (!correoValido) { mostrarError("errorEmail", "Use correo @duoc.cl, @profesor.duoc.cl o @gmail.com."); correcto = false; } else mostrarError("errorEmail", "");
            if (password.length < 4 || password.length > 10) { mostrarError("errorPassword", "La contraseña debe tener entre 4 y 10 caracteres."); correcto = false; } else mostrarError("errorPassword", "");
            if (correcto) document.getElementById("mensajeLogin").innerHTML = "Datos correctos.";
        });
    }

    var formularioRegistro = document.getElementById("formularioRegistro");
    if (formularioRegistro != null) {
        formularioRegistro.addEventListener("submit", function (evento) {
            var nombre = document.getElementById("nombre").value;
            var rut = document.getElementById("rut").value;
            var correcto = true;
            evento.preventDefault();

            if (nombre == "") { mostrarError("errorNombre", "El nombre es obligatorio."); correcto = false; } else mostrarError("errorNombre", "");
            if (!validarRut(rut)) { mostrarError("errorRut", "Ingrese un RUT válido."); correcto = false; } else mostrarError("errorRut", "");
            if (region.value == "") { mostrarError("errorRegion", "Seleccione una región."); correcto = false; } else mostrarError("errorRegion", "");
            if (comuna.value == "") { mostrarError("errorComuna", "Seleccione una comuna."); correcto = false; } else mostrarError("errorComuna", "");
            if (correcto) document.getElementById("mensajeRegistro").innerHTML = "¡Registro realizado correctamente!";
        });
    }
});

function mostrarError(id, mensaje) {
    document.getElementById(id).innerHTML = mensaje;
}

function validarRut(rut) {
    // Fórmula solicitada en la pauta para comprobar el dígito verificador.
    var rutLimpio = rut.replace(/[^0-9kK]/g, "").toUpperCase();
    var cuerpo = rutLimpio.slice(0, -1);
    var digito = rutLimpio.slice(-1);
    var suma = 0;
    var multiplicador = 2;
    var i;
    var resultado;
    var esperado;

    if (rutLimpio.length < 8 || rutLimpio.length > 9) return false;

    for (i = cuerpo.length - 1; i >= 0; i--) {
        suma = suma + Number(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador + 1;
        if (multiplicador == 8) multiplicador = 2;
    }

    resultado = 11 - (suma % 11);
    esperado = String(resultado);
    if (resultado == 11) esperado = "0";
    if (resultado == 10) esperado = "K";

    return digito == esperado;
}

document.addEventListener("DOMContentLoaded", function () {
    var formularioContacto = document.getElementById("formularioContacto");

    if (formularioContacto != null) {
        formularioContacto.addEventListener("submit", function (evento) {
            var nombre = document.getElementById("contactoNombre").value;
            var email = document.getElementById("contactoEmail").value;
            var comentario = document.getElementById("comentario").value;
            var correoValido = email.indexOf("@duoc.cl") != -1 || email.indexOf("@profesor.duoc.cl") != -1 || email.indexOf("@gmail.com") != -1;
            var correcto = true;
            evento.preventDefault();

            if (nombre == "") { mostrarError("errorContactoNombre", "El nombre es obligatorio."); correcto = false; } else mostrarError("errorContactoNombre", "");
            if (!correoValido) { mostrarError("errorContactoEmail", "Ingrese un correo permitido."); correcto = false; } else mostrarError("errorContactoEmail", "");
            if (comentario == "") { mostrarError("errorComentario", "El mensaje es obligatorio."); correcto = false; } else mostrarError("errorComentario", "");
            if (correcto) document.getElementById("mensajeContacto").innerHTML = "Mensaje enviado correctamente.";
        });
    }
});
