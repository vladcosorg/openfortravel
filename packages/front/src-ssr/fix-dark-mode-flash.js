module.exports = function (app) {
  app.use(modifyResponseBody)
}

function modifyResponseBody(req, res, next) {
  var oldSend = res.send

  res.send = function () {
    let state = { settings: { isDark: false } }
    try {
      state = JSON.parse(
        JSON.parse(require('cookie').parse(req.headers.cookie || '').qs),
      )
    } catch (e) {}

    if (state && state.settings && state.settings.isDark) {
      arguments[0] = arguments[0].replace(/body--light/gm, 'body--dark')
    }
    oldSend.apply(res, arguments)
  }
  next()
}
