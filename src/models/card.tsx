import { node } from '../utils'

// class AweiContainer extends godot.CenterContainer {
//   constructor() {
//     super()
//     this.use_top_left = true
//     this.add_child(new AweiTexture())
//   }
//
//   get_drag_data(pos) {
//     const rect = this.duplicate()
//     this.set_drag_preview(rect as this)
//     return rect
//   }
// }

export default class Card extends godot.Container
{
  constructor() {
    super()
    this.rect_min_size = new godot.Vector2(52, 52)
    this.add_child(node(godot.TextureRect, {
      texture: godot.load("res://icon.png") as godot.Texture,
      rect_min_size: this.rect_min_size,
      expand: true,
    }, []))
  }
}
