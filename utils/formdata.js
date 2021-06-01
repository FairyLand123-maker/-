function formdata (obj = {}) {
  let result = ''
  for (let name of Object.keys(obj)) {
    let value = obj[name];
    result +=
    '\r\n--XXX' +
    '\r\nContent-Disposition: form-data; name=\"'+ name +'\"'+
    '\r\n' +
    '\r\n' + value
  }
  return result + '\r\n--XXX--'
}