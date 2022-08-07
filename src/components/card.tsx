import { vector2 } from '../utils'

export default class Card extends godot.Area2D {
  public title = ''
  public grabbedOffset = vector2()
  public canGrab = false
  public size = vector2(120, 145)

  public _input_event(_viewport: Object, event: godot.InputEvent, _shape_idx: number) {
    if (event instanceof godot.InputEventMouseButton) {
      this.canGrab = (event as godot.InputEventMouseButton).pressed
      // @ts-expect-error vector2
      this.grabbedOffset = this.position - this.get_global_mouse_position()
    }
  }

  public _process() {
    if (godot.Input.is_mouse_button_pressed(godot.BUTTON_LEFT) && this.canGrab) {
      this.position = this.get_global_mouse_position() + this.grabbedOffset
    }
  }
}
