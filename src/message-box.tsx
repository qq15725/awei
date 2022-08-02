import { gnode, remote_sync } from './utils'

export default class MessageBox extends godot.Control
{
  public messages: godot.VBoxContainer
  public input: godot.LineEdit

  public static instance(self: godot.Node): MessageBox {
    return self.get_node('/root/Game/UI/UIWrapper/MessageBox') as MessageBox
  }

  public _ready() {
    this.name = 'MessageBox'
    this.anchor_top = 1
    this.margin_top = -300
    this.rect_min_size = new godot.Vector2(500, 300)
    this.messages = this.genMessages()
    this.input = this.genInput()
    this.add_child(
      gnode(godot.VBoxContainer, [
        gnode(godot.ScrollContainer, {
          rect_min_size: new godot.Vector2(500, 200),
        }, [
          this.messages
        ]),
        this.input,
      ])
    )
  }

  public genMessages() {
    return gnode(godot.VBoxContainer, {
      size_flags_horizontal: godot.Control.SIZE_EXPAND_FILL,
      size_flags_vertical: godot.Control.SIZE_EXPAND_FILL,
    })
  }

  public genInput() {
    const input = gnode(godot.LineEdit)
    input.connect('text_entered', (text: string) => {
      const id = this.get_tree().get_network_unique_id()
      this.push(`玩家${ id }: ${ text }`)
      input.text = ''
    })
    return input
  }

  public push(text: string) {
    this.rpc('_push', text)
  }

  @remote_sync
  protected _push(text: string) {
    this.messages.add_child(
      gnode(godot.Label, {
        text,
      })
    )
  }
}