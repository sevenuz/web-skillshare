import "./style.css";
import $ from "jquery";

import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://studentsforfuturemainz.com/" target="_blank">
      <img src="/students.svg" class="logo" alt="Vite logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p id="infotext" class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));
const response = await fetch("/contact", {method:"POST"});
console.log(response);
fetch('/contact', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: 'this is a test'
  })
})
.then(response => response.text())
.then(body => {
  console.log(body);
	$("#infotext").html(body);
});

