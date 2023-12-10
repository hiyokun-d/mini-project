const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score")
canvas.width = 600;
canvas.height = 300;

class Box {
    constructor(x, y, opacity) {
        this.x = x;
        this.y = y;
        this.scale = 30;
        this.opacity = opacity || 0.5;
    }

    draw() {
        ctx.fillStyle = `rgba(34, 71, 146, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, this.scale, this.scale);
    }
}

let pX = canvas.width / 2 - 30; // Player X
let pY = 0; // Player Y
let velocity = 0; // Player velocity
const damping = 0.9; // Rate at which velocity decreases
const botSpeed = 2; // Adjust bot speed here

let score = 0

let boxes = [];
let limit = 10;
let delay = 5;
let boxSpeed = 5;
const maxBotSpeed = 15

canvas.addEventListener("mousedown", (e) => {
    if (limit >= boxes.length && delay >= 5) {
        boxes.push(new Box(pX, pY, 1));
        delay = 0;
    } else {
        console.log("WAIT or it got limit tho");
    }
});

let enemy = {
    x: canvas.width / 2 - 30,
    y: canvas.height - 30,
    w: 30,
    h: 30,
    velocity: 0,
};

let theresBox = false

function game() {
    const player = new Box(pX, pY);
    requestAnimationFrame(game);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const mouseX = pX + player.scale / 2; // Midpoint of the player

    let mouseMoved = false;

    canvas.addEventListener("mousemove", (e) => {
        const targetX = e.clientX - canvas.getBoundingClientRect().left;
        const distance = targetX - mouseX;
        const maxSpeed = 15; // Adjust max speed here

        velocity = distance / 10; // Adjust sensitivity here
        velocity = Math.min(velocity, maxSpeed);
        velocity = Math.max(velocity, -maxSpeed);

        mouseMoved = true;
    });

    if (!mouseMoved) {
        velocity *= damping; // Apply damping when mouse isn't moving
    }

    pX += velocity;

    if (pX < 0) pX = 0;
    if (pX > canvas.width - player.scale) pX = canvas.width - player.scale;

    player.draw();

    ctx.fillStyle = "black";
    ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
    
    for (let i = 0; i < boxes.length; i++) {
        const element = boxes[i];
        element.draw();
        element.y += boxSpeed;

        if (element.y > canvas.height + 30) {
            score += 1
            boxes.splice(i, 1);
            i--
        }

        if (
            !(enemy.x > element.x + element.scale ||
              enemy.x + enemy.w < element.x ||
              enemy.y > element.y + element.scale ||
              enemy.y + enemy.h < element.y)
          ) {
            boxes.splice(i, 1);
            i--;
          }

        if (element.x > enemy.x && enemy.x + enemy.w < canvas.width) {
            if (enemy.velocity <= maxBotSpeed) {
                enemy.velocity += botSpeed;
                theresBox = true
            }
        } else if (element.x < enemy.x && enemy.x > 0) {
            if (enemy.velocity >= -maxBotSpeed) {
                enemy.velocity += -botSpeed;
                theresBox = true
            }
        }


    }

    if (enemy.x < 0 || enemy.x + enemy.w > canvas.width) {
        enemy.velocity = -enemy.velocity; // Reverse the velocity when hitting the boundaries
    }

    if(enemy.x <= -30) {
        enemy.x = 0
        enemy.velocity++
    }

    if(enemy.x >= canvas.width + 30) {
        enemy.x = canvas.width - 30
        enemy.velocity -= 10
    }

    enemy.x += enemy.velocity
    if (delay <= 5) {
        delay += 0.3;
    }

    ctx.fillStyle = "black";
    ctx.font = "20px Arial"; // Set the font size and style
    ctx.fillText(`Delay: ${Math.floor(delay)}s`, 10, 30); // Position the score text
  

    scoreEl.innerText = score
}

if (boxes.length <= 0) {
    enemy.velocity = Math.floor(Math.random() * 1) - 10;
    setInterval(() => {
            enemy.velocity = Math.floor(Math.random() * 3 + 15);
    }, 600)
}

game();
