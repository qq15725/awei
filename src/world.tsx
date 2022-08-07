import { Game } from './game'
import { loadScene } from './utils'

export default class Root extends godot.Node {
  _ready() {
    // 工具类
    this.add_child(new Game())

    this.add_child(
      loadScene('res://scenes/components/card.tscn').instance(),
    )
  }
}
