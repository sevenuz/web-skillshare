async function load_subtitle() {
	const response = await fetch("/contact", { method: "POST" });
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
}

$("#contacter").on("click", load_subtitle);
