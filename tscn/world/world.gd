extends Node2D

# 摄像机
var camera: Camera2D

# 拖动中
var dragging = false

# 拖动的位置
var drag_position: Vector2

func _ready():
	camera = $Desktop/Camera
	$Button.connect('pressed', self, "_on_Button_pressed")
	pass

func _on_Button_pressed():
	add_child(load('res://tscn/farmer/farmer.tscn').instance())

# 桌面输入事件
func _on_Desktop_input_event(_viewport: Object, event: InputEvent, _shape_idx: int):
	if event is InputEventMouseButton:
		# 左键点击-开始拖拽
		if event.button_index == BUTTON_LEFT:
			dragging = event.is_pressed()
			if dragging: drag_position = event.position
		# 滚轮按下
		elif event.button_index == BUTTON_WHEEL_UP:
			camera.zoom = camera.zoom * 1.2
			camera.zoom.x = clamp(camera.zoom.x, 0.25, 4)
			camera.zoom.y = clamp(camera.zoom.y, 0.25, 4)
		# 滚动抬起
		elif event.button_index == BUTTON_WHEEL_DOWN:
			camera.zoom = camera.zoom / 1.2
			camera.zoom.x = clamp(camera.zoom.x, 0.25, 4)
			camera.zoom.y = clamp(camera.zoom.y, 0.25, 4)
	# 鼠标拖拽-移动摄像头
	elif (dragging && event is InputEventMouseMotion):
		camera.position += event.position - drag_position
		drag_position = event.position
	pass
