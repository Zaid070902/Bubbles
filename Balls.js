let size, red, blue, green, rN, gN, bN, Sz, nsz;
size = 100;

function Ball() {
  this.pos = createVector(mouseX, mouseY);
  this.direction = p5.Vector.random2D();
  this.direction.mult(random(50));
  this.acc = createVector(0, 0);

  this.display = function () {
    strokeWeight(10);
    stroke(200 - 50, 100 - 50, 280 - 50, 20);
    fill(220, 120, 340, 200);
    ellipse(this.pos.x, this.pos.y, size, size);
  };

  this.applyForce = function (force) {
    this.acc.add(force);
  };

  this.cap = function () {
    if (this.pos.y >= height - 200 - size / 2) {
      this.pos.y = height - 200 - size / 2;
      this.direction.y *= -1;
      this.acc.mult(0);
    }

    if (ball.pos.y <= 200 + size / 2) {
      ball.pos.y = 200 + size / 2;
      ball.direction.y *= -1;
      this.acc.mult(0);
    }

    if (this.pos.x >= width - 200 - size / 2) {
      this.pos.x = width - 200 - size / 2;
      this.direction.x *= -1;
      this.acc.mult(0);
    }

    if (this.pos.x <= 200 + size / 2) {
      this.pos.x = 200 + size / 2;
      this.direction.x *= -1;
      this.acc.mult(0);
    }
  };

  this.move = function () {
    this.direction.add(this.acc);
    this.pos.add(this.direction);
    this.direction.limit(10);
    this.acc.mult(0);
  };

  this.moveAway = function (child) {
    let pushZone = 200;
    let dis = p5.Vector.dist(this.pos, child.pos);
    if (dis < pushZone) {
      let pushForce = p5.Vector.sub(this.pos, child.pos);
      pushForce.setMag(map(dis, 0, pushZone, 10, 0));
      this.applyForce(pushForce);
    }
  };
}

function Child(ball, x, y) {
  this.pos = createVector(x, y);
  this.direction = p5.Vector.random2D();
  this.acc = createVector(0, 0);
  this.opacity = 255;

  this.display = function () {
    red = 0.0035;
    green = 0.0085;
    blue = 0.0025;
    nsz = 0.003;

    rN = noise(this.pos.x * red, this.pos.y * red) * 500;
    gN = noise(this.pos.x * green, this.pos.y * green) * 300;
    bN = noise(this.pos.x * blue, this.pos.y * blue) * 500;
    Sz = noise(this.pos.x * nsz, this.pos.y * nsz) * 35;

    strokeWeight(Sz);
    stroke(rN, gN, bN, this.opacity);
    // fill(rN, gN, bN, this.opacity);
    point(this.pos.x, this.pos.y);

    this.opacity -= 0.8;
  };

  this.applyForce = function (force) {
    this.acc.add(force);
  };

  this.cap = function () {
    if (this.pos.y >= height - Sz / 2) {
      this.pos.y = height - Sz / 2;
      this.direction.y *= -1;
      this.acc.mult(0);
    }

    if (this.pos.y <= 0 + Sz / 2) {
      this.pos.y = 0 + Sz / 2;
      this.direction.y *= -1;
      this.acc.mult(0);
    }

    if (this.pos.x >= width - Sz / 2) {
      this.pos.x = width - Sz / 2;
      this.direction.x *= -1;
      this.acc.mult(0);
    }

    if (this.pos.x <= 0 + Sz / 2) {
      this.pos.x = 0 + Sz / 2;
      this.direction.x *= -1;
      this.acc.mult(0);
    }
  };

  this.move = function () {
    this.bigBall = createVector(ball.pos.x, ball.pos.y);
    let pullForce = p5.Vector.sub(this.bigBall, this.pos);
    pullForce.setMag(0.5);
    this.applyForce(pullForce);

    this.direction.add(this.acc);
    this.pos.add(this.direction);
    this.direction.setMag(7);
    this.acc.mult(0);
  };

  this.moveAway = function (child) {
    let pushZone = 5;
    let dis = p5.Vector.dist(this.pos, child.pos);
    if (dis < pushZone) {
      let pushForce = p5.Vector.sub(this.pos, child.pos);
      pushForce.setMag(map(dis, 0, pushZone, 5, 0));
      this.applyForce(pushForce);
    }
  };
}
