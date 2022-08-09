import type { MessageBox } from './components'

export class Global extends godot.Node {
  protected static sigleton

  static get singleton() {
    return Global.sigleton
  }

  constructor() {
    super()
    if (!Global.sigleton) {
      Global.sigleton = this
    }
  }

  public gotoWorldScene() {
    this.gotoScene('res://scenes/world.tscn')
  }

  public messageBox(): MessageBox {
    return this.get_node('/root/Root/UI/UIWrapper/MessageBox') as MessageBox
  }

  public gotoScene(path: string) {
    this.call_deferred('deferredGotoScene', path)
  }

  protected deferredGotoScene(path) {
    this.get_tree().get_current_scene().free()
    const packedScene = godot.ResourceLoader.load(path) as godot.PackedScene
    const instancedScene = packedScene.instance()
    this.get_tree().get_root().add_child(instancedScene)
    this.get_tree().set_current_scene(instancedScene)
  }
}

export default Global
