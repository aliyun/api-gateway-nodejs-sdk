'use strict';

const parse = require('url').parse;
const querystring = require('querystring');

/**
 * API Gateway Client
 */
class Base {
  constructor() {}

  get(url, opts) {
    opts || (opts = {});
    var parsed = parse(url, true);
    if (opts && opts.data) {
      // append data into querystring
      Object.assign(parsed.query, opts.data);
      parsed.path = parsed.pathname + '?' + querystring.stringify(parsed.query);
      opts.data = null;
    }
    return this.request('GET', parsed, opts);
  }

  post(url, opts) {
    var parsed = parse(url, true);
    var query = opts.query;
    if (query) {
      // append data into querystring
      Object.assign(parsed.query, query);
      parsed.path = parsed.pathname + '?' + querystring.stringify(parsed.query);
      opts.query = null;
    }

    var headers = opts.headers || {};
    var type = headers['content-type'] || headers['Content-Type'];
    if (!type) {
      headers['content-type'] = 'application/json';
      type = headers['content-type'];
    }

    var originData = opts.data;
    if (type.startsWith('application/x-www-form-urlencoded')) {
      opts.data = querystring.stringify(opts.data);
    } else if (type.startsWith('application/json')) {
      opts.data = JSON.stringify(opts.data);
    } else if (!Buffer.isBuffer(opts.data) && typeof opts.data !== 'string') {
      // 非buffer和字符串时，以JSON.stringify()序列化
      opts.data = JSON.stringify(opts.data);
    }

    return this.request('POST', url, opts, originData);
  }
}

module.exports = Base;
