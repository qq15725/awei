import { MessageBox } from './message-box'

export class NetworkManager extends godot.Node {
  _ready() {
    const tree = this.get_tree()
    tree.connect('network_peer_connected', this, 'onPlayerConnected')
    tree.connect('network_peer_disconnected', this, 'onPlayerDisconnected')
    tree.connect('connected_to_server', this, 'onConnectedOk')
    tree.connect('connection_failed', this, 'onConnectedFail')
    tree.connect('server_disconnected', this, 'onServerDisconnected')
  }

  onPlayerConnected(id: string) {
    MessageBox.instance(this)?.push(`玩家${ id }: 已连接`)
  }

  onPlayerDisconnected(id: string) {
    MessageBox.instance(this)?.push(`玩家${ id }: 已退出`)
  }

  onConnectedOk() {
    console.log('onConnectedOk')
  }

  onConnectedFail() {
    console.log('onConnectedFail')
  }

  onServerDisconnected() {
    console.log('onServerDisconnected')
  }
}
