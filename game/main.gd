extends Node2D

onready var mouse_pointer := $MousePointer

func _ready():
	$Button.connect('pressed', self, "_on_Button_pressed")

func _on_Button_pressed():
	add_child(load('res://game/farmer/farmer.tscn').instance())
