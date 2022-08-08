export class GameWorldCamera extends godot.Camera2D {
  public dragging = false
  public previousPosition: godot.Vector2

  _unhandled_input(event: godot.InputEvent) {
    if (event instanceof godot.InputEventMouseButton && event.button_index === godot.BUTTON_LEFT) {
      if (event.is_pressed()) {
        this.previousPosition = event.position
        this.dragging = true
      } else {
        this.dragging = false
      }
    } else if (event instanceof godot.InputEventMouseMotion && this.dragging) {
      // @ts-expect-error vector2
      this.position += this.previousPosition - event.position
      this.previousPosition = event.position
    } else if (event instanceof godot.InputEventMouseButton && event.button_index === godot.BUTTON_WHEEL_DOWN) {
      // @ts-expect-error vector2
      this.zoom = this.zoom * 1.2
      this.zoom.x = godot.clamp(this.zoom.x, 0.25, 4)
      this.zoom.y = godot.clamp(this.zoom.y, 0.25, 4)
    } else if (event instanceof godot.InputEventMouseButton && event.button_index === godot.BUTTON_WHEEL_UP) {
      // @ts-expect-error vector2
      this.zoom = this.zoom / 1.2
      this.zoom.x = godot.clamp(this.zoom.x, 0.25, 4)
      this.zoom.y = godot.clamp(this.zoom.y, 0.25, 4)
    }
  }
}

export default GameWorldCamera
