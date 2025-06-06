# 📦 Project Setup Handleiding

Welkom bij dit project! Volg de onderstaande stappen zorgvuldig om de applicatie lokaal op te zetten.

## ⚙️ Vereisten

Zorg dat je het volgende hebt geïnstalleerd:

- [Node.js & npm](https://nodejs.org/)
- [XAMPP](https://www.apachefriends.org/index.html)
  
sql server poort:3306
hostserver poort:5000

## 🚀 Installatie-instructies

### 1. Backend installeren

Open een terminal en voer de volgende commando’s uit:

```bash
cd  naar de backend folder 
voer dit commando uit "npm install"
```

2. Frontend installeren
```bash
Ga daarna naar de frontend map:
cd naar de frontend folder.
voer dit commando uit "npm install"
```

3. XAMPP installeren en opstarten
Download en installeer XAMPP via https://www.apachefriends.org
```bash
Open de XAMPP Control Panel

Start Apache en MySQL
  1. klik dan op admin
  2. Klik bovenin op Importeren
  3. Selecteer het meegeleverde .sql bestand (te vinden in SQL_Export_Doc)

Klik op Starten om de database te importeren
```
4. App opstarten
```bash

Voer een cd commando uit naar de backend folder en gebruik het "node server.js" commando om een connectie te maken met de DB.
Nu kan je het project starten in de frontend folder met "npm start";
```

