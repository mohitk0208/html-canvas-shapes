import Fractal from './Fractal';
import './style.css'


window.addEventListener("load", function () {

  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  const randomizeBtn = this.document.getElementById("randomize-btn") as HTMLButtonElement
  const resetBtn = this.document.getElementById("reset") as HTMLButtonElement
  const slider_spread = this.document.getElementById("spread") as HTMLInputElement
  const label_spread = this.document.querySelector('[for="spread"]') as HTMLLabelElement
  const slider_sides = this.document.getElementById("sides") as HTMLInputElement
  const label_sides = this.document.querySelector('[for="sides"]') as HTMLLabelElement

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


  const fractal = new Fractal(canvas, ctx)

  fractal.draw()
  updateSliders()



  function updateSliders() {
    randomizeBtn.style.backgroundColor = fractal.color
    resetBtn.style.backgroundColor = fractal.color
    slider_spread.value = String(fractal.spread)
    label_spread.innerText = `Spread: ${fractal.spread.toFixed(2)}`
    slider_sides.value = String(fractal.sides)
    label_sides.innerText = `Sides: ${fractal.sides}`
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


  this.window.addEventListener("resize", () => {
    canvas.width = this.window.innerWidth
    canvas.height = this.window.innerHeight
    fractal.size = Math.min(canvas.width * 0.3, canvas.height * 0.3)
    fractal.draw()
  })


})