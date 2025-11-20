@namespace
class SpriteKind:
    coordenadas = SpriteKind.create()
    shop_door = SpriteKind.create()
    outside_gim_door = SpriteKind.create()
    central_park_door = SpriteKind.create()
    inside_gim_door = SpriteKind.create()
    npc = SpriteKind.create()
    player = SpriteKind.create()
    enemy = SpriteKind.create()
"""

=======================================================
VARIABLES GLOBALES
=======================================================

"""
# =======================================================
# COLISIONES CON PUERTAS
# =======================================================

def on_on_overlap(sprite4, otherSprite4):
    global shop_door2, outside_gim_door2
    scene.set_background_image(assets.image("""
        paisaje
        """))
    shop_door2 = sprites.create(img("""
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
            """),
        SpriteKind.shop_door)
    outside_gim_door2 = sprites.create(img("""
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
            """),
        SpriteKind.outside_gim_door)
    villager.set_position(76, 101)
    outside_gim_door2.set_position(12, 101)
    shop_door2.set_position(136, 105)
    sprites.destroy(npc_shop)
    sprites.destroy(central_park_door2)
    sprites.destroy(inside_gim_door2)
sprites.on_overlap(SpriteKind.player,
    SpriteKind.central_park_door,
    on_on_overlap)

# =======================================================
# CONTROLES DE MOVIMIENTO
# =======================================================

def on_up_pressed():
    global indice
    if estado_menu:
        indice = (indice - 1) % len(nombres_visibles)
        game.show_long_text("Intercambio: " + nombres_visibles[indice],
            DialogLayout.BOTTOM)
    else:
        animation.run_image_animation(villager,
            assets.animation("""
                myAnim4
                """),
            200,
            False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

# Botón B para cerrar menú O abrir mini menú de inventario

def on_b_pressed():
    global item_exit
    if estado_menu:
        cerrar_menu()
    else:
        # Abrir mini menú de inventario
        # Crear items del menú con iconos
        item_gallinas = miniMenu.create_menu_item("Gallinas: " + ("" + str(gallinas)),
            assets.image("""
                gallina
                """))
        item_patatas = miniMenu.create_menu_item("Patatas: " + ("" + str(patatas_kg)) + " kg",
            assets.image("""
                papa
                """))
        item_cabras = miniMenu.create_menu_item("Cabras: " + ("" + str(cabras)),
            assets.image("""
                cabra
                """))
        item_huevos = miniMenu.create_menu_item("Huevos: " + ("" + str(huevos)),
            assets.image("""
                huevo
                """))
        item_caballos = miniMenu.create_menu_item("Caballos: " + ("" + str(caballos)),
            img("""
                1 1 1 1 1 d d d d d d 1 1 1 1 1
                d d d d 1 1 1 1 1 1 1 1 1 d d d
                1 1 1 1 1 1 1 1 1 f e f 1 1 1 1
                1 1 1 1 1 d d b b f c e 1 1 1 1
                d d d d 1 1 1 f f e f e 1 d d d
                1 1 1 1 1 d d c c c c 1 1 1 1 1
                d d d d c e e e e e e 1 1 d d d
                d d c c e c e b b f f f 1 d d d
                1 c f f e f f f f d c 1 1 1 1 1
                d c d f f f 1 1 1 1 b 1 1 d d d
                1 f 1 f 1 e d d d d d 1 1 1 1 1
                1 1 1 c 1 c 1 1 1 1 1 1 1 1 1 1
                1 1 1 d 1 d 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 d b d d d d 1 1 1 1 1
                d d d d 1 1 1 1 1 1 1 1 1 d d d
                1 1 1 1 1 d d d d d d 1 1 1 1 1
                """))
        item_lena = miniMenu.create_menu_item("Leña: " + ("" + str(info.score())) + " kg",
            assets.image("""
                tronco
                """))
        item_exit = miniMenu.create_menu_item("salir", assets.image("""
            door3
            """))
        # Crear el menú con todos los items
        menu_inventario = miniMenu.create_menu_from_array([item_gallinas,
                item_patatas,
                item_cabras,
                item_huevos,
                item_caballos,
                item_lena,
                item_exit])
        menu_inventario.set_dimensions(120, 100)
        # Mostrar el menú sin mensaje adicional (LÍNEA ELIMINADA)
        menu_inventario.set_position(80, 60)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

# =======================================================
# FUNCIONES DE MENÚ/TRUEQUE
# =======================================================
def abrir_menu():
    global estado_menu, indice
    if not (estado_menu):
        estado_menu = True
        indice = 0
        controller.move_sprite(villager, 0, 0)
        # Detener movimiento
        game.show_long_text("Hola guapo, ¿quieres comprar cositas?", DialogLayout.BOTTOM)
        pause(500)
        game.show_long_text("Intercambio: " + nombres_visibles[indice] + """
                Usa Arriba/Abajo para navegar. A para comprar. B para salir.
                """,
            DialogLayout.BOTTOM)
# =======================================================
# COLISIÓN CON ENEMIGO
# =======================================================

def on_on_overlap2(sprite6, otherSprite6):
    global proximidad, hit
    proximidad = True
    if hit == vida_arbol:
        sprites.destroy(enemigo)
        info.change_score_by(3)
        proximidad = False
        hit = 0
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap2)

