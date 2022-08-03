import { gnode } from '../utils'
import { NetworkServer } from './network-server'
import { NetworkClient } from './network-client'

export class MainMenu extends godot.Control {
  public _ready() {
    this.anchor_right = 1
    this.anchor_bottom = 1
    const server = new NetworkServer()
    const client = new NetworkClient()

    this.add_child(
      gnode('VBoxContainer', {
        anchor_left: 0.5,
        anchor_top: 0.3,
      }, [
        server,
        client,
        ...[
          gnode('Button', {
            text: '开始游戏',
            rect_min_size: new godot.Vector2(100, 40),
            on_pressed: () => this.get_tree().change_scene('res://scenes/world.tscn'),
          }),
          gnode('Button', {
            text: '创建服务器',
            rect_min_size: new godot.Vector2(100, 40),
            on_pressed: () => server.dialog.popup(),
          }),
          gnode('Button', {
            text: '连接服务器',
            rect_min_size: new godot.Vector2(100, 40),
            on_pressed: () => client.dialog.popup(),
          }),
          gnode('Button', {
            text: '退出游戏',
            rect_min_size: new godot.Vector2(100, 40),
            on_pressed: () => this.get_tree().quit(),
          }),
        ].map(node => gnode('HBoxContainer', { alignment: godot.BoxContainer.ALIGN_CENTER }, [node])),
      ]),
    )
  }
}
