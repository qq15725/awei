import { loadScene } from './utils'
import type { MessageBox } from './components'
import type { Farmer } from './farmer'

export class Global extends godot.Node {
  protected static sigleton
  protected scenes = new Map<string, godot.PackedScene>()

  public static get singleton() {
    return Global.sigleton
  }

  constructor() {
    super()
    if (!Global.sigleton) Global.sigleton = this
  }

  public getScene(path: string): godot.PackedScene {
    if (!this.scenes.has(path)) {
      this.scenes.set(path, loadScene(path))
    }
    return this.scenes.get(path)
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

  public newFarmer(): Farmer {
    return this.getScene('res://text-scenes/farmer.tscn').instance() as Farmer
  }

  public gotoWorldScene() {
    this.gotoScene('res://scenes/world.tscn')
  }

  public messageBox(): MessageBox {
    return this.get_node('/root/Root/UI/UIWrapper/MessageBox') as MessageBox
  }
}

export default Global
