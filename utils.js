function arrayChunk(array, chunk) {
  let i, j, temp
  let output = []
  for (i = 0, j = array.length; i < j; i += chunk) {
    temp = array.slice(i, i + chunk);
    output.push(temp)
  }
  return output
}

module.exports = {
  arrayChunk
}
