extends Reference

var options = {
	# 使用全局鼠标位置
	"use_global": false,
	# 移动偏移值的乘数
	"multiplier": 1,
}

# 拖拽中
var dragging = false

# 鼠标位置
var mouse_position: Vector2

# 上一个鼠标位置
var prev_mouse_position: Vector2

# 初始化
func _init(userOptions: Dictionary):
	options.merge(userOptions, true)

# 根据节点设置鼠标位置
func _set_mouse_position(node: Node2D):
	if options.use_global:
		mouse_position = node.get_global_mouse_position()
	else:
		mouse_position = node.get_local_mouse_position()

# 移动节点位置
func _move(node: Node2D):
	if options.use_global:
		node.global_position += (mouse_position - prev_mouse_position) * options.multiplier
	else:
		node.position += (mouse_position - prev_mouse_position) * options.multiplier

# 处理输入，判定是否开始拖拽
func input(node: Node2D, event: InputEvent):
	if event is InputEventMouseButton && event.button_index == BUTTON_LEFT:
		dragging = event.is_pressed()
		if dragging:
			_set_mouse_position(node)
			prev_mouse_position = mouse_position

# 拖拽节点
func drag(node: Node2D):
	if dragging:
		_set_mouse_position(node)
		_move(node)
		prev_mouse_position = mouse_position
