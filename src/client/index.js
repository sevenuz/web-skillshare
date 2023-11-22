async function load_subtitle() {
	const response = await fetch("/contact", { method: "POST" });
	console.log(response);
	fetch('/content', { method: 'post' })
		.then(response => response.text())
		.then(body => {
			let html = "";
			for(let path of JSON.parse(body)) {
				html += `<a class="m-2 hover:text-green-700" href="${path}">${path}</a><br>`;
			}
			$("#infotext").html(html);
		});
}

let show = false;
$("#bird").click(() => {
	var pigeon = $("#pigeon");
	pigeon.css({
		display: show? "none": "block"
	});
	show = !show;
});

// https://codepen.io/whipcat/pen/ExKPQqZ?editors=1111
$("body").mousemove((event) => {
	var eye = $("#eye");
  var x = (eye.offset().left) + (eye.width() / 2);
  var y = (eye.offset().top) + (eye.height() / 2);
  var rad = Math.atan2(event.pageX - x, event.pageY - y);
  var rot = (rad * (180 / Math.PI) * -1) + 180;
  eye.css({
    '-webkit-transform': 'rotate(' + rot + 'deg)',
    '-moz-transform': 'rotate(' + rot + 'deg)',
    '-ms-transform': 'rotate(' + rot + 'deg)',
    'transform': 'rotate(' + rot + 'deg)'
  });
});

$("#contacter").on("click", load_subtitle);
