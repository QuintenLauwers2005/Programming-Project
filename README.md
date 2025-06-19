# project beschrijving 
We hebben de Carrierlaunch-app ontwikkeld om een brug te maken tussen studenten en bedrijven door middel van speeddates. Het doel is om studenten op een makkelijkere efficiënte manier kennis te laten maken met potentiële werkgevers, terwijl bedrijven snel gemotiveerde jonge talenten kunnen ontdekken. Zo creëren we waardevolle connecties, stagekansen en toekomstige werkrelaties.

# 📦 Project Setup Handleiding

Welkom bij dit project! Volg onderstaande stappen zorgvuldig om de applicatie lokaal op te zetten.

---

## ⚙️ Vereisten

Zorg ervoor dat je het volgende hebt geïnstalleerd:

* ✅ [Node.js & npm](https://nodejs.org/)

> ℹ️ **Standaardpoorten:**
>
> * MySQL/MariaDB (database): `3306`
> * Host server: `5000`

---

## 📚 Technologieën

Dit project is opgebouwd met de volgende technologieën:

### 🔧 Backend

* **Node.js** + **Express.js** — voor het opzetten van de server en API-routes

### 🎨 Frontend

* **HTML**, **CSS**, **JavaScript**
* **React.js** — voor het bouwen van een interactieve SPA.
* **router react** — voor verbinden van alle documenten met elkaar.
* **JWT authenticator** - extra beveiliging zodat je de gegevens niet in de browser kan ophalen

### 🗄️ Database

* **MariaDB** — een relationele database die draait op de schoolservers (of via VPN bereikbaar)

---

## 🚀 Installatie-instructies

### 1️⃣ Clone de GitHub-repository
  Clone het project met behulp van GitHub Desktop of via de terminal:

  💻 Via terminal:
    ```bash
    git clone https://github.com/QuintenLauwers2005/Programming-Project.git
    ```

  🖥️ Of via GitHub Desktop:
  1. Open GitHub Desktop
  2. Klik op File > Clone repository
  3. Plak de GitHub-URL in het veld (https://github.com/QuintenLauwers2005/Programming-Project.git)
  4. Kies een lokale map en klik op Clone


### 2️⃣ Verbinding maken met de schooldatabase

1. Maak een `.env`-bestand aan in de backend-map
2. Voeg de databasegegevens toe die je vindt in Microsoft Teams (groep 4)
3. Zorg ervoor dat je verbonden bent met het schoolnetwerk of via de **VPN**

---

### 3️⃣ Backend installeren

Open een terminal en voer de volgende stappen uit:

```bash
cd pad/naar/backend     # Navigeer naar de backend-map
npm install             # Installeer de benodigde dependencies
```

### 4️⃣ Frontend installeren

In dezelfde of een nieuwe terminal:

```bash
cd pad/naar/frontend    # Navigeer naar de frontend-map
npm install             # Installeer de benodigde dependencies
```

---


### ✅ Backend starten

```bash
cd pad/naar/backend     # Ga naar de backend-map
node server.js          # Start de server (maakt connectie met de database)
```

### ✅ Frontend starten

Open een tweede terminal of tabblad:

```bash
cd pad/naar/frontend    # Ga naar de frontend-map
npm start               # Start de frontend-app in je browser
```
