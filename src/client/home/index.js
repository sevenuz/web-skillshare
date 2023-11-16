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
