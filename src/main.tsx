import { gnode } from './utils'
import { Game } from './game'
import { MainMenu, MessageBox, NetworkManager } from './components'

export default class Root extends godot.Node {
  _ready() {
    // 工具类
    this.add_child(new Game())

    // 网络管理
    this.add_child(new NetworkManager())

    // UI
    this.add_child(
      gnode('CanvasLayer', { name: 'UI' }, [
        gnode('Control', {
          name: 'UIWrapper',
          anchor_right: 1,
          anchor_bottom: 1,
        }, [
          // 主菜单
          new MainMenu(),
          // 消息框
          new MessageBox(),
        ]),
      ]),
    )

    if (godot.OS.has_feature('Server')) {
      new godot.NetworkedMultiplayerENet().create_server(3333)
    }
  }
}
