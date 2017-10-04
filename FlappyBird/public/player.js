function Player() {
	this.y = height/2;
	this.x = 64;
	this.gravity = 0.6;
	this.lift = -15;
	this.velocity = 0;
	this.highlight = false;

	this.show = function() {
		fill(255);
		this.velocity *= 0.9;
		ellipse(this.x, this.y, 32, 32);
	}


	this.update = function() {
		// Velocity increases with gravity
		this.velocity += this.gravity;
		// Y pos changes with velocity
		this.y += this.velocity;

		// Stop at bottom of canvas
		if (this.y > height) {
			this.y = height;
			this.velocity = 0;
		}

		// Do the top some other time if necessary
	}

	this.up = function() {
		this.velocity += this.lift;
	}


}

