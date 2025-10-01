# 📂 Estructura de la API - WORKHUB-BE

Este proyecto sigue una **arquitectura en capas** basada en Node.js + TypeScript, organizada en **presentation → services → repositories → database**, acompañada de utilidades y middlewares.

---

## 📁 File System en Árbol

- **WORKHUB-BE/**
  - **node_modules/**
  - **public/**
  - **src/**
    - **config/**  
      Configuración general de la aplicación (DB, variables globales, etc.).
    - **data/**
      - **repositories/**  
        Capa de acceso a datos, consultas directas al ORM o la base de datos.  
        - candidate/
        - enterprise/
        - shared/
    - **interfaces/**  
      Definición de contratos y tipados (TypeScript).
    - **middlewares/**  
      Middlewares globales (autenticación, validaciones, logs).
    - **presentation/**  
      Capa de controladores y rutas, entrada principal vía HTTP.  
      - **candidate/**
        - categoria/
          - categoria.routes.ts
          - categorias.controller.ts
        - curriculums/
        - perfiles/
        - routes.ts
      - **enterprise/**
        - aplicaciones/
        - perfiles/
        - trabajos/
        - routes.ts
      - **shared/**
        - trabajos/
          - trabajos.controller.ts
          - trabajos.routes.ts
        - routes.ts
        - server.ts
    - **services/**  
      Lógica de negocio, conexión entre controladores y repositorios.  
      - **candidate/**
        - categorias.service.ts
        - curriculums.service.ts
        - perfiles.service.ts
      - **enterprise/**
        - aplicaciones.service.ts
        - perfiles.service.ts
        - trabajos.service.ts
      - **shared/**
        - trabajos.service.ts
    - **utils/**  
      Utilidades y helpers.  
      - CustomError.ts
      - errors.ts
      - express-validators.ts
      - validation-error.middleware.ts
      - validators.ts
    - **app.ts**  
      Punto de entrada de la aplicación (configura Express, rutas y middlewares).
  - **.env**
  - **.env.template**

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

## 🗂️ Diagrama de Arquitectura (Mermaid)

```mermaid
flowchart TD
    A[Routes (presentation)] --> B[Controllers (presentation)]
    B --> C[Services (services)]
    C --> D[Repositories (data)]
    D --> E[(Database)]

    subgraph Presentation
        A
        B
    end

    subgraph Business Logic
        C
    end

    subgraph Data Layer
        D
    end

    subgraph External
        E
    end

    B -->|Valida| F[Middlewares]
    B -->|Usa| G[Utils]
    A -->|Inicia| H[app.ts]
