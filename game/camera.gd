extends Camera2D

var draggable = Draggable.new(self, { "multiplier": -1 })

func _unhandled_input(event: InputEvent) -> void:
	draggable.input(event)

	if event is InputEventMouseButton:
		# 滚轮按下
		if event.button_index == BUTTON_WHEEL_UP:
			zoom = zoom * 1.2
			zoom.x = clamp(zoom.x, 0.25, 4)
			zoom.y = clamp(zoom.y, 0.25, 4)
		# 滚动抬起
		elif event.button_index == BUTTON_WHEEL_DOWN:
			zoom = zoom / 1.2
			zoom.x = clamp(zoom.x, 0.25, 4)
			zoom.y = clamp(zoom.y, 0.25, 4)

func _process(_delta) -> void:
	draggable.drag()