# =======================================================
# BOTÓN A
# =======================================================

def on_a_pressed():
    global hit
    if estado_menu:
        # Si el menú está abierto, comprar
        procesar_trueque()
    elif esta_en_npc:
        # Si está sobre el NPC, abrir menú
        abrir_menu()
    else:
        # Acción normal: atacar
        animation.run_image_animation(villager,
            assets.animation("""
                myAnim3
                """),
            200,
            False)
        if proximidad:
            hit += 1
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_left_pressed():
    if not (estado_menu):
        animation.run_image_animation(villager,
            assets.animation("""
                myAnim0
                """),
            200,
            False)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_on_overlap3(sprite5, otherSprite5):
    global outside_gim_door2, enemigo
    scene.set_background_image(assets.image("""
        gim
        """))
    outside_gim_door2 = sprites.create(img("""
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
            """),
        SpriteKind.outside_gim_door)
    enemigo = sprites.create(img("""
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
            """),
        SpriteKind.enemy)
    villager.set_position(82, 99)
    outside_gim_door2.set_position(81, 110)
    enemigo.set_position(113, 60)
    sprites.destroy(inside_gim_door2)
    sprites.destroy(central_park_door2)
sprites.on_overlap(SpriteKind.player,
    SpriteKind.inside_gim_door,
    on_on_overlap3)

def on_right_pressed():
    if not (estado_menu):
        animation.run_image_animation(villager,
            assets.animation("""
                monkey_right
                """),
            200,
            False)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_on_overlap4(sprite3, otherSprite3):
    global central_park_door2, npc_shop
    scene.set_background_image(assets.image("""
        tienda
        """))
    central_park_door2 = sprites.create(img("""
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
            """),
        SpriteKind.central_park_door)
    npc_shop = sprites.create(assets.image("""
        door3
        """), SpriteKind.npc)
    villager.set_position(106, 91)
    central_park_door2.set_position(106, 109)
    npc_shop.set_position(112, 37)
    sprites.destroy(shop_door2)
    sprites.destroy(outside_gim_door2)
sprites.on_overlap(SpriteKind.player, SpriteKind.shop_door, on_on_overlap4)

