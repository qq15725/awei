class_name Card

extends KinematicBody2D

var draggable = Draggable.new(self, { "global": true })
var stackable = Stackable.new(self)

func _on_View_gui_input(event: InputEvent) -> void:
	draggable.input(event)

	# if event is InputEventMouseButton && event.button_index == BUTTON_LEFT:
	# 	if draggable.dragging:
	# 		collision_layer = 0
	# 		collision_mask = 0
	# 	else:
	# 		collision_layer = 1
	# 		collision_mask = 1

func _process(_delta: float) -> void:
	draggable.drag()

	if !draggable.dragging && stackable.prev:
		position = Vector2(stackable.prev.position.x, stackable.prev.position.y + 26)

func _on_Area_body_entered(card: Card):
	if draggable.dragging:
		stackable.stack(card)

func _on_Area_body_exited(card: Card):
	if draggable.dragging:
		stackable.unstack(card)
