extends Area2D

# 聚焦节点
var focused: Node

# 和鼠标重叠的节点
var overlaps := []

func _ready():
	 # warning-ignore:return_value_discarded
	connect("body_entered", self, "_on_MousePointer_body_entered")
	 # warning-ignore:return_value_discarded
	connect("body_exited", self, "_on_MousePointer_body_exited")

func _process(_delta: float) -> void:
	global_position = get_tree().current_scene.get_global_mouse_position()

func _on_MousePointer_body_entered(body: Node) -> void:
	overlaps.append(body)
	overlaps.sort_custom(Sorter, "sort_ascending")
	_discover_focus()

func _on_MousePointer_body_exited(body: Node) -> void:
	overlaps.erase(body)
	_discover_focus()

func _discover_focus():
	focused = overlaps.back()

class Sorter:
	static func sort_ascending(a: Node, b: Node) -> bool:
		return a.z_index < b.z_index
