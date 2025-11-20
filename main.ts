namespace SpriteKind {
    export const coordenadas = SpriteKind.create()
    export const shop_door = SpriteKind.create()
    export const outside_gim_door = SpriteKind.create()
    export const central_park_door = SpriteKind.create()
    export const inside_gim_door = SpriteKind.create()
    export const npc = SpriteKind.create()
    export const player = SpriteKind.create()
    export const enemy = SpriteKind.create()
    export const easter_egg = SpriteKind.create()
}

//  VARIABLES GLOBALES
let inventario_abierto = false
let precio_leña = 0
let nombre_sin_coste = ""
let partes : string[] = []
let nombre_articulo = ""
let esta_en_npc = false
let enemigo : Sprite = null
let hit = 0
let proximidad = false
let caballos = 0
let huevos = 0
let cabras = 0
let patatas_kg = 0
let gallinas = 0
let indice = 0
let estado_menu = false
let confirmacion_compra = false
let inside_gim_door2 : Sprite = null
let central_park_door2 : Sprite = null
let npc_shop : Sprite = null
let outside_gim_door2 : Sprite = null
let shop_door2 : Sprite = null
let villager : Sprite = null
let precios : number[] = []
let nombres_visibles : string[] = []
let vida_arbol = 5
let manejador_A_activo = false
let game_speed = 100
//  =======================================================
//  COLISIONES CON PUERTAS
//  =======================================================
sprites.onOverlap(SpriteKind.player, SpriteKind.central_park_door, function on_on_overlap(sprite4: Sprite, otherSprite4: Sprite) {
    
    scene.setBackgroundImage(assets.image`
        paisaje
        `)
    shop_door2 = sprites.create(img`
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
            `, SpriteKind.shop_door)
    outside_gim_door2 = sprites.create(img`
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
            `, SpriteKind.outside_gim_door)
    villager.setPosition(76, 101)
    outside_gim_door2.setPosition(12, 101)
    shop_door2.setPosition(136, 105)
    sprites.destroy(npc_shop)
    sprites.destroy(central_park_door2)
    sprites.destroy(inside_gim_door2)
})
//  =======================================================
//  CONTROLES DE MOVIMIENTO
//  =======================================================
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    
    if (estado_menu) {
        indice = (indice - 1) % nombres_visibles.length
        confirmacion_compra = false
        game.showLongText("Intercambio: " + nombres_visibles[indice], DialogLayout.Bottom)
    } else {
        animation.runImageAnimation(villager, assets.animation`
                myAnim4
                `, 200, false)
    }
    
})
sprites.onOverlap(SpriteKind.player, SpriteKind.easter_egg, function on_on_overlap2(sprite52: Sprite, otherSprite52: Sprite) {
    scene.setBackgroundImage(assets.image`
        easteregg
        `)
})
//  Botón B para cerrar menú O abrir mini menú de inventario
controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    
    if (estado_menu) {
        cerrar_menu()
    } else if (inventario_abierto) {
        inventario_abierto = false
    } else {
        inventario_abierto = true
        game.showLongText(`Inventario:
Gallinas: ` + ("" + ("" + gallinas)) + "\nPatatas: " + ("" + ("" + patatas_kg)) + " kg\nCabras: " + ("" + ("" + cabras)) + "\nHuevos: " + ("" + ("" + huevos)) + "\nCaballos: " + ("" + ("" + caballos)) + "\nLeña: " + ("" + ("" + info.score())) + ` kg

Presiona B para cerrar.`, DialogLayout.Bottom)
    }
    
})
//  =======================================================
//  FUNCIONES DE MENÚ/TRUEQUE
//  =======================================================
function abrir_menu() {
    
    if (!estado_menu) {
        estado_menu = true
        indice = 0
        confirmacion_compra = false
        controller.moveSprite(villager, 0, 0)
        //  Detener movimiento
        game.showLongText("Hola guapo, ¿quieres comprar cositas?", DialogLayout.Bottom)
        game.showLongText("Intercambio: " + nombres_visibles[indice] + `
                Usa Arriba/Abajo para navegar. A dos veces para comprar. B para salir.
                `, DialogLayout.Bottom)
    }
    
}

