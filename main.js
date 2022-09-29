const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let lives = 5;
let okLeft = false;
let okRight = false;

let line = new Image();
line.src = 'line.png';
line.X = 180;
line.Y = -140;

let line2 = new Image();
line2.src = 'line.png';
line2.X = 180;
line2.Y = 160;

let myCar = new Image();
myCar.src = 'машина-1.png';
myCar.X = 50;
myCar.Y = 400;

let enemyCar1 = new Image();
enemyCar1.src = 'машина-2.png';
enemyCar1.X = 50;
enemyCar1.Y = -150;

let enemyCar2 = new Image();
enemyCar2.src = 'машина-3.png';
enemyCar2.X = 250;
enemyCar2.Y = -450;

function drawRect() {
	ctx.fillStyle = 'grey';
	ctx.fillRect(0, 0, 400, 500);
}

function drawLives() {
	ctx.font = '30px Arial';
	ctx.fillStyle = 'white';
	ctx.fillText('Lives: ' + lives, 265, 44);
}

function drawLines() {
	//console.log(line);
	ctx.drawImage(line, line.X, line.Y);
	line.Y += 3;
	if (line.Y > 500) {
		line.Y = -140;
	}
	ctx.drawImage(line2, line2.X, line2.Y);
	line2.Y += 3;
	if (line2.Y > 500) {
		line2.Y = -140;
	}
}

function stop() {
	cancelAnimationFrame(myReq);
	stop = true;
	render();
	ctx.font = '60px Arial';
	ctx.fillStyle = 'red';
	ctx.fillText('gameOver', 40, 200);
}

function drawMyCar() {
	ctx.drawImage(myCar, myCar.X, myCar.Y);

	if (okRight && myCar.X < 335) {
		myCar.X += 3;
	}
	if (okLeft && myCar.X > 0) {
		myCar.X -= 3;
	}
}

function drawEnemyCar1() {
	if (enemyCar1.Y + 100 > myCar.Y && enemyCar1.X + 65 > myCar.X && enemyCar1.X < myCar.X + 65) {
		crash = true;
		enemyCar1.Y = -100;
		enemyCar1.X = Math.floor(Math.random() * 335);
		lives--;
		if (lives < 1) {
			stop();
		}
	} else {
		crash = false;
	}

	if (!crash) {
		ctx.drawImage(enemyCar1, enemyCar1.X, enemyCar1.Y);
		enemyCar1.Y += 3;
		if (enemyCar1.Y > 500) {
			enemyCar1.Y = -150;
			enemyCar1.X = Math.floor(Math.random() * 335);
		}
	}
}

function drawEnemyCar2() {
	if (enemyCar2.Y + 100 > myCar.Y && enemyCar2.X + 65 > myCar.X && enemyCar2.X < myCar.X + 65) {
		crash = true;
		enemyCar2.Y = -100;
		enemyCar2.X = Math.floor(Math.random() * 335);
		lives--;
		if (lives < 1) {
			stop();
		}
	} else {
		crash = false;
	}

	if (!crash) {
		ctx.drawImage(enemyCar2, enemyCar2.X, enemyCar2.Y);
		enemyCar2.Y += 3;
		if (enemyCar2.Y > 500) {
			enemyCar2.Y = -150;
			enemyCar2.X = Math.floor(Math.random() * 335);
		}
	}
}
function render() {
	drawRect();
	drawLives();
	drawLines();
	drawMyCar();
	drawEnemyCar1();
	drawEnemyCar2();
}
function update() {
	if (stop === true) {
		return;
	}
	render();
	//console.log('OkLeft:', okLeft);
	//console.log('Okright:', okRight);

	myReq = requestAnimationFrame(update);
}
update();

addEventListener('keydown', (e) => {
	if (e.keyCode === 37) {
		okLeft = true;
	}
	if (e.keyCode === 39) {
		okRight = true;
	}
});

addEventListener('keyup', (e) => {
	if (e.keyCode === 37) {
		okLeft = false;
	}
	if (e.keyCode === 39) {
		okRight = false;
	}
});
