import { Farmer } from './components'

export default class Root extends godot.Node {
  _ready() {
    this.add_child(new Farmer())
  }
}
