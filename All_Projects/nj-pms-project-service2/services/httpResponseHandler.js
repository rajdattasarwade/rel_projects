function httpResponseSuccessHandler(res, code, data) {
  res.status(code).send(data)
}
function httpResponseHandlerError(res, errorcode, errormsg) {
  return res.status(errorcode).send(errormsg)
}

module.exports.httpResponseHandlerError = httpResponseHandlerError
module.exports.httpResponseSuccessHandler = httpResponseSuccessHandler

