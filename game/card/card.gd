class_name Card

extends KinematicBody2D

enum CardState {
	NONE     # 无
	FOCUSED  # 聚焦
	DRAGGING # 拖拽中
}

var state : int = CardState.NONE
var draggable := Draggable.new(self, { "global": true })
var stackable := Stackable.new(self)
var compositions := [
	{ "required": ["Farmer", "BerryBushes"] }
]

onready var progress_bar := $ProgressBar
onready var area := $Area
onready var main := get_node("/root/Main")

# 跟随速度
const FOLLOW_SPEED = 8.0

func _input(event: InputEvent) -> void:
	if state == CardState.DRAGGING && draggable.is_dragging(event, false):
		draggable.end()
		_dragend()

func _process(delta: float) -> void:
	draggable.drag()
	if state != CardState.DRAGGING && stackable.prev:
		var newPosition = Vector2(stackable.prev.position.x, stackable.prev.position.y + 26)
		position = position.linear_interpolate(newPosition, delta * FOLLOW_SPEED)

# 控件事件
func _on_View_gui_input(event: InputEvent) -> void:
	if draggable.is_dragging(event, true):
		if main\
			&& main.mouse_pointer\
			&& main.mouse_pointer.focused\
			&& main.mouse_pointer.focused != self:
			main.mouse_pointer.focused._on_View_gui_input(event)
		else:
			draggable.start()
			state = CardState.DRAGGING
# 拖拽结束
func _dragend():
	state = CardState.NONE

	var overlaps := []
	for body in area.get_overlapping_bodies():
		if body != self: overlaps.append(body)
	overlaps.sort_custom(Sorter, "sort_ascending")

	if !overlaps.empty():
		stackable.stack(overlaps.back())
	else:
		stackable.unstack()

	_composition()

# 组合
func _composition():
	var tree = stackable.get_tree()
	var use_composition = null
	for composition in compositions:
		var can_composition = true
		if composition.required.size() != tree.size():
			can_composition = false
		else:
			for node in tree:
				if !composition.required.has(node.name):
					can_composition = false
					continue
		if can_composition:
			use_composition = composition
			continue
	if use_composition:
		stackable.get_root().progress_bar.show()
	else:
		stackable.get_root().progress_bar.hide()

class Sorter:
	static func sort_ascending(a: Node2D, b: Node2D) -> bool:
		return a.global_position.y < b.global_position.y
