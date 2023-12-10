const canvas = document.getElementById("rain")
const ctx = canvas.getContext("2d")

canvas.width = innerWidth + 100;
canvas.height = innerHeight + 320;

addEventListener("resize", () => {
canvas.width = innerWidth + 100;
canvas.height = innerHeight + 320;


})
class square {
	constructor(x, y, h) {
		this.x = x
		this.h = h
		this.y = y
		this.vy = 0 
	}

draw() {
		ctx.fillStyle = "white"
		ctx.fillRect(this.x, this.y, 2.3, this.h)
	}

update() {
		this.y += this.vy
	}
}

const rains = []

const spawner = () => {
	rains.push(new square(0, 0, 12))
	for(let i = 0; i < 12; i++) {
	setInterval(() => {
		const x = Math.random() * (canvas.width - 2) + 15
		rains.push(new square(x, -15, 12))
	}, 100)	
	}
}

function game() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	requestAnimationFrame(game)

	for(let i = 0; i < rains.length; i++) {
		const rain = rains[i]
		rain.draw()
		rain.update()
		const speed = Math.random() * 0.4 + 1
		rain.vy += speed

		if(rain.y > canvas.height + rain.h) {
			rains.splice(rains[i], 1)
		}
	}
}

spawner()
game()
