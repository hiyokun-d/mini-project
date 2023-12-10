const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const scoreEl = document.getElementById("scoreEl")
const startEl = document.getElementById("start")
canvas.width = 300
canvas.height = 600

let score = 0
let start = false
let over = false

class Pipe {
    constructor(x, y, h) {
        this.x = x;
        this.y = y
        this.h = h
        this.vy = 0
    }

    draw() {
        ctx.fillStyle = "green"
        ctx.fillRect(this.x, this.y, 30, this.h)
    }

    collidesWithPlayer(playerX, playerY, playerWidth, playerHeight) {
        if (
            this.x < playerX + playerWidth &&
            this.x + 30 > playerX &&
            ((this.y <= playerY && this.y + this.h >= playerY) || 
            (this.y >= playerY && this.y <= playerY + playerHeight))
        ) {
            return true; // Collision detected
        }
        return false; // No collision
    }
}

const pipes = []

function spawner() {
    setInterval(() => {
        const topPipeHeight = Math.random() * (canvas.height / 2) + 50; // Random height for the top pipe
        const bottomPipeHeight = canvas.height - topPipeHeight - 150; // Fixed gap of 100px between pipes
        if (start) {
            pipes.push(new Pipe(canvas.width - 30, 0, topPipeHeight));
            pipes.push(new Pipe(canvas.width - 30, canvas.height - bottomPipeHeight, bottomPipeHeight));
        }
    }, 1500);
}

let player = {
    x: 80,
    y: canvas.height / 2 - 30,
    w: 30,
    h: 30,
    jump: false
}

let speedbot = 5
let speedUp = 9

function game() {
    requestAnimationFrame(game)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    pipes.forEach((pipe, i) => {
        pipe.draw()
        pipe.x -= 5

        if (pipe.collidesWithPlayer(player.x, player.y, player.w, player.h)) {
           over = true;
        }
        
        if (pipe.x < 0) {
            pipes.splice(i, 1)
            score += 1
        }

        if(over) {
            cancelAnimationFrame(game)
            speedUp = 0
            speedbot = 0
            start = false;
            location.reload();
            pipes.splice(0, pipes.length)
            score = 0
        }
    })

    ctx.fillStyle = "red"
    ctx.fillRect(player.x, player.y, player.w, player.h)

    
    if (start) {
        if (player.jump) {
            player.y -= speedUp
        } else {
            player.y += speedbot
        }
    }

    scoreEl.innerText = score

    if(start) {
        startEl.id = "gone"
    }
}

addEventListener("keydown", () => {
    player.jump = true
})

addEventListener("keyup", () => {
    player.jump = false
})

canvas.addEventListener("click", () => {
    start = true
})

spawner()
game()