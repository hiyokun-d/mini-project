addEventListener("keydown", (e) => {
    if(player.preventInput) return;
    switch (e.keyCode) {
        case 87:
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i];

                if (player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width
                    && player.hitbox.position.x>= door.position.x
                    && player.hitbox.position.y + player.hitbox.height >= door.position.y
                    && player.hitbox.position.y <= door.position.y + door.width) {
                        player.preventInput = true;
                        player.velocity.x = 0
                        player.velocity.y = 0
                        player.switchSprite("openDoor")
                        door.play()
                        return
                }
            }
            if (player.velocity.y === 0) player.velocity.y = -15
            break;

        case 65: // a
            keys.a = true
            break;

        case 68: // d
            keys.d = true
            break;

        default:
            break;
    }
})

addEventListener("keyup", (e) => {
    switch (e.keyCode) {
        case 65: // a
            keys.a = false
            break;

        case 68: // d
            keys.d = false
            break;

        default:
            break;
    }
})