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
        music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 5000, 5000, 0, 255, 500, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
        music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 3300, 5000, 0, 255, 150, SoundExpressionEffect.Warble, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    }
})
let fireball: Sprite = null
let flower: Sprite = null
let bee: Sprite = null
let Hops_and_Paw: Sprite = null
let current_level = 0
scene.setBackgroundColor(8)
scene.setBackgroundImage(img`
    8888888888888888888888888888888888888888888888888888ffffff8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888ffffff8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888fffffff888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888888888888888ffffffff8888888888888888888888888888888888888888888888888888888888888888888888ccccc88888888888888888888888888888888888888888888888888888888888888888
    88888888888888888888888888888888888888888888888888888fffffffcccccccccccccccccc8888888888888888888888888888888888888888888888888888cccccc8888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888cccccccccccccffffffffccccccccccccccccc8888888888888888888888888888888888888888888888888888ccccccc888888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888ccccccccccccccffffffffcccccccccccccccc8888888888888888888888888888888888888888888888888888cccccccc88888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888cccccccccccccccfffffff88888888888888888888888888888888888888888888888888888888888888888888cccccccc88888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888ccc888888888888ffffffff88888888888888888888888888888888888888888888888888888888888888888888cccccccc8888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888ccc8888888888888ffffffff888888888888888811188888888888888888888888ccccc888888888888888888888cccccccc888888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888ccc88888888888888fffffff88888888888888881118888888888888888888888cccccc8888888888888888888888cccccccc88888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888ccc88888888888888ffffffff8888888888888881118888888888888888888888cccccc8888888888888888888888ccccccccc8888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888ccc888888888888888ffffffff888888888888888888888888888fffff8888fffffcccc88888888888888888888888ccccccccc888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888ccc888888888888888fffffffff8888888888888888888888888ffffffcccffffffcccc888888888888888888888888cccccccc888888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888ccc8888888888888888ffffffff888888888888888888888888fffffffccfffffffcccc8888888888888888888888888cccccccc88888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888ccc88888888888888888ffffffff8888888888888888888888fffffffffffffffffcccc88888888888888888888888888cccccccc8888888888888888888888888888888888888888888888888888888
    8888888888888888888888888888888888888888cccc8888888888888888fffffffff88888888888888888888ffffffffffffffffffcccc888888888888888888888888888cccccccc8888888888888888888888888888888ccccc888888888888888888
    8888888888888888888888888888888888888888cccc88888888888888888ffffffff88888888888888888ffffffffffffffffffffcccc8888888888888888888888888888ccccccccc8888888888888888888888888888ccccccc888888888888888888
    88888888888888888888888888888888888888888ccc88ccccccccccccccccffffffff888888888888888ffffffffffffffffffffccccc88888888888888888888888888888ccccccccc88888888888888881118888888cccccccc888888888888888888
    888888888888888888888888888888888cccccccccccccccccccccccccccccfffffffff8888888888888ffffffffffffffffffffcccccc8888888888888888ccc88888888888cccccccc88888888888888881118888888cccccccc888888888888888888
    888888888888888888888888888888888ccccccccccccccccccccccccccccccffffffff888888888888ffffffffffffffffffff8cccccc888888888888888cccc888888888888cccccccc8888888888888881118888ccccccccccc888888888888888888
    888888888888888888888888888888888ccccccccccccccccccccccccccccccfffffffffcc888888888fffffffffffffffffff88cccccc88888888888888ccccc8888888888888cccccccc88888888888888888888cccccccccccc888888888888888888
    888888888888888888888888888888888ccccccccccccccccccccccccccccccffffffffffcccc88888fffffffffffffffffff88cccccc88888888888888ccccc888888888888888cccccccc8888888888888888888cccccccccccc888888888888888888
    888888888888888888888888888888888ccccccccccccccccc8888888888ccccfffffffffccccccc8fffffffffffffffffff888cccccc8888888888888ccccc8888888888888888ccccccccc88888888888888888ccccccccccccc888888888888888888
    88888888888888888888888888888888888cccccccccccccc88888888888888cffffffffffccccccfffffffffffffffffffc888cccccc888888888888ccccc888888888888888888ccccccccc8888888888888888cccccccccccc8888888888888888888
    8888888888888888888888888888888888888cccccccccccccc8888888888888fffffffffffccccfffffffffffffffffffcc888cccccc88888888888ccccc88888888888888888888cccccccc888888888888888ccccccccccccc8888888888888888888
    888888888888888888888888888888888888888cccccccccccccc88888888888fffffffffffcccfffffffffffffffffffccc88ccccccc88888888888cccc8888888888888888888888cccccccc88888888888888ccccccccccccc8888888888888888888
    88888888888888888888888888888888888888888cccccccccccccc8888888888fffffffffffccffffffffffffffffffccc888ccccccc8888888888cccc888888888888888888888888cccccccc888888888888cccccccccccccc8888888888888888888
    888888888888888888888888888888888888888888cccccccccccccccc888888888ffffffffffffffffffffffffffffcccccccccccccc888888888ccccc8888888888888888888888888cccccccc8888888888ccccccccccccccc8888888888888888888
    8ccccc888888888888888888888888888888888888cccccccccccccccccc88888888ffffffffffffffffffffffffffccccccccccccccc888888888cccc88888888888888888888888888ccccccccc888888888cccccccccccccc88888888888888888888
    cccccc888888888888888888811188888888888888ccc88ccccccccccccccc8888888fffffffffffffffffffffffccccccccccccccccc88888888cccc8888888888888888888888888888ccccccccc8888888ccccccccccccccc88888888888888888888
    ccccccc8ccccc88888888888811118888888888888ccc8888ccccccccccccccc888888fffffffffffffffffffffcccccccccccccccccc8888888ccccc88888888888888888888888888888cccccccc8888888ccccccccccccccc88888888888888888888
    ccccccc8cccccc8888888888811118888888888888ccc888888ccccccccccccccc8cccffffffffffffffffffffccccccccccccccccccc8888888cccc8888888888888888888888888888888cccccccc88888cccccccccccccccc88888888888888888888
    ccccccc8cccccc888888888888111188888888888cccccc8888888cccccccccccccccccffffffffffffffffffccccccccccc1cccccccc888888cccc888888888888888888888888888888888cccccccc888cccccccccccccccc118888888888888888888
    cccccccccccccc888888888888111118888888888ccccccccc888888cccccccccccccccfffffffffffffffff1cccccccccc11cccccccc18888ccccc8888888888888888888888888888888888cccccccccccccccccccccccccc111111888888888888888
    cccccccccccccc888888888888811111888888888cccccccccccc88888ccccccccccccfffffffffffffffff11cccccccccc8ccccccccc11188cccc88888888888888888888888888888888888cccccccccccccccccccccccccc111111111888888888888
    cccccccccccccc888888888888881111888888888cccccccccccccccc888cccccccccfffffffffffffffff88cccccccccc88ccccccccc1111cccc8888888888888888888888888888888888888ccccccccccccccccccccccccc111111111188888888888
    cccccccccccccc888888888ccccc8111188888888ccccccccccccccccccc88ccccccfffffffffffffffff888cccccccccc88ccccccccc111ccccc88888888888888888888888888888888888888cccccccccccccccccccccccc888811111118888888888
    cccccccccccccc88888888cccccc81111188888888ccccccccccccccccccccc8cccfffffffffffffffff8888cccccccccc88ccccccccc811cccc11888888888888888888888888888888888888888cccccccccccccccccccccc888888811118888888888
    cccccccccccccc88888888cccccc881111888888888cccccccccccccccccccccccfffffffffffffffff8888ccccccccccc8cccccccccc88cccc111118888888888888888888888888888888888888cccccccccc8ccccccccccc888888881118888888888
    cccccccccccccc88888888cccccc888111188888888ccccccccccccccccccccccfffffffffffffffffc8888ccccccccccc8cccccccccc8ccccc11111118888888888888888888888888888888888ccccccccccc8ccccccccccc888888888888888888888
    cccccccccccccc88888888cccccc888111118888888cccccccccccccccccccccfffffffffffffffffcccc8cccccccccccc8cccccccccc8cccc881111111188888888888888888888888888888888cccccccccc1cccccccccccc888888888888888888888
    cccccccccccccc88888888cccccc888811fffff8888ccc8ccccccccccccccccfffffffffffffffffcccccccccccccccccc8cccccccccccccc8888811111111188888888888888888888888888888ccccccccc11cccccccccccc888888888888888888888
    cccc8ccccccccc88888888cccccc888881ffffff888ccc88ccccccccccccccfffffffffffffffffccccccccccccccccccc8cccccccccccccc8888888111111111188888888888888888888888888ccccccccc11cccccccccccc888888888888888888888
    cccc8ccccccccc88888888cccccc888888ffffff888ccc8888cccccccccc11ffffffffffffffffccccccccccccccccccc8cccccccccccccc88888888881111111111188888888888888888888888cccccccc111cccccccccccc888888888888888888888
    cccc88cccccccc88888888cccccc888888fffffff88ccc88888cccccccccc1fffffffffffffffcccccccccccccccccccc8ccccccccccccc888888888888881111111111888888888888888888888cccccccc111cccccccccccc888888888888888888888
    ccccc8cccccccc88888888ccccc8888888fffffff88ccc888888ccccccccccffffffffffffffccccccccccccccccccccc8ccccccccccccc888888888888888881111111111888888888888888888ccccccc1188cccccccccccc888888888888888888888
    ccccc88ccccccc8888888cccccc8888888fffffff88cccc8888111cccccccffffffffffffffccccccccccccccccccccccccccccccccccc8888888888888888888881111111111888888881111111cccccc18888cccccccccccc888888888888888888888
    ccccc88ccccccc8888888cccccc88888888fffffff8cccc11111111cccccffffffffffffffccccccccccccccccccccccccccccccccccc888888888888888ccc88888811111111111111111111111cccccc8888ccccccccccccc888888888888888888888
    ccccc88ccccccc8888888cccccc88888888fffffff1cccc111111111cccfffffffffffffffccccccccccccccccccccccccccccccccccc888888888888888cccc8888888811111111111111111111ccccc88888ccccccccccccc888888888888888888888
    ccccc88cccccccc88888ccccccc88888888ffffffffccc11111118888ccffffffffffffffcccccccccccccccccccccccccccccccccccc888888888888888ccccc8888888888ccccc1111111888888888888888ccccccccccccc888888888888888888888
    ccccc88cccccccc88888ccccccc888888888ffffffffcc888888888888ffffffffffffffcccccccccc8cccccccccccccccccccccccccc8888888888888888ccccc888888888cccccc888888888888888888888ccccccccccccc888888888888888888888
    cccccc8cccccccc88888ccccccc888888888fffffffff888888888888fffffffffffffff8cccccccccccccccccccccccccccccccccccc88888888888888888ccccc88888888cccccc888888888888888888888ccccccccccccc888888888888888888888
    cccccc8ccccccccc8888ccccccc8888888888ffffffff88888888888fffffffffffffffc8cccccccccccccccc8cccccccccccccccccccc88888888888888888ccccc8888888cccccc888888888888888888888ccccccccccccfffffffff8888888888888
    cccccc8ccccccccc8888ccccccc8888888888fffffffff888888888fffffffffffffffccc8cccccccccccccc888ccccccccccccccccccccc8888888888888888ccccc888888ccccccc88888888888888888888cccccccccccffffffffff8888888888888
    cccccc8cccccccccc888ccccccc8888888888fffffffff88888888ffffffffffffffffcccccccccccccccccc888ccccccccccccccccccccc888888fffff888888ccccc88888ccccccc8888888888888888888ccccccccccccffffffffff8888888888888
    8ccccc8cccccccccc88cccccccc888888888fffffffffff8888888fffffffffffffffccccccccccccccccccc888cccccffffffffcccccccc88888ffffff8888888ccccc8888cccccccc888888888888888888ccccccccccccffffffffff8888888888888
    8ccccc8cccccccccc88cccccccc888888888fffffffffff888888ffffffffffffffffcccccccccccccccccc8888ccccfffffffffffffffcc8888fffffff88888888ccccc8888ccccccc888888888888888888cccccccccccfffffffffff8888888888888
    8ccccccccccccccccc8cccccccc888888888fffffffffff88888ffffffffffffffffccccccccccccccccccc888cccccffffffffffffffffffffffffffff888888888ccccc888ccccccc8888888888888fffffcccccccccccffffffffff88888888888888
    8ccccccccccccccccc8cccccccc888888888ffffffffffff888ffffffffffffffff88ccccccccccccccccccc88ccccfffffffffffffffffffffffffffff8888888888ccccc88cccccccc8888888888ffffffffccccccccccfffffffff888888888888888
    8cccccccccccccccccccccccccc88888888cffffffffffff88fffffffffffffffff888ccccccccccccccccccc8cccfffffffffffffffffffffffffffff888888888888ccccc88ccccccc8888888888ffffffffccccccccccfffffffff118888888888888
    8ccccccccccccccccccccccccc88888888ccffffffffffffffffffffffffffffff88888ccccccccccccccccccccccfffffffffffffffffffffffffffff8888888888888ccccc8ccccccc8888888888fffffffffccccccccfffffffff1111888888888888
    88cccccccccccccccccccccccc8888888ccccffffffffffffffffffffffffffff88888888cccccccccccccccccccfffffffffffffffffffffffffffff888888888888888ccccc8ccccccc888888888fffffffffccccccccffffffff11111188888888888
    88cccccccccccccccccccccccc8888888cccc8ffffffffffffffffffff8ffffff888888888ccccccccccccccccccffffffffffffffffffffffffffff88888888888888888cccccccccccc888888888ffffffffffcccccccffffffff11111111888888888
    88cccccccccccccccccccccccc888888cccc88fffffffffffffffffff88fffff8888888888cccccccccccccccccffffffffffffffffffffffffffff8888888888888888888cccccccccccc88888888ffffffffffccccccffffffff118811111188888888
    88cccccccccccccccccccccccc88888ccccc888fffffffffffffffff8888888888888888888cccccccccccccccfffffffffffffffffffffffffffff88888888888888888888ccccccccccc888888888ffffffffffcccccffffffff188881111118888888
    88cccccccccccc8ccccccccccc88888cccc8888ffffffffffffffff888888888888888888888ccccccccccccccffffffffffffffffffffffffffff8888888888888888888888cccccccccc8888888888fffffffffccccfffffffff8888888111118ccccc
    88cccccccccccc8ccccccccccc8888cccc888888ffffffffffffff88888888888888888888888ccccccccccccffffffffffffffffffffffffffff888888888888888888888888cccccccccc888888888ffffffffffccfffffffff88888888811118ccccc
    888ccccccccccc8ccccccccccc888ccccc8888888ffffffffffff888888888888888888888888ccccccccccccffffffffffffffffffffffffffff88888ccccc888888888888888ccccccccc8888888888ffffffffffcfffffffff88888888881118ccccc
    888ccccccccccc88cccccccccc888cccc88888888fffffffffff88888888888888888888811111ccccccccccffffffffffffffffffffffffffff888888cccccc888888888888888cccccccc8888888888fffffffffffffffffff888888888881118ccccc
    888ccccccccccc88cccccccccc88cccc8888888888fffffffffff88888888888888881111111111ccccccccffffffffffffffffffffffffffff8888888cccccc8888888888888888cccccccc8888888888ffffffffffffffffff888888888881118ccccc
    888ccccccccccc88cccccccccccccccc8888888888fffffffffff888888888881111111111111111cccccccfffffffffffffffffffffffffff88888888cccccc88888888888888888ccccccc8888888888ffffffffffffffffff8888888888811188cccc
    888ccccccccccc88ccccccccccccccfffff88888888fffffffffff8888881ccc11111111111881111cccccffffffffffffffffffffffffffff88888888cccccc88888888888888888cccccccc8888888888ffffffffffffffff88888888888811188cccc
    8888cccccccccc88cccccccccccccffffff888888888ffffffffff8811111ccc111111188888888881ccccfffffffffffffffffffffffffff888888888cccccc88888888888888888cccccccc8888888888ffffffffffffffff8888888888881118ccccc
    8888ccfffffccc88ccccccccccccfffffff888888888fffffffffff111111ccc1188888888888888888ccfffffffffffffffffffffffffff8888888888cccccc888888888888888888cccccccccc8888888cfffffffffffffff8888888888881118ccccc
    8888ccffffffcc88ccccccccccccfffffff8888888888ffffffffff111111ccc8888888888888888888cfffffffffffffffffffffffffff88888888888cccccc888888888888888888cccccccccc888888ccffffffffffffffc8888888888881118ccccc
    8888ccffffffcc8ccccccccccccffffffff88888888111ffffffffff11888ccc88888888888888888888fffffffffffffffffffffffffff88888888888cccccc8888888888888888888cccccccccc88888cccfffffffffffffc8888888888888888ccccc
    8888ccfffffffffcccccccccccffffffff888888111111ffffffffff88888ccc8888888888888888888fffffffffffffffffffffffffff888888888888cccccc8ccccc8888888888888cccccccccc88881cccfffffffffffffc8888888888888888ccccc
    8888ccffffffffffcccccccccffffffff88811111111111fffffffff88888ccc8888888888888888888ffffffffffffffffffffffffff1118888888888cccccc8cccccc888888888888ccccccccccc8111ccccfffffffffffcc8888888888888888ccccc
    88888cffffffffffccccccccfffffffff11111111111188ffffffffff8888ccc888888888888888888fffffffffffffffffffffffffff11111188888888ccccc8cccccc8888888888888ccccccccccc111ccccfffffffffffcc8888888888888888ccccc
    88888cffffffffffccccccccffffffff111111111188888ffffffffff8888ccc88888888888888888fffffffffffffffffffffffffffc11111111888888ccccc8cccccc8888888888888ccccccccccc111cccccffffffffffcc8888888888888888ccccc
    88888ccffffffffffccccccffffffffc1111118888888888ffffffffff888ccc88888888888888888fffffff8ffffffffffffffffffcc81111111111888cccccccccccc8888888888888cccccccccccc18cccccffffffffffcc8888888888888888ccccc
    88888ccffffffffffcccccffffffffccc118888888888888ffffffffff888ccc8888888888888888ffffffff88ffffffffffffffffccc88881111111111ccccccccccccc8888888111111ccccccccccc88ccccccffffffffffc8888888888888888ccccc
    88888cccfffffffffccccffffffffccccc888888888888888ffffffffff88ccc888888888888888fffffffff8fffffffffffffffffcccc8888811111111ccccccccccccc81111111111111ccccccccccc8ccccccfffffffffff8888888888888888ccccc
    88888cccfffffffffccccffffffffccccc888888888888888ffffffffff88ccc888888888888888ffffffffffffffffffffffffffccccc8888888811111ccccccccccccc111111111111111cccccccccc8cccccccffffffffff8888888888888888ccccc
    88888888ffffffffffccffffffffccccccc88888888888888fffffffffff8ccc88888888888888ffffffffffffffffffffffffffccccccc8888888888111ccccccccccccc11111111888888ccccccccccccccccccfffffffffff888888888888888ccccc
    888888888fffffffffcffffffffccccccccc88888888888888ffffffffff8ccc88888888888888fffffffffffffffffffffffffccccccccc888888888888ccccccccccccc1188888888888cccccccccccc888cccccffffffffff888888888888888ccccc
    888888888fffffffffffffffffccccccccccc8888888888888ffffffffff8ccc8888888888888ffffffffffffffffffffffffffcccccccccc88888888888ccccccccccccc888888888888cccccccccccccc88cccccfffffffffff888888888888888cccc
    888888888fffffffffffffffffccccccccccc88888888888888ffffffffffcccc88888888888ffffffffffffffffffffffffffcccccccccccc8888888888ccccccccccccc888888888888ccccccccccccccc8ccccccffffffffff888888888888888cccc
    888888888cfffffffffffffffcccccccccccc88888888888888fffffffffffccc88888888888fffffffffffffffffffffffffccccccccccccc8888888888cccccccccccccc8888888888cccccccccccccccccccccccfffffffffff88888888888888cccc
    888888888cffffffffffffffccccccccccccc88888888888888fffffffffffccc8888888888ffffffffffffffffffffffffffcccccccccccccc888888888cccccccccccccc888888888ccccc8ccccccccccccccccccfffffffffff88888888888888cccc
    888888888ccffffffffffffcccccccccccccc888888888888888fffffffffffccc888888888fffffffffffffffffffffffffcccccccccccccccc88888888cccccccccccccc888888888cccc88cccccccccccccccccccfffffffffff888fffff88888cccc
    888888888ccfffffffffffccccccccccccccc888888888888888fffffffffffccc88888888fffffffffffffffffffffffffcccccccccccccccccc8888888cccccccccccccc88888888cccc8888ccccccccccccccccccfffffffffff88ffffff88888cccc
    888888888ccfffffffffffccccccccccccccc8888888888888888fffffffffffcc8888888fffffffffffffffffffffffff8ccccccccccccccccccc888888ccccccccccccccc888888ccccc8888ccccccccccccccccccffffffffffff8ffffff88888cccc
    888888888cccfffffffffcccccccccccccccc8888888888888888ffffffffffffcc88ccccfffffffffffffffffffffffff88cccccccccccccccccc888888ccccccccccccccc888888cccc88888cccccccccccccccccccfffffffffff8ffffff88888cccc
    888888888cccfffffffffcccccccccccccccc8888888888888888ffffffffffffcccccccfffffffffffffffffffffffff8888cccccccccccccccccc88888ccccccccccccccc88888cccc8888888ccccccccccccccccccffffffffffffffffff88888cccc
    888888888ccfffffffffffcccccccccccccc888888888888888888ffffffffffffccccccffffffffffffffffffffffff888888cccccccccccccccccc8888ccccccccccccccc8888ccccc8888888ccccccccccccccccccfffffffffffffffff888888cccc
    888888888cffffffffffffcccccccccccccc888888888888888888ffffffffffffcccccffffffffffffffffffffffff88888888cccccccccccccccccc8888ccccccccccccccc888cccc88888888cccccccccccccccccccffffffffffffffff888888cccc
    888888888cffffffffffffcccccccccccccc8888888888888888888ffffffffffffcccfffffffffffffffffffffffff88888888ccccccccccccccccccc888ccccccccccccccc88cccc8888888888ccccccccccccccccccffffffffffffffff888888cccc
    888888888ffffffffffffffcccccccccccccc888888888888888888fffffffffffffccffffffffffffffffffffffff888888888ccccccccccccccccccc888ccccccccccccccc8ccccc8888888888ccccccccccccccccccffffffffffffffff888888cccc
    888888888ffffffffffffffcccccccccccccc888888888888888888fffffffffffffcfffffffffff8ffffffffffff8888888888cccccccccccccccccccc88cccccccccccccccccccc888888888888ccccccccccccccccc8ffffffffffffff8888888cccc
    888888888fffffffffffffffcccccccccccccc888888888888888888ffffffffffffffffffffffffffffffffffff88888888888ccccccccccccccccccccc8ccccccccccccccccccc8888888888888ccccccccccccccccc8ffffffffffffff8888888cccc
    888888888fffffffffffffffcccccccccccccc888888888888888888fffffffffffffffffffffff8ffffffffffff88888888888ccccccccccccccccccccccccccccccccccccccccc8888888888888cccccccccccfffffc8ffffffffffffff8888888cccc
    888888888fffffcfffffffffcccccccccccccc8888888888888888888ffffffffffffffffffffffffffffffffff888888888888ccccccccccccccccccccccccccccccccccccccccc88888888888888cccccccccffffffc88fffffffffffff8888888cccc
    888888888cccccccfffffffffcccccccccccccc888888888888888888fffffffffffffffffffffffffffffffff8888888888888ccccccccccccccccccccccccccccccccccccccccc88888888888888cccccccccffffffc88ffffffffffffff888888cccc
    888888888cccccccfffffffffcccccccccccccc888888888888888888fffffffffffffffffffffffffffffffff8888888888888ccccccccccccccccccccccccccccccccccccccccc88888888888888cccccccccffffffc88cfffffffffffffcccc88cccc
    888888888cccccccfffffffffcccccccccfffffc888888888888888888fffffffffffffffffffffffffffffff88888888888888cccccc8cccccccccccccccccccccccccccccccccc888888888888888ccccccccffffffc88cfffffffffffffffccc8cccc
    888888888ccccccccfffffffffcccccccffffffc88888888888ccc8888ffffffffffffffffffffffffffffff888888888888888cccccc88ccccccccccccccccccccccccccccccccc888888888888888ccccccccffffffc88cfffffffffffffffccc8cccc
    88888888cccccccccfffffffffccfffffffffffcc888888888cccccc88cffffffffffffffffffffffffffff88888ccccc888888cccccc888cccccccccccccccccccccccccccccccc8888888888888888cccccccffffffcc8ccffffffffffffffccc8cccc
    88888888cccccccccffffffffffffffffffffffcc88888888cccccccc8cffffffffffffffffffffffffffff8888cccccc888888cccccc8888ccccccccccccccccccccccccccccccc888888888fffff88cccccccfffffffc8ccffffffffffffffccc8cccc
    88888888ccc88cccccfffffffffffffffffffffcc88888888ccccccccccfffffffffffffffffffffffffff88888cccccc888888cccccc88888cccccccccccccccccccccccccccccc888888888ffffff8cccccccfffffffccccffffffffffffffccc8cccc
    8888888cccc888ccccfffffffffffffffffffffccc888888ccccccccccccfffffffffffffffffffffffff888888cccccc888888cccccc888888ccccccccccccccccccccccccccccc888888888ffffff88ccccccfffffffccccffffffffffffffccc8cccc
    88ccccccccc888cccccfffffffffffffffffffcccc88888cccccccccccccffffffffffffffffffffffff8888888cccccc888888cccccc888888ccccccccccccccccccccccccccccc888888888ffffff88ccccccfffffffccccfffffffffffffcccc8cccc
    88cccccccc88888ccccfffffffffffffffffffccccc888ccccccccccccccffffffffffffffffffffffff8888111ccccccc888888ccccc8888888cccccccccccccccccccccccccccc888888888ffffff8cccccccfffffffccccfffffffffffffcccc8cccc
    88cccccccc888888cccfffffffffffffffffffccccc88ccccc88cccccccffffffffffffffffffffffff11111111ccccccc8888888888888888888ccccccccccccccccccccccccccc888888888ffffff8cccccccfffffffcccfffffffffffffcccccccccc
    88ccccccc88888888cccfffffffffffffffffcccccc88cccc888cccccccfffffffffffffffffffffff111111111ccccccc88888888888888888888ccccccccccccccccccccccccccc88888888ffffff8cccccccfffffffcccfffffffffffffcccccccccc
    88ccccccc88888888ccccffffffffffffffffccccccccccc88888cccccffffffffffffffffffffffff111111118ccccccc188888888888888888888cccccccccccccccccccccccccc88888888fffffffcccccccffffffffccfffffffffffffcccccccccc
    888cccccc888888888cccfffffffffffffffcccccccccccc88888cccccfffffffffffffffffffffff1118888888ccccccc1118888888888888888888ccccccccccccccccccccccccc888888888ffffffcccccccffffffff8cffffffffffffccccccccccc
    888ccccc88888888888cccffffffffffffffccccccccccc888888ccccfffffffffffffffffffffff88888888888cccccccc1111888888888888888888cccccccccccccccccccccccc888888888ffffffcccccccffffffff8fffffffffffffccccccccccc
    888cfffff8888888888cccfffffffffffffccccccccccc8881111ccccffffffffffffffffffffff888888888888cccccccc1ccccc88888888888888888cccccccccccccccccccccccc88888888ffffffcccccccffffffff8fffffffffffffccccccccccc
    888ffffff88888888888cffffffffffffffccccccccccc11111111ccfffffffffffffffffffffff888888888888cccccccccccccc11888888888888888cccccccccccccccccccccccc88888888fffffffccccccffffffff8ffffffffffff8ccccccccccc
    888ffffff888888888888ffffffffffffffccccccccccc1111111cccffffffffffffffffffffff8888888888888ccccccccccccccc11188888888888888ccccccccccccccccccccccc888888888ffffffccccccfffffffffffffffffffffcccccccccccc
    888ffffff88888888888ffffffffffffffcccccccccccc1111188cccfffffffffffffffffffff88888888888888cccccccccccccccc11118888888888888cccccccccccccccccccccc888888888ffffffccccccfffffffffffffffffffffcccccccccccc
    8ffffffff88888888888ffffffffffffffccccccccccccc88888cccfffffffffffffffffffff888888888888888cccccccccccccccc111111188888888888cccccccccccccccccccccc88888888fffffffcccccffffffffffffffffffffccccccccccccc
    8ffffffff8888888888ffffffffffffffcccccccccccccc88888cccfffffffffffffffffffff888888888888888ccccccccccccccccc111111111888888888ccccccccccccccccccccc88881111fffffffcccccffffffffffffffffffffccccccccccccc
    8ffffffff8888888888ffffffffffffffccccccccccccccc8888ccfffffffffffffffffffffcc8888888888888cccccccccccccccccc8111111111188888888cccccccccccccccccccc11111111fffffffcccccffffffffffffffffffffccccccccccccc
    8ffffffff888888888ffffffffffffffcccccccccccccccc8888ccfffffffffffffffffffffcc888888888cccccccccccccccccccccc8888111111111188888ccccccccccccccccccccc1111111fffffffcccccfffffffffffffffffff8ccccccccccccc
    8ffffffff88888888fffffffffffffffccccccccc8ccccccc888cfffffffffffffffffffffccc888888888cccccccccccccccccccccc8888888111111111188ccccccccccccccccccccc1111188ffffffffccccfffffffffffffffffff8ccccccccccccc
    cffffffff88888888fffffffffffffffccccccccccccccccc88cfffffffffffffffffffff8cccc88888888cccccccccccccccccccccc8888888881111111111ccccccccccccccccccccc1888888ffffffffccccfffffffffffffffffffcccccccccccccc
    cffffffff8888888fffffffffffffffcccccccccccccccccc8ccfffffffffffffffffffff8cccc8888888888cccccccccccccccccccc8888888888881111111ccccccccccccccccccccc88888888fffffffccccffffffffffffffffffccccccccccccccc
    ccfffffff8888888fffffffffffffffccccccccccccccccccccfffffffffffffffffffff888ccc888888888888cccccccccccccccccc8888888888888881111cccccccccccccccccccccc8888888ffffffffcccfffffffffffffffff8ccccccccccccccc
    ccfffffff888888fffffffffffffffccccccccccccccccccccfffffffffffffffffffff8888cccc88888888888cccccccccccccccccc8888888888888888811cccccccccccccccccccccc8888888ffffffffcccffffffffffffffff8cccccccccccccccc
    cffffffff888888ffffffffffffffcccccccccccccccccccccfffffffffffffffffffff8888cccc88888888888ccccccccccccccccccc88888888888888888ccccccccccccccccccccccc8888888ffffffffcccfffffffffffffff8ccccccccccccccccc
    cffffffff88888fffffffffffffff8cccccccccccccccccccfffffffffffffffffffff888888ccc88888888888cccccccccccccccccccccc88888888888888ccccccccccccccccccccccc8888888ffffffffcccfffffffffffffff8ccccccccccccccccc
    fffffffff8888fffffffffffffff88cccccccccccccccccccfffffffffffffffffffff888888cccc8888888888ccccccccccccccccccccccccc88888888888cccccccccccccccccccccccc888888fffffffffccfffffffffffffffcccc8ccccccccccccc
    fffffffff888fffffffffffffff88cccccccccccccccccccfffffffffffffffffffff8888888cccc8888888888cccccccccccccccccccccccccccc88888888cccccccccccccccccccccccc888888fffffffffccffffffffffffffccccc8ccccccccccccc
    ffffffffffc8fffffffffffffff88ccccccccccccccccccfffffffffffffffffffff888888888ccc8888888888cccccccccccccccc8888ccccccccccc88888cccccccccccccccccccccccc8888888ffffffffccffffffffffffffcccc88ccccccccccccc
    ffffffffffcfffffffffffffff88cccccccccccccccccccfffffffffffffffffffff888888888cccc888888888cccccccccccccccc8888888ccccccccccc8ccccccccccccccccccccccccc8888888ffffffffccfffffffffffffcccc888ccccccccccccc
    ffffffffffcffffffffffffff88ccccc8cccccccccccccfffffffffffffffffffff8888888888cccc88fffff88cccccccccccccccc8888888888ccccccccccccccccccccccccccccccccccc888888fffffffffcfffffffffffffccc8888ccccccccccccc
    fffffffffffffffffffffffff8ccccc888ccccccccccccffffffffffffffffffff888888888888ccc88ffffff8cccccccccccccccc8888888888888cccccccccccccccccccccccccccccccc888888fffffffffcffffffffffffcccc8888ccccccccccccc
    ffffffffffffffffffffffff8ccccc888ccccccccccccfffffffffffffffffffff888888888888ccccfffffff8ccccccccccccccc88888888888888888ccccccccccccccccccccccccccccc888888fffffffffcffffffffffffccc88888ccccccccccccc
    fffffffffffffffffffffff88cccc88cccccccccccccfffffffffffffffffffffc888888888888cccfffffffffccccccccccccccc88888888888888888888ccccccccccccccccccccccccccc88888fffffffffffffffffffffccc888888ccccccccccccc
    ffffffffffffffffffffff88cccc8cccccccccccccccffffffffffffffffffffccc888888888888ccffffffffffcccccccccccccc8888888888888888888cccccccccccccccccccccccccccc88888fffffffffffffffffffffccc888888ccccccccccccc
    ffffffffffffffffffffffcccccccccccccccccccccfffffffffffffffffffffccc888888888888cfffffffffffcccccccccccccc8888888888888888888cccccccccccccccccccccccccccc88888ffffffffffffffffffffffc8888888ccccccccccccc
    fffffffffffffffffffffccccccccccccccccccccccffffffffffffffffffffccccc88888888888fffffffffffffcccccccccccc88888888888888888888ccc8cccccccccccccccccccccccc188888fffffffffffffffffffff88888888ccccccccccccc
    ffffffffffffffffffffccccccccccccccccc8ccccfffffffffffffffffffffccccc88888888888ffffffffffffffccccccccccc88888888888888888888ccc8ccccccccccccccccccccccccc88888fffffffffffffffffffff88888888ccccccccccccc
    ffffffffffffffffffff8cccccccccccccc8888ccfffffffffffffffffffffcccccc8888888888fffffffffffffffccccccccccc88888888888888888888ccc88cccccccccccccccccccccccc88888fffffffffffffffffffff88888888ccccccccccccc
    fffffffffffffffffff8ccccccccccccc8888888cffffffffffffffffffffcccccccc88888888ffffffff8ffffffffcccccccccc8888888888888888888cccc88cccccccccccccccccccccccc88888fffffffffffffffffffff88888888ccccccccccccc
    ffffffffffffffffff8ccccccccccccc88888888fffffffffffffffffffffcccccccc88888888fffffff888ffffffffcccccccc88888888888888888888cccc88cccccccccccccccccccccccc88888fffffffffffffffffffff88888888ccccccccccccc
    ffffffffffffffc888cccccccccccccccc888888ffffffffffffffffffffcccccccccc888888fffffffff888fffffffcccccccc88888888888888888888ccc888ccccccccccccfffffcccccccc8888ffffffffffffffffffffff88888888cccccccccccc
    ffffffffffffffcccccccccccccccccccccc888ffffffffffffffffffffccccccccccc888888fffffffff888ffffffffccccccc88888888888888888888ccc888ccccccccccccffffffccccccc8888ffffffffffffffffffffff88888888cccccccccccc
    ffffffffffffffccccccccccccc888ccccccc8fffffffffffffffffffffcccccccccccc88888fffffffff888fffffffffcccccc88888888888888888888ccc888ccccccccccccffffffccccccc88888fffffffffffffffffffff88888888cccccccccccc
    8ffffffffffffffcccccccccc8888888ccccc8ffffffffffffffffffffccccccccccccc88888ffffffffff88fffffffffccccc88888888888888888888cccc888ccccccccccccffffffccccccc88888ffffffffffffffcfffffff8888888cccccccccccc
    8ffffffffffffffccccccccc8888888888cccfffffffffffffffffffffccccccccccccc88888ffffffffff88ffffffffffcccc88888888888888888888cccc888ccccccccccccffffffcccccccc8888fffffffffffffffffffffffff8888cccccccccccc
    fffffffffffffffccccccc888888888888888ffffffffffffffffffff88ccccccccccccc1111ffffffffff88fffffffffffccc88888888888888888888ccc8888ccccccccccccffffffcccccccc8888fffffffffffffffffffffffff1118cccccccccccc
    ffffffffffffffffcccc8888888888888888ffffffffffffffffffff8888cccccccccccc1111fffffffffffffffffffffffccc88888888888888888888ccc8888ccccccccccccffffffcccccccc8888fffffffffffffffffffffffff1111cccccccccccc
    ffffffffffffffffccccc888888888888888ffffffffffffffffffff81111cccccccccccc1111fffffffffffffffffffffffc888888888888888888888ccc8888ccccccccccccffffffccccccccc888fffffffffffffffffffffffff1111cccccccccccc
    ffffffffffffffffccccc888888888888888fffffffffffffffffff11111111cccccccccc8111ffffffffffffffffffffffff88888888888888888888cccc888cccccccccccccfffffffcccccccc888fffffffffffffffffffffffff1111cccccccccccc
    fffffffffffffffffccccc8888888888888fffffffffffffffffffc111111111cccccccccc8888fffffffffffffffffffffff88888888fffff8888888cccc88ccccccccfffffcfffffffcccccccc8888ffffffffffffffffffffffff8811cccccccccccc
    fffffffffffffffffcccccc888888888888fffffffffffffffffffcc111888888cccccccccc88cffffffffffffffffffffffff8888888ffffff888888ccc888ccccccccfffffcfffffffcccccccc8888ffffffffffffffffffffffff8881cccccccccccc
    fffffffffffffffffccccccc8888888811fffffffffffffffffffcccc888888888ccccccccccccfffffffffffffffffffffffff888888fffffff88888ccc88cccccccccfffffcfffffffcccccccc8888ffffffffffffffffffffffffcccccccccccccccc
    fffffffffffffffffccccccc8888111111fffffffffffffffffffcccc8888888888ccccccccccccffffffffffffffffffffffff888888fffffff88888ccc88cccccccccfffffcfffffffcccccccc8888ffffffffffffffffffffffffcccccccccccccccc
    ffffffffffffffffffccccccc88811111fffffffffffffffffffcccccc8888888888cccccccccccfffffffffffffffffffffffff11888ffffffff888cccc8ccccccccccfffffcfffffffcccccccc8888ffffffffffffffffffffffffcccccccccccccccc
    ffffffffffffffffffcccccccc8811111ffffffffffffffffffcccccccc8888888888cccccccccccfffffffffffffffffffffffff1111fffffffff88cccc8ccccccccccfffffcfffffffcccccccc8888ffffffffffffffffffffffffcccccccccccccccc
    ffffffffffffffffff8ccccccc8888888ffffffffffffffffff8cccccccc8888888cccccccccccccfffffffffffffffffffffffff11111fffffffff8ccc8cccccccccccfffffccfffffffccccccc8888fffffffffffffffffffffffffccccccccccccccc
    fffffffffffffffffffcccccccc88888fffffffffffffffffffffccccccc8888888cccccccccccccffffffffffffffffffffffffff1111fffffffff8ccc8cccccccccccfffffccfffffffccccccc8888fffffffffffffffffffffffffccccccccccccccc
    fffffffffffffffffff8cccccccc8888fffffffffffffffffffffcccccccc888888ccccccccccccccffffffffffffffffffffffffff111ffffffffffcccccccccccccccfffffccfffffffccccccc888ccffffffffffffffffffffffffccccccccccccccc
    fffffffffffffffffff88cccccccc88ffffffffffffffffffffff8cccccccc88888ccccccccccccccffffffffffffffffffffffffff8881ffffffffffcccccccccccccffffffccfffffffccccccc88cccfffffffffffffffffffffffffcccccccccccccc
    ffffffffffffffffffff8cccccccc88ffffffffffffffffffffff88cccccccc888ccccccccccccccccffffffffffffffffffffffffff888fffffffffffccccccccccccffffffccfffffffccccccc88cccfffffffffffffffffffffffffcccccccccccccc
    ffffffffffffffffffff88cccccccffffffffffffffffffffffff88cccccccc888ccccccccccccccccfffffffffffffffffffffffffff888ffffffffffccccccccccccffffffccfffffffccccccc8ccccfffffffffffffffffffffffffcccccccccccccc
    ffffffffffffffffffff888cccccfffffffffffffffffffffffff888cccccccc88ccccccccccccccccfffffffffffffffffffffffffff888fffffffffffcccccccccccffffffccfffffffccccccccccccfffffffffffffffffffffffffcccccccccccccc
    fffffffffffffffffffff888ccccffffffffffffffffffffffff88888cccccccc8cccccccccccccccccfffffffffffffffffffffffffffc8ffffffffffffccccccccccfffffffcffffffffcccccccccc1fffffffffffffffffffffffffcccccccccccccc
    fffffffffffffffffffff888cccfffffffffffffffffffffffff888888ccccccc8cccccccccccccccccffffffffffffffffffffffffffffc8ffffffffffffcccccccccfffffffcffffffffccccccccc88fffffffffffffffffffffffffcccccccccccccc
    fffffffffffffffffffffcc88cfffffffffffffffffffffffff8888888ccccccccccccccccccccccccccfffffffffffffffffffffffffffccffffffffffffccccccccccfffffffffffffffccccccccffffffffffffffffffffffffffffcccccccccccccc
    ffffffffffffffffffffffcc88fffffffffffffffffffffffff88888888cccccccccccccccccccccccccffffffffffffffffffffffffffffccffffffffffffcccccccccfffffffffffffffccccffffffffffffffffffffffffffffffcccccccccccccccc
    ffffffffffffffffffffffcccffffffffffffffffffffffffff888888888ccccccccccccccccccccccccfffffffffffffffffffffffffffffcfffffffffffffcccccccccffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccc
    ffffffffffffffffffffffccffffffffffffffffffffffffffff88888888cccccccccccccccccccccccccffffffffffffffffffffffffffffccfffffffffffffccccccccffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccc
    fffffffffffffffffffffffcfffffffffffffffffffffffffffff88888888ccccccccccccccccccccccccfffffffffffffffffffffffffffffcfffffffffffffcccccccccfffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccc
    fffffffffffffffffffffffffffffffffffffffffffffffffffff888888888ccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffccccccccfffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccc
    ffffffffffffffffffffffffffffffffffffffffffffffffffffff888888888cccccccccccccccccccccccfffffffffffffffffffffffffffffcffffffffffffffcccfffffffffffffffffffffffff88ffffffffffffffffffffffffcccccccccccccccc
    fffffffffffffffffffffffffffffffffffffffffffffffffffffff88888888cccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff88ffffffffffffffffffffffffffcccccccccccccccc
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffff8888888ccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccc
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffff888888ccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccc
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffff88888cccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccc
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8888cccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffffffffccccfffffffffffffffffffffffffffffffcfffffffcccccccccccccccccccc
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff88ccccccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffffffffffcccfffffffffffffffffffffffffffffffcfffffffcccccccccccccccccccc
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8cccccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffffffffffcfffffffffffffffffffffffffffffffcffffffffccccccccccccccccccc
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcffffffffccccccccccccccccccc
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccfffffffccccccccccccccccccc
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccfffffffcccffffffccccccccccccccccccc
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccffffffccccccccccccccccccc
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccffffffccccccccccccccccccc
    ccffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccffffffccccccccccccccccccc
    ccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccc
    ccfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccccccccc
    cfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccccccccc
    cffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccfffffffffffffffffffffffffffffffffffffffffffffffccccccccccccccc
    cffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccccccccccccc
    cfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccfffffffffffffffffffffffffffffffffccccccccccccc
    cffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffcccccccccccfffffffffffffffffffffffffccccccccccccc
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
