# Apigee Microgateway Plugin - Conditional Target Endpoint Router

Apigee Microgateway reads the target endpoint URL from the [Microgateway-aware proxy](https://docs.apigee.com/api-platform/microgateway/3.2.x/overview-edge-microgateway) created in Apigee Edge. This configuration is set in the request (req) object in the [config-proxy-middleware](https://github.com/apigee/microgateway-core/blob/v3.2.1/lib/config-proxy-middleware.js#L137) when the proxy is identified from the incoming request URL.

If required, the target endpoint URL can be conditionally updated using a Microgateway plugin in the onrequest() function as follows:

```js
module.exports.init = function (config, logger, stats) {

  return {
    onrequest: function (req, res, next) {
      console.log('---> onrequest()');

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
```


## How to Install

1. Copy `conditional-target-endpoint-router` plugin content given in this git repository folder to your local Microgateway plugins folder.

2. Install dependencies of `conditional-target-endpoint-router` plugin:
   ```bash
   cd conditional-target-endpoint-router/
   npm install header-case-normalizer
   ```

3. Update Microgateway configuration file and engage `conditional-target-endpoint-router` plugin:
   ```
   ...
   edgemicro:
     port: 8000
     max_connections: 1000
     config_change_poll_interval: 600
     logging:
       ...
     plugins:
       sequence:
       - conditional-target-endpoint-router
   ...
   ```

4. Start Microgateway, send an API request and verify the plugin.

## Example API requests

```bash
curl -i http://localhost:8000/hello/mocktarget
HTTP/1.1 200 OK
x-powered-by: Apigee
access-control-allow-origin: *
x-frame-options: ALLOW-FROM RESOURCE-URL
x-xss-protection: 1
x-content-type-options: nosniff
content-type: text/plain; charset=utf-8
date: Fri, 16 Apr 2021 02:30:22 GMT
...
alt-svc: clear
x-response-time: 273
Connection: keep-alive
Transfer-Encoding: chunked

Hello, Guest!
```

```
curl -i http://localhost:8000/hello/httpbin
HTTP/1.1 200 OK
date: Fri, 16 Apr 2021 02:30:55 GMT
content-type: application/json
server: gunicorn/19.9.0
access-control-allow-origin: *
access-control-allow-credentials: true
x-response-time: 973
Connection: keep-alive
Transfer-Encoding: chunked

{
  "args": {},
  "data": "",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Client-Received-Start-Timestamp": "1618540254742",
    "Host": "httpbin.org",
    "Target-Sent-Start-Timestamp": "1618540254750",
    "User-Agent": "curl/7.64.1",
    "X-Amzn-Trace-Id": "Root=1-6078f6df-50f355b305a52fe21e33cedb",
    "X-Forwarded-Host": "localhost:8000"
  },
  "json": null,
  "method": "GET",
  ...
  "url": "https://localhost:8000/anything"
}
```

## References
- [Apigee Microgateway v3.2.x Plugins Documentation](https://docs.apigee.com/api-platform/microgateway/3.2.x/use-plugins)
- [Apigee Microgateway Plugins Git Repository](https://github.com/apigee/microgateway-plugins)

## Disclaimer

This is not an officially supported Google product.