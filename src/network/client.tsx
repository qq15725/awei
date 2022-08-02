import { node } from '../utils'
import Network from './network'

export default class Client extends Network
{
  address: godot.LineEdit
  dialog: godot.AcceptDialog

  _ready() {
    super._ready()
    this.address = node(godot.LineEdit, {
      text: 'localhost:53333',
      size_flags_horizontal: godot.Control.SIZE_EXPAND_FILL,
    })
    this.dialog = this.genDialog()
    this.add_child(this.dialog)
  }

  genDialog() {
    return node(godot.AcceptDialog, {
      window_title: '连接服务器',
      anchor_left: 0.5,
      anchor_top: 0.5,
      rect_min_size: new godot.Vector2(160, 100),
      on_confirmed: () => this.createClient(),
    }, [
      node(godot.VBoxContainer, {
        alignment: godot.BoxContainer.ALIGN_CENTER,
      }, [
        node(godot.HBoxContainer, {
          alignment: godot.BoxContainer.ALIGN_CENTER,
        }, [
          node(godot.Label, {
            text: '地址',
          }),
          this.address,
        ])
      ])
    ])
  }

  createClient() {
    const [address, port] = this.address.text.split(':')
    this.peer.create_client(address, Number(port))
    this.get_tree().network_peer = this.peer
  }
}
