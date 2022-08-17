extends Camera2D

# 拖动中
var dragging = false

# 拖动的位置
var drag_position: Vector2

func _unhandled_input(event):
	if event is InputEventMouseButton:
		# 左键点击-开始拖拽
		if event.button_index == BUTTON_LEFT:
			dragging = event.is_pressed()
			if dragging: drag_position = event.position
		# 滚轮按下
		elif event.button_index == BUTTON_WHEEL_UP:
			zoom = zoom * 1.2
			zoom.x = clamp(zoom.x, 0.25, 4)
			zoom.y = clamp(zoom.y, 0.25, 4)
		# 滚动抬起
		elif event.button_index == BUTTON_WHEEL_DOWN:
			zoom = zoom / 1.2
			zoom.x = clamp(zoom.x, 0.25, 4)
			zoom.y = clamp(zoom.y, 0.25, 4)
	# 鼠标拖拽-移动摄像头
	elif dragging && event is InputEventMouseMotion:
		position -= event.position - drag_position
		drag_position = event.position
	pass
