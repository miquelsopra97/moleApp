# 🎮 MoleApp — Guía Completa de Uso y Desarrollo

Bienvenido a **MoleApp**, un proyecto basado en **Lit**, **Vite**, **Vitest**, **Playwright** y **SonarCloud**.

Este README te guiará paso a paso en:

* ✔ Cómo arrancar el proyecto
* ✔ Cómo ejecutar los tests unitarios y e2e
* ✔ Cómo generar cobertura
* ✔ Cómo ejecutar SonarCloud localmente
* ✔ Qué debe hacer cualquier persona del equipo para que funcione

---

# 🚀 1. Requisitos previos

Asegúrate de tener instalado:

* **Node.js ≥ 18**
* **npm ≥ 7**

Comprueba con:

```bash
node -v
npm -v
```

---

# 📦 2. Instalación del proyecto

```bash
git clone <URL-del-repo>
cd moleapp
npm install
```

---

# ▶️ 3. Ejecutar la aplicación en modo desarrollo

```bash
npm run dev
```

Abre en el navegador:
👉 **[http://localhost:5173](http://localhost:5173)** (o el puerto mostrado en consola)

---

# 🏗️ 4. Build de producción

```bash
npm run build
```

Previsualizar la build:

```bash
npm run preview
```

---

# 🧪 5. Tests unitarios (Vitest)

Para ejecutar los tests sin watch:

```bash
npm run test:unit
```

Verás la salida de los tests unitarios y los snapshots si los hubiera.

---

# 🤖 6. Tests E2E (Playwright)

```bash
npm run test:e2e
```
---

# 📊 7. Coverage (cobertura)

Vitest genera cobertura con:

```bash
vitest --coverage
```

Esto generará la carpeta:

```
coverage/
  └── lcov.info
```

Ese archivo es necesario para SonarCloud.

---

# ☁️ 8. Integración con SonarCloud

## 📝 8.1. Archivo `sonar-project.properties`

El proyecto incluye un `sonar-project.properties` ya configurado para SonarCloud.

Si necesitas actualizarlo, está en la raíz del repo.

---

# 🔐 9. Cómo ejecutar SonarCloud (para cualquier persona del equipo)

Para que cualquier desarrollador pueda ejecutar SonarCloud **sin instalar Java** y **sin instalar SonarQube local**, solo hace falta un token personal.

## 9.1. Crear tu token personal en SonarCloud

1. Entra en: [https://sonarcloud.io](https://sonarcloud.io)
2. Arriba a la derecha → **My Account**
3. Izquierda → **Security**
4. Generar token: escribe un nombre → clic en *Generate*
5. Copia el token (solo aparece una vez)

Tendrá forma:

```
sqa_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 9.2. Exportar el token (temporal)

```bash
export SONAR_TOKEN="TU_TOKEN_AQUI"
```

Comprueba:

```bash
echo $SONAR_TOKEN
```

---

## 9.3. Exportar token (permanente)

Editar tu `~/.zshrc`:

```bash
open ~/.zshrc
```

Añadir al final:

```bash
export SONAR_TOKEN="TU_TOKEN_AQUI"
```

Recargar:

```bash
source ~/.zshrc
```

---

## 9.4. Ejecutar análisis SonarCloud

```bash
npm run sonar
```

Este comando:

1. Ejecuta Vitest con coverage
2. Lanza el SonarScanner vía `npx`
3. Sube los resultados a SonarCloud

Cuando el análisis termine, puedes ver el dashboard del proyecto en la URL del proyecto en SonarCloud.

---

# 🧩 10. Scripts útiles

| Script              | Acción                                         |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Arranca Vite en modo desarrollo                |
| `npm run build`     | Genera build de producción                     |
| `npm run preview`   | Previsualiza la build                          |
| `npm run test:unit` | Ejecuta tests unitarios                        |
| `npm run test:e2e`  | Ejecuta Playwright                             |
| `npm run sonar`     | Ejecuta tests + coverage + análisis SonarCloud |

---

# 🎯 11. Notas adicionales

* No es necesario instalar Java ni SonarQube localmente.
* Cada persona debe generar su propio token de SonarCloud.
* La integración CI/CD se puede añadir en GitHub Actions si se desea.

---
