const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = 64 * 16
canvas.height = 64 * 9;

let parseCollisions
let collisionBlocks
let background
let doors
let level = 1
let player = new Player({
    imageSrc: "./img/king/idle.png",
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: "./img/king/idle.png"
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: "./img/king/idleLeft.png"
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: "img/king/runRight.png"
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: "./img/king/runLeft.png"
        },
        openDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: "./img/king/enterDoor.png",
            onComplete: () => {
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++
                        levels[level].init()
                        player.switchSprite("idleRight")
                        player.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    }
                })
            }
        }
    }
})


let levels = {
    1: {
        init: () => {
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: "./img/backgroundLevel1.png"
            })

            if (player.currentAnimation) player.currentAnimation.isActive = false

            parseCollisions = collisionLevel1.parse2D()
            collisionBlocks = parseCollisions.createObjectsfrom2D()
            player.collisionBlocks = collisionBlocks,

             doors = [
                new Sprite({
                    position: {
                        x: 787,
                        y: 270,
                    },
                    imageSrc: "./img/doorOpen.png",
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                })
            ]
        }
    },

    2: {
        init: () => {
            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: "./img/backgroundLevel2.png"
            })

            parseCollisions = collisionLevel2.parse2D()
            collisionBlocks = parseCollisions.createObjectsfrom2D()
            player.collisionBlocks = collisionBlocks,
            player.position.x = 96
            player.position.y = 140

            if(player.currentAnimation) player.currentAnimation.isActive = false
                doors = [
                    new Sprite({
                        position: {
                            x: 770,
                            y: 336,
                        },
                        imageSrc: "./img/doorOpen.png",
                        frameRate: 5,
                        frameBuffer: 5,
                        loop: false,
                        autoplay: false,
                    })
                ]
        }
    }
}

const keys = {
    w: false,
    a: false,
    d: false,
}

const overlay = {
    opacity: 0
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    background.draw()

    doors.forEach(door => {
        door.draw()
    })

    player.handleInput(keys)
    player.draw()
    player.update()

    ctx.save()
    ctx.globalAlpha = overlay.opacity
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.restore()
}

levels[level].init()

animate()