import { vector2 } from './utils'

export class Card extends godot.Area2D {
  public title = '标题'
  public grabbedOffset = vector2()
  public canGrab = false

  public _ready() {
    this.setTitle(this.title)
  }

  public setTitle(text: string) {
    (this.get_node('Control/Header/Title') as godot.Label).set_text(text)
  }

  public _control_gui_input(event: godot.InputEvent) {
    if (event instanceof godot.InputEventMouseButton && event.button_index === godot.BUTTON_LEFT) {
      this.get_tree().set_input_as_handled()
      this.canGrab = event.pressed
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

export default Card
