type NodeProps<T> = { [key: `on_${string}`]: Function } & { [P in keyof T]?: T[P] }

export function gnode<T extends godot.Node>(klass: new () => T): T
export function gnode<T extends godot.Node>(klass: new () => T, props: NodeProps<T> | godot.Node[]): T
export function gnode<T extends godot.Node>(klass: new () => T, props: NodeProps<T>, children: godot.Node[]): T
export function gnode<T extends godot.Node>(klass: new () => T, ...args: any): T {
  const node = new klass()
  const len = args.length
  let props = {}
  let children = []
  if (len === 2) {
    props = args[0]
    children = args[1]
  } else if (len === 1) {
    if (Array.isArray(args[0])) {
      children = args[0]
    } else {
      props = args[0]
    }
  }
  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith('on_')) {
      node.connect(key.substring(3), value as Function)
    } else {
      node[key] = value
    }
  }
  children.forEach(child => node.add_child(child))
  return node
}
