import { color } from '../../utils'

export class CardBackground extends godot.Panel {
  constructor(size: godot.Vector2) {
    super()
    this.rect_size = size
  }

  public _ready() {
    this.add_stylebox_override('panel', this.createStyle())
  }

  protected createStyle() {
    const style = new godot.StyleBoxFlat()
    style.set_bg_color(color('#fbf2e0'))
    style.set_border_width_all(3)
    style.set_border_color(color('#000000'))
    style.set_corner_radius_all(3)
    return style
  }
}
