import { SymmetricalBranchFractal } from './Fractal';
import './style.css'


window.addEventListener("load", function () {

  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  const randomizeBtn = this.document.getElementById("randomize-btn") as HTMLButtonElement
  const resetBtn = this.document.getElementById("reset") as HTMLButtonElement
  const slider_spread = this.document.getElementById("spread") as HTMLInputElement
  const label_spread = this.document.querySelector('[for="spread"]') as HTMLLabelElement
  const slider_sides = this.document.getElementById("sides") as HTMLInputElement
  const label_sides = this.document.querySelector('[for="sides"]') as HTMLLabelElement
  const slider_line_width = this.document.getElementById("line-width") as HTMLInputElement
  const label_line_width = this.document.querySelector('[for="line-width"]') as HTMLLabelElement
  const slider_scale = this.document.getElementById("scale") as HTMLInputElement
  const label_scale = this.document.querySelector('[for="scale"]') as HTMLLabelElement

  canvas.width = this.window.innerWidth
  canvas.height = this.window.innerHeight

  const ctx = canvas.getContext("2d")!

  // canvas settings
  ctx.fillStyle = "black"
  ctx.strokeStyle = "lime"
  ctx.lineCap = "round"
  ctx.shadowColor = 'rgba(0,0,0,0.7)'
  ctx.shadowOffsetX = 10
  ctx.shadowOffsetY = 5
  ctx.shadowBlur = 10


  const fractal = new SymmetricalBranchFractal(canvas, ctx);

  fractal.draw()
  updateSliders()



  function updateSliders() {
    randomizeBtn.style.backgroundColor = fractal.color
    resetBtn.style.backgroundColor = fractal.color

    slider_spread.value = String(fractal.spread)
    label_spread.innerText = `Spread: ${fractal.spread.toFixed(2)}`

    slider_sides.value = String(fractal.sides)
    label_sides.innerText = `Sides: ${fractal.sides}`

    slider_line_width.value = String(fractal.lineWidth)
    label_line_width.innerText = `Line Width: ${fractal.lineWidth.toFixed(2)}`

    slider_scale.value = String(fractal.scale)
    label_scale.innerText = `Scale: ${fractal.scale.toFixed(2)}`

  }


  randomizeBtn.addEventListener("click", () => {
    fractal.randomizeFractal()
    updateSliders()
    fractal.draw()
  })

  resetBtn.addEventListener("click", () => {
    fractal.resetFractal()
    updateSliders()
    fractal.draw()
  })

  slider_spread?.addEventListener("change", (e) => {
    fractal.spread = Number((e?.target as HTMLInputElement).value)
    updateSliders()
    fractal.draw()
  })

  slider_sides.addEventListener("change", (e) => {
    fractal.sides = Number((e.target as HTMLInputElement).value)
    updateSliders()
    fractal.draw()
  })

  slider_line_width.addEventListener("change", (e) => {
    fractal.lineWidth = Number((e.target as HTMLInputElement).value)
    updateSliders()
    fractal.draw()
  })

  slider_scale.addEventListener("change", (e) => {
    fractal.scale = Number((e.target as HTMLInputElement).value)
    updateSliders()
    fractal.draw()
  })


  this.window.addEventListener("resize", () => {
    canvas.width = this.window.innerWidth
    canvas.height = this.window.innerHeight
    fractal.size = Math.min(canvas.width * 0.3, canvas.height * 0.3)
    fractal.draw()
  })


})