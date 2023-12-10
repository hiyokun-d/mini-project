const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const startButton = document.getElementById("not-click")
const scoreEl = document.getElementById("score")
addEventListener("resize", () => {
    canvas.width = 300;
    canvas.height = 600;
})

canvas.width = 300;
canvas.height = 600;

const squareSize = 60
let score = 0

class Square {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    draw() {
        ctx.fillRect(this.x, this.y, squareSize, squareSize)
    }
}

const over = false

const player = new Square(canvas.width / 2 - squareSize / 2, canvas.height - squareSize)

const trains = []
const limit = 6 //limit that spawn the trains or enemy object
function spawner() {
    trains.push(new Square(30, 0))
    setInterval(() => {
        const randomNumber = Math.floor(Math.random() * (canvas.width / 10 + 1)) * 10;
        const x = Math.min(randomNumber, canvas.width - 60);  
        if(!over) {
            trains.push(new Square(x, 0))
        }      
    }, 300)
}

function game() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(game)
    
    player.draw()

    trains.forEach((train, index) => {
        train.draw()
        train.y += 10

        if (train.y >= canvas.height + squareSize + 10) {
            score += 1
            trains.splice(index, 1)
        }
    if (
        player.x < train.x + 30 &&
        player.x + squareSize > train.x &&
        player.y < train.y + 30 &&
        player.y + squareSize > train.y
    ) {
        cancelAnimationFrame(game)
        trains.splice(0, 6)
        alert("YOU LOSE! if you want to continue click ck")
        over = true
        location.reload()
        score = 0
    }
    })

    scoreEl.innerText = score
}

canvas.addEventListener("click", () => {
    spawner()
    startButton.id = "has-click"
})

addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 68:
            if (player.x < canvas.width - squareSize)
                player.x += squareSize
            break;
        case 65:
            if (player.x > 0)
                player.x -= squareSize
        default:
            break;
    }
})

game()