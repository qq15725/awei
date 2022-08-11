import { vector2 } from './utils'

export class Card extends godot.Node2D {
  public grabbedOffset = vector2()
  public canGrab = false

  public _on_view_gui_input(event: godot.InputEvent) {
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

  public _on_area_body_entered(area: Card) {
    console.log(area)
    // if (area instanceof Card) {
    //   const title = area.get_node('Control/Header/Title') as godot.Label
    //   console.log(title.text)
    // }
  }
}

export default Card
