import { gnode } from './utils'
import { Global } from './global'

export class GameWorld extends godot.Node2D {
  public camera: godot.Camera2D
  public dragging = false
  public previousPosition: godot.Vector2

  public _ready() {
    this.camera = this.get_node('desktop/camera') as godot.Camera2D
    this.add_child(
      gnode('Button', {
        text: '新增卡牌',
        on_pressed: () => {
          this.add_child(Global.singleton.newFarmer())
        },
      }),
    )
  }

  public _on_desktop_input_event(_: Object, event: godot.InputEvent) {
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
