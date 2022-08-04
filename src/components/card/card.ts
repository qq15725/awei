import { gnode, vector2 } from '../../utils'
import { CardHeader } from './card-header'
import { CardBackground } from './card-background'

export class Card extends godot.KinematicBody2D {
  public title = ''
  public grabbedOffset = vector2()
  public canGrab = false

  public _ready() {
    this.input_pickable = true
    this.collision_layer = 1
    const size = vector2(90, 120)
    this.add_child(new CardBackground(size))
    this.add_child(
      gnode('MarginContainer', {
        margin_top: 3,
        margin_bottom: 3,
        margin_left: 3,
        margin_right: 3,
      }, [
        new CardHeader(this.title, vector2(size.x - 6, 30)),
      ]),
    )
  }

  public _input_event(_viewport: Object, event: godot.InputEvent, _shape_idx: number) {
    // TODO
    // eslint-disable-next-line no-console
    console.log(event)
  }

  public _input(event: godot.InputEvent) {
    if (event instanceof godot.InputEventMouseButton) {
      this.canGrab = (event as godot.InputEventMouseButton).pressed
      // @ts-expect-error vector2
      this.grabbedOffset = this.position - this.get_global_mouse_position()
    }
  }

  public _process() {
    if (godot.Input.is_mouse_button_pressed(godot.BUTTON_LEFT) && this.canGrab) {
      // @ts-expect-error vector2
      this.position = this.get_global_mouse_position() + this.grabbedOffset
    }
  }
}
