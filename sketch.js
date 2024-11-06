let ball, follow, followers;
followers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ball = new Ball();
  follow = new Child(ball, mouseX, mouseY);
}

function mouseMoved() {
  ball.pos = createVector(mouseX, mouseY);
  for (let i = 0; i < 2; i++) {
    followers.push(new Child(ball, mouseX, mouseY));
  }
}

function draw() {
  background(11);
  // blendMode(EXCLUSION);

  let grav = createVector(0, 0);

  // ball.applyForce(grav);
  // ball.move();
  // ball.cap();
  // ball.display();

  followers = followers.filter((follower) => {
    follower.move();
    follower.cap();
    follower.display();
    ball.moveAway(follower);

    for (let j = 0; j < followers.length; j++) {
      if (follower !== followers[j]) {
        follower.moveAway(followers[j]);
      }
    }

    return follower.opacity > 0; 
  });
}
