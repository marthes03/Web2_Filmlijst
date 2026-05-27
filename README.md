Installatie & Lokale Start
Volg de onderstaande stappen om de applicatie lokaal op je computer te draaien. Je hebt hiervoor twee aparte terminal- of CMD-vensters nodig.

Stap 1: De Backend (Server) opstarten
De backend fungeert als de centrale database en draait in het werkgeheugen (RAM) van Node.js.

Open een terminal/CMD-venster en navigeer naar de backend-map:
cd filmlijst

Installeer de benodigde pakketten (express en cors):
npm install

Start de server:
node server.js

Als het goed is, zie je nu de melding: "Backend draait op http://localhost:3000". Laat dit venster openstaan!

Stap 2: De Frontend (Website) opstarten
De frontend maakt gebruik van ES Modules en moet via een lokale webserver worden ingeladen om beveiligingsfouten (CORS) in de browser te voorkomen.

Open een tweede, nieuw terminal/CMD-venster en navigeer naar de frontend-map:
cd movie

Start de lokale webserver met npx serve:
npx serve .

In je terminal verschijnt nu een lokaal internetadres (meestal http://localhost:5000).

Stap 3: Bekijk de applicatie
Open je internetbrowser (bijv. Chrome of Edge) en surf naar het adres uit de vorige stap (bijv. http://localhost:5000).

De 3 standaardfilms (Dune, The Hobbit en Titanic) worden direct vanuit de backend ingeladen en gecached in je browser via loadFromStorage.