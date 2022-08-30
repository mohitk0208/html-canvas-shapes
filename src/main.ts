import './style.css'
window.addEventListener("load", function () {

  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  const randomizeBtn = this.document.getElementById("randomize-btn") as HTMLButtonElement


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
  let sides = 6
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


  function randomizeFractal() {
    sides = Math.floor(Math.random() * 7 + 2)
    scale = Math.random() * 0.2 + 0.4
    spread = Math.random() * 2.9 + 0.1
    color = `hsl(${Math.random() * 360}, 100%, 50%)`
    lineWidth = Math.random() * 20 + 10
  }


  randomizeBtn.addEventListener("click", () => {
    randomizeFractal()
    drawFractal()
  })


})