import { gnode, vector2 } from '../utils'
import { NetworkBase } from './network-base'

export class NetworkServer extends NetworkBase {
  port: godot.LineEdit
  dialog: godot.AcceptDialog

  _ready() {
    super._ready()
    this.port = gnode('LineEdit', {
      text: '53333',
      size_flags_horizontal: godot.Control.SIZE_EXPAND_FILL,
    })
    this.dialog = this.genDialog()
    this.add_child(this.dialog)
  }

  genDialog() {
    return gnode('AcceptDialog', {
      window_title: '创建服务器',
      anchor_left: 0.5,
      anchor_top: 0.5,
      rect_min_size: vector2(160, 100),
      on_confirmed: () => this.createServer(),
    }, [
      gnode('VBoxContainer', {
        alignment: godot.BoxContainer.ALIGN_CENTER,
      }, [
        gnode('HBoxContainer', {
          alignment: godot.BoxContainer.ALIGN_CENTER,
        }, [
          gnode('Label', {
            text: '端口',
          }),
          this.port,
        ]),
      ]),
    ])
  }

  createServer() {
    const port = Number(this.port.text)
    this.peer.create_server(port)
    this.get_tree().network_peer = this.peer
    this.message(`服务器运行在 localhost:${ port }`)
  }
}
