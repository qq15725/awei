import type { MessageBox } from './components'

export class Game extends godot.Node {
  public static instance: Game

  constructor() {
    super()
    Game.instance = this
  }

  public static gotoWorldScene() {
    Game.instance.get_tree().change_scene('res://scenes/world.tscn')
  }

  public static messageBox(): MessageBox {
    return Game.instance.get_node('/root/Root/UI/UIWrapper/MessageBox') as MessageBox
  }
}
