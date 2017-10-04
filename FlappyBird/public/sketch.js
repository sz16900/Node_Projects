var player;
var world = [];

function setup() {
	createCanvas(600, 600);
	player = new Player();
	world.push(new World());

}

function draw() {
	background(0);

	// Loop backwards to avoid skipping
	for (var i = world.length-1; i > 0; i--) {
		world[i].show();
		world[i].update();

		if (world[i].hits(player)) {
			
		}


		if (world[i].offscreen()) {
			world.splice(i, 1);
		}
	}

	player.show();
	player.update();

	if (frameCount % 100 == 0) {
		world.push(new World());
	}


}

function keyPressed() {
	if (key == ' ') {
		player.up()
	}
}