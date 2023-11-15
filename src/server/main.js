// Was wir machen wollen:
// Homepage mit bewegenden Augen vom Maskottchen und Menu zu anderen Seiten
// Seite mit meinen Lieblingssprüchen, die man ergänzen kann (zurücksezten kann) mit POST
// Spendenseite mit Paypal
// Lieblingsvideo mit iframe
// 404 seite
// Donut drop spaß
// Tailwind designing
// devtools nutzen
// devtools auf anderen Seiten nutzen, um Passwort zu sehen...
// Ausblick: wie würde man die Website online stellen?

const express = require("express");
const path = require('path');

// framework für server
// https://expressjs.com/de/4x/api.html
const app = express();
// Der Port (Hafen) mapped Internetverbindungen zu einem bestimmten Programm auf einem Computer.
const port = 3000;

// unter diesem Pfad "/client" werden Dateien im Ordner src/client an den client gesendet...
app.use("/client", express.static(path.resolve(__dirname + "/../client")));

// GET ist im HTTP (Hypertext Transfer Protokoll) gestgelegt
// Es gibt den Inhalt der dargestellt werden soll zurück
// Hier wird nur Text dargestellt
// req ... request (Anfrage vom Client)
// res ... result (Antwort an den Client)
app.get("/hello", (req, res) => {
	res.send("Hallo, ich bin dein Server °-°");
});

// Jetzt wollen wir HTML (Hypertext Markup Language) darstellen
app.get("/", (req, res) => {
	res.sendFile(path.resolve(__dirname + "/../client/home/index.html"));
});

// POST ist eine weiter HTTP Methode. Der Client kann damit Daten an den Server senden.
app.post("/contact", (req, res) => {
	res.send("Hello do you wanna contact me?");
});

// Das Sternchen fängt alle anderen Pfade ab. Hier können wir eine "Nicht gefunden" Website
// darstellen
app.get("*", (req, res) => {
	res.send("404: Du befindest dich auf " + req.url);
});

// Hier wird der Server gestartet.
// localhost ist ein Alias für die IP deines eigenen Computers
// Die ist mit IPv4 immer 127.0.0.1
// mit IPv6 immer ::1
// Aber ist nicht wichtig... :D
const server = app.listen(port, () => {
	console.log("server started, visit under: http://localhost:" + port);
});
