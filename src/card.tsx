import { vector2 } from './utils'

export class Card extends godot.RigidBody2D {
  public dragging = false
  public movement = vector2()
  public area?: godot.Area2D
  public _position?: number

  _ready() {
    this.area = this.get_node('area') as godot.Area2D
  }

  public _on_view_gui_input(event: godot.InputEvent) {
    if (event instanceof godot.InputEventMouseButton && event.button_index === godot.BUTTON_LEFT) {
      this.dragging = event.pressed
      // @ts-expect-error vector2
      this.movement = this.position - this.get_global_mouse_position()
      this.get_tree().set_input_as_handled()
    }
  }

  public _process() {
    if (godot.Input.is_mouse_button_pressed(godot.BUTTON_LEFT) && this.dragging) {
      this.position = this.get_global_mouse_position() + this.movement
    } else if (this._position) {
      this.position = this._position
    }
  }

  public _on_area_body_entered(body: godot.RigidBody2D) {
    if (body !== this && this.dragging) {
      const position = body.get_position() as any
      this._position = vector2(position.x, position.y + 20)
    }
  }
}

export default Card
