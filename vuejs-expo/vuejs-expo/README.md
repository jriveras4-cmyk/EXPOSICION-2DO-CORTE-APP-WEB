# Vue.js — Demo funcional (Segundo Corte: Frameworks del Backend)

Proyecto de demostración para la exposición de Vue.js. Como Vue.js es un
framework de **frontend**, este repositorio muestra la arquitectura completa
necesaria para cumplir con la guía: Vue consumiendo una API REST real,
conectada a una base de datos mediante un ORM.

```
[Vue.js (frontend)] --Axios--> [Node.js + Express (API REST)] --Sequelize (ORM)--> [SQLite (BD)]
```

## Estructura del repositorio

```
vuejs-expo/
├── backend/     # API REST: Node.js + Express + Sequelize + SQLite
└── frontend/    # Vue.js 3 (generado con el CLI oficial create-vue + Vite)
```

## Cómo correrlo

**1. Backend**
```bash
cd backend
npm install
node index.js
# -> API corriendo en http://localhost:3000
```

**2. Frontend** (en otra terminal)
```bash
cd frontend
npm install
npm run dev
# -> abre la URL que muestra Vite (por defecto http://localhost:5173)
```

Con ambos corriendo, el navegador muestra el listado de tareas (GET) y
permite agregar nuevas (POST) desde el input.

---

## (c) Demostración de la API REST — endpoints

| Método | Ruta | Función |
|---|---|---|
| `GET` | `/api/tareas` | Devuelve todas las tareas guardadas en la BD |
| `POST` | `/api/tareas` | Crea una tarea nueva a partir del `titulo` recibido |

Probado con `curl`:
```bash
curl http://localhost:3000/api/tareas
curl -X POST http://localhost:3000/api/tareas -H "Content-Type: application/json" -d '{"titulo":"Practicar exposicion de Vue"}'
```

---

## (d) ORM / driver de BD y cómo se configura

Vue.js **no incluye un ORM propio** porque no accede a la base de datos
directamente — esa responsabilidad vive en el backend. En este proyecto:

- El backend (`backend/index.js`) usa **Sequelize** como ORM.
- Se configura instanciando la conexión con el dialecto de base de datos:
  ```js
  const sequelize = new Sequelize({ dialect: 'sqlite', storage: './db.sqlite' });
  ```
- Se define un modelo que mapea a una tabla:
  ```js
  const Tarea = sequelize.define('Tarea', {
    titulo: { type: DataTypes.STRING, allowNull: false },
    completada: { type: DataTypes.BOOLEAN, defaultValue: false }
  });
  ```
- Sequelize traduce métodos como `findAll()` y `create()` a SQL automáticamente,
  sin que el desarrollador escriba consultas SQL a mano.
- Vue, del lado del frontend, solo consume el resultado ya en JSON vía **Axios**
  (`src/App.vue`), sin saber nada de SQL ni de la base de datos por debajo.
  Esa separación de responsabilidades es una de las fortalezas de esta arquitectura.

Se eligió SQLite (archivo local) en vez de PostgreSQL/MySQL en contenedor
para evitar depender de Docker Hub, por las restricciones de red de la
universidad.

---

## (e) Ventajas, desventajas y casos de uso reales

**Ventajas**
- Curva de aprendizaje suave, sintaxis cercana a HTML puro.
- Muy liviano (~20KB el core) y rápido.
- Reactividad automática: la interfaz se actualiza sola al cambiar los datos.
- Documentación oficial excelente, incluso en español.
- Se integra gradualmente en proyectos ya existentes (framework progresivo).

**Desventajas**
- Comunidad y oferta laboral más pequeñas que React o Angular.
- Mantenido principalmente por la comunidad y Evan You, no por una gran
  corporación (a diferencia de React/Meta o Angular/Google), lo que genera
  dudas de sostenibilidad a largo plazo en algunas empresas grandes.
- Menos librerías de terceros que el ecosistema de React.

**Casos de uso reales**
- **GitLab** usa Vue.js en gran parte de su interfaz.
- **Alibaba** y **Xiaomi** lo usan en varios de sus productos web.
- **Caso ecuatoriano:** un estudio de caso académico de la ESPOCH (Riobamba,
  Ecuador) documentó el desarrollo del sistema de gestión de procesos de la
  empresa de seguridad ecuatoriana **UNICEPRI**, construido con Laravel
  (backend) + **Vue.js** (frontend) + MariaDB, mejorando notablemente los
  tiempos de navegación y recuperación de datos gracias a la carga parcial de
  componentes típica de Vue. (Avilés, Ávila-Pesántez & Ávila, 2020, *Revista
  Peruana de Computación y Sistemas*).

---

## (f) Tabla comparativa

| Aspecto | Vue.js | React | Angular |
|---|---|---|---|
| Tipo | Framework progresivo (frontend) | Librería (frontend) | Framework completo (frontend) |
| Mantenido por | Comunidad / Evan You | Meta (Facebook) | Google |
| Curva de aprendizaje | Baja | Media | Alta |
| Lenguaje | JS/TS, HTML casi plano | JSX (HTML dentro de JS) | TypeScript obligatorio |
| Tamaño | Muy liviano (~20KB) | Liviano | Pesado |
| Reactividad | Reactiva por defecto (Proxy) | Requiere hooks (`useState`) | Zone.js / Signals |
| Uso empresarial | Creciendo | Dominante en la industria | Fuerte en empresas grandes/enterprise |

---

## (b) Estructura de proyecto generada por el CLI oficial

El frontend se generó con el CLI oficial actual de Vue (`create-vue`, sobre Vite):

```bash
npm create vue@latest
```

```
frontend/
├── src/
│   ├── assets/       # CSS global
│   ├── App.vue        # componente raíz (contiene el demo GET/POST)
│   └── main.ts         # punto de entrada de la app
├── index.html
├── package.json
└── vite.config.ts       # configuración de Vite (bundler)
```

## (a) Historia y características — resumen

- Creado por **Evan You** (ex-Google) en 2014, buscando algo más ligero que Angular.
- Framework **progresivo**: se puede usar desde un solo componente hasta una SPA completa.
- Basado en **componentes** con Single File Components (`.vue`).
- **Reactividad** automática y **Virtual DOM** para buen rendimiento.
- Proyecto **independiente** (no pertenece a una gran corporación).
