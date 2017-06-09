Aliyun API Gateway SDK for Node.js
==================================

API 网关（API Gateway），提供高性能、高可用的 API 托管服务，帮助用户对外开放其部署在 ECS、容器服务等阿里云产品上的应用，提供完整的 API 发布、管理、维护生命周期管理。用户只需简单操作，即可快速、低成本、低风险的开放数据或服务。

## Status

[![Build Status](https://travis-ci.org/aliyun/api-gateway-nodejs-sdk.svg?branch=master)](https://travis-ci.org/aliyun/api-gateway-nodejs-sdk)

[![Coverage Status](https://coveralls.io/repos/github/aliyun/api-gateway-nodejs-sdk/badge.svg?branch=es5)](https://coveralls.io/github/aliyun/api-gateway-nodejs-sdk?branch=es5)

## Installation

You can install it as dependency with npm/cnpm.

```sh
$ # save into package.json dependencies with -S
$ npm install aliyun-api-gateway -S
$ # you can use cnpm for fast install
$ cnpm install aliyun-api-gateway -S
```

## Usage

The SDK contains Simple client(authrozied by appcode) and Normal client(authrozied by appid & appsecret).

### Simple client

```js
// require it
var SimpleClient = require('aliyun-api-gateway').SimpleClient;

// create client instance with appcode
var client = new SimpleClient('appcode');

// send GET request
it('should ok get(url)', function* () {
  var url = 'https://dm-81.data.aliyun.com/rest/160601/ip/getIpInfo.json?ip=210.75.225.254';
  var result = yield client.get(url);
});

it('should ok with post(url)', function* () {
  var url = 'https://dm-72.data.aliyun.com/rest/160601/int_image/matching.json';
  var result = yield client.post(url, {
    data: {
      'image': {
        'dataType': 10,
        'dataValue': 'base64 content'
      }
    }
  });
});
```

### Client (recommend)

```js
// require it
var Client = require('aliyun-api-gateway').Client;

// create client instance with appkey and appsecret
var client = new Client('appKey', 'appSecret');

// send GET request
it('should ok get(url)', function* () {
  var url = 'https://dm-81.data.aliyun.com/rest/160601/ip/getIpInfo.json?ip=210.75.225.254';
  var result = yield client.get(url);
});

it('should ok with post(url)', function* () {
  var url = 'https://dm-72.data.aliyun.com/rest/160601/int_image/matching.json';
  var result = yield client.post(url, {
    data: {
      'image': {
        'dataType': 10,
        'dataValue': 'base64 content'
      }
    }
  });
});
```

## Question?

Please submit an issue.

## License

The MIT License
