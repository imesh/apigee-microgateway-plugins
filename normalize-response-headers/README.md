# Apigee Microgateway Plugin - Normalize Response Headers

Apigee Microgateway returns all response headers in lowercase characters. This Microgateway plugin can be used for normalizing the case of response headers if required.

```js
   module.exports.init = function(config, logger, stats) {
    return {
      // last chunk of response payload data received from target
      onend_response: async function(req, res, data, next) {
        console.log('---> onend_response()');
        await normalizeResponseHeaders(res);
        next(null, data);
      }
    };
  }
```

```js
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
```

## How to Install

1. Copy `normalize-response-headers` plugin content given in this git repository folder to your local Microgateway plugins folder.

2. Install dependencies of `normalize-response-headers` plugin:
   ```bash
   cd normalize-response-headers/
   npm install header-case-normalizer
   ```

3. Update Microgateway configuration file and engage `normalize-response-headers` plugin:
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
       - normalize-response-headers
   ...
   ```

4. Start Microgateway, send an API request and verify the plugin.

## An Example Usage

```bash
curl -i http://localhost:8000/hello
HTTP/1.1 200 OK
Date: Tue, 02 Mar 2021 05:04:34 GMT
X-Forwarded-Port: 443
X-Forwarded-Proto: http
User-Agent: curl/7.64.1
Accept: */*
client_received_start_timestamp: 1614661474393
target_sent_start_timestamp: 1614661474400
X-Forwarded-Host: localhost:8000
X-Response-Time: 884
Connection: keep-alive
Content-Length: 0
```

## References
- [Apigee Microgateway v3.1.x Plugins Documentation](https://docs.apigee.com/api-platform/microgateway/3.1.x/use-plugins)
- [Apigee Microgateway Plugins Git Repository](https://github.com/apigee/microgateway-plugins)
- [header-case-normalizer](https://www.npmjs.com/package/header-case-normalizer)
