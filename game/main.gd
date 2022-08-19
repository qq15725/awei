extends Node2D

onready var mouse_pointer := $MousePointer

func _ready():
	add_child(load('res://game/farmer/farmer.tscn').instance())
	add_child(load('res://game/berry_bushes/berry_bushes.tscn').instance())
	add_child(load('res://game/berry/berry.tscn').instance())
	add_child(load('res://game/farmer/farmer.tscn').instance())
