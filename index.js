const SVGParser = require('./svgParser')
const lineRenderer = require('./lineRenderer')
const asmFormatter = require('./formatters').asm
const fs = require('fs')

function readFile(filename, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, encoding, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

function main() {
  const filename = process.argv[2]
  const org = process.argv[3]
  if (!filename || !org) {
    console.error("Parameters: <file.svg> <org>")
    return
  }
  readFile(filename).then(svg => {
    return SVGParser.load(svg)
  }).then(parser => {
    const path = parser.getPath()
    const { width, height } = parser.getSize()
    // TODO: enable better calculation of scale
    const scale = 210/height
    const lines = lineRenderer(path.parse(), scale)
    const asm = asmFormatter(lines)
    console.log("ORG", "$" + org)
    console.log(asm)
    readFile("drivers/basic.txt", "utf8").then(basic => {
      console.log(";", basic.replace('<ORG>', org).split("\n").join("\n; "))
    })
  }).catch(ex => {
    if (ex.code === 'ENOENT') {
      console.error("File not found", filename)
      return
    }
    console.error(ex)
  })
}

main()
