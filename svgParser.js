const parseString = require('xml2js').parseString;

class SVGPath
{
  constructor(dattribute) {
    this.dattribute = dattribute
  }

  parse() {
    function parseNum(n) {
      const ret = parseFloat(n)
      return isNaN(ret) ? n : ret
    }
    const data = this.dattribute.trim().replace(/[a-zA-Z]/g, (m) => '|' + m[0] + ' ')
    const commands = data.split('|').filter(cmd => cmd.length > 0).map(cmd => cmd.split(/ +/g).map(parseNum))
    return commands
  }  
}

class SVGParser
{
  constructor(document) {
    this.document = document
  }

  static load(svg) {
    return new Promise((resolve, reject) => {
      parseString(svg, (err, document) => {
        if (err) return reject(err)
        resolve(new SVGParser(document))
      })
    })
  }

  getPath() {
    return new SVGPath(this.document.svg.path[0]['$'].d)
  }

  getSize() {
    const header = this.document.svg['$']
    return {
      width: header.width,
      height: header.height
    }
  }
}

module.exports = SVGParser
