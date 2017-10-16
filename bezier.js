const Point = require('./point')

class Bezier
{
  constructor(controlPoints) {
    this.controlPoints = controlPoints
  }

  bezierAt(t) {
    const nt = 1.0 - t;
  
    const scalars = [nt*nt*nt, 3.0*nt*nt*t, 3.0*nt*t*t, t*t*t];
    const value = this.controlPoints.reduce(function(prev, curr, i) {
      return prev.add(curr.scale(scalars[i]));
    }, new Point());
  
    return value;
  }

  approximateLength() {
    const allButLast = this.controlPoints.slice(0, 3);
    const diffs = allButLast.map((el, i) => {
      return this.controlPoints[i + 1].sub(el);
    });
    
    const length = diffs.reduce(function (prev, vec) {
      return prev + vec.len();
    }, 0.0);
    
    return length;
  }
  
  tesselationSegmentsForLength(length) {
    const NoLessThan = 1
    const segs = length/30.0
    
    return Math.ceil(Math.sqrt(segs*segs*0.6 + NoLessThan*NoLessThan));
  }

  tesselate(scale) {
    const segments = this.tesselationSegmentsForLength(this.approximateLength() * scale * scale)
    let output = []
    for (let i=0; i<segments; i++) {
      let t = (i+1)/segments
      output.push(this.bezierAt(t))
    }
    return output
  }
}

module.exports = Bezier