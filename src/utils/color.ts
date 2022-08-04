export function color(from: string): godot.Color
export function color(from: number): godot.Color
export function color(r?: number, g?: number, b?: number, a?: number): godot.Color
export function color(...args: any) {
  return new godot.Color(...args)
}
