const Point = require('./point')
const Bezier = require('./bezier')

function lineRenderer(commands, scale) {
  function scaled(n) {
    return Math.round(n * scale)
  }
  let first = true, fx, fy
  let x = 0, y = 0
  let px = 0, py = 0
  let output = []
  commands.forEach((cmd) => {
    let bezier
    switch (cmd[0]) {
      case 'M':
        x = cmd[1]
        y = cmd[2]
        output.push([0, scaled(x), scaled(y)])
        if (first) {
          first = false
          fx = x
          fy = y
        }
        break;
      case 'C':
        for (let i=1; i<cmd.length; i+=6) {
          x = cmd[i+4]
          y = cmd[i+5]

          bezier = new Bezier([
            new Point(px, py),
            new Point(cmd[i], cmd[i+1]),
            new Point(cmd[i+2], cmd[i+3]),
            new Point(x, y)
          ]);

          bezier.tesselate(scale).forEach(point => {
            output.push([1, scaled(point.x), scaled(point.y)])
          })

          px = x
          py = y
        }
        break;
      case 'L':
        x = cmd[1]
        y = cmd[2]
        output.push([1, scaled(x), scaled(y)])
        break;
      case 'z':
      case 'Z':
        break;
      default:
        throw new Error("Unknown command: " + cmd.join(' '))
    }
    px = x
    py = y    
  })
  return output
}

module.exports = lineRenderer