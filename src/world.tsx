import { Farmer } from './components'
import { Game } from './game'

export default class Root extends godot.Node {
  _ready() {
    // 工具类
    this.add_child(new Game())

    this.add_child(new Farmer())
  }
}
