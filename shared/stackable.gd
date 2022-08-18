class_name Stackable

extends Reference

var prev: Node2D
var node: Node2D
var next: Node2D

func _init(_node: Node2D) -> void:
	node = _node

func stack(_node: Node2D):
	if _check(_node):
		prev = _node
		if prev.stackable: 
			prev.stackable.next = node

func unstack(_node: Node2D):
	if prev && _node.get_instance_id() == prev.get_instance_id():
		if prev.stackable:
			prev.stackable.next = null
		prev = null

func _check(_node: Node2D) -> bool:
	var instance_id = node.get_instance_id()
	return instance_id != _node.get_instance_id() && !prev && (!_node.stackable || (!_node.stackable.next && _node.stackable._check_prev(instance_id)))

func _check_prev(instance_id: int) -> bool:
	if prev:
		if instance_id == prev.get_instance_id(): return false
		if prev.stackable: return prev.stackable._check_prev(instance_id)
	return true
