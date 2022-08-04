import { gnode, vector2 } from '../../utils'
import { CardHeader } from './card-header'
import { CardBackground } from './card-background'

export class Card extends godot.Container {
  public title = ''
  public width = 90
  public height = 120

  public _ready() {
    // styles
    this.margin_top = 10
    this.margin_bottom = 10
    this.margin_left = 10
    this.margin_right = 10
    this.rect_min_size = vector2(this.width, this.height)

    // elements
    this.add_child(new CardBackground(this.rect_min_size))
    this.add_child(
      gnode('MarginContainer', {
        margin_top: 3,
        margin_bottom: 3,
        margin_left: 3,
        margin_right: 3,
      }, [
        new CardHeader(this.title, vector2(this.width - 6, 30)),
      ]),
    )
  }

  can_drop_data(_position: godot.Vector2, _data: any): boolean {
    return true
  }

  drop_data(position: godot.Vector2, data: godot.Node) {
    this.add_child(data)
  }
}
