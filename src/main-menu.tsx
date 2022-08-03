import { gnode } from './utils'
import Server from './network/server'
import Client from './network/client'

export default class MainMenu extends godot.Control {
  server: Server
  client: Client

  _ready() {
    this.anchor_right = 1
    this.anchor_bottom = 1
    this.server = new Server()
    this.client = new Client()

    this.add_child(gnode('VBoxContainer'))

    this.add_child(
      gnode('VBoxContainer', {
        anchor_left: 0.5,
        anchor_right: 0.5,
        anchor_top: 0.5,
        anchor_bottom: 0.5,
      }, [
        this.server,
        this.client,
        ...this.genMenuItems(),
      ]),
    )
  }

  genMenuItems() {
    const menuItems = [
      this.genServer(),
      this.genClient(),
      this.genExit(),
    ]
    return menuItems.map(menuItem => {
      return gnode('HBoxContainer', {
        alignment: godot.BoxContainer.ALIGN_CENTER,
      }, [
        menuItem,
      ])
    })
  }

  genServer() {
    return gnode('Button', {
      text: '创建服务器',
      rect_min_size: new godot.Vector2(100, 40),
      on_pressed: () => this.server.dialog.popup(),
    })
  }

  genClient() {
    return gnode('Button', {
      text: '连接服务器',
      rect_min_size: new godot.Vector2(100, 40),
      on_pressed: () => this.client.dialog.popup(),
    })
  }

  genExit() {
    return gnode('Button', {
      text: '退出游戏',
      rect_min_size: new godot.Vector2(100, 40),
      on_pressed: () => this.get_tree().quit(),
    })
  }
}
