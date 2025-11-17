namespace SpriteKind {
    export const coordenadas = SpriteKind.create()
    export const doooor = SpriteKind.create()
    export const dooor2 = SpriteKind.create()
    export const doooor3 = SpriteKind.create()
    export const doooor4 = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.dooor2, function (sprite, otherSprite) {
    scene.setBackgroundImage(assets.image`gim_door`)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    villager,
    assets.animation`myAnim4`,
    200,
    true
    )
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    villager,
    assets.animation`myAnim0`,
    200,
    true
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.doooor4, function (sprite, otherSprite) {
    scene.setBackgroundImage(assets.image`gim`)
    enemigo = sprites.create(img`
        ......cc66......
        .....c6576c.....
        ....c677576c....
        ....cc677666....
        ...cc6c6667cc...
        ..6c666777cc6c..
        ..c76666766776..
        ..c6777777776c..
        ..cc67777776cc..
        .c67cc76676676c.
        .c777666667777c.
        .c6777777777766.
        .cc7767776776666
        c676cc6766666776
        c777766666677776
        cc7777777777776c
        .c676777677767c.
        ..cc667666766c..
        ...ccc6c66ccc...
        .....cccccc.....
        .......ee.......
        ......eeee......
        .....eeeeee.....
        .......ee.......
        `, SpriteKind.Enemy)
    enemigo.setPosition(113, 60)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    villager,
    assets.animation`monkey_right`,
    200,
    true
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.doooor3, function (sprite, otherSprite) {
    scene.setBackgroundImage(assets.image`paisaje`)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    villager,
    assets.animation`myAnim1`,
    200,
    true
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.doooor, function (sprite, otherSprite) {
    scene.setBackgroundImage(assets.image`tienda`)
})
let enemigo: Sprite = null
let villager: Sprite = null
scene.setBackgroundImage(assets.image`paisaje`)
villager = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . f f f f f f . . . . . 
    . . . f f e e e e f 2 f . . . . 
    . . f f e e e e f 2 2 2 f . . . 
    . . f e e e f f e e e e f . . . 
    . . f f f f e e 2 2 2 2 e f . . 
    . . f e 2 2 2 f f f f e 2 f . . 
    . f f f f f f f e e e f f f . . 
    . f f e 4 4 e b f 4 4 e e f . . 
    . f e e 4 d 4 1 f d d e f . . . 
    . . f e e e e e d d d f . . . . 
    . . . . f 4 d d e 4 e f . . . . 
    . . . . f e d d e 2 2 f . . . . 
    . . . f f f e e f 5 5 f f . . . 
    . . . f f f f f f f f f f . . . 
    . . . . f f . . . f f f . . . . 
    `, SpriteKind.Player)
let door = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 1 . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.doooor)
let door2 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 3 . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.dooor2)
let doooor3 = sprites.create(assets.image`door3`, SpriteKind.doooor3)
let dor4 = sprites.create(assets.image`door3`, SpriteKind.doooor4)
door.setPosition(136, 105)
door2.setPosition(12, 101)
villager.setPosition(76, 101)
doooor3.setPosition(55, 111)
controller.moveSprite(villager)
villager.setBounceOnWall(true)
