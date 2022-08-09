import { Global } from '../global'

export class NetworkBase extends godot.Node {
  peer: godot.NetworkedMultiplayerENet

  _ready() {
    this.peer = new godot.NetworkedMultiplayerENet()
  }

  message(text: string) {
    Global.singleton.messageBox().push(text)
  }
}
