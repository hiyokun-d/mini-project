const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const scoreEl = document.getElementById("score")

let score = 0

canvas.width = 600
canvas.height = 400

class Box {
    constructor(x) {
        this.x = x
        this.y = -30
        this.w = 30
        this.h = 30
    }

    draw() {
        ctx.fillStyle = "blue"
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }

    update() {
        this.y += 5
    }
}

// const box = new Box(Math.random() * (canvas.width - 30) + 5)

let player = {
    x: canvas.width / 2 - 30,
    y: canvas.height - 30,
    w: 30,
    h: 30,
    vx: 0,
}

const boxes = []
function spawner() {
    setInterval(() => {
        if(boxes.length <= 10) {
            boxes.push(new Box(Math.floor(Math.random() * (canvas.width - 30) + 5)))
        }
    }, 500);
}

let move = false

function game() {
    requestAnimationFrame(game)
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    for(let i = 0; i < boxes.length; i++) {
        let box = boxes[i]
        box.draw()
        box.update()

        if(box.y > canvas.height + 30) {
            boxes.splice(box, 1)
        }

        if(!(box.x>player.x+player.w 
            || box.x+box.w<player.x 
            || box.y>player.y+player.h 
            || box.y+box.h<player.y)) {
            boxes.splice(box, 1)
            score += 1
        }
    }

    ctx.fillStyle = "black"
    ctx.fillRect(player.x, player.y, player.w, player.h)

    scoreEl.innerText = score
    
    if(player.x < 0) {
        player.x = 0
    } else if(player.x > canvas.width - 30) {
        player.x = canvas.width - 30
    }
    
    player.x += player.vx
}

addEventListener("keydown", (e) => {
    if(e.key.toLowerCase() == "d") {
        if(player.vx <= 3)
        player.vx += 1.5
    }

    if(e.key.toLowerCase() == "a") {
        if(player.vx >= -3)
        player.vx -= 1.5
    }
})



spawner()
game()