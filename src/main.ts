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

  // effect settings
  const maxLevel = 4
  const branches = 3

  let size = Math.min(canvas.width * 0.3, canvas.height * 0.3)
  let sides = 5
  let scale = 0.4
  let spread = 0.6
  let color = `hsl(${Math.random() * 360}, 100%, 50%)`
  let lineWidth = Math.random() * 20 + 10




  function drawBranch(level: number) {
    if (level > maxLevel) return
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(size, 0)
    ctx.stroke()

    for (let i = 0; i < branches; i++) {
      ctx.save()
      ctx.translate(size - (size / branches) * i, 0)
      ctx.scale(scale, scale)

      ctx.save()
      ctx.rotate(spread)
      drawBranch(level + 1)
      ctx.restore()

      ctx.save()
      ctx.rotate(-1 * spread)
      drawBranch(level + 1)
      ctx.restore()

      ctx.restore()
    }




  }

  function drawFractal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.translate(canvas.width / 2, canvas.height / 2)

    for (let i = 0; i < sides; i++) {
      ctx.rotate((Math.PI * 2) / sides)
      drawBranch(0)
    }

    ctx.restore()
  }

  drawFractal()
  updateSliders()


  function randomizeFractal() {
    sides = Math.floor(Math.random() * 7 + 2)
    scale = Math.random() * 0.2 + 0.4
    spread = Math.random() * 2.9 + 0.1
    color = `hsl(${Math.random() * 360}, 100%, 50%)`
    lineWidth = Math.random() * 20 + 10
  }

  function resetFractal() {
    sides = 5
    scale = 0.5
    spread = 0.5
    color = `hsl(0, 100%, 50%)`
    lineWidth = 10
  }


  function updateSliders() {
    randomizeBtn.style.backgroundColor = color
    resetBtn.style.backgroundColor = color
    slider_spread.value = String(spread)
    label_spread.innerText = `Spread: ${spread.toFixed(2)}`
    slider_sides.value = String(sides)
    label_sides.innerText = `Sides: ${sides}`
  }


  randomizeBtn.addEventListener("click", () => {
    randomizeFractal()
    updateSliders()
    drawFractal()
  })

  resetBtn.addEventListener("click", () => {
    resetFractal()
    updateSliders()
    drawFractal()
  })

  slider_spread?.addEventListener("change", (e) => {
    spread = Number((e?.target as HTMLInputElement).value)
    updateSliders()
    drawFractal()
  })

  slider_sides.addEventListener("change", (e) => {
    sides = Number((e.target as HTMLInputElement).value)
    updateSliders()
    drawFractal()
  })


})