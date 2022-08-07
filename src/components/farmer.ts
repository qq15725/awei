import Card from './card'

export class Farmer extends Card {
  public title = '农民'
  public image = godot.load('res://icon.png') as godot.Texture
}
