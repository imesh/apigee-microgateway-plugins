module.exports.init = function (config, logger, stats) {

  return {
    onrequest: function (req, res, next) {
      console.log('---> onrequest()');

      // The target endpoint URL is fetched from the Microgateway aware proxy and set to the req object:
      // https://github.com/apigee/microgateway-core/blob/v3.2.1/lib/config-proxy-middleware.js#L137

      // If required, it can be conditionally updated in this function as follows:
      if(req.url.indexOf('/mocktarget') >= 0) {
        console.log('Setting target hostname and path to mocktarget:')
        req.targetHostname = 'mocktarget.apigee.net';
        req.targetPath = '/';
      } else if(req.url.indexOf('/httpbin') >= 0) {
        console.log('Setting target hostname and path to httpbin:')
        req.targetHostname = 'httpbin.org';
        req.targetPath = '/anything';
      }
      
      console.log('req.targetHostname: ' + req.targetHostname);
      console.log('req.targetPath: ' + req.targetPath);
      next();
    }
  };
}