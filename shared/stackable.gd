class_name Stackable

extends Reference

var prev: Node2D
var node: Node2D
var next: Node2D

func _init(_node: Node2D) -> void:
	node = _node

# 获取堆叠的根节点
func get_root() -> Node2D:
	if prev && prev.stackable:
		return prev.stackable.get_root()
	return node

# 获取上级的所有节点
func get_prev_nodes() -> Array:
	var nodes := []
	if prev:
		if prev.stackable:
			nodes.append_array(prev.stackable.get_prev_nodes())
		nodes.append(prev)
	return nodes

# 获取下级的所有节点
func get_next_nodes() -> Array:
	var nodes := []
	if next:
		if next.stackable:
			nodes.append_array(next.stackable.get_next_nodes())
		nodes.append(next)
	return nodes

# 获取整个堆叠树
func get_tree() -> Array:
	var nodes := []
	nodes.append_array(get_prev_nodes())
	nodes.append(node)
	nodes.append_array(get_next_nodes())
	return nodes

# 堆叠到某节点
func stack(parent: Node2D) -> void:
	if node == parent: return
	if prev == parent: return
	if prev: unstack()
	if parent.stackable:
		for child in parent.stackable.get_tree():
			if node == child: return
	prev = parent
	if prev.stackable: 
		prev.stackable.next = node	

# 解除堆叠
func unstack() -> void:
	if prev && prev.stackable: prev.stackable.next = null
	prev = null
