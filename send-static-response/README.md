# Apigee Microgateway Plugin - Send Static Response

This Apigee Microgateway plugin illustrates how a static response message can be sent conditionally from an API proxy deployed on Microgateway.

```js
// last chunk of request payload data received from client
onend_request: function(req, res, data, next) {
console.log('---> onend_request()');
    if(req.headers['static-response'] == 'true') {
        sendStaticResponse(req, res, data, next);
    }
    else {
        next(null, data);
    }
},
```

```js
function sendStaticResponse(req, res, next) {
    var response = {
        type: 'INFO',
        message: 'This is a static response'
    };

    if (!res.finished) res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(response));
    next(null, response);
}
```

## An Example Usage

```bash
curl -i -H 'static-response: true' http://localhost:8000/hello
HTTP/1.1 200 OK
content-type: application/json
Date: Fri, 31 Jul 2020 00:54:18 GMT
Connection: keep-alive
Content-Length: 53

{"type":"INFO","message":"This is a static response"}
```

## References
- [Apigee Microgateway v3.1.x Plugins Documentation](https://docs.apigee.com/api-platform/microgateway/3.1.x/use-plugins)
- [Apigee Microgateway Plugins Git Repository](https://github.com/apigee/microgateway-plugins)