def on_down_pressed():
    global indice
    if estado_menu:
        indice = (indice + 1) % len(nombres_visibles)
        game.show_long_text("Intercambio: " + nombres_visibles[indice],
            DialogLayout.BOTTOM)
    else:
        animation.run_image_animation(villager,
            assets.animation("""
                myAnim1
                """),
            200,
            False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def procesar_trueque():
    global nombre_articulo, partes, nombre_sin_coste, precio_leña, gallinas, patatas_kg, cabras, huevos, caballos
    nombre_articulo = nombres_visibles[indice]
    # Extraer el nombre sin el coste (antes del paréntesis)
    partes = nombre_articulo.split("(")
    nombre_sin_coste = partes[0]
    # Eliminar espacios manualmente
    while nombre_sin_coste.char_at(len(nombre_sin_coste) - 1) == " ":
        nombre_sin_coste = nombre_sin_coste.substr(0, len(nombre_sin_coste) - 1)
    precio_leña = precios[indice]
    if info.score() >= precio_leña:
        info.change_score_by(-1 * precio_leña)
        # Inventario
        if nombre_sin_coste.index_of("Gallina") >= 0:
            gallinas += 1
        elif nombre_sin_coste.index_of("Patata") >= 0:
            patatas_kg += 1.5
        elif nombre_sin_coste.index_of("Cabra") >= 0:
            cabras += 1
        elif nombre_sin_coste.index_of("Huevos") >= 0:
            huevos += 12
        elif nombre_sin_coste.index_of("Caballo") >= 0:
            caballos += 1
        game.show_long_text("¡Trueque realizado! Compraste: " + nombre_sin_coste + "\nLeña restante: " + ("" + str(info.score())) + " kg.",
            DialogLayout.BOTTOM)
        cerrar_menu()
    else:
        game.show_long_text("¡Necesitas " + ("" + str(precio_leña)) + " kg de leña! Solo tienes " + ("" + str(info.score())) + " kg.",
            DialogLayout.BOTTOM)

def on_on_overlap5(sprite2, otherSprite2):
    global inside_gim_door2, central_park_door2
    scene.set_background_image(assets.image("""
        gim_door
        """))
    inside_gim_door2 = sprites.create(img("""
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
            """),
        SpriteKind.inside_gim_door)
    central_park_door2 = sprites.create(img("""
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
            """),
        SpriteKind.central_park_door)
    villager.set_position(129, 20)
    inside_gim_door2.set_position(87, 50)
    central_park_door2.set_position(144, 7)
    sprites.destroy(shop_door2)
    sprites.destroy(outside_gim_door2)
    sprites.destroy(enemigo)
sprites.on_overlap(SpriteKind.player,
    SpriteKind.outside_gim_door,
    on_on_overlap5)

def cerrar_menu():
    global estado_menu
    if estado_menu:
        estado_menu = False
        controller.move_sprite(villager, 100, 100)
        # Restaurar movimiento
        game.show_long_text("Chao guapo, pronto nos veremos en mi habitación ;3",
            DialogLayout.BOTTOM)
        # Retroceder al jugador en X para alejarlo del NPC
        villager.set_position(villager.x - 10, villager.y)
# =======================================================
# COLISIÓN CON NPC
# =======================================================

def on_on_overlap6(sprite, otherSprite):
    global esta_en_npc
    esta_en_npc = True
sprites.on_overlap(SpriteKind.player, SpriteKind.npc, on_on_overlap6)

precio_leña = 0
nombre_sin_coste = ""
partes: List[str] = []
nombre_articulo = ""
esta_en_npc = False
enemigo: Sprite = None
hit = 0
proximidad = False
item_exit: miniMenu.MenuItem = None
caballos = 0
huevos = 0
cabras = 0
patatas_kg = 0
gallinas = 0
indice = 0
estado_menu = False
inside_gim_door2: Sprite = None
central_park_door2: Sprite = None
npc_shop: Sprite = None
outside_gim_door2: Sprite = None
shop_door2: Sprite = None
villager: Sprite = None
precios: List[number] = []
nombres_visibles: List[str] = []
vida_arbol = 0
manejador_A_activo = False
game_speed = 100
vida_arbol = 5
nombres_visibles = ["Gallina (6 kg Leña)",
    "1.5 kg Patata (2 kg Leña)",
    "Cabra (5 kg Leña)",
    "12 Huevos (3 kg Leña)",
    "Caballo (12 kg Leña)"]
precios = [6, 2, 5, 3, 12]
# =======================================================
# INICIALIZACIÓN
# =======================================================
info.set_score(0)
scene.set_background_image(assets.image("""
    paisaje
    """))
villager = sprites.create(img("""
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
        """),
    SpriteKind.player)
shop_door2 = sprites.create(img("""
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
        """),
    SpriteKind.shop_door)
outside_gim_door2 = sprites.create(img("""
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
        """),
    SpriteKind.outside_gim_door)
shop_door2.set_position(136, 105)
outside_gim_door2.set_position(12, 101)
villager.set_position(76, 101)
controller.move_sprite(villager, 100, 100)
villager.set_bounce_on_wall(True)
# =======================================================
# BUCLE DE ACTUALIZACIÓN
# =======================================================

def on_update_interval():
    global esta_en_npc
    # Mostrar mensaje solo si está sobre el NPC y el menú NO está abierto
    if esta_en_npc and not (estado_menu):
        game.show_long_text("¿Quieres intercambiar? Presiona A.", DialogLayout.BOTTOM)
    # Resetear la bandera para el próximo ciclo
    esta_en_npc = False
game.on_update_interval(500, on_update_interval)
