import './style.css'
window.addEventListener("load", function () {

  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  canvas.width = this.window.innerWidth
  canvas.height = this.window.innerHeight

  const ctx = canvas.getContext("2d")!

  // canvas settings
  ctx.fillStyle = "black"
  ctx.strokeStyle = "lime"
  ctx.lineWidth = 10
  ctx.lineCap = "round"
  ctx.shadowColor = 'rgba(0,0,0,0.7)'
  ctx.shadowOffsetX = 10
  ctx.shadowOffsetY = 5
  ctx.shadowBlur = 10

  // effect settings
  let size = Math.min(canvas.width * 0.3, canvas.height * 0.3)
  let sides = 6
  let maxLevel = 4
  let scale = 0.4
  let spread = 0.6
  let branches = 3
  let color = `hsl(${Math.random() * 360}, 100%, 50%)`





  function drawBranch(level: number) {
    if (level > maxLevel) return
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(size, 0)
    ctx.stroke()

    for (let i = 0; i < branches; i++) {
      ctx.save()
      ctx.translate(size - (size / branches) * i, 0)
      ctx.rotate(spread)
      ctx.scale(scale, scale)
      drawBranch(level + 1)
      ctx.restore()

      ctx.save()
      ctx.translate(size - (size / branches) * i, 0)
      ctx.rotate(-1 * spread)
      ctx.scale(scale, scale)
      drawBranch(level + 1)
      ctx.restore()
    }




  }

  function drawFractal() {
    ctx.save()
    ctx.strokeStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.translate(canvas.width / 2, canvas.height / 2)

    for (let i = 0; i < sides; i++) {
      ctx.rotate((Math.PI * 2) / sides)
      drawBranch(0)
    }

    ctx.restore()
  }

  drawFractal()



})