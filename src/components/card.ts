import { loadScene, vector2 } from '../utils'

export class Card extends godot.Area2D {
  public title = '标题'
  public grabbedOffset = vector2()
  public canGrab = false

  constructor() {
    super()
    Card.tscn().instance().get_children().forEach((node: godot.Node2D) => {
      this.add_child(node.duplicate())
    })
  }

  public static tscn() {
    return loadScene('res://scenes/components/card.tscn')
  }

  public _ready() {
    (this.get_node('Control/Header/Title') as godot.Label).set_text(this.title)
  }

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