//  =======================================================
//  COLISIÓN CON ENEMIGO
//  =======================================================
sprites.onOverlap(SpriteKind.player, SpriteKind.enemy, function on_on_overlap3(sprite6: Sprite, otherSprite6: Sprite) {
    
    proximidad = true
    if (hit == vida_arbol) {
        sprites.destroy(enemigo)
        info.changeScoreBy(3)
        proximidad = false
        hit = 0
    }
    
})
//  =======================================================
//  BOTÓN A
//  =======================================================
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    
    if (estado_menu) {
        //  Si el menú está abierto, verificar confirmación
        if (confirmacion_compra) {
            //  Segunda pulsación: comprar
            procesar_trueque()
            confirmacion_compra = false
        } else {
            //  Primera pulsación: pedir confirmación
            confirmacion_compra = true
            game.showLongText("Presiona A de nuevo para confirmar compra de: " + nombres_visibles[indice], DialogLayout.Bottom)
        }
        
    } else if (esta_en_npc) {
        //  Si está sobre el NPC, abrir menú
        abrir_menu()
    } else {
        //  Acción normal: atacar
        animation.runImageAnimation(villager, assets.animation`
                myAnim3
                `, 200, false)
        if (proximidad) {
            hit += 1
        }
        
    }
    
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    if (!estado_menu) {
        animation.runImageAnimation(villager, assets.animation`
                myAnim0
                `, 200, false)
    }
    
})
sprites.onOverlap(SpriteKind.player, SpriteKind.inside_gim_door, function on_on_overlap4(sprite5: Sprite, otherSprite5: Sprite) {
    
    scene.setBackgroundImage(assets.image`
        gim
        `)
    outside_gim_door2 = sprites.create(img`
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
            `, SpriteKind.outside_gim_door)
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
            `, SpriteKind.enemy)
    villager.setPosition(82, 99)
    outside_gim_door2.setPosition(81, 110)
    enemigo.setPosition(113, 60)
    sprites.destroy(inside_gim_door2)
    sprites.destroy(central_park_door2)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    if (!estado_menu) {
        animation.runImageAnimation(villager, assets.animation`
                monkey_right
                `, 200, false)
    }
    
})
sprites.onOverlap(SpriteKind.player, SpriteKind.shop_door, function on_on_overlap5(sprite3: Sprite, otherSprite3: Sprite) {
    
    scene.setBackgroundImage(assets.image`
        tienda
        `)
    central_park_door2 = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . f . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            `, SpriteKind.central_park_door)
    npc_shop = sprites.create(assets.image`
        door3
        `, SpriteKind.npc)
    villager.setPosition(106, 91)
    central_park_door2.setPosition(106, 109)
    npc_shop.setPosition(112, 37)
    sprites.destroy(shop_door2)
    sprites.destroy(outside_gim_door2)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    
    if (estado_menu) {
        indice = (indice + 1) % nombres_visibles.length
        confirmacion_compra = false
        game.showLongText("Intercambio: " + nombres_visibles[indice], DialogLayout.Bottom)
    } else {
        animation.runImageAnimation(villager, assets.animation`
                myAnim1
                `, 200, false)
    }
    
})
function procesar_trueque() {
    
    nombre_articulo = nombres_visibles[indice]
    //  Extraer el nombre sin el coste (antes del paréntesis)
    partes = nombre_articulo.split("(")
    nombre_sin_coste = partes[0]
    //  Eliminar espacios manualmente
    while (nombre_sin_coste.charAt(nombre_sin_coste.length - 1) == " ") {
        nombre_sin_coste = nombre_sin_coste.substr(0, nombre_sin_coste.length - 1)
    }
    precio_leña = precios[indice]
    if (info.score() >= precio_leña) {
        info.changeScoreBy(-1 * precio_leña)
        //  Inventario
        if (nombre_sin_coste.indexOf("Gallina") >= 0) {
            gallinas += 1
        } else if (nombre_sin_coste.indexOf("Patata") >= 0) {
            patatas_kg += 1.5
        } else if (nombre_sin_coste.indexOf("Cabra") >= 0) {
            cabras += 1
        } else if (nombre_sin_coste.indexOf("Huevos") >= 0) {
            huevos += 12
        } else if (nombre_sin_coste.indexOf("Caballo") >= 0) {
            caballos += 1
        }
        
        game.showLongText("¡Trueque realizado! Compraste: " + nombre_sin_coste + "\nLeña restante: " + ("" + ("" + info.score())) + " kg.", DialogLayout.Bottom)
        cerrar_menu()
    } else {
        game.showLongText("¡Necesitas " + ("" + ("" + precio_leña)) + " kg de leña! Solo tienes " + ("" + ("" + info.score())) + " kg.", DialogLayout.Bottom)
    }
    
}

