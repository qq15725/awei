import { gnode } from './utils'
import Server from './network/server'
import Client from './network/client'

export default class MainMenu extends godot.Control
{
  server: Server
  client: Client

  _ready() {
    this.anchor_right = 1
    this.anchor_bottom = 1
    this.server = new Server()
    this.client = new Client()
    this.add_child(
      gnode(godot.VBoxContainer, {
        anchor_left: 0.5,
        anchor_right: 0.5,
        anchor_top: 0.5,
        anchor_bottom: 0.5,
      }, [
        this.server,
        this.client,
        ...this.genMenuItems(),
      ])
    )
  }

  genMenuItems() {
    const menuItems = [
      this.genServer(),
      this.genClient(),
      this.genExit()
    ]
    return menuItems.map(menuItem => {
      return gnode(godot.HBoxContainer, {
        alignment: godot.BoxContainer.ALIGN_CENTER,
      }, [
        menuItem,
      ])
    })
  }

  genServer() {
    const button = gnode(godot.Button, {
      text: '创建服务器',
      rect_min_size: new godot.Vector2(100, 40),
    })
    button.connect('pressed', this, 'onPressedServer')
    return button
  }

  onPressedServer() {
    this.server.dialog.popup()
  }

  genClient() {
    const button = gnode(godot.Button, {
      text: '连接服务器',
      rect_min_size: new godot.Vector2(100, 40),
    }, [])
    button.connect('pressed', this, 'onPressedClient')
    return button
  }

  onPressedClient() {
    this.client.dialog.popup()
  }

  genExit() {
    const button = gnode(godot.Button, {
      text: '退出游戏',
      rect_min_size: new godot.Vector2(100, 40),
    }, [])
    button.connect('pressed', this, 'onPressedExit')
    return button
  }

  onPressedExit() {
    this.get_tree().quit()
  }
}
