import { MessageBox } from './message-box'

export class NetworkBase extends godot.Node {
  peer: godot.NetworkedMultiplayerENet

  _ready() {
    this.peer = new godot.NetworkedMultiplayerENet()
  }

  message(text: string) {
    MessageBox.instance(this)?.push(text)
  }
}
