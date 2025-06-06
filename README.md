# 📦 Project Setup Handleiding

Welkom bij dit project! Volg onderstaande stappen zorgvuldig om de applicatie lokaal op te zetten.

---

## ⚙️ Vereisten

Zorg ervoor dat je het volgende hebt geïnstalleerd:

- ✅ [Node.js & npm](https://nodejs.org/)
- ✅ [XAMPP (met Apache & MySQL)](https://www.apachefriends.org/index.html)

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

3️⃣ XAMPP opstarten en database importeren

  1. Download en installeer XAMPP via de officiële site.
  2. Open het XAMPP Control Panel.
  3. Start Apache en MySQL.
  4. Klik op MySQL Admin om phpMyAdmin te openen.
  5. Importeer de database:
     - Klik bovenin op Importeren.
     - Selecteer het meegeleverde .sql bestand (te vinden in de map SQL_Export_Doc).
     - Klik op Starten om de database te importeren.

4️⃣ Applicatie starten
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
