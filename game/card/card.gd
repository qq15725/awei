class_name Card

extends KinematicBody2D

var draggable = Draggable.new(self, { "global": true })
var stackable = Stackable.new(self)

func _process(_delta: float) -> void:
	draggable.drag()

	if !draggable.dragging && stackable.prev:
		position = Vector2(stackable.prev.position.x, stackable.prev.position.y + 26)

func _on_View_gui_input(event: InputEvent) -> void:
	if draggable.is_mouse_button_event(event):
		var main = get_node("/root/Main")
		if main.mouse_pointer.focused && main.mouse_pointer.focused != self:
			get_node("/root/Main").mouse_pointer.focused._on_View_gui_input(event)
		else:
			draggable.input(event)

func _on_Area_body_entered(card: Card):
	if draggable.dragging:
		stackable.stack(card)

func _on_Area_body_exited(card: Card):
	if draggable.dragging:
		stackable.unstack(card)
