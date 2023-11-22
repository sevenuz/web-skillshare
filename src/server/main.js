// Was wir machen wollen:
// Homepage mit bewegenden Augen vom Maskottchen und Menu zu anderen Seiten
// Seite mit meinen Lieblingssprüchen, die man ergänzen kann (zurücksezten kann) mit POST
// oder besser noch: neue seiten registrieren, pfad und text... )=> kann man exploiten:D
// Spendenseite mit Paypal
// Lieblingsvideo mit iframe
// 404 seite
// Tailwind designing
// devtools nutzen
// devtools auf anderen Seiten nutzen, um Passwort zu sehen...
// Ausblick: wie würde man die Website online stellen?

const express = require("express");
const path = require('path');
const fs = require('fs');

function client_dir(relative_path = "") {
	return path.resolve(__dirname + "/../client/" + relative_path);
}

const template = fs.readFileSync(client_dir("index.html"), 'utf8');

function fill_template_from_file(relative_path) {
	let content = fs.readFileSync(client_dir(relative_path), 'utf8');
	return fill_template(content);
}
function fill_template(content) {
	return template.replace("%content%", content);
}

// framework für server
// https://expressjs.com/de/4x/api.html
const app = express();
var bodyParser = require('body-parser');
// Der Port (Hafen) mapped Internetverbindungen zu einem bestimmten Programm auf einem Computer.
const port = 3000;
const home = fill_template_from_file("home.html");

// unter diesem Pfad "/client" werden Dateien im Ordner src/client an den client gesendet...
app.use("/client", express.static(client_dir()));
// um Daten die mit POST gesendet wurden leicht nutzen zu können, json und plain form data
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET ist im HTTP (Hypertext Transfer Protokoll) gestgelegt
// Es gibt den Inhalt der dargestellt werden soll zurück
// Hier wird nur Text dargestellt
// req ... request (Anfrage vom Client)
// res ... result (Antwort an den Client)
app.get("/hello", (_req, res) => {
	res.send(fill_template("Hallo, ich bin dein Server °-°"));
});

// Jetzt wollen wir HTML (Hypertext Markup Language) darstellen
app.get("/", (_req, res) => {
	res.send(home);
});

let is_logged_in = false;
app.get("/login", (_req, res) => {
	res.send(fill_template_from_file("login.html"));
});
app.post("/login", (req, res) => {
	if (req.body.password == "baum") {
		is_logged_in = true;
		res.redirect("/create");
	} else {
		res.send(fill_template_from_file("login.html"));
	}
});

let content = {}
app.get("/create", (_req, res) => {
	if (is_logged_in) {
		res.send(fill_template_from_file("create.html"));
	} else {
		res.redirect("/login");
	}
});
app.post("/create", (req, res) => {
	if (is_logged_in) {
		if(req.body.path && req.body.content) {
			content[req.body.path] = req.body.content;
			res.send(fill_template("Top. Hat funktioniert. Du wurdest wieder ausgeloggt."));
			is_logged_in = false;
		}else {
			res.send(fill_template(`Ne. Das hat nicht funktioniert. Da fehlt was.
<a class="hover:text-green-700 text-yellow-400" href="/create">Nochmal probieren?</a>`));
		}
	} else {
		res.redirect("/login");
	}
});

// POST ist eine weitere HTTP Methode. Der Client kann damit Daten an den Server senden.
app.post("/content", (_req, res) => {
	res.json(Object.keys(content));
});

// Das Sternchen fängt alle anderen Pfade ab. Hier können wir eine "Nicht gefunden" Website
// darstellen
app.get("*", (req, res) => {
	if(content[req.url]) {
		res.send(fill_template(content[req.url]));
	} else {
		res.send(fill_template("404: Du befindest dich auf " + req.url));
	}
});

// Hier wird der Server gestartet.
// localhost ist ein Alias für die IP deines eigenen Computers
// Die ist mit IPv4 immer 127.0.0.1
// mit IPv6 immer ::1
// Aber ist nicht wichtig... :D
const server = app.listen(port, () => {
	console.log("server started, visit under: http://localhost:" + port);
});
