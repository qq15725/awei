class_name Stackable

extends Reference

var prev: Node2D
var node: Node2D
var next: Node2D

func _init(_node: Node2D) -> void:
	node = _node

func stack(_node: Node2D) -> bool:
	if _check(_node):
		prev = _node
		if prev.stackable: 
			prev.stackable.next = node
		_update_z_index(true)
		return true
	return false

func unstack(_node: Node2D) -> bool:
	if prev && _node == prev:
		if prev.stackable:
			prev.stackable.next = null
		prev = null
		_update_z_index(false)
		return true
	return false

func _check(_node: Node2D) -> bool:
	return node != _node && !prev && (!_node.stackable || (!_node.stackable.next && _node.stackable._check_prev(node)))

func _check_prev(_node: Node2D) -> bool:
	if prev:
		if _node == prev: return false
		if prev.stackable: return prev.stackable._check_prev(_node)
	return true

func _update_z_index(stack := true, isNext := false) -> void:
	if !isNext:
		if stack:
			node.z_index = prev.z_index + 1
		else:
			node.z_index = 0
	if next:
		next.z_index = node.z_index + 1
		if next.stackable:
			next.stackable._update_z_index(stack, true)
