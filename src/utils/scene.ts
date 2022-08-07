export function loadScene(path: string): godot.PackedScene {
  return godot.load(path) as godot.PackedScene
}
