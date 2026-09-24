# 🐾 PawPets

PawPets es un proyecto web desarrollado como parte de una evaluación
académica. El sitio representa una tienda orientada al cuidado y
bienestar de mascotas, incorporando un catálogo de productos, carrito de
compras, formularios con validaciones, contenido informativo y vistas
asociadas a distintos tipos de usuario.

## 📌 Descripción

El proyecto fue construido utilizando tecnologías web del lado del
cliente, sin depender de un backend ni de una base de datos.

Actualmente permite recorrer las principales secciones de PawPets,
visualizar productos, agregar productos al carrito y mantenerlos durante
la sesión del navegador. Además, incluye formularios de ingreso,
registro y contacto con validaciones realizadas mediante JavaScript.

También se incorporan vistas de demostración para los roles de
administrador y vendedor.

## ✨ Funcionalidades principales

-   Página de inicio de PawPets.
-   Catálogo de productos.
-   Vista de detalle de producto.
-   Carrito de compras.
-   Aumento y disminución de cantidades en el carrito.
-   Eliminación de productos del carrito.
-   Cálculo automático del total de la compra.
-   Persistencia temporal del carrito mediante `sessionStorage`.
-   Formulario de inicio de sesión con selección de rol.
-   Formulario de registro de usuarios.
-   Validación de correo electrónico.
-   Validación de RUT chileno.
-   Selección dependiente de región y comuna.
-   Formulario de contacto con validaciones.
-   Sección "Nosotros".
-   Blog con artículos relacionados con el cuidado de mascotas.
-   Panel de vendedor.
-   Vistas administrativas para productos, usuarios y reportes.
-   Diseño adaptable mediante CSS.

## 🛠️ Tecnologías utilizadas

-   **HTML5** --- estructura y contenido de las páginas.
-   **CSS** --- diseño, estilos y adaptación visual.
-   **JavaScript** --- validaciones, interacción y lógica del carrito.
-   **Web Storage API (`sessionStorage`)** --- almacenamiento temporal
    del carrito durante la sesión.

## 📂 Estructura del proyecto

``` text
Caso3_PawPets-main/
│
├── index.html
├── productos.html
├── detalle_producto.html
├── carrito.html
├── login.html
├── registro.html
├── contacto.html
├── nosotros.html
│
├── admin_productos.html
├── admin_usuarios.html
├── admin_reportes.html
├── vendedor.html
│
├── blog/
│   ├── blogs.html
│   ├── blog-calor.html
│   └── blog-vacunas.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── tienda.js
│   ├── validaciones.js
│   └── ui.js
│
└── README.md
```

## 🚀 Cómo ejecutar el proyecto

No es necesario instalar dependencias.

1.  Clona o descarga este repositorio.
2.  Abre la carpeta del proyecto.
3.  Ejecuta el archivo `index.html` en un navegador web.

También se puede utilizar una extensión como **Live Server** en Visual
Studio Code para levantar el proyecto mediante un servidor local.

## 👥 Tipos de usuario

La interfaz contempla tres tipos de acceso:

-   **Cliente:** navegación por la tienda y sus secciones principales.
-   **Vendedor:** acceso a una vista demostrativa de productos,
    clientes, ventas y pedidos.
-   **Administrador:** acceso a vistas de administración de productos,
    usuarios y reportes.

> **Nota:** el inicio de sesión actual funciona como una simulación del
> lado del cliente. No existe autenticación real contra un servidor o
> una base de datos.

## 🛒 Funcionamiento del carrito

El carrito está implementado en JavaScript y utiliza `sessionStorage`.

Esto permite:

-   agregar productos;
-   modificar cantidades;
-   eliminar productos;
-   calcular el total;
-   conservar el carrito al cambiar entre páginas durante la misma
    sesión.

Al cerrar la sesión del navegador, estos datos no se consideran
almacenamiento permanente.

## ✅ Validaciones implementadas

Los formularios incorporan validaciones del lado del cliente para:

-   campos obligatorios;
-   formato de correo electrónico;
-   dominios de correo permitidos;
-   longitud de contraseña;
-   coincidencia de contraseñas;
-   RUT chileno;
-   región y comuna;
-   formulario de contacto.

## ⚠️ Alcance actual

PawPets corresponde actualmente a una implementación **front-end**.

Por lo tanto:

-   no utiliza una base de datos;
-   no posee un backend;
-   no realiza autenticación real de usuarios;
-   el registro no almacena usuarios permanentemente;
-   el formulario de contacto no envía información a un servidor;
-   la compra es una simulación realizada en el navegador;
-   las vistas administrativas y de vendedor son demostrativas.

Estas características pueden incorporarse en futuras etapas del
proyecto.

## 🔮 Posibles mejoras futuras

-   Integración con una base de datos.
-   Backend para usuarios, productos, pedidos y ventas.
-   Autenticación y autorización real por roles.
-   Gestión dinámica de inventario.
-   Persistencia permanente del carrito.
-   Procesamiento real de pedidos.
-   Integración de medios de pago.
-   Administración dinámica de contenido y productos.

## 🎓 Contexto académico

Proyecto desarrollado con fines académicos para aplicar conocimientos de
desarrollo web, estructura HTML, estilos CSS, programación con
JavaScript, validación de formularios y manejo básico del almacenamiento
del navegador.
