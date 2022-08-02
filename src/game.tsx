import { gnode } from './utils'
import Network from './network'
import MainMenu from './main-menu'
import MessageBox from './message-box'

export default class Game extends godot.Node
{
  _ready() {
    this.name = 'Game'

    // Services
    this.add_child(new Network())

    // UI
    this.add_child(
      gnode(godot.CanvasLayer, {
        name: 'UI'
      }, [
        gnode(godot.Control, {
          name: 'UIWrapper',
          anchor_right: 1,
          anchor_bottom: 1,
        }, [
          // 主菜单
          new MainMenu(),
          // 消息框
          new MessageBox(),
        ]),
      ])
    )

    if (godot.OS.has_feature('Server')) {
      new godot.NetworkedMultiplayerENet().create_server(3333)
    }
  }
}
