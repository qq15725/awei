import Message from '../message'

export default class Network extends godot.Node
{
  peer: godot.NetworkedMultiplayerENet

  _ready() {
    this.peer = new godot.NetworkedMultiplayerENet()
  }

  message(text: string) {
    const message = this.get_node('/root/Game/UI/UIWrapper/Message') as Message
    message?.push(text)
  }
}
