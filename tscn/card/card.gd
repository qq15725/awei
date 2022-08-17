extends RigidBody2D

# 拖拽中
var dragging = false

# 拖拽移动的距离
var drag_movement: Vector2

# 桌面输入
func _on_View_gui_input(event):
	if event is InputEventMouseButton && event.button_index == BUTTON_LEFT:
		dragging = event.pressed
		drag_movement = global_position - get_global_mouse_position()
		if dragging:
			collision_layer = 0
			collision_mask = 0
		else:
			collision_layer = 1
			collision_mask = 1

# 刚体进入
func _on_Area_body_entered(body):
  print(body)

# 刚体退出
func _on_Area_body_exited(body):
  print(body)

func _process(_delta):
	if dragging: global_position = get_global_mouse_position() + drag_movement
