'use strict';

// npm install aliyun-api-gateway --save

const co = require('co');

const {
  CONTENT_TYPE_FORM,
  Client
} = require('./');

const client = new Client('APP_KEY', 'APP_SECRET');

co(function* () {
  var url = 'http://api.aaaa.com/get';

  var result = yield client.get(url, {
    query: {
      'a-query1': 'query1Value',
      'b-query2': 'query2Value'
    },
    headers: {
      accept: 'application/json'
    },
    signHeaders: {
      'a-header1': 'header1Value',
      'b-header2': 'header2Value'
    }
  });

  console.log(JSON.stringify(result));
});

co(function* () {
  var url = 'http://api.aaaa.com/postform';

  var result = yield client.post(url, {
    headers: {
      accept: 'application/json',
      'content-type': CONTENT_TYPE_FORM
    },
    signHeaders: {
      'a-header1': 'header1Value',
      'b-header2': 'header2Value'
    },
    query: {
      'a-query1': 'query1Value',
      'b-query2': 'query2Value'
    },
    data: {
      'a-body1': 'body1Value',
      'b-body2': 'body2Value'
    }
  });

  console.log(JSON.stringify(result));
});

co(function* () {
  var url = 'http://api.aaaa.com/poststring';

  var result = yield client.post(url, {
    headers: {
      accept: 'application/json',
      'content-type': Client.CONTENT_TYPE_TEXT
      //（可选）Body MD5,服务端会校验Body内容是否被篡改,建议Body非Form表单时添加此Header
      // headers.put(HttpHeader.HTTP_HEADER_CONTENT_MD5, MessageDigestUtil.base64AndMD5(body));
    },
    signHeaders: {
      'a-header1': 'header1Value',
      'b-header2': 'header2Value'
    },
    query: {
      'a-query1': 'query1Value',
      'b-query2': 'query2Value'
    },
    data: 'demo string body content'
  });

  console.log(JSON.stringify(result));
});

co(function* () {
  var url = 'http://api.aaaa.com/poststream';

  var result = yield client.post(url, {
    headers: {
      accept: 'application/json',
      'content-type': Client.CONTENT_TYPE_TEXT
      //（可选）Body MD5,服务端会校验Body内容是否被篡改,建议Body非Form表单时添加此Header
      // headers.put(HttpHeader.HTTP_HEADER_CONTENT_MD5, MessageDigestUtil.base64AndMD5(body));
    },
    signHeaders: {
      'a-header1': 'header1Value',
      'b-header2': 'header2Value'
    },
    query: {
      'a-query1': 'query1Value',
      'b-query2': 'query2Value'
    },
    data: Buffer.from('demo string body content', 'utf8')
  });

  console.log(JSON.stringify(result));
});

co(function* () {
  var url = 'http://api.aaaa.com/putstring';

  var result = yield client.post(url, {
    headers: {
      accept: 'application/json',
      'content-type': Client.CONTENT_TYPE_TEXT
      //（可选）Body MD5,服务端会校验Body内容是否被篡改,建议Body非Form表单时添加此Header
      // headers.put(HttpHeader.HTTP_HEADER_CONTENT_MD5, MessageDigestUtil.base64AndMD5(body));
    },
    signHeaders: {
      'a-header1': 'header1Value',
      'b-header2': 'header2Value'
    },
    query: {
      'a-query1': 'query1Value',
      'b-query2': 'query2Value'
    },
    data: 'demo string body content'
  });

  console.log(JSON.stringify(result));
});

co(function* () {
  var url = 'http://api.aaaa.com/putstream';

  var result = yield client.post(url, {
    headers: {
      accept: 'application/json',
      'content-type': Client.CONTENT_TYPE_TEXT
      //（可选）Body MD5,服务端会校验Body内容是否被篡改,建议Body非Form表单时添加此Header
      // headers.put(HttpHeader.HTTP_HEADER_CONTENT_MD5, MessageDigestUtil.base64AndMD5(body));
    },
    signHeaders: {
      'a-header1': 'header1Value',
      'b-header2': 'header2Value'
    },
    query: {
      'a-query1': 'query1Value',
      'b-query2': 'query2Value'
    },
    data: Buffer.from('demo string body content', 'utf8')
  });

  console.log(JSON.stringify(result));
});

co(function* () {
  var url = 'http://api.aaaa.com/delete';

  var result = yield client.delete(url, {
    headers: {
      accept: 'application/json'
    },
    signHeaders: {
      'a-header1': 'header1Value',
      'b-header2': 'header2Value'
    },
    query: {
      'a-query1': 'query1Value',
      'b-query2': 'query2Value'
    }
  });

  console.log(JSON.stringify(result));
});


co(function* () {
  var url = 'http://api.equip.emailuo.com/equipment/manufacturer/update';

  var result = yield client.put(url, {
    headers: {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      gid: ''
    }
  });

  console.log(JSON.stringify(result));
});
