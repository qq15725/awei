import { Game } from './game'
import { gnode } from './utils'
import { Farmer } from './farmer'

export class GameWorld extends godot.Node2D {
  constructor() {
    super()
    this.add_child(new Game())
    this.add_child(Farmer.new())
    this.add_child(
      gnode('Button', {
        text: '新增卡牌',
        on_pressed: () => {
          const farmer = Farmer.new()
          farmer.position *= 100.1
          this.add_child(farmer)
        },
      }),
    )
  }
}

export default GameWorld
