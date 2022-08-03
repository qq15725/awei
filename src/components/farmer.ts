export class Farmer extends godot.TextureRect {
  constructor() {
    super()
    this.texture = godot.load('res://icon.png') as godot.Texture
    this.rect_min_size = new godot.Vector2(52, 52)
    this.expand = true
  }

  can_drop_data(position: godot.Vector2, data: any): boolean {
    return typeof data === 'object' && data.canBuy
  }

  drop_data(position: godot.Vector2, data: godot.Node) {
    this.add_child(data)
  }
}
