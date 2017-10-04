function World() {
	this.top = random(height/2);
	this.bottom = random(height/2);
	this.x = width;
	this.w = 20;
	this.speed = 2;


	this.show = function() {
		fill(255);
		if (this.highlight) {
			fill(255, 0, 0);
		}
		rect(this.x, 0, this.w, this.top);
		rect(this.x, height-this.bottom, this.w, this.bottom);
	}

	this.update = function() {
		this.x -= this.speed;
	}

	this.offscreen = function() {
		if (this.x < -this.w) {
			return true;
		}
		else {
			return false;
		

		}
	}

		this.hits = function() {
		if (player.y < this.top || player.y > height - this.bottom) {
			if(player.x > this.x && player.x < this.x + this.w) {
				this.highlight = true;	
				return true;
			}
		}
		return false;
	}

}