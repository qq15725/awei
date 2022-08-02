import { node } from './utils'
import { remote_sync } from './decorators'

export default class Message extends godot.Control
{
  messages: godot.VBoxContainer
  input: godot.LineEdit

  _ready() {
    this.name = 'Message'
    this.anchor_top = 1
    this.margin_top = -300
    this.rect_min_size = new godot.Vector2(500, 300)
    this.messages = this.genMessages()
    this.input = this.genInput()
    this.add_child(
      node(godot.VBoxContainer, [
        node(godot.ScrollContainer, {
          rect_min_size: new godot.Vector2(500, 200),
        }, [
          this.messages
        ]),
        this.input,
      ])
    )
  }

  genMessages() {
    return node(godot.VBoxContainer, {
      size_flags_horizontal: godot.Control.SIZE_EXPAND_FILL,
      size_flags_vertical: godot.Control.SIZE_EXPAND_FILL,
    })
  }

  genInput() {
    const input = node(godot.LineEdit)
    input.connect('text_entered', (text: string) => {
      const id = this.get_tree().get_network_unique_id()
      this.push(`玩家${ id }: ${ text }`)
      input.text = ''
    })
    return input
  }

  push(text: string) {
    this.rpc('_push', text)
  }

  @remote_sync
  _push(text: string) {
    this.messages.add_child(
      node(godot.Label, {
        text,
      })
    )
  }
}
