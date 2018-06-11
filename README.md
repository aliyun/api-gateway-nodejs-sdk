Aliyun API Gateway SDK for Node.js
==================================

API 网关（API Gateway），提供高性能、高可用的 API 托管服务，帮助用户对外开放其部署在 ECS、容器服务等阿里云产品上的应用，提供完整的 API 发布、管理、维护生命周期管理。用户只需简单操作，即可快速、低成本、低风险的开放数据或服务。

> 请注意：由于 API Gateway 需要使用 AK 来实现签名，在浏览器场景下，极易容易产生安全性问题，因此本模块不支持在浏览器中使用。

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
'use strict';

const SimpleClient = require('aliyun-api-gateway').SimpleClient;
const client = new SimpleClient('YOUR_APP_CODE');

async function post() {
  var url = 'http://apiqingdaohttps.foundai.com/test1234';

  var result = await client.post(url, {
    data: {
      'testtest': 'query1Value'
    },
    headers: {
      accept: 'application/json'
    }
  });

  console.log(JSON.stringify(result));
}

post().catch((err) => {
  console.log(err.stack);
});
```

### Client (recommend)

```js
'use strict';

const Client = require('aliyun-api-gateway').Client;
const client = new Client('YOUR_APP_KEY','YOUR_APP_SECRET');

async function post() {
  var url = 'http://apiqingdaohttps.foundai.com/test1234';

  var result = await client.post(url, {
    data: {
      'testtest': 'query1Value'
    },
    headers: {
      accept: 'application/json'
    }
  });

  console.log(JSON.stringify(result));
}

post().catch((err) => {
  console.log(err.stack);
});
```

## Question?

Please submit an issue.

## License

The MIT License
