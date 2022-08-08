import { Game } from './game'
import { gnode } from './utils'
import { Farmer } from './farmer'

export class GameWorld extends godot.Node2D {
  private camera: godot.Camera2D
  private isDrag = false

  _ready() {
    this.add_child(new Game())
    this.add_child(Farmer.new())
    this.add_child(
      gnode('Button', {
        text: '新增卡牌',
        on_pressed: () => this.add_child(Farmer.new()),
      }),
    )
    this.camera = this.get_node('Camera') as godot.Camera2D
  }

  _unhandled_input(event: godot.InputEvent) {
    if (event instanceof godot.InputEventMouseButton && event.button_index === godot.BUTTON_LEFT) {
      if (event.is_pressed()) {
        // @ts-expect-error vector2
        this.offset = this.camera.position - this.get_global_mouse_position()
        this.isDrag = true
      } else {
        this.isDrag = false
      }
    }
    if (event instanceof godot.InputEventMouseMotion && event.get_speed().length() > 0 && this.isDrag) {
      // @ts-expect-error vector2
      this.camera.position -= event.get_relative() * 0.5
    }

    if (event instanceof godot.InputEventMouseButton && event.button_index === godot.BUTTON_WHEEL_DOWN) {
      // @ts-expect-error vector2
      this.camera.zoom = this.camera.zoom * 1.2
      this.camera.zoom.x = godot.clamp(this.camera.zoom.x, 0.25, 4)
      this.camera.zoom.y = godot.clamp(this.camera.zoom.y, 0.25, 4)
    }
    if (event instanceof godot.InputEventMouseButton && event.button_index === godot.BUTTON_WHEEL_UP) {
      // @ts-expect-error vector2
      this.camera.zoom = this.camera.zoom / 1.2
      this.camera.zoom.x = godot.clamp(this.camera.zoom.x, 0.25, 4)
      this.camera.zoom.y = godot.clamp(this.camera.zoom.y, 0.25, 4)
    }
  }
}

export default GameWorld
