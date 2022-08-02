import Card from './card'

export default class Shop extends godot.HBoxContainer
{
  constructor() {
    super()
    // this.size_flags_horizontal = 3
    this.add_child(new Card())
    this.add_child(new Card())
    this.add_child(new Card())
  }
}
