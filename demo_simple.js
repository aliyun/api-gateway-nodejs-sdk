// npm install aliyun-api-gateway --save
'use strict';

const co = require('co');
const SimpleClient = require('aliyun-api-gateway').SimpleClient;

const appcode = '你自己的AppCode';
const client = new SimpleClient(appcode);

const url = 'http://ali-bankcard.showapi.com/bankcard';

co(function* () {
  var result = yield client.get(url, {
    data: {kahao: '6215982582010042122'}
  });
  console.log(result);
});
