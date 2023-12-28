class Player extends Sprite {
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
        super({ imageSrc, frameRate, animations, loop })
        this.position = {
            x: 200,
            y: 200,
        }

        this.width = 25;
        this.height = 25;
        this.gravity = 1

        this.sides = {
            bottom: this.position.y + this.height
        }

        this.velocity = {
            x: 0,
            y: 0,
        }

        this.collisionBlocks = collisionBlocks
    }

    update() {
        this.position.x += this.velocity.x
       this.updateHitbox()

        this.checkForHorizontalCollision()
        this.applyGravity()

      this.updateHitbox()

        this.checkForVerticalCollision()
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34
            },
            width: 50,
            height: 53
        }
    }

    checkForHorizontalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionblock = this.collisionBlocks[i]
            if (this.hitbox.position.x <= collisionblock.position.x + collisionblock.width 
                && this.hitbox.position.x + this.hitbox.width >= collisionblock.position.x 
                && this.hitbox.position.y + this.hitbox.height >= collisionblock.position.y 
                && this.hitbox.position.y <= collisionblock.position.y + collisionblock.width) {
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collisionblock.position.x + collisionblock.width - offset + 0.01
                    break;
                }

                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionblock.position.x - offset- 0.01
                    break;
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y
        this.sides.bottom = this.position.y + this.height
    }

    checkForVerticalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionblock = this.collisionBlocks[i]
            if (
                this.hitbox.position.x <= collisionblock.position.x + collisionblock.width 
                && this.hitbox.position.x + this.hitbox.width >= collisionblock.position.x 
                && this.hitbox.position.y + this.hitbox.height >= collisionblock.position.y 
                && this.hitbox.position.y <= collisionblock.position.y + collisionblock.width) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collisionblock.position.y + collisionblock.height - offset + 0.01
                    break;
                }

                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionblock.position.y - offset - 0.01
                    break;
                }
            }
        }
    }

    switchSprite(name) {
        if(this.image == this.animations[name].image) return
        this.currentFrame = 0

        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimation = this.animations[name]
    }

    handleInput(keys) {
        if (this.preventInput) return;
        this.velocity.x = 0
        if (keys.a) {
            this.velocity.x = -4
            this.switchSprite("runLeft")
            this.lastDirection = "left"
        }
        else if (keys.d) {
            this.velocity.x = 4
            this.lastDirection = "right"
            this.switchSprite("runRight")
        } else {
            if (this.lastDirection == "left") {
                this.switchSprite("idleLeft")
            } else {
                this.switchSprite("idleRight")
            }
        }

    }
}