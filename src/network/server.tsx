import { node } from '../utils'
import Network from './network'

export default class Server extends Network
{
  port: godot.LineEdit

  dialog: godot.AcceptDialog

  _ready() {
    super._ready()
    this.port = node(godot.LineEdit, {
      text: '53333',
      size_flags_horizontal: godot.Control.SIZE_EXPAND_FILL,
    })
    this.dialog = this.genDialog()
    this.add_child(this.dialog)
  }

  genDialog() {
    return node(godot.AcceptDialog, {
      window_title: '创建服务器',
      anchor_left: 0.5,
      anchor_top: 0.5,
      rect_min_size: new godot.Vector2(160, 100),
      on_confirmed: () => this.createServer(),
    }, [
      node(godot.VBoxContainer, {
        alignment: godot.BoxContainer.ALIGN_CENTER,
      }, [
        node(godot.HBoxContainer, {
          alignment: godot.BoxContainer.ALIGN_CENTER,
        }, [
          node(godot.Label, {
            text: '端口',
          }),
          this.port,
        ])
      ])
    ])
  }

  createServer() {
    const port = Number(this.port.text)
    this.peer.create_server(port)
    this.get_tree().network_peer = this.peer
    this.message(`服务器运行在 localhost:${ port }`)
  }
}
