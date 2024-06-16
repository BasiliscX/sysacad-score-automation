# SSA (Sysacad Score Automation)

SSA es una API desarrollada en Node.js que automatiza la obtención de calificaciones desde el sistema académico Sysacad de la Universidad Tecnológica Nacional. Utiliza web scraping con Puppeteer para navegar por el sitio web, iniciar sesión y extraer la información de las calificaciones del estudiante, y las devuelve en formato JSON.

## Características

- **Automatización de Tareas**: Accede al sistema Sysacad con las credenciales proporcionadas y extrae las calificaciones sin intervención manual.
- **Seguridad y Transparencia**: No se almacena ni se roba información personal. Puedes revisar el [código fuente en GitHub](https://github.com/BasiliscX/sysacad-score-automation.git) para verificar su funcionamiento.
- **Interfaz Web**: Incluye una sencilla interfaz web para interactuar con la API a través del formulario HTML de la pantalla principal o con herramientas como Insomnia y Postman.

## Uso

### Interfaz Web

1. Accede a la [página principal del servidor](https://sysacad-score-automation.onrender.com/).
2. Completa el formulario con el número de facultad, legajo y contraseña para obtener las calificaciones.
3. También puedes enviar una solicitud POST a `https://sysacad-score-automation.onrender.com/api/scores` con Insomnia, Postman u otras herramientas similares.

### Uso Local

1. **Instalación**: Clona este repositorio o descárgalo directamente. Asegúrate de tener Node.js instalado.
2. **Configuración**: Configura las variables de entorno o ajusta las opciones según sea necesario en el archivo `server.js`.
3. **Ejecución**: Inicia el servidor ejecutando `npm start` en tu terminal.

## Contribución

Si deseas contribuir a SSA, sigue estos pasos:

1. Haz un fork del repositorio y clónalo en tu máquina local.
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y pruebas.
4. Confirma los cambios (`git commit -am 'Añade nueva funcionalidad'`).
5. Sube los cambios a la rama (`git push origin feature/nueva-funcionalidad`).
6. Abre una solicitud de extracción en GitHub.

## Agradecimientos

Este proyecto utiliza tecnologías de código abierto y agradece a la comunidad de desarrolladores por su apoyo y contribuciones.

## Contacto

Para cualquier pregunta o sugerencia, no dudes en contactar conmigo a través de mi [perfil de GitHub](https://github.com/BasiliscX).
