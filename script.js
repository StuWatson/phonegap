var activeCell,
    score = 0,
    timeout,
    birdReady = false,
    bgReady = false,
    birdImage = new Image(),
    bgImage = new Image();
    
birdImage.src = "images/faby.jpg";
bgImage.src = "images/Sky_Blue.png";

bgImage.onload = function () {
	bgReady = true;
};
birdImage.onload = function () {
	birdReady = true;
}

var getCell = function (event) {
	if(0<event.x && event.x <106) {
		var xGrid = 0;
	} else if (106<event.x && event.x <212) {
		var xGrid = 106;
	} else if (212<event.x && event.x <320) {
		var xGrid = 212;
	}

	if(100<event.y && event.y<200) {
		var yGrid = 150;
	} else if (200<event.y && event.y <300) {
		var yGrid = 250;
	} else if (300<event.y && event.y <400) {
		var yGrid = 350;
	}


	return {x: xGrid, y: yGrid};
};

var drawBird = function (cell) {
	canvas.width = canvas.width;
	if(birdReady && bgReady) {
		ctx.drawImage(bgImage, 0, 0);
		ctx.drawImage(birdImage, cell.x, cell.y);
		ctx.font="28px sans-serif";
		ctx.fillText("Score"+score, 30, 40)
		ctx.fill();

	}
}

var update = function () {
	clearTimeout(timeout)
	var x = Math.random()*320;
	var y = 100+Math.random()*300;
	var cell = getCell({x:x, y:y});
	activeCell = cell;
	drawBird(cell);
	timeout = setTimeout(update, 1000);
}

var onTouch = function(event) {
	event.preventDefault();
	var cell = getCell(event);
	if(cell.x == activeCell.x && cell.y == activeCell.y) {
		score++;
		console.log("Score: "+score);
		update();
	}
};

var canvas = document.createElement("canvas");
canvas.width = 320;
canvas.height = 480;
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");
document.querySelector('canvas').addEventListener("touchstart", onTouch, false);
document.querySelector('canvas').addEventListener("click", onTouch);



update();
setTimeout(function(){alert("Game over... Score: "+score);}, 10*1000);
