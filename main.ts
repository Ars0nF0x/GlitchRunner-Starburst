namespace SpriteKind {
    export const Coin = SpriteKind.create()
    export const Flower = SpriteKind.create()
    export const Fireball = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Hops_and_Paw.vy == 0) {
        Hops_and_Paw.vy = -150
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile3`, function (sprite, location) {
    game.over(false, effects.melt)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile2`, function (sprite, location) {
    current_level += 1
    startLevel()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flower, function (sprite, otherSprite) {
    otherSprite.destroy()
    bee = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    animation.runImageAnimation(
    bee,
    [img`
        . . . . . . . . . . . . . . . . 
        f f f f f . . . . . . f f f f f 
        f a a a f . . . . . . f a a a f 
        f a a a f . . . . . . f a a a f 
        f a a a f f f f f f f f a a a f 
        f a a f f f f f f f f f f a a f 
        f f f f c f f f f f f c f f f f 
        . . f f c c f f f f c c f f . . 
        . . f f c c 1 f f 1 c c f f . . 
        . . f f c c 1 f f 1 c c f f . . 
        . . f f f c c f f c c f f f . . 
        . . f f f f f f f f f f f f . . 
        . . f f f 1 f 1 f 1 f f f f . . 
        . . . f 1 f 1 f 1 f 1 f f . . . 
        . . . . f f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        `,img`
        . . . . . . . . . . . . . . . . 
        f f f f f . . . . . . f f f f f 
        f a a a f . . . . . . f a a a f 
        f a a a f . . . . . . f a a a f 
        f a a a f f f f f f f f a a a f 
        f a a f f f f f f f f f f a a f 
        f f f f c f f f f f f c f f f f 
        . . f f c c f f f f c c f f . . 
        . . f f c c 1 f f 1 c c f f . . 
        . . f f c c 1 f f 1 c c f f . . 
        . . f f f c c f f c c f f f . . 
        . . f f f f f f f f f f f f . . 
        . . f f 1 . 1 . 1 . 1 . f f . . 
        . . . . . . . . . . . . . . . . 
        . . f 1 . 1 . 1 . 1 . 1 . f . . 
        . . . f f f f f f f f f f . . . 
        `],
    100,
    true
    )
    bee.setPosition(Hops_and_Paw.x + 80, Hops_and_Paw.y - 80)
    bee.follow(Hops_and_Paw, 40)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Fireball, function (sprite, otherSprite) {
    info.changeLifeBy(-2)
    otherSprite.destroy()
})
function startLevel () {
    if (current_level == 0) {
        tiles.setTilemap(tilemap`level`)
    } else if (current_level == 1) {
        tiles.setTilemap(tilemap`level_0`)
    } else if (current_level == 2) {
        tiles.setTilemap(tilemap`level_1`)
    } else {
        game.over(true)
    }
    tiles.placeOnRandomTile(Hops_and_Paw, assets.tile`tile6`)
    for (let value of tiles.getTilesByType(assets.tile`tile6`)) {
        tiles.setTileAt(value, assets.tile`tile0`)
    }
    scene.cameraFollowSprite(Hops_and_Paw)
    info.setLife(5)
    for (let value2 of sprites.allOfKind(SpriteKind.Enemy)) {
        value2.destroy()
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Coin)) {
        value3.destroy()
    }
    for (let value4 of sprites.allOfKind(SpriteKind.Flower)) {
        value4.destroy()
    }
    for (let value5 of tiles.getTilesByType(assets.tile`tile4`)) {
        flower = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 5 5 5 5 5 5 5 f . . . 
            . . . f 5 5 4 4 4 4 5 5 5 f . . 
            . . f 5 5 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . f 5 4 5 5 5 5 5 5 5 5 5 f . 
            . . . f 5 5 4 4 5 5 5 5 5 f . . 
            . . . . f 5 5 5 5 5 5 5 f . . . 
            . . . . . f f f f f f f . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        animation.runImageAnimation(
        flower,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . f f f f f f f . . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . f 5 4 4 4 4 4 5 5 5 f . . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 4 5 5 5 5 5 5 5 5 5 f . . 
            . f 5 5 5 5 5 5 5 5 5 5 5 f . . 
            . . f 5 5 4 4 4 5 5 5 5 f . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f f f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . f 5 4 4 4 4 5 5 f . . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 4 5 5 5 5 5 5 5 f . . . 
            . . f 5 5 5 5 5 5 5 5 5 f . . . 
            . . . f 5 5 4 4 5 5 5 f . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . f 5 4 4 5 5 f . . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f 5 5 4 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 4 f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . f 5 4 5 f . . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 4 5 5 5 f . . . . . 
            . . . . f 5 5 5 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f 5 f . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . f 5 4 4 5 5 f . . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 4 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 5 5 5 5 f . . . . 
            . . . . f 5 5 4 5 5 f . . . . . 
            . . . . . f 5 5 5 f . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `],
        100,
        true
        )
        tiles.placeOnTile(flower, value5)
        tiles.setTileAt(value5, assets.tile`tile0`)
    }
    for (let value6 of tiles.getTilesByType(assets.tile`tile5`)) {
        flower = sprites.create(img`
            . . . . . . . . 5 5 5 . . . . . 
            . . . . . . . 5 9 9 5 . . . . . 
            . . . . . . 5 5 9 5 . . . . . . 
            . . . . . 5 5 9 5 5 . . . . . . 
            . . . . . 5 9 9 5 . . . . . . . 
            . . . . 5 9 9 5 5 5 5 5 . . . . 
            . . . 5 9 9 9 9 9 9 5 5 5 5 5 . 
            . . 5 5 5 5 5 5 5 5 9 9 9 5 5 5 
            . 5 5 5 5 . . . 5 5 5 9 9 5 5 5 
            . . . . . . . 5 5 5 9 9 5 5 5 . 
            . . . . . . 5 5 9 9 5 5 5 . . . 
            . . . . . 5 5 9 9 5 5 5 . . . . 
            . . . . 5 5 9 9 5 5 5 . . . . . 
            . . . . 5 9 9 5 5 . . . . . . . 
            . . . 5 5 5 5 . . . . . . . . . 
            . . 5 5 5 . . . . . . . . . . . 
            `, SpriteKind.Flower)
        tiles.placeOnTile(flower, value6)
        tiles.setTileAt(value6, assets.tile`tile0`)
    }
    for (let value7 of tiles.getTilesByType(assets.tile`tile11`)) {
        fireball = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 5 . . . . . . . . 
            . . . . 5 5 2 5 5 4 5 5 . . . . 
            . . . . . 4 4 4 4 2 4 . . . . . 
            . . . 5 4 4 2 2 2 2 4 5 . . . . 
            . . . 5 4 . 2 8 2 8 4 2 . . . . 
            . . . 5 5 . 2 8 8 2 4 5 . . . . 
            . . . 2 5 2 2 8 2 4 4 5 . . . . 
            . . . . 5 4 2 2 2 4 5 . . . . . 
            . . . . . . 4 . 4 4 5 . . . . . 
            . . . 5 . 5 5 5 4 5 5 . . . . . 
            . . . . . . . 2 5 5 . . . . . . 
            . . . . . . . . . . . . . 5 . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Fireball)
        tiles.placeOnTile(fireball, value7)
        tiles.setTileAt(value7, assets.tile`tile0`)
        animation.runMovementAnimation(
        fireball,
        "c 0 -100 0 100 0 0",
        2000,
        true
        )
        fireball.startEffect(effects.fire)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (Hops_and_Paw.y < otherSprite.y) {
        info.changeScoreBy(3)
    } else {
        info.changeLifeBy(-1)
    }
})
let fireball: Sprite = null
let flower: Sprite = null
let bee: Sprite = null
let Hops_and_Paw: Sprite = null
let current_level = 0
scene.setBackgroundColor(8)
scene.setBackgroundImage(img`
    88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888fffff88888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888888888ffffffffffffffffffff8888888888888888888888888888888888888888888888888888ffffff8888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888ffffffffffffffffffffffffffffffffffffff8888888888888888888888888888888888888888888888888888fffffff888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888ffffffffffffffffffffffffffffffffffffff8888888888888888888888888888888888888888888888888888ffffffff88888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888ffffffffffffffffffff8888888888888888888888888888888888888888888888888888888888888888888888ffffffff88888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888fff8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888ffffffff8888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888fff888888888888888888888888888888888888811188888888888888888888888fffff888888888888888888888ffffffff888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888fff88888888888888888888888888888888888881118888888888888888888888ffffff8888888888888888888888ffffffff88888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888fff88888888888888888888888888888888888881118888888888888888888888ffffff8888888888888888888888fffffffff8888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888fff88888888888888888888888888888888888888888888888888888888888888ffffff88888888888888888888888fffffffff888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888fff88888888888888888888888888888888888888888888888888888fffff8888ffffff888888888888888888888888ffffffff888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888fff8888888888888888888888888888888888888888888888888888ffffff8888ffffff8888888888888888888888888ffffffff88888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888fff8888888888888888888888888888888888888888888888888888ffffff8888ffffff88888888888888888888888888ffffffff8888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888ffff888888888888888888888888888888888888888888888888888ffffff888fffffff888888888888888888888888888ffffffff8888888888888888888888888888888fffff888888888888888888
    8888888888888888888888888888888888888888ffff888888888888888888888888888888888888888888888888888ffffff888ffffff8888888888888888888888888888fffffffff8888888888888888888888888888fffffff888888888888888888
    88888888888888888888888888888888888888888fff88ffffffffffffffffff8888888888888888888888888888888ffffff888ffffff88888888888888888888888888888fffffffff88888888888888881118888888ffffffff888888888888888888
    888888888888888888888888888888888ffffffffffffffffffffffffffffffffff888888888888888888888888888fffffff888ffffff8888888888888888fff88888888888ffffffff88888888888888881118888888ffffffff888888888888888888
    888888888888888888888888888888888fffffffffffffffffffffffffffffffffffff888888888888888888888888ffffff8888ffffff888888888888888ffff888888888888ffffffff8888888888888881118888fffffffffff888888888888888888
    888888888888888888888888888888888fffffffffffffffffffffffffffffffffffffffff88888888888888888888ffffff8888ffffff88888888888888fffff8888888888888ffffffff88888888888888888888ffffffffffff888888888888888888
    888888888888888888888888888888888ffffffffffffffffffffffffffffffffffffffffffff8888888888888888fffffff888ffffff88888888888888fffff888888888888888ffffffff8888888888888888888ffffffffffff888888888888888888
    888888888888888888888888888888888fffffffffffffffff8888888888ffffffffffffffffffff8888888888888fffffff888ffffff8888888888888fffff8888888888888888fffffffff88888888888888888fffffffffffff888888888888888888
    88888888888888888888888888888888888ffffffffffffff88888888888888ffffffffffffffffffff888888888ffffffff888ffffff888888888888fffff888888888888888888fffffffff8888888888888888ffffffffffff8888888888888888888
    8888888888888888888888888888888888888ffffffffffffff888888888888888ffffffffffffffffffff888888ffffffff888ffffff88888888888fffff88888888888888888888ffffffff888888888888888fffffffffffff8888888888888888888
    888888888888888888888888888888888888888ffffffffffffff88888888888888888ffffffffffffffffffff88ffffffff88fffffff88888888888ffff8888888888888888888888ffffffff88888888888888fffffffffffff8888888888888888888
    88888888888888888888888888888888888888888ffffffffffffff888888888888888888ffffffffffffffffffffffffff888fffffff8888888888ffff888888888888888888888888ffffffff888888888888ffffffffffffff8888888888888888888
    888888888888888888888888888888888888888888ffffffffffffffff888888888888888888fffffffffffffffffffffffffffffffff888888888fffff8888888888888888888888888ffffffff8888888888fffffffffffffff8888888888888888888
    8fffff888888888888888888888888888888888888ffffffffffffffffff8888888888888888888ffffffffffffffffffffffffffffff888888888ffff88888888888888888888888888fffffffff888888888ffffffffffffff88888888888888888888
    ffffff888888888888888888811188888888888888fff88fffffffffffffff88888888888888888888fffffffffffffffffffffffffff88888888ffff8888888888888888888888888888fffffffff8888888fffffffffffffff88888888888888888888
    fffffff8fffff88888888888811118888888888888fff8888fffffffffffffff8888888888888888888888fffffffffffffffffffffff8888888fffff88888888888888888888888888888ffffffff8888888fffffffffffffff88888888888888888888
    fffffff8ffffff8888888888811118888888888888fff888888fffffffffffffff8fffff88888888888888811ffffffffffffffffffff8888888ffff8888888888888888888888888888888ffffffff88888ffffffffffffffff88888888888888888888
    fffffff8ffffff888888888888111188888888888ffffff8888888fffffffffffffffffff8888888888111111fffffffffff1ffffffff888888ffff888888888888888888888888888888888ffffffff888ffffffffffffffff118888888888888888888
    ffffffffffffff888888888888111118888888888fffffffff888888fffffffffffffffff8888888111111111ffffffffff11ffffffff18888fffff8888888888888888888888888888888888ffffffffffffffffffffffffff111111888888888888888
    ffffffffffffff888888888888811111888888888ffffffffffff88888fffffffffffffff8888111111111111ffffffffff8fffffffff11188ffff88888888888888888888888888888888888ffffffffffffffffffffffffff111111111888888888888
    ffffffffffffff888888888888881111888888888ffffffffffffffff888fffffffffffffff1111111111888ffffffffff88fffffffff1111ffff8888888888888888888888888888888888888fffffffffffffffffffffffff111111111188888888888
    ffffffffffffff888888888fffff8111188888888fffffffffffffffffff88fffffffffffffff11111888888ffffffffff88fffffffff111fffff88888888888888888888888888888888888888ffffffffffffffffffffffff888811111118888888888
    ffffffffffffff88888888ffffff81111188888888fffffffffffffffffffff8fffffffffffffff888888888ffffffffff88fffffffff811ffff11888888888888888888888888888888888888888ffffffffffffffffffffff888888811118888888888
    ffffffffffffff88888888ffffff881111888888888ffffffffffffffffffffffffffffffffffffff888888fffffffffff8ffffffffff88ffff111118888888888888888888888888888888888888ffffffffff8fffffffffff888888881118888888888
    ffffffffffffff88888888ffffff888111188888888ffffffffffffffffffffffffffffffffffffffff8888fffffffffff8ffffffffff8fffff11111118888888888888888888888888888888888fffffffffff8fffffffffff888888888888888888888
    ffffffffffffff88888888ffffff888111118888888ffffffffffffffffffffffffffffffffffffffffff8ffffffffffff8ffffffffff8ffff881111111188888888888888888888888888888888ffffffffff1ffffffffffff888888888888888888888
    ffffffffffffff88888888ffffff888811111888888fff8fffffffffffffffffffffffffffffffffffffffffffffffffff8ffffffffffffff8888811111111188888888888888888888888888888fffffffff11ffffffffffff888888888888888888888
    ffff8fffffffff88888888ffffff888881111888888fff88ffffffffffffffffffffffffffffffffffffffffffffffffff8ffffffffffffff8888888111111111188888888888888888888888888fffffffff11ffffffffffff888888888888888888888
    ffff8fffffffff88888888ffffff888888111188888fff8888ffffffffff11fffffffffffffffffffffffffffffffffff8ffffffffffffff88888888881111111111188888888888888888888888ffffffff111ffffffffffff888888888888888888888
    ffff88ffffffff88888888ffffff888888111118888fff88888ffffffffff1111ffffffffffffffffffffffffffffffff8fffffffffffff888888888888881111111111888888888888888888888ffffffff111ffffffffffff888888888888888888888
    fffff8ffffffff88888888fffff8888888811111888fff888888fffffffffff88888fffffffffffffffffffffffffffff8fffffffffffff888888888888888881111111111888888888888888888fffffff1188ffffffffffff888888888888888888888
    fffff88fffffff8888888ffffff8888888881111888ffff8888111ffffffffff8888888fffffffffffffffffffffffffffffffffffffff8888888888888888888881111111111888888881111111ffffff18888ffffffffffff888888888888888888888
    fffff88fffffff8888888ffffff8888888888111188ffff11111111ffffffffff888888ffffffffffffffffffffffffffffffffffffff888888888888888fff88888811111111111111111111111ffffff8888fffffffffffff888888888888888888888
    fffff88fffffff8888888ffffff8888888888111111ffff111111111ffffffffff888888fffffffffffffffffffffffffffffffffffff888888888888888ffff8888888811111111111111111111fffff88888fffffffffffff888888888888888888888
    fffff88ffffffff88888fffffff888888888881111ffff11111118888fffffffffff8888fffffffffffffffffffffffffffffffffffff888888888888888fffff8888888888fffff1111111888888888888888fffffffffffff888888888888888888888
    fffff88ffffffff88888fffffff88888888888811fffff8888888888888ffffffffff888ffffffffff8ffffffffffffffffffffffffff8888888888888888fffff888888888ffffff888888888888888888888fffffffffffff888888888888888888888
    ffffff8ffffffff88888fffffff88888888888888ffff888888888888888ffffffffff888ffffffffffffffffffffffffffffffffffff88888888888888888fffff88888888ffffff888888888888888888888fffffffffffff888888888888888888888
    ffffff8fffffffff8888fffffff8888888888888ffff88888888888888888fffffffffff8ffffffffffffffff8ffffffffffffffffffff88888888888888888fffff8888888ffffff888888888888888888888fffffffffffff888888888888888888888
    ffffff8fffffffff8888fffffff888888888888fffff888888888888888888fffffffffff8ffffffffffffff888fffffffffffffffffffff8888888888888888fffff888888fffffff88888888888888888888fffffffffffff888888888888888888888
    ffffff8ffffffffff888fffffff88888888888fffff888888888888888888888ffffffffffffffffffffffff888fffffffffffffffffffff88888888888888888fffff88888fffffff8888888888888888888ffffffffffffff888888888888888888888
    8fffff8ffffffffff88ffffffff88888888888ffff88888888888888888888888fffffffffffffffffffffff888fffffffffffffffffffff888888888888888888fffff8888ffffffff888888888888888888ffffffffffffff888888888888888888888
    8fffff8ffffffffff88ffffffff8888888888ffff8888888888888888888888888fffffffffffffffffffff8888fffffffffffffffffffff8888888888888888888fffff8888fffffff888888888888888888ffffffffffffff888888888888888888888
    8fffffffffffffffff8ffffffff888888888fffff888888888888888888888888888fffffffffffffffffff888ffffffffffffffffffffff88888888888888888888fffff888fffffff888888888888888888ffffffffffffff888888888888888888888
    8fffffffffffffffff8ffffffff888888888ffff88888888888888888888888888888fffffffffffffffffff88fffffffffffffffffff888888888888888888888888fffff88ffffffff88888888888888888ffffffffffffff888888888888888888888
    8ffffffffffffffffffffffffff88888888ffff8888888888888888888888888888888fffffffffffffffffff8fffffffffffffffffff8888888888888888888888888fffff88fffffff88888888888888888ffffffffffffff888881118888888888888
    8fffffffffffffffffffffffff88888888fffff88888888888888888888888888888888ffffffffffffffffffffffffffffffffffffff88888888888888888888888888fffff8fffffff88888888888888888ffffffffffffff888111111888888888888
    88ffffffffffffffffffffffff8888888fffff88888888888888888888888888888888888ffffffffffffffffffffffffffffffffffff888888888888888888888888888fffff8fffffff888888888888888fffffffffffffff881111111188888888888
    88ffffffffffffffffffffffff8888888ffff8888888888888888888888888888888888888fffffffffffffffffffffffffffffffffff8888888888888888888888888888ffffffffffff888888888888888fffffffffffffff811111111111888888888
    88ffffffffffffffffffffffff888888ffff88888888888888888888888888888888888888fffffffffffffffffffffffffffffffffff88888888888888888888888888888ffffffffffff88888888888888fffffffffffffff111118811111188888888
    88ffffffffffffffffffffffff88888fffff888888888888888888888888888888888888888ffffffffffffffffffffffffffffffffff888888888888888888888888888888fffffffffff88888888888888fffffffffffffff111188881111118888888
    88ffffffffffff8fffffffffff88888ffff88888888888888888888888888888888888888888fffffffffffffffffffffffffffffffff8888888888888888888888888888888ffffffffff88888888888888fffffffffffffff1118888888111118fffff
    88ffffffffffff8fffffffffff8888ffff8888888888888888888888888888888888888888888ffffffffffffffffffffffffffffffff88888888888888888888888888888888ffffffffff8888888888888fffffffffffffff1888888888811118fffff
    888fffffffffff8fffffffffff888fffff8888888888888888888888888888888888888888888ffffffffffffffffffffffffffffffff8888888888888fffff888888888888888fffffffff888888888888ffffffffffffffff8888888888881118fffff
    888fffffffffff88ffffffffff888ffff888888888888888888888888888888888888888811111fffffffffffffffffffffffffffffff8888888888888ffffff888888888888888ffffffff888888888888ffffffffffffffff8888888888881118fffff
    888fffffffffff88ffffffffff88ffff88888888888888888888888888888888888881111111111ffffffffffffffffffffffffffffff8888888888888ffffff8888888888888888ffffffff88888888888ffffffffffffffff8888888888881118fffff
    888fffffffffff88ffffffffffffffff888888888888888888888888888888881111111111111111fffffffffffffffffffffffffffff8888888888888ffffff88888888888888888fffffff88888888888ffffffffffffffff88888888888811188ffff
    888fffffffffff88fffffffffffffff888888888888888888888888888881fff11111111111881111ffffffffffffffffffffffffffff8888888888888ffffff88888888888888888ffffffff8888888888ffffffffffffffff88888888888811188ffff
    8888ffffffffff88ffffffffffffff8888888888888888888888888811111fff111111188888888881fffffffffffffffffffffffffff8888888888888ffffff88888888888888888ffffffff8888888888ffffffffffffffff8888888888881118fffff
    8888ffffffffff88fffffffffffff88888888888888888888881111111111fff1188888888888888888ffffffffffffffffffffffffff8888888888888ffffff888888888888888888ffffffffff8888888ffffffffffffffff8888888888881118fffff
    8888ffffffffff88fffffffffffff88888888888888888811111111111111fff8888888888888888888ffffffffffffffffffffffffff8888888888888ffffff888888888888888888ffffffffff888888fffffffffffffffff8888888888881118fffff
    8888ffffffffff8fffffffffffff888888888888888111111111111111888fff88888888888888888888fffffffffffffffffffffffff8888888888888ffffff8888888888888888888ffffffffff88888fffffffffffffffff8888888888888888fffff
    8888ffffffffff8ffffffffffffff88888888888111111111111188888888fff888888888888888888888ffffffffffffffffffffffff8888888888888ffffff8fffff8888888888888ffffffffff88881fffffffffffffffff8888888888888888fffff
    8888ffffffffff8fffffffffffffff8888881111111111111888888888888fff888888888888888888888ffffffffffffffffffffffff1118888888888ffffff8ffffff888888888888fffffffffff8111fffffffffffffffff8888888888888888fffff
    88888fffffffff8fffffffffffffff8881111111111118888888888888888fff888888888888888888888ffffffffffffffffffffffff11111188888888fffff8ffffff8888888888888fffffffffff111fffffffffffffffff8888888888888888fffff
    88888fffffffff8ffffffffffffffff111111111118888888888888888888fff88888888888888888888fffffffffffffffffffffffff11111111888888fffff8ffffff8888888888888fffffffffff111fffffffffffffffff8888888888888888fffff
    88888fffffffffffffffffffffffffff11111188888888888888888888888fff88888888888888888888ffff8ffffffffffffffffffff81111111111888ffffffffffff8888888888888ffffffffffff18fffffffffffffffff8888888888888888fffff
    88888ffffffffffffffffffffffffffff1188888888888888888888888888fff8888888888888888888ffff888fffffffffffffffffff88881111111111fffffffffffff8888888111111fffffffffff88fffffffffffffffff8888888888888888fffff
    88888fffffffffffffffffffffffffffff888888888888888888888888888fff888888888888888888fffff888ffffffffffffffffffff8888811111111fffffffffffff81111111111111fffffffffff8fffffffffffffffff8888888888888888fffff
    88888fffffffffffffffffffffffffffff888888888888888888888888888fff888888888888888888ffff88888fffffffffffffffffff8888888811111fffffffffffff111111111111111ffffffffff8fffffffffffff8fff8888888888888888fffff
    888888888ffffffffffffffffffffffffff88888888888888888888888888fff88888888888888888ffff8888888fffffffffffffffffff8888888888111fffffffffffff11111111888888ffffffffffffffffffffffff8fff8888888888888888fffff
    888888888fffffffffffffffffffffffffff8888888888888888888888888fff8888888888888888fffff88888888fffffffffffffffffff888888888888fffffffffffff1188888888888ffffffffffff888ffffffffff8fff8888888888888888fffff
    888888888ffffffffffffffffffffffffffff888888888888888888888888fff8888888888888888ffff8888888888fffffffffffffffffff88888888888fffffffffffff888888888888ffffffffffffff88ffffffffff8fff88888888888888888ffff
    888888888ffffffffffffffffffffffffffff888888888888888888888888ffff88888888888888ffff888888888888fffffffffffffffffff8888888888fffffffffffff888888888888fffffffffffffff8ffffffffff8fff88888888888888888ffff
    888888888ffffffffffffffffffffffffffff888888888888888888888888ffff8888888888888fffff8888888888888ffffffffffffffffff8888888888ffffffffffffff8888888888fffffffffffffffffffffffffff8fff88888888888888888ffff
    888888888ffffffffff8fffffffffffffffff8888888888888888888888888fff8888888888888ffff88888888888888fffffffffffffffffff888888888ffffffffffffff888888888fffff8ffffffffffffffffffffff8fff88888888888888888ffff
    888888888ffffffffff8fffffffffffffffff8888888888888888888888888ffff88888888888ffff8888888888888888fffffffffffffffffff88888888ffffffffffffff888888888ffff88ffffffffffffffffffffff8fff88888888888888888ffff
    888888888fffffffff88fffffffffffffffff8888888888888888888888888ffff8888888888fffff88888888888888888fffffffffffffffffff8888888ffffffffffffff88888888ffff8888fffffffffffffffffffff8fff88888888888888888ffff
    888888888fffffffff88fffffffffffffffff88888888888888888888888888fff8888888fffffff8888888888888888888fffffffffffffffffff888888fffffffffffffff888888fffff8888fffffffffffffffffffff8fff88888888888888888ffff
    888888888fffffffff88fffffffffffffffff88888888888888888888888888ffff88ffffffffff888888888888888888888ffffffffffffffffff888888fffffffffffffff888888ffff88888fffffffffffffffffffff8fff88888888888888888ffff
    888888888ffffffff888fffffffffffffffff88888888888888888888888888ffffffffffffffff8888888888888888888888ffffffffffffffffff88888fffffffffffffff88888ffff8888888ffffffffffffffffffff8fff88888888888888888ffff
    888888888ffffffff88fffffffffffffffff888888888888888888888888888ffffffffffffffff88888888888888888888888ffffffffffffffffff8888fffffffffffffff8888fffff8888888ffffffffffffffffffff8fff88888888888888888ffff
    888888888ffffffff88fffffffffffffffff88888888888888888888888888fffffffffffffffff888888888888888888888888ffffffffffffffffff8888fffffffffffffff888ffff88888888ffffffffffffffffffff8fff88888888888888888ffff
    888888888ffffffff88fffffffffffffffff88888888888888888888888888fffffffffffffffff888888888888888888888888fffffffffffffffffff888fffffffffffffff88ffff8888888888fffffffffffffffffff8fff88888888888888888ffff
    888888888fffffff888ffffffffffffffffff8888888888888888888888888ffffffffffffffff8888888888888888888888888fffffffffffffffffff888fffffffffffffff8fffff8888888888ffffffffffffffffff88fff88888888888888888ffff
    888888888fffffff888ffffffffffffffffff888888888888888888888888ffffffff8fffffff88888888888888888888888888ffffffffffffffffffff88ffffffffffffffffffff888888888888fffffffffffffffff88fff88888888888888888ffff
    888888888fffffff888fffffffffffffffffff88888888888888888888888ffffffffffffffff88888888888888888888888888fffffffffffffffffffff8fffffffffffffffffff8888888888888fffffffffffffffff88fff88888888888888888ffff
    888888888fffffff888fffffffffffffffffff8888888888888888888888ffffffffffffffff888888888888888888888888888fffffffffffffffffffffffffffffffffffffffff8888888888888fffffffffffffffff88fff88888811188888888ffff
    888888888fffffff888fffffffffffffffffff8888888888888888888888fffffffffffffff8888888888888888888888888888fffffffffffffffffffffffffffffffffffffffff88888888888888ffffffffffffffff88fff88888111188888888ffff
    888888888ffffffff88ffffffffffffffffffff888888888888888888888fffffffffffffff8888888888888888888888888888fffffffffffffffffffffffffffffffffffffffff88888888888888ffffffffffffffff88fff88811111118888888ffff
    888888888fffffffff8ffffffffffffffffffff88888888888888888888fffffffffffffff88888888888888888888888888888fffffffffffffffffffffffffffffffffffffffff88888888888888ffffffffffffffff88fff8811111111fffff88ffff
    888888888fffffffffffffffffffffffffffffff8888888888888888888ffffff8fffffff888888888888888888888888888888ffffff8ffffffffffffffffffffffffffffffffff888888888888888fffffffffffffff88fff8111111111ffffff8ffff
    888888888fffffffffffffffffffffffffffffff88888888888fff88888ffffffffffffff888888888888888888888888888888ffffff88fffffffffffffffffffffffffffffffff888888888888888fffffffffffffff88fff1111188111ffffff8ffff
    88888888fffffffffffffffffffffffffffffffff888888888ffffff88ffffffffffffff88888888888888888888fffff888888ffffff888ffffffffffffffffffffffffffffffff8888888888888888fffffffffffffff8fff1111888811ffffff8ffff
    88888888fffffffffffffffffffffffffffffffff88888888ffffffff8ffffffffffffff8888888888888888888ffffff888888ffffff8888fffffffffffffffffffffffffffffff8888888888888888fffffffffffffff8fff1118888811ffffff8ffff
    88888888fff88ffffffffffffffffffffffffffff88888888fffffffffffffffffffffff8888888888888888888ffffff888888ffffff88888ffffffffffffffffffffffffffffff8888888888888888fffffffffffffffffff1888888881ffffff8ffff
    8888888ffff888ffffffffffffffffffffffffffff888888ffffffffffffffffffffffff8888888888888888888ffffff888888ffffff888888fffffffffffffffffffffffffffff88888888888888888ffffffffffffffffff8888888881ffffff8ffff
    88fffffffff888ffffffffffffffffffffffffffff88888fffffffffffffffffffffffff8888888888888888888ffffff888888ffffff888888fffffffffffffffffffffffffffff88888888888888888ffffffffffffffffff8888888888ffffff8ffff
    88ffffffff88888ffffffffffffffffffffffffffff888fffffffffffffffffffffffffff888888888888888111fffffff888888fffff8888888ffffffffffffffffffffffffffff8888888888888888fffffffffffffffffff8888888888ffffff8ffff
    88ffffffff888888fffffffffffffffffffffffffff88fffff88ffffffffffffffff8ffff888888888111111111fffffff8888888888888888888fffffffffffffffffffffffffff8888888888888888fffffffffffffffffff8888888888fffffffffff
    88fffffff88888888ffffffffffffffffffffffffff88ffff888fffffffffffffff888fff888111111111111111fffffff88888888888888888888fffffffffffffffffffffffffff888888888888888ffffffffff1ffffffff8888888888fffffffffff
    88fffffff88888888fffffffffffffffffffffffffffffff88888ffffffffffffff888ffff11111111111111118fffffff188888888888888888888ffffffffffffffffffffffffff888888888888888fffffffffff1fffffff8888888888fffffffffff
    888ffffff888888888ffffffffffffffffffffffffffffff88888fffffffffffff1111ffff11111111118888888fffffff1118888888888888888888fffffffffffffffffffffffff888888888888888fffffffffff88888fff8888888888fffffffffff
    888fffff88888888888ffffffffffffffffffffffffffff888888ffffffffffff111111fff11118888888888888ffffffff1111888888888888888888ffffffffffffffffffffffff888888888888888fffffffffff88888fff8888888888fffffffffff
    888fffff88888888888fffffffffffffffffffffffffff8881111ffffffffffff111111ffff8888888888888888ffffffff1fffff88888888888888888ffffffffffffffffffffffff88888888888888fffffffffff88888fff8888888888fffffffffff
    888fffff888888888888ffffffffffffffffffffffffff11111111ffffffffff1888888ffff8888888888888888ffffffffffffff11888888888888888ffffffffffffffffffffffff88888888888888fffffffffff88888fff8888888888fffffffffff
    888fffff8888888888888fffffffffffffffffffffffff1111111ffffffffff888888888fff8888888888888888fffffffffffffff11188888888888888fffffffffffffffffffffff88888888888888ffffffffffff8888fff888888888ffffffffffff
    888fffff88888888888888ffffffffffffffffffffffff1111188ffffffffff888888888ffff888888888888888ffffffffffffffff11118888888888888ffffffffffffffffffffff88888888888811ffffffffffff8888fff888888888ffffffffffff
    88ffffff88888888888888fffffffffffffffffffffffff88888ffffffffff8888888888ffff888888888888888ffffffffffffffff111111188888888888ffffffffffffffffffffff888888881111111ffffffffff8888fff88888888fffffffffffff
    88ffffff888888888888888ffffffffffffffffffffffff88888fffffffff888888888888fff888888888888888fffffffffffffffff111111111888888888fffffffffffffffffffff888811111111111ffffffffff8888fff88888888fffffffffffff
    88ffffff8888888888888881ffffffffffffffffffffffff8888fffffffff888888888888ffff8888888888888ffffffffffffffffff8111111111188888888ffffffffffffffffffff111111111111188ffffffffff8888fff88888888fffffffffffff
    8fffffff8888888888888888ffffffffffffffffffffffff8888ffffffffff88888888888ffff888888888ffffffffffffffffffffff8888111111111188888fffffffffffffffffffff11111111188888ffffffffff8888fff88888888fffffffffffff
    8fffffff8888888888888888fffffffffffffffff8fffffff888ffffffffff888888888888fff888888888ffffffffffffffffffffff8888888111111111188fffffffffffffffffffff11111888888888fffffffffff888fff88888888fffffffffffff
    ffffffff8888888888888888fffffffffffffffffffffffff88fffffffffff888888888888ffff88888888ffffffffffffffffffffff8888888881111111111fffffffffffffffffffff18888888888888fffffffffff888fff8888888ffffffffffffff
    ffffffff8888888888888888fffffffffffffffffffffffff8fffffffffffff88888888888ffff8888888888ffffffffffffffffffff8888888888881111111fffffffffffffffffffff88888888888888fffffffffff888fff888888fffffffffffffff
    ffffffff8888888888888888fffffffffffffffffffffffffffffffffffffff888888888888fff888888888888ffffffffffffffffff8888888888888881111ffffffffffffffffffffff88888888888888ffffffffff888fff888888fffffffffffffff
    ffffffff8888888888888888fffffffffffffffffffffffffffffffffffffff888888888888ffff88888888888ffffffffffffffffff8888888888888888811ffffffffffffffffffffff88888888888888ffffffffff888fff88888ffffffffffffffff
    ffffffff8888888888888888ffffffffffffffffffffffffffffffff8fffffff88888888888ffff88888888888fffffffffffffffffff88888888888888888fffffffffffffffffffffff88888888888888fffffffffff88fff8888fffffffffffffffff
    ffffffff8888888888888888fffff8fffffffffffffffffffffffff888ffffff888888888888fff88888888888ffffffffffffffffffffff88888888888888fffffffffffffffffffffff88888888888888fffffffffff88fff8888fffffffffffffffff
    ffffffff8888888888888888888888fffffffffffffffffffffff88888ffffff888888888888ffff8888888888fffffffffffffffffffffffff88888888888ffffffffffffffffffffffff8888888888888fffffffffff88fff888ffff8fffffffffffff
    88fffffff88888888888888888888fffffffffffffffffffffffff8888fffffff88888888888ffff8888888888ffffffffffffffffffffffffffff88888888ffffffffffffffffffffffff8888888888888fffffffffff88fff88fffff8fffffffffffff
    888ffffffff888888888888888888ffffffffffffffffffffffffff8888ffffff888888888888fff8888888888ffffffffffffffff8888fffffffffff88888ffffffffffffffffffffffff8888888888888fffffffffff88fff8fffff88fffffffffffff
    888ffffffffff888888888888888fffffffffffffffffffffffffff8888ffffff888888888888ffff888888888ffffffffffffffff8888888fffffffffff8fffffffffffffffffffffffff88888888888888ffffffffff88fff8ffff888fffffffffffff
    888ffffffffffff888888888888fffff8fffffffffffffffffffffff888ffffff888888888888ffff888888888ffffffffffffffff8888888888fffffffffffffffffffffffffffffffffff8888888888888fffffffffff8fffffff8888fffffffffffff
    888fffff8fffffff8888888888fffff888fffffffffffffffffffffff888ffffff888888888888fff888888888ffffffffffffffff8888888888888ffffffffffffffffffffffffffffffff8888888888888fffffffffff8fffffff8888fffffffffffff
    888ffffff88fffffff8888888fffff888fffffffffffffffffffffffff88ffffff888888888888ffff88888888fffffffffffffff88888888888888888fffffffffffffffffffffffffffff8888888888888fffffffffff8ffffff88888fffffffffffff
    888fffffff888fffffff88888ffff88ffffffffffffff1fffffffffffff8ffffff888888888888ffff8888888ffffffffffffffff88888888888888888888fffffffffffffffffffffffffff888888888888fffffffffff8fffff888888fffffffffffff
    888fffffff8888ffffffff88ffff8ffffffffffffffff18ffffffffffffffffffff888888888888fff8888888ffffffffffffffff8888888888888888888ffffffffffffffffffffffffffff888888888888fffffffffff8fffff888888fffffffffffff
    888ffffffff88888ffffffffffffffffffffffffffffff88fffffffffffffffffff888888888888ffff888888ffffffffffffffff8888888888888888888ffffffffffffffffffffffffffff8888888888888fffffffffffffff8888888fffffffffffff
    8888ffffffff888888ffffffffffffffffffffffffffff888fffffffffffffffffff88888888888ffff888888fffffffffffffff88888888888888888888fff8ffffffffffffffffffffffff1888888888888ffffffffffffff88888888fffffffffffff
    88888ffffffff8888888fffffffffffffffff8ffffffff8888ffffffffffffffffff888888888888fff888888fffffffffffffff88888888888888888888fff8fffffffffffffffffffffffff888888888888fffffffffffff888888888fffffffffffff
    88888ffffffff88888888ffffffffffffff8888ffffffff8888fffffffffffffffff888888888888ffff88888fffffffffffffff88888888888888888888fff88ffffffffffffffffffffffff888888888888fffffffffffff888888888fffffffffffff
    888888ffffffff888888fffffffffffff8888888fffffff88888fffffffffffffffff88888888888ffff88888fffffffffffffff8888888888888888888ffff88ffffffffffffffffffffffff888888888888ffffffffffff8888888888fffffffffffff
    8888888ffffffff8888fffffffffffff88888888ffffffff88888ffffffffffffffff888888888888fff88888ffffffffffffff88888888888888888888ffff88ffffffffffffffffffffffff888888888888fffffffffff88888888888fffffffffffff
    88888888fffffff888ffffffffffffffff8888888ffffffff88888ffffffffffffffff88888888888ffff8888ffffffffffffff88888888888888888888fff888fffffffffffffffffffffffff88888888888ffffffffffff88888888888ffffffffffff
    88888888ffffffffffffffffffffffffffff88888fffffffff88888fffffffffffffff88888888888ffff888fffffffffffffff88888888888888888888fff888fffffffffffffffffffffffff888888888888fffffffffff88888888888ffffffffffff
    888888888ffffffffffffffffff888fffffff8888fffffffff888888fffffffffffffff88888888888fff888fffffffffffffff88888888888888888888fff888fffffffffffffffffffffffff888888888888fffffffffff88888888888ffffffffffff
    8888fffff8fffffffffffffff8888888fffff8888ffffffffff888888ffffffffffffff88888888888ffff88ffffffffffffff88888888888888888888ffff888fffffffffffffffffffffffff888888888888fffffffffff88888888888ffffffffffff
    888ffffff8ffffffffffffff8888888888fff88888ffffffffff888888fffffffffffff88888888888ffff88ffffffffffffff88888888888888888888ffff888ffffffffffffffffffffffffff88888888888fffffffffff88888888888ffffffffffff
    888ffffff8ffffffffffff88888888888888888888888fffffff8888888fffffffffffff11118888888fff88ffffffffffffff88888888888888888888fff8888ffffffffffffffffffffffffff88888888888ffffffffffff8888881118ffffffffffff
    88ffffffffffffffffff8888888888888888888888888ffffffff8888888ffffffffffff11111111888fffffffffffffffffff88888888888888888888fff8888ffffffffffffffffffffffffff88888888888ffffffffffff8888111111ffffffffffff
    88fffffffffffffffffff8888888888888888888888888ffffffff8881111ffffffffffff1111111111ffffffffffffffffff888888888888888888888fff8888fffffffffffffffffffffffffff8888888888ffffffffffff8881111111ffffffffffff
    8ffffffffffffffffffff88888888888888888888888888ffffffff11111111ffffffffff81111111ffffffffffffffffffff88888888888888888888ffff888ffffffffffffffffffffffffffff8888888888ffffffffffff8111111111ffffffffffff
    8fffffffffffffffffffff8888888888888888888888111ffffffff111111111ffffffffff88881ffffffffffffffffffffff88888888888888888888ffff88fffffffffffffffffffffffffffff888888888fffffffffffff1111118811ffffffffffff
    fffffffffffffffffffffff8888888888888881111111111ffffffff111888888ffffffffff88fffffffffffffffff1ffffff88888888888888888888fff888fffffffffffffffffffffffffffff88888888ffffffffffffff1111188881ffffffffffff
    fffffffffffffff8ffffffff8888888811111111111111111ffffffff888888888ffffffffffffffffffffffffffffffffff888888888888888888888fff88ffffffffffffffffffffffffffffff8888888ffffffffffffffff11fffffffffffffffffff
    ffffffffffffff88ffffffff88881111111111111111118888fffffff8888888888fffffffffffffffffffffffffffffffff118888888888888888888fff88ffffffffffffffffffffffffffffff8888888ffffffffffffffff88fffffffffffffffffff
    fffffffffffff8888ffffffff8881111111111118888888888ffffffff8888888888ffffffffffffffffffffffffffffffff11111188888888888888ffff8fffffffffffffffffffffffffffffff888888ffff8ffffffffffff88fffffffffffffffffff
    fffffff8ffff888888ffffffff8811111188888888888888888ffffffff8888888888fffffffffffffffffffffffffffffff11111111188888888888ffff8fffffffffffffffffffffffffffffff88888fffff8fffffffffffffffffffffffffffffffff
    fffff88ffff88888888fffffff88888888888888888888888888ffffffff8888888fffffffffffffffffffffffffffffffff11111111111188888888fff8ffffffffffffffffffffffffffffffff88888ffff888ffffffffffffffffffffffffffffffff
    fffff88fffff8888888ffffffff8888888888888888888888888ffffffff8888888ffffffffffffffffffffffffffffffffff8881111111111888888fff8ffffffffffffffffffffffffffffffff8888ffff8fffffffffffffffffffffffffffffffffff
    ffffff8ffffff8888888ffffffff8888888888888888888888888ffffffff888888ffffffffffffffffffffffffffffffffffff88881111111111888ffffffffffffffffffffffffffffffffffff888fffffffffffffffffffffffffffffffffffffffff
    fffffff8ffffff8888888ffffffff8888888888888888888888888ffffffff88888ffffffffffffffffffffffffffffffffffffff88888111111111fffffffffffffffffffffffffffffffffffff88fffff1ffffffffffffffffffffffffffffffffffff
    ffffffff88ffffff88888ffffffff88888888888888888888888888ffffffff888ffffffffffffffffffffffffffffffffffffffff8888881111111fffffffffffffffffffffffffffffffffffff88ffff11ffffffffffffffffffffffffffffffffffff
    fffffffff88ffffff88888ffffffff888888888888fff8888888888ffffffff888ffffffffffffffffffffffffffffffffffffffffff88888881111fffffffffffffffffffffffffffffffffffff8ffff111ffffffffffffffffffffffffffffffffffff
    fffffffff888ffffff88888fffffff888888888888ffff8888888888ffffffff88fffffffffffffffffffffffffffffffffffffffffff8888888881ffffffffffffffffffffffffffffffffffffffffff111ffffffffffffffffffffffffffffffffffff
    ffffffffff8888ffffff8888ffffff8888888ffffffffff8888888888ffffffff8fffffffffffffffffffffffffffffffffffffffffffff88888888fffffffffffffffffffffffffffffffffffffffff1888ffffffffffffffffffffffffffffffffffff
    fffffffffff8888ffffff888ffffff8888888ffffffffff88888888888fffffff8ffffffffffffffffffffffffffffffffffffffffffffff888888fffffffffffffffffffffffffffffffffffffffff88888ffffffffffffffffffffffffffffffffffff
    ffffffffffff8888fffffff88fffff8888888fffffffffff8888888888ffffffffffffffffffffffffffffffffffffffffffffffffffffffff8888fffffffffffffffffffffffffffffffffffffffff88888ffffffffffffffffffffffffffffffffffff
    fffffffffffff88888ffffff8888888888888ffffffffffff8888888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffff88ffffffffffffffffffffffffffffffffffffffff888888ffffffffffffffffffffffffffffffffffff
    ffffffffffffff88888ffffff888888888888ffffffffffff88888888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffff8fffffffffffffffffffffffffffffffffffffff8888888ffffffffffffffffffffffffffffffffffff
    fffffffffffffff888888ffffff888888888ffffffffffffff8888888888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8888888fffffffffffffffffffffffffffffffffffff
    ffffffffffffffff888888ffffff88888888fffffffffffffff8888888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff888888ffffffffffffffffffffffffffffffffffffff
    fffffffffffffffff888888fffffff888888fffffffffffffff88888888888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff88888fffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffff8888888ffffff88888ffffffffffffffff88888888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8888ffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffff8888888ffffff8888fffffffffffffffff8888888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff88ffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffff88888888ffffff88ffffffffffffffffff888888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffff88888888fffffffffffffffffffffffff888888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffff88888888fffffffffffffffffffffffff88888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffff188888ffffffffffffffffffffffff8888888fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffff888fffffffffffffffffffffff888888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffff88888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff888ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    `)
current_level = 0
Hops_and_Paw = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . f f . . . . . . . f f f f . 
    . f f f f f . . . . f f 1 1 f . 
    . f 1 1 1 f f . . . f 1 1 1 f . 
    . f f 1 1 1 f f f f f 1 1 1 f . 
    . . f f 1 f f f f f f f 1 f . . 
    . . . f f f f f f f f f f f . . 
    . . . . f f 4 f f f 4 f f . . . 
    . . . . f f 4 f f f 4 f f . . . 
    . . 1 1 1 c 1 1 1 1 1 c 1 1 1 . 
    . . . 1 1 1 1 f f f 1 1 1 1 . . 
    . . . . . 1 1 1 1 1 1 1 . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(Hops_and_Paw, 80, 0)
startLevel()
game.onUpdate(function () {
    if (Hops_and_Paw.vy < 0) {
    	
    } else if (0 > 0) {
    	
    } else if (Hops_and_Paw.x % 2 == 0) {
        if ((Hops_and_Paw.isHittingTile(CollisionDirection.Left) || Hops_and_Paw.isHittingTile(CollisionDirection.Right)) && Hops_and_Paw.vy >= 0) {
            Hops_and_Paw.vy = 0
            Hops_and_Paw.ay = 0
        } else {
            Hops_and_Paw.ay = 350
        }
        if (Hops_and_Paw.vx < 0 || Hops_and_Paw.isHittingTile(CollisionDirection.Left)) {
            Hops_and_Paw.image.flipX()
            Hops_and_Paw.setImage(Hops_and_Paw.image)
        }
    } else {
    	
    }
})
