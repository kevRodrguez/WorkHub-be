# 📂 Estructura de la API - WORKHUB-BE

Este proyecto sigue una **arquitectura en capas** basada en Node.js + TypeScript, organizada en **presentation → services → repositories → database**, acompañada de utilidades y middlewares.

---

## 📁 File System en Árbol

```text
WORKHUB-BE/
├── node_modules/
├── public/
├── src/
│   ├── config/
│   ├── data/
│   │   ├── repositories/
│   │   │   ├── candidate/
│   │   │   ├── enterprise/
│   │   │   └── shared/
│   ├── interfaces/
│   ├── middlewares/
│   ├── presentation/
│   │   ├── candidate/
│   │   │   ├── categoria/
│   │   │   │   ├── categoria.routes.ts
│   │   │   │   └── categorias.controller.ts
│   │   │   ├── curriculums/
│   │   │   ├── perfiles/
│   │   │   └── routes.ts
│   │   ├── enterprise/
│   │   │   ├── aplicaciones/
│   │   │   ├── perfiles/
│   │   │   ├── trabajos/
│   │   │   └── routes.ts
│   │   └── shared/
│   │       ├── trabajos/
│   │       │   ├── trabajos.controller.ts
│   │       │   └── trabajos.routes.ts
│   │       ├── routes.ts
│   │       └── server.ts
│   ├── services/
│   │   ├── candidate/
│   │   │   ├── categorias.service.ts
│   │   │   ├── curriculums.service.ts
│   │   │   └── perfiles.service.ts
│   │   ├── enterprise/
│   │   │   ├── aplicaciones.service.ts
│   │   │   ├── perfiles.service.ts
│   │   │   └── trabajos.service.ts
│   │   └── shared/
│   │       └── trabajos.service.ts
│   ├── utils/
│   │   ├── CustomError.ts
│   │   ├── errors.ts
│   │   ├── express-validators.ts
│   │   ├── validation-error.middleware.ts
│   │   └── validators.ts
│   └── app.ts
├── .env
├── .env.template
```

---

## 📌 Explicación de la Arquitectura

La arquitectura está organizada en **capas** para mantener la separación de responsabilidades:

1. **Presentation (Routes + Controllers)**  
   - Define las rutas de la API y maneja las solicitudes HTTP.  
   - Los controladores reciben la request, validan datos y delegan la lógica a los **services**.

2. **Services (Business Logic)**  
   - Contienen la lógica de negocio de la aplicación.  
   - Aquí se gestionan validaciones más complejas y reglas específicas.  
   - Interactúan con los **repositories** para obtener/guardar datos.

3. **Repositories (Data Layer)**  
   - Encargados de interactuar directamente con la base de datos o el ORM.  
   - Devuelven datos crudos que luego los services procesan.

4. **Database (External)**  
   - Persistencia de datos. Los repositories se conectan a esta capa.

5. **Utils**  
   - Manejo de errores, validaciones, funciones auxiliares.

6. **Middlewares**  
   - Se ejecutan antes o después de los controladores.  
   - Usados para autenticación, validaciones, logging, etc.

---

## 📂 Módulos (Candidate, Enterprise, Shared)

Dentro de las carpetas `repositories`, `services` y `presentation` (controllers/rutas), existen tres módulos principales que organizan la aplicación según los diferentes tipos de usuarios y funcionalidades:

- **Candidate**: Contiene la lógica, rutas y servicios del panel del candidato. Aquí se gestionan funcionalidades como ver empleos, postularse a ofertas, administrar currículums y perfiles personales.

- **Enterprise**: Incluye la lógica, rutas y servicios del panel de la empresa. Permite publicar ofertas de trabajo, gestionar aplicaciones recibidas, revisar perfiles de candidatos y administrar otros recursos relacionados con la empresa.

- **Shared**: Alberga la lógica y endpoints comunes a ambos paneles, como la gestión de trabajos y otros recursos compartidos que son utilizados tanto por candidatos como por empresas.

Esta separación modular facilita mantener un backend organizado, modular y escalable, adaptado al contexto de una bolsa de trabajo con dos tipos de usuarios principales.
