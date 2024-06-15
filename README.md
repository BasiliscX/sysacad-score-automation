# SSA (Sysasacad Score Automation)

## Descripción

SSA es una API desarrollada en Node.js utilizando Express y Puppeteer. Dado un número de universidad, legajo y contraseña, esta API ingresa al sitio web académico de la facultad con Puppeteer, realiza los clics necesarios en los botones e ingresa hasta la tabla con las calificaciones, copia en memoria los campos de la tabla y devuelve un JSON con las calificaciones del usuario.

## Requisitos

- Node.js
- NPM
- Google Chrome

## Instalación

1. Clona este repositorio:

    ```bash
    git clone https://github.com/BasiliscX/sysacad-score-automation.git
    cd ssa
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

## Uso

1. Asegúrate de tener Google Chrome instalado en tu máquina y de que el path en `puppeteer.launch` en `src/features/scores/scores.service.js` apunte a la ubicación correcta de `chrome.exe`.

2. Inicia el servidor:

    ```bash
    npm start
    ```

3. La API estará disponible en `http://localhost:3000`.

## Endpoints

### Obtener Calificaciones

- **URL:** `/api/califications`
- **Método:** `POST`
- **Descripción:** Obtiene las calificaciones de un estudiante.
- **Body:** JSON con los siguientes campos:

    ```json
    {
        "facultad": "numero_de_facultad",
        "legajo": "numero_de_legajo",
        "password": "contrasena"
    }
    ```

- **Ejemplo de petición:**

    ```bash
    curl -X POST http://localhost:3000/api/califications -H "Content-Type: application/json" -d '{
        "facultad": "666",
        "legajo": "123456",
        "password": "tu_contraseña"
    }'
    ```

- **Ejemplo de respuesta:**

    ```json
    [
        {
            "fecha": "2023-05-10",
            "materia": "Matemáticas",
            "nota": "9",
            "especialidad": "Ingeniería",
            "plan": "2020",
            "codigo": "MAT123"
        },
        ...
    ]
    ```

### Home

- **URL:** `/api`
- **Método:** `GET`
- **Descripción:** Punto de inicio de la API.
- **Ejemplo de respuesta:**

    ```json
    "home"
    ```

### Califications Feature

- **URL:** `/api/califications`
- **Método:** `GET`
- **Descripción:** Punto de entrada de la funcionalidad de calificaciones.
- **Ejemplo de respuesta:**

    ```json
    "califications feature!"
    ```

## Estructura del Proyecto

```
ssa/
│
├── package.json
├── package-lock.json
├── server.js
└── src/
    ├── routes.js
    └── features/
        └── scores/
            ├── scores.controller.js
            ├── scores.routes.js
            └── scores.service.js
```

## Autor

Guillermo Navarro
