'use strict';

const {parse, format} = require('url');
const querystring = require('querystring');
const crypto = require('crypto');

const uuid = require('uuid');
const httpx = require('httpx');

const Base = require('./base');

/**
 * API Gateway Client
 */
class Client extends Base {
  constructor(key, secret, stage) {
    super();
    this.appKey = key;
    this.appSecret = Buffer.from(secret, 'utf8');
    this.stage = stage || 'RELEASE';
  }

  buildSignToString(method, headers, signedHeadersStr, url) {
    // accept, contentMD5, contentType,
    const lf = '\n';
    var list = [method, lf];

    var accept = headers['accept'];
    if (accept) {
      list.push(accept);
    }
    list.push(lf);

    var contentMD5 = headers['content-md5'];
    if (contentMD5) {
      list.push(contentMD5);
    }
    list.push(lf);

    var contentType = headers['content-type'];
    if (contentType) {
      list.push(contentType);
    }
    list.push(lf);

    var date = headers['date'];
    if (date) {
      list.push(date);
    }
    list.push(lf);

    if (signedHeadersStr) {
      list.push(signedHeadersStr);
      list.push(lf);
    }

    list.push(this.buildUrl(url));

    return list.join('');
  }

  sign(stringToSign) {
    return crypto.createHmac('sha256', this.appSecret)
      .update(stringToSign, 'utf8').digest('base64');
  }

  md5(content) {
    return crypto.createHash('md5')
      .update(content, 'utf8')
      .digest('base64');
  }

  getSignHeaders(headers) {
    var keys = Object.keys(headers).sort();
    var signKeys = [];
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key.toLowerCase().startsWith('x-ca-')) {
        signKeys.push(key);
      }
    }

    return signKeys;
  }

  buildUrl(parsedUrl, query) {
    var toStringify = Object.assign({}, parsedUrl.query, query);
    var result = parsedUrl.pathname;
    if (Object.keys(toStringify).length) {
      result += '?' + querystring.stringify(toStringify);
    }
    return result;
  }

  buildHeaders(headers) {
    var now = new Date();

    var keys = Object.keys(headers || {});
    var lowered = {};
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      lowered[key.toLowerCase()] = headers[key];
    }

    return Object.assign({
      'x-ca-timestamp': now.getTime(),
      'x-ca-key': this.appKey,
      'x-ca-nonce': uuid.v4(),
      'x-ca-stage': this.stage,
      'date': now.toUTCString(),
      'content-type': 'application/json',
      'accept': 'application/json'
    }, lowered);
  }

  getSignedHeadersString(signHeaders, headers) {
    var list = [];
    for (var i = 0; i < signHeaders.length; i++) {
      var key = signHeaders[i];
      list.push(key + ':' + headers[key]);
    }

    return list.join('\n');
  }

  * request(method, url, opts) {
    var headers = this.buildHeaders(opts.headers);

    if (method === 'POST' && headers['content-type'] === 'application/octet-stream') {
      headers['content-md5'] = this.md5(opts.data);
    }

    var signHeaders = this.getSignHeaders(headers);
    headers['x-ca-signature-headers'] = signHeaders.join(',');
    var signedHeadersStr = this.getSignedHeadersString(signHeaders, headers);

    var parsedUrl = parse(url, true);
    var signToString = this.buildSignToString(method, headers, signedHeadersStr, parsedUrl);
    headers['x-ca-signature'] = this.sign(signToString);

    var response = yield httpx.request(parsedUrl, {
      method: method,
      headers: headers,
      data: opts.data,
      beforeRequest: function (opts) {
        // FIXME: 证书有问题
        opts.rejectUnauthorized = false;
        return opts;
      }
    });

    var code = response.statusCode;
    if (code !== 200) {
      var err = new Error(`${method} ${format(url)} failed width code(${code}).` +
        ` request id: ${response.headers['x-ca-request-id']},` +
        ` error message: ${response.headers['x-ca-error-message']}`);
      throw err;
    }

    var result = yield httpx.read(response, 'utf8');
    var contentType = response.headers['content-type'] || '';
    if (contentType.includes('application/json')) {
      result = JSON.parse(result);
    }
    return result;
  }
}

module.exports = Client;
