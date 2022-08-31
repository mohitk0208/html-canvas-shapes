interface FractalConstructorProps {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  color: string
  lineWidth: number
  size: number
  sides: number
  scale: number
  spread: number
  maxLevel: number
  branches: number
}

export class Fractal implements FractalConstructorProps {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  color: string
  lineWidth: number
  size: number
  sides: number
  scale: number
  spread: number
  maxLevel: number
  branches: number



  constructor(canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    lineWidth: number = 10,
    sides: number = 5,
    scale: number = 0.4,
    spread: number = 0.6,
    maxLevel: number = 3,
    branches: number = 3,
    size?: number,
    color?: string
  ) {

    this.canvas = canvas
    this.ctx = ctx
    this.color = color || `hsl(${Math.random() * 360}, 100%, 50%)`
    this.lineWidth = lineWidth
    this.size = size || Math.min(canvas.width * 0.3, canvas.height * 0.3)
    this.sides = sides
    this.scale = scale
    this.spread = spread
    this.maxLevel = maxLevel
    this.branches = branches
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.save()
    this.ctx.strokeStyle = this.color
    this.ctx.fillStyle = this.color
    this.ctx.lineWidth = this.lineWidth
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2)

    for (let i = 0; i < this.sides; i++) {
      this.ctx.rotate((Math.PI * 2) / this.sides)
      this.drawBranch(0)
    }

    this.ctx.restore()
  }

  protected drawBranch(level: number) {
    if (level > this.maxLevel) return

    this.ctx.beginPath()
    this.ctx.moveTo(0, 0)
    this.ctx.lineTo(this.size, 0)
    this.ctx.stroke()

    for (let i = 0; i < this.branches; i++) {
      this.ctx.save()
      this.ctx.translate(this.size - (this.size / this.branches) * i, 0)
      this.ctx.scale(this.scale, this.scale)

      this.ctx.save()
      this.ctx.rotate(this.spread)
      this.drawBranch(level + 1)
      this.ctx.restore()
      this.ctx.restore()
    }
    this.ctx.beginPath()
    this.ctx.arc(0, this.size, this.size * 0.1, 0, Math.PI * 2)
    this.ctx.fill()

  }

  randomizeFractal() {
    this.sides = Math.floor(Math.random() * 7 + 2)
    this.scale = Math.random() * 0.2 + 0.4
    this.spread = Math.random() * 2.9 + 0.1
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`
    this.lineWidth = Math.random() * 20 + 10
  }

  resetFractal() {
    this.sides = 5
    this.scale = 0.5
    this.spread = 0.5
    this.color = `hsl(260, 100%, 50%)`
    this.lineWidth = 10
  }

}


export class SymmetricalBranchFractal extends Fractal {

  protected drawBranch(level: number): void {
    if (level > this.maxLevel) return

    this.ctx.beginPath()
    this.ctx.moveTo(0, 0)
    this.ctx.lineTo(this.size, 0)
    this.ctx.stroke()

    for (let i = 0; i < this.branches; i++) {
      this.ctx.save()
      this.ctx.translate(this.size - (this.size / this.branches) * i, 0)
      this.ctx.scale(this.scale, this.scale)

      this.ctx.save()
      this.ctx.rotate(this.spread)
      this.drawBranch(level + 1)
      this.ctx.restore()

      this.ctx.save()
      this.ctx.rotate(-1 * this.spread)
      this.drawBranch(level + 1)
      this.ctx.restore()


      this.ctx.restore()
    }
  }

}

