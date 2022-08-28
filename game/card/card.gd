class_name Card

extends KinematicBody2D

enum State {
	NONE     # 无
	HOVER    # 徘徊
	DRAGGING # 拖拽中
}

# 跟随速度
const FOLLOW_SPEED = 16.0

var state : int = State.NONE
var draggable := Draggable.new(self, { "global": true })
var stackable := Stackable.new(self)
var compositions := [
	{ "required": ["BerryBushes", "Farmer"], "duration": 10 },
]
var composable = null

onready var view := $View as PanelContainer
onready var viewStyle := view.get_stylebox("panel") as StyleBoxFlat
onready var viewHoverStyle := viewStyle.duplicate() as StyleBoxFlat
onready var progress_bar := $ProgressBar as ProgressBar
onready var progress_bar_timer := $ProgressBar/ProgressBarTimer as Timer
onready var area := $Area as Area2D
onready var main := get_node("/root/Main")

func _ready():
	viewHoverStyle.shadow_size = 1

func _input(event: InputEvent) -> void:
	if state == State.DRAGGING && draggable.is_dragging(event, false):
		draggable.end()
		set_state(State.NONE)

func _process(delta: float) -> void:
	draggable.drag()
	if state != State.DRAGGING && stackable.prev:
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
			set_state(State.DRAGGING)

func _on_MousePointer_unfocused():
	if state == State.HOVER: set_state(State.NONE)

func _on_MousePointer_focused():
	if state == State.NONE: set_state(State.HOVER)

# 进度条超时事件
func _on_ProgressBarTimer_timeout():
	progress_bar.value = progress_bar.value + 1

func set_state(value):
	var oldState = state
	state = value
	if oldState == State.DRAGGING && state == State.NONE:
		dragend()
	if state == State.HOVER || state == State.DRAGGING:
		global_position += Vector2(-1, -1)
		view.add_stylebox_override("panel", viewHoverStyle)
	elif oldState == State.HOVER || oldState == State.DRAGGING:
		global_position += Vector2(1, 1)
		view.add_stylebox_override("panel", viewStyle)

# 获取其他覆盖的卡片
func get_overlaps() -> Array:
	var overlaps := []
	for body in area.get_overlapping_bodies():
		if body != self: overlaps.append(body)
	overlaps.sort_custom(Sorter, "sort_ascending")
	return overlaps

# 拖拽结束
func dragend():
	var oldRoot = stackable.get_root()

	var overlaps = get_overlaps()
	if !overlaps.empty():
		stackable.stack(overlaps.back())
	else:
		stackable.unstack()

	var newRoot = stackable.get_root()

	if oldRoot:
		if oldRoot == newRoot: return
		if oldRoot.stackable.get_root() != newRoot: oldRoot.try_compose()
	newRoot.try_compose()

func try_compose():
	var composition = get_composable()
	if composition:
		compose(composition)
	else:
		uncompose()

# 获取可组合
func get_composable():
	var nodes = stackable.get_tree()
	for composition in compositions:
		var has = nodes.size() == composition.required.size()
		for index in composition.required.size(): has = has && nodes[index].name == composition.required[index]
		if !has: continue
		return composition

# 组合
func compose(_composable):
	composable = _composable
	progress_bar.value = 0
	progress_bar.max_value = composable.duration
	progress_bar.show()
	progress_bar_timer.start()

# 解除组合
func uncompose():
	progress_bar.hide()
	progress_bar_timer.stop()

class Sorter:
	static func sort_ascending(a: Node2D, b: Node2D) -> bool:
		return a.global_position.y < b.global_position.y