sprites.onOverlap(SpriteKind.player, SpriteKind.outside_gim_door, function on_on_overlap6(sprite2: Sprite, otherSprite2: Sprite) {
    
    scene.setBackgroundImage(assets.image`
        gim_door
        `)
    inside_gim_door2 = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . f . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            `, SpriteKind.inside_gim_door)
    central_park_door2 = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . f . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            `, SpriteKind.central_park_door)
    villager.setPosition(129, 20)
    inside_gim_door2.setPosition(87, 50)
    central_park_door2.setPosition(144, 7)
    sprites.destroy(shop_door2)
    sprites.destroy(outside_gim_door2)
    sprites.destroy(enemigo)
})
function cerrar_menu() {
    
    if (estado_menu) {
        estado_menu = false
        confirmacion_compra = false
        controller.moveSprite(villager, 100, 100)
        //  Restaurar movimiento
        game.showLongText("Chao guapo, pronto nos veremos en mi habitación ;3", DialogLayout.Bottom)
        //  Retroceder al jugador en X para alejarlo del NPC
        villager.setPosition(villager.x - 10, villager.y)
    }
    
}

//  =======================================================
//  COLISIÓN CON NPC
//  =======================================================
sprites.onOverlap(SpriteKind.player, SpriteKind.npc, function on_on_overlap7(sprite: Sprite, otherSprite: Sprite) {
    
    esta_en_npc = true
})
vida_arbol = 5
nombres_visibles = ["Gallina (6 kg Leña)", "1.5 kg Patata (2 kg Leña)", "Cabra (5 kg Leña)", "12 Huevos (3 kg Leña)", "Caballo (12 kg Leña)"]
precios = [6, 2, 5, 3, 12]
//  =======================================================
//  INICIALIZACIÓN
//  =======================================================
info.setScore(0)
scene.setBackgroundImage(assets.image`
    paisaje
    `)
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
        `, SpriteKind.player)
shop_door2 = sprites.create(img`
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
        `, SpriteKind.shop_door)
let easter_egg2 = sprites.create(assets.image`
    door3
    `, SpriteKind.easter_egg)
outside_gim_door2 = sprites.create(img`
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
        `, SpriteKind.outside_gim_door)
shop_door2.setPosition(136, 105)
easter_egg2.setPosition(150, 1)
outside_gim_door2.setPosition(12, 101)
villager.setPosition(76, 101)
controller.moveSprite(villager, 100, 100)
villager.setBounceOnWall(true)
//  =======================================================
//  BUCLE DE ACTUALIZACIÓN
//  =======================================================
game.onUpdateInterval(500, function on_update_interval() {
    
    //  Mostrar mensaje solo si está sobre el NPC y el menú NO está abierto
    if (esta_en_npc && !estado_menu) {
        game.showLongText("¿Quieres intercambiar? Presiona A.", DialogLayout.Bottom)
    }
    
    //  Resetear la bandera para el próximo ciclo
    esta_en_npc = false
})
