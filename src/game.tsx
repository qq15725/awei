import { node } from './utils'
import Network from './network'
import Message from './message'
import MainMenu from './main-menu'

export default class Game extends godot.Node
{
  _ready() {
    this.name = 'Game'

    this.add_child(new Network())
    this.add_child(
      node(godot.CanvasLayer, {
        name: 'UI'
      }, [
        node(godot.Control, {
          name: 'UIWrapper',
          anchor_right: 1,
          anchor_bottom: 1,
        }, [
          new MainMenu(),
          new Message(),
        ]),
      ])
    )

    if (godot.OS.has_feature('Server')) {
      new godot.NetworkedMultiplayerENet().create_server(3333)
    }
  }
}
