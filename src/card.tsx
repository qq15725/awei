import { vector2 } from './utils'

export class Card extends godot.RigidBody2D {
  public dragging = false
  public movement = vector2()
  public area?: godot.Area2D
  public prev?: Card
  public next?: Card

  _ready() {
    this.area = this.get_node('area') as godot.Area2D
  }

  public _process() {
    if (godot.Input.is_mouse_button_pressed(godot.BUTTON_LEFT) && this.dragging) {
      this.position = this.get_global_mouse_position() + this.movement
    } else if (this.prev) {
      // @ts-expect-error vector2
      this.position = vector2(this.prev.position.x, this.prev.position.y + 26)
    }
  }

  public _on_view_gui_input(event: godot.InputEvent) {
    if (event instanceof godot.InputEventMouseButton && event.button_index === godot.BUTTON_LEFT) {
      this.dragging = event.pressed
      // @ts-expect-error vector2
      this.movement = this.position - this.get_global_mouse_position()
      this.get_tree().set_input_as_handled()
    }
  }

  public checkAncestors(card: Card, ancestor?: Card) {
    return !ancestor || (
      card.get_rid().get_id() !== ancestor?.get_rid().get_id()
      && this.checkAncestors(card, ancestor?.prev)
    )
  }

  public _on_area_body_entered(card: Card) {
    const id = this.get_rid().get_id()
    const cardId = card.get_rid().get_id()
    if (this.dragging && cardId !== id && !card.next && !this.prev && this.checkAncestors(this, card)) {
      card.next = this
      this.prev = card
      this.z_index = card.z_index + 1
    }
  }

  public _on_area_body_exited(card: Card) {
    const id = this.prev?.get_rid().get_id()
    const cardId = card.get_rid().get_id()
    if (this.dragging && cardId === id) {
      this.prev.next = undefined
      this.prev = undefined
      this.z_index = 0
    }
  }
}

export default Card
