extends Node2D

onready var mouse_pointer := $MousePointer
onready var y_sort := $YSort

func add_child_to_random_position(node: Node2D):
	node.global_position.x = rand_range(0, 400)
	node.global_position.y = rand_range(0, 400)
	y_sort.add_child(node)

func _ready():
	add_child_to_random_position(load('res://game/farmer/farmer.tscn').instance())
	add_child_to_random_position(load('res://game/berry_bushes/berry_bushes.tscn').instance())
	add_child_to_random_position(load('res://game/berry/berry.tscn').instance())
