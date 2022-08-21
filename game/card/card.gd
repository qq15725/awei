class_name Card

extends KinematicBody2D

enum CardState {
	NONE     # 无
	FOCUSED  # 聚焦
	DRAGGING # 拖拽中
}

var state : int = CardState.NONE
var draggable = Draggable.new(self, { "global": true })
var stackable = Stackable.new(self)

onready var progress_bar = $ProgressBar
onready var area = $Area as Area2D

# 跟随速度
const FOLLOW_SPEED = 8.0

func _input(event: InputEvent) -> void:
	if state == CardState.DRAGGING && draggable.is_dragging(event, false):
		draggable.end()
		_dragged()

func _process(delta: float) -> void:
	draggable.drag()

	if state != CardState.DRAGGING && stackable.prev:
		var newPosition = Vector2(stackable.prev.position.x, stackable.prev.position.y + 26)
		position = position.linear_interpolate(newPosition, delta * FOLLOW_SPEED)

func _on_View_gui_input(event: InputEvent) -> void:
	if draggable.is_dragging(event, true):
		var main = get_node("/root/Main")
		if main.mouse_pointer.focused && main.mouse_pointer.focused != self:
			main.mouse_pointer.focused._on_View_gui_input(event)
		else:
			draggable.start()
			state = CardState.DRAGGING

func _dragged():
	state = CardState.NONE
	var cards = []
	for card in area.get_overlapping_bodies():
		if card == self: continue
		cards.append(card)
	cards.sort_custom(Sorter, "sort_ascending")
	if !cards.empty():
		if stackable.stack(cards.back()):
			check_composition(true)
	else:
		check_composition(false)
		stackable.unstack()

func check_composition(stack: bool):
	if stack:
		stackable.get_root().progress_bar.show()
	elif stackable.get_prev_deep() == 1:
		stackable.get_root().progress_bar.hide()
	pass

class Sorter:
	static func sort_ascending(a: Node2D, b: Node2D) -> bool:
		return a.global_position.y < b.global_position.y
