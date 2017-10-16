class Point
{
  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
  }

  add(v) {
    return new Point(this.x + v.x, this.y + v.y);
  }

  sub(v) {
    return new Point(this.x - v.x, this.y - v.y);
  }

  lenSq() {
    return this.x*this.x + this.y*this.y;
  }

  len() {
    return Math.sqrt(this.lenSq());
  }

  perp() {
    return new Point(-this.y, this.x);
  }

  scale(s) {
    return new Point(this.x * s, this.y * s);
  }

  norm() {
    return this.scale(1.0/this.len());
  }
}

module.exports = Point