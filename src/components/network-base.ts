import { Game } from '../game'

export class NetworkBase extends godot.Node {
  peer: godot.NetworkedMultiplayerENet

  _ready() {
    this.peer = new godot.NetworkedMultiplayerENet()
  }

  message(text: string) {
    Game.messageBox().push(text)
  }
}
