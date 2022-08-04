import { color, gnode } from '../../utils'

export class CardHeader extends godot.Panel {
  public title: string

  constructor(title: string, size: godot.Vector2) {
    super()
    this.title = title
    this.rect_min_size = size
  }

  public _ready() {
    // styles
    this.add_stylebox_override('panel', this.createStyle())

    // elements
    const title = gnode('Label', { text: this.title })
    title.add_color_override('font_color', color('#000000'))
    this.add_child(title)
  }

  protected createStyle() {
    const style = new godot.StyleBoxFlat()
    style.set_bg_color(color('#f7e3af'))
    style.border_width_bottom = 3
    style.set_border_color(color('#000000'))
    style.corner_radius_top_left = 10
    style.corner_radius_top_right = 10
    return style
  }
}
