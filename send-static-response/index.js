module.exports.init = function(config, logger, stats) {

    return {
      // indicates start of client request
      onrequest: function(req, res, next) {
        console.log('---> onrequest()');
        if(req.headers['static-response'] == 'true') {
          sendStaticResponse(req, res, data, next);
        }
        else {
          next();
        }
      },
      
      // chunk of request payload data received from client
      ondata_request: function(req, res, data, next) {
        console.log('---> ondata_request()');
        next(null, data);
      },
  
      // last chunk of request payload data received from client
      onend_request: function(req, res, data, next) {
        console.log('---> onend_request()');
        next(null, data);
      },
  
      // indicates start of target response
      onresponse: function(req, res, next) {
        console.log('---> onresponse()');
        next();
      },
  
      // a chunk of response payload data received from target
      ondata_response: function(req, res, data, next) {
        console.log('---> ondata_response()');
        next(null, data);
      },
  
      // last chunk of response payload data received from target
      onend_response: function(req, res, data, next) {
        console.log('---> onend_response()');
        next(null, data);
      }
    };
  }

function sendStaticResponse(req, res, next) {
    var response = {
        type: 'INFO',
        message: 'This is a static response'
    };

    if (!res.finished) res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(response));
}