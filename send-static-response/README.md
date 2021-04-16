# Apigee Microgateway Plugin - Send Static Response

This Apigee Microgateway plugin illustrates how a static response message can be sent conditionally from an API proxy deployed on Microgateway.

```js
   // indicates start of client request
   onrequest: function(req, res, next) {
     console.log('---> onrequest()');
     if(req.headers['static-response'] == 'true') {
       sendStaticResponse(req, res, next);
     }
     else {
       next();
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

## Disclaimer

This is not an officially supported Google product.