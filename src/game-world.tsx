import { gnode } from './utils'
import { Farmer } from './farmer'

export class GameWorld extends godot.Area2D {
  public camera: godot.Camera2D
  public dragging = false
  public previousPosition: godot.Vector2

  public _ready() {
    this.camera = this.get_node('Camera') as godot.Camera2D
    const box = this.get_node('Box') as godot.Node2D
    box.add_child(Farmer.new())
    box.add_child(
      gnode('Button', {
        text: '新增卡牌',
        on_pressed: () => {
          const farmer = Farmer.new()
          farmer.position *= 100.1
          box.add_child(farmer)
        },
      }),
    )
  }

  _input(event: godot.InputEvent) {
    if (event instanceof godot.InputEventMouseButton) {
      console.log('_input', event.is_pressed(), this.get_tree().is_input_handled())
    }
  }

  _unhandled_input(event: godot.InputEvent) {
    if (event instanceof godot.InputEventMouseButton) {
      console.log('_unhandled_input', event.is_pressed(), this.get_tree().is_input_handled())
    }
  }

  public _input_event(viewport: Object, event: godot.InputEvent) {
    if (event instanceof godot.InputEventMouseButton) {
      console.log('_input_event', event.is_pressed(), this.get_tree().is_input_handled())
    }
    if (this.get_tree().is_input_handled()) return
    if (event instanceof godot.InputEventMouseButton && event.button_index === godot.BUTTON_LEFT) {
      if (event.is_pressed()) {
        this.previousPosition = event.position
        this.dragging = true
      } else {
        this.dragging = false
      }
    } else if (event instanceof godot.InputEventMouseMotion && this.dragging) {
      // @ts-expect-error vector2
      this.camera.position += this.previousPosition - event.position
      this.previousPosition = event.position
    } else if (event instanceof godot.InputEventMouseButton && event.button_index === godot.BUTTON_WHEEL_DOWN) {
      // @ts-expect-error vector2
      this.camera.zoom = this.camera.zoom * 1.2
      this.camera.zoom.x = godot.clamp(this.camera.zoom.x, 0.25, 4)
      this.camera.zoom.y = godot.clamp(this.camera.zoom.y, 0.25, 4)
    } else if (event instanceof godot.InputEventMouseButton && event.button_index === godot.BUTTON_WHEEL_UP) {
      // @ts-expect-error vector2
      this.camera.zoom = this.camera.zoom / 1.2
      this.camera.zoom.x = godot.clamp(this.camera.zoom.x, 0.25, 4)
      this.camera.zoom.y = godot.clamp(this.camera.zoom.y, 0.25, 4)
    }
  }
}

export default GameWorld
