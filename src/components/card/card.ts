import { gnode, vector2 } from '../../utils'
import { CardHeader } from './card-header'
import { CardBackground } from './card-background'

export class Card extends godot.Area2D {
  public title = ''
  public grabbedOffset = vector2()
  public canGrab = false

  public _ready() {
    this.position = vector2(524, 300)
    const size = vector2(90, 120)
    const shape = new godot.RectangleShape2D()
    shape.set_extents(vector2(size.x / 2, size.y / 2))
    this.add_child(
      gnode('CollisionShape2D', {
        shape,
      }),
    )
    this.add_child(
      gnode('Control', {
        margin_left: -size.x / 2,
        margin_top: -size.y / 2,
        margin_right: size.x / 2,
        margin_bottom: size.y / 2,
        mouse_filter: 2,
      },
      [
        new CardBackground(size),
        gnode('MarginContainer', {
          margin_top: 3,
          margin_bottom: 3,
          margin_left: 3,
          margin_right: 3,
          mouse_filter: 2,
        }, [
          new CardHeader(this.title, vector2(size.x - 6, 30)),
        ]),
      ],
      ),
    )
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
