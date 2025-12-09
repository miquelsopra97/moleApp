# 🎮 MoleApp — Complete Usage & Development Guide

Welcome to **MoleApp**, a project built with **Lit**, **Vite**, **Vitest** and **SonarCloud**.

This README will guide you through:

* ✔ How to start the project
* ✔ How to generate coverage reports
* ✔ How to run SonarCloud analysis locally
* ✔ What any team member needs to do for everything to work

---

# 🚀 1. Prerequisites

Make sure you have:

* **Node.js ≥ 18**
* **npm ≥ 7**

Check with:

```bash
node -v
npm -v
```

---

# 📦 2. Project Installation

```bash
git clone <repo-URL>
cd moleapp
npm install
```

---

# ▶️ 3. Run the application in development mode

```bash
npm run dev
```

Open in your browser:
👉 **[http://localhost:5173](http://localhost:5173)** (or the port shown in the console)

---

# 🏗️ 4. Production build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

# 🧪 5. Unit tests (Vitest)

To run tests without watch mode:

```bash
npm run test:unit
```

You'll see the unit test output and snapshots if any exist.

---

---

# 📊 6. Coverage report

Vitest generates coverage with:

```bash
vitest --coverage
```

This will generate the folder:

```
coverage/
  └── lcov.info
```

That file is required for SonarCloud.

---

# ☁️ 7. SonarCloud Integration

## 📝 7.1. `sonar-project.properties`

The project includes a preconfigured `sonar-project.properties` file.

If you need to update it, it's located in the root of the repo.

---

# 🔐 8. How to run SonarCloud analysis (for any team member)

Anyone on the team can run SonarCloud **without installing Java** or a local SonarQube server.
All you need is a personal token.

## 8.1. Create your personal SonarCloud token

1. Go to: [https://sonarcloud.io](https://sonarcloud.io)
2. Top right → **My Account**
3. Left menu → **Security**
4. Generate a token: choose a name → click *Generate*
5. Copy the token (it appears only once)

It will look like:

```
sqa_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 8.2. Export the token (temporary)

```bash
export SONAR_TOKEN="YOUR_TOKEN_HERE"
```

Check it:

```bash
echo $SONAR_TOKEN
```

---

## 8.3. Export token permanently

Edit your `~/.zshrc`:

```bash
open ~/.zshrc
```

Add at the end:

```bash
export SONAR_TOKEN="YOUR_TOKEN_HERE"
```

Reload:

```bash
source ~/.zshrc
```

---

## 8.4. Run SonarCloud analysis

```bash
npm run sonar
```

This command:

1. Runs Vitest with coverage
2. Executes the SonarScanner via `npx`
3. Uploads results to SonarCloud

Once the analysis is finished, you can view the project dashboard on your SonarCloud project page.

---

# 🧩 9. Useful scripts

| Script              | Action                                      |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Starts Vite in development mode             |
| `npm run build`     | Creates a production build                  |
| `npm run test:unit` | Runs unit tests                             |
| `npm run sonar`     | Runs tests + coverage + SonarCloud analysis |

---

# 🎯 10. Additional notes

* No need to install Java or a local SonarQube instance.
* Each developer must generate their own SonarCloud token.
* CI/CD integration can be added via GitHub Actions if needed.

---
