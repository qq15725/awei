class_name Stackable

extends Reference

var prev: Node2D
var node: Node2D
var next: Node2D

func _init(_node: Node2D) -> void:
	node = _node

func get_root():
	if prev && prev.stackable:
		return prev.stackable.get_root()
	return node

func get_prev_deep(deep := 0):
	if prev && prev.stackable:
		return prev.stackable.get_prev_deep(deep + 1)
	return deep

func stack(_node: Node2D) -> bool:
	if _check(_node):
		prev = _node
		if prev.stackable: 
			prev.stackable.next = node
		return true
	return false

func unstack() -> bool:
	if prev:
		if prev.stackable:
			prev.stackable.next = null
		prev = null
		return true
	return false

func _check(_node: Node2D) -> bool:
	return node != _node && !prev && (!_node.stackable || (!_node.stackable.next && _node.stackable._check_prev(node)))

func _check_prev(_node: Node2D) -> bool:
	if prev:
		if _node == prev: return false
		if prev.stackable: return prev.stackable._check_prev(_node)
	return true
