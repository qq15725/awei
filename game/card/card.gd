extends RigidBody2D

var draggable = load('res://class/draggable.gd').new({ "use_global": true })

# 桌面输入
func _on_View_gui_input(event):
	# 处理拖拽
	draggable.input(self, event)

	if event is InputEventMouseButton && event.button_index == BUTTON_LEFT:
		if draggable.dragging:
			collision_layer = 0
			collision_mask = 0
		else:
			collision_layer = 1
			collision_mask = 1

func _process(_delta):
	draggable.drag(self)

# 刚体进入
func _on_Area_body_entered(body):
  print(body)

# 刚体退出
func _on_Area_body_exited(body):
  print(body)
