# 📦 Project Setup Handleiding

Welkom bij dit project! Volg onderstaande stappen zorgvuldig om de applicatie lokaal op te zetten.

---

## ⚙️ Vereisten

Zorg ervoor dat je het volgende hebt geïnstalleerd:

- ✅ [Node.js & npm](https://nodejs.org/)

> ℹ️ **Standaardpoorten:**
> - MySQL (database): `3306`  
> - host server: `5000`

---

## 🚀 Installatie-instructies

### 1️⃣ Backend installeren

Open een terminal en voer de volgende stappen uit:

```bash
cd pad/naar/backend     # Navigeer naar de backend-map
npm install            # Installeer de benodigde dependencies
```

2️⃣ Frontend installeren
In dezelfde of een nieuwe terminal:

```bash
cd pad/naar/frontend    # Navigeer naar de frontend-map
npm install            # Installeer de benodigde dependencies
```

3️⃣ link maken met de school database

  1. maak een .env doc aan in de backend voeg de data toe die te vinden is in teams (groep 4)
  2. zorg ervoor dat je op de school zit anders moet je met de school vpn verbonden zijn.

✅ Backend starten:
```bash
cd pad/naar/backend     # Ga naar de backend-map
node server.js         # Start de server (maakt connectie met de database)
```

✅ Frontend starten:
Open een tweede terminal of tabblad:

```bash
cd pad/naar/frontend    # Ga naar de frontend-map
npm start              # Start de frontend-app in je browser
```
