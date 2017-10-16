const { arrayChunk } = require('./utils')

function basic(points, lineNum) {
  let chunks = arrayChunk(points, 10)
  let output = [
    String(lineNum++) + " DATA " + String(points.length)
  ].concat(chunks.map(chunk => {
    return String(lineNum++) + " DATA " + chunk.join(',')
  }))
  return output.join("\n")
}

function asm(points) {
  let chunks = arrayChunk(points, 10)
  let output = [
    "dw " + String(points.length)
  ].concat(chunks.map(chunk => {
    return "db " + chunk.map(p => p.join(',')).join(',')
  }))
  return output.join("\n")
}

module.exports = {
  basic,
  asm
}
