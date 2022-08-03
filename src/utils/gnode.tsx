export type GNodes = {
  AcceptDialog: godot.AcceptDialog
  Button: godot.Button
  CanvasLayer: godot.CanvasLayer
  Control: godot.Control
  HBoxContainer: godot.HBoxContainer
  Label: godot.Label
  LineEdit: godot.LineEdit
  Node: godot.Node
  ScrollContainer: godot.ScrollContainer
  TextureRect: godot.TextureRect
  VBoxContainer: godot.VBoxContainer
}

type GNodeProps<T> = { [key: `on_${ string }`]: Function } & { [P in keyof T]?: T[P] }

export function gnode<T extends keyof GNodes>(name: T): GNodes[T]
export function gnode<T extends keyof GNodes>(name: T, props: GNodeProps<GNodes[T]> | godot.Node[]): GNodes[T]
export function gnode<T extends keyof GNodes>(name: T, props: GNodeProps<GNodes[T]>, children: godot.Node[]): GNodes[T]
export function gnode<T extends godot.Node>(klass: new () => T): T
export function gnode<T extends godot.Node>(klass: new () => T, props: GNodeProps<T> | godot.Node[]): T
export function gnode<T extends godot.Node>(klass: new () => T, props: GNodeProps<T>, children: godot.Node[]): T
export function gnode(klass: any, ...args: any): any {
  let node: any
  if (typeof klass === 'string') {
    node = new godot[klass]()
  } else {
    // eslint-disable-next-line new-cap
    node = new klass()
  }
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
