class_name Draggable

extends Reference

# 拖拽的节点
var node: Node2D

# 选项
var options := {
	# 全局鼠标位置
	"global": false,
	# 移动偏移值的乘数
	"multiplier": 1,
}

# 拖拽中
var dragging := false

# 鼠标位置
var mouse_position: Vector2

# 上一个鼠标位置
var previous_mouse_position: Vector2

# 初始化
func _init(_node: Node2D, _options := {}) -> void:
	node = _node
	options.merge(_options, true)

# 设置拖拽中
func input(event: InputEvent) -> void:
	if event is InputEventMouseButton && event.button_index == BUTTON_LEFT:
		dragging = event.is_pressed()
		if dragging:
			_set_mouse_position()
			_set_previous_mouse_position()

# 拖拽节点
func drag() -> void:
	if dragging:
		_set_mouse_position()
		_set_node_position()
		_set_previous_mouse_position()

# 设置上一个鼠标位置
func _set_previous_mouse_position() -> void:
	previous_mouse_position = mouse_position

# 设置鼠标位置
func _set_mouse_position() -> void:
	if options.global:
		mouse_position = node.get_global_mouse_position()
	else:
		mouse_position = node.get_local_mouse_position()

# 设置节点位置
func _set_node_position() -> void:
	if options.global:
		node.global_position += (mouse_position - previous_mouse_position) * options.multiplier
	else:
		node.position += (mouse_position - previous_mouse_position) * options.multiplier
