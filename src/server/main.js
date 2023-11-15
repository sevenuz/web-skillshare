const express = require("express");
const ViteExpress = require("vite-express");
const path = require('path');

const app = express();
const port = 3000;

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

// app.use(express.static(path.resolve(__dirname + "/../../public")));
// app.use("/src/client", express.static(path.resolve(__dirname + "/../client")));

app.get("/hello", (req, res) => {
	res.send("Hello Vite!");
});

app.get("/geheim", (req, res) => {
	res.sendFile(path.resolve(__dirname + "/../../index.html"));
});

// app.get("*", (req, res) => {
// 	res.send("404");
// });

app.post("/contact", (req, res) => {
	res.send("Hello do you wanna contact me?");
});

// const server = app.listen(port, () => {
// 	console.log("listen on " + port);
// });

// Ships the index.html and stuff at "*"
ViteExpress.listen(app, 3000, () =>
	console.log("Server is listening on port 3000...")
);
