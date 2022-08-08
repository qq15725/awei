import { Card } from './card'
import { loadScene } from './utils'

export class Farmer extends Card {
  public title = '农民'

  public static new(): Farmer {
    return loadScene('res://text-scenes/farmer.tscn').instance() as Farmer
  }
}

export default Farmer
