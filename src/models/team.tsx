export default class Team extends godot.Container
{
  can_drop_data(position: godot.Vector2, data: any): boolean {
    return typeof data === 'object' && data.canBuy
  }

  drop_data(position: godot.Vector2, data: godot.Node) {
    this.add_child(data)
  }
}