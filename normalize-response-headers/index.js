var normalizeHeaderCase = require("header-case-normalizer");

module.exports.init = function(config, logger, stats) {
    return {
      // last chunk of response payload data received from target
      onend_response: function(req, res, data, next) {
        console.log('---> onend_response()');
        normalizeResponseHeaders(res);
        next(null, data);
      }
    };
  }

function normalizeResponseHeaders(res) {
    console.log('---> normalizing response headers: ' + JSON.stringify(res.getHeaders()));
    for(var key in res.getHeaders()) {
      if(key.indexOf('_') >= 0) {
        // skip headers having underscore character
        continue;
      }
      // skip any other headers which need to be preserved

      // normalize headers
      var value = res.getHeader(key);
      var normalizedKey = normalizeHeaderCase(key);
      res.setHeader(normalizedKey, value);
      console.log('---> ' + normalizedKey + ': ' + value);
    }
}